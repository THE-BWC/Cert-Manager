# BWC Nodecert Application
This is a simple application that monitors both SSL Cert and SSL key directories for new files. When new file(s) is detected, the application will copy the new file(s) to a destination directory, rename them to the appropriate name(s), and overwrite the existing ones for the BWC Discord Bots and Applications.

## Requirements
- Node.js (https://nodejs.org/en/download/) (v16.9.0 or higher) 
- NPM (https://www.npmjs.com/get-npm) (should be installed with Node.js)
- PM2 (https://pm2.keymetrics.io/docs/usage/quick-start/) (Optional) - Used to run the application as a service.

## Installation
1. Download the latest release from the releases page.
2. Extract the zip file to a directory of your choice.
3. Open a terminal window and navigate to the directory where you extracted the zip file.
4. Run `npm install` to install the required dependencies.
5. Run `npm run start` to start the application.
6. The application will now be running in the terminal window. You can close the terminal window if you wish.
7. If you wish to run the application as a service, you can use PM2 to do so. Run `pm2 start ecosystem.config.json` to start the application as a service. You can then use `pm2 stop <name>/<id>` to stop the application, and `pm2 restart name>/<id>` to restart the application.
8. If you wish to run the application as a service on startup, you can use PM2 to do so. Run `pm2 startup` to generate the startup command for your system. Then run the command that was generated to enable PM2 to run on startup. Then run `pm2 save` to save the current PM2 configuration. You can then use `pm2 stop name>/<id>` to stop the application, and `pm2 restart name>/<id>` to restart the application.

## Configuration
The application can be configured by editing the `ecosystem.config.json` file. The following options are available:
- `name` - The name of the application. This is used by PM2 to identify the application.
- `script` - The path to the application's main file. This should not be changed.
- `NODE_ENV` - The environment that the application is running in. This can be set to `development` or `production`. This is used to change the logging output between file (production) and console (development). The default value is `production`. This should not be changed unless you are developing the application.
- `CERT_FOLDER` - The path to the directory where the SSL Cert files are located. Provide the full path to your SSL Cert directory.
- `KEY_FOLDER` - The path to the directory where the SSL Key files are located. Provide the full path to your SSL Key directory.
- `DESTINATION_FOLDER` - The path to the directory where the SSL Cert and SSL Key files will be copied to. Provide the full path to your destination directory.

## Logging
The application uses the `winston` logger to log messages to the console and to a log file. The log file is named `CertManager.log`.

## Contributing
1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes.
4. Create a pull request.
5. Enjoy!

## License
All rights reserved to Black Widow Company. This repository is for internal use only. No redistribution is allowed.  
[<img alt="Black Widow Company" height="50" src="https://the-bwc.com/PAO/BannerStandard.png"/>](https://www.the-bwc.com)


## Disclaimer
If you are not a member of Black Widow Company, you are not allowed to use, modify or distribute any of the files in this repository without the express permission of the S-1 Technical Officer or the S-1 Officer in Charge.

## Contact
If you have any questions, feel free to contact me on Discord: `[BWC] Patrick#4943`, or on the [BWC Discord server](https://discord.com/invite/the-bwc) or the [BWC forums](https://the-bwc.com/forum/index.php).

## Credits
- [Black Widow Company](https://www.the-bwc.com) - Development
- [Node.js](https://nodejs.org/en/) - Application Development
- [NPM](https://www.npmjs.com/) - Package Management
- [PM2](https://pm2.keymetrics.io/) - Process Management
- [Winston](https://github.com/winstonjs/winston) - Logging Library
- [Chokidar](https://github.com/paulmillr/chokidar) - File Watching Library
