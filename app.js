const chokidar = require('chokidar')
const fs = require('fs')
const Winston = require('winston')

/**
 * Logger
 */
logger = Winston.createLogger({
    transports: [
        new Winston.transports.File({ filename: 'CertManager.log' })
    ],
    format: Winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
})

/**
 * Outputs to console during Development
 */
if (process.env.NODE_ENV !== 'production') {
    logger.add(new Winston.transports.Console({
        format: Winston.format.simple()
    }))
}

async function copyFile(filePath, destPath) {
    await fs.copyFile(filePath, destPath, (err) => {
        if (err) throw err
        logger.info(`${filePath} has been copied to ${destPath}`)
    })
}

function watchFolder(certFolder, keyFolder, destFolder) {
    let fileCache = []
    const domain = 'the_bwc_com'
    const fileIncludes = [
        'webmail',
        'cpanel',
        'cpcalendars',
        'cpcontacts',
        'mail',
        'webdisk',
        'www'
    ]

    const dir = fs.readdirSync(certFolder)
    dir.forEach(file => {
        fileCache.push(file)
    })

    try {
        const watcher = chokidar.watch(certFolder, { persistent: true })
        watcher.on('add', async filePath => {
            let arrayFileName = filePath.split('\\')
            let fileName = arrayFileName[arrayFileName.length-1]
            if (!fileCache.includes(fileName)) {
                fileCache.push(fileName)
                if (fileName.startsWith(domain)) {
                    // Get Key file information
                    let domainSegments = domain.split('_')
                    let keySegments = fileName.split('_')[domainSegments.length] + '_' + fileName.split('_')[domainSegments.length+1]
                    const key = fs.readdirSync(keyFolder).find(file => file.includes(keySegments))

                    await copyFile(`${certFolder}\\${fileName}`, `${destFolder}\\${domain}.crt`)
                    await copyFile(`${keyFolder}\\${key}`, `${destFolder}\\${domain}.key`)

                }
                if (fileIncludes.includes(fileName.split('_')[0])) {
                    // (predicate)_the_bwc_com [ie. webmail_the_bwc_com]
                    let index = fileIncludes.findIndex(name => name === fileName.split('_')[0])
                    if (fileName.includes(fileIncludes[index]+ '_' + domain)) {
                        // Get Key file information
                        let domainSegments = domain.split('_')
                        let keySegments = fileName.split('_')[domainSegments.length+1] + '_' + fileName.split('_')[domainSegments.length+2]
                        const key = fs.readdirSync(keyFolder).find(file => file.includes(keySegments))

                        await copyFile(`${certFolder}\\${fileName}`, `${destFolder}\\${domain}.crt`)
                        await copyFile(`${keyFolder}\\${key}`, `${destFolder}\\${domain}.key`)
                    }
                }
            }
        })
    } catch (err) {
        logger.error(err.stack)
    }
}

watchFolder(process.env.CERT_FOLDER, process.env.KEY_FOLDER, process.env.DEST_FOLDER)
