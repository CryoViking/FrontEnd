const { app, BrowserWindow, ipcMain, protocol, dialog, Menu, Notification } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const spawnSync = require('child_process').spawn;
const process = require('process');
let win;


// Force Single Instance Application
function createElectronShell() {
    runMake();
    win =  new BrowserWindow({width: 800, height: 600, titleBarStyle: "hidden", webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true
        }});
    win.loadURL(isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`);
    win.on('close', () => { appShell = null});
    if (isDev)
        win.webContents.openDevTools();
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', function()  {
    var appVersion = app.getVersion();

    let template = [{
        label: 'File',
        submenu: [
            {
                label: 'About Socialite',
                click: function () {
                    win.webContents.send('about-socialite', `version ${appVersion}`)
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Clear Store',
                click: function () {
                    win.webContents.send('clear-store')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Check for Updates...',
                click: function () {
                    autoUpdater.checkForUpdates();
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit()
                }
            }
        ]
    }, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    if (win == null) createElectronShell();
});

ipcMain.on('open-file', (event, args) => {
    dialog.showOpenDialog(win, {
        title: "Select a file..",
        properties: ['openFile'],
        defaultPath: '/Users/<username>/Documents/',
        buttonLable: "Select..",
        filters: [
            {name: 'files', extensions: ['jpg', 'png', 'mov', 'mp4', 'jpeg']}
        ]
    }, function(files) {
        if (files)
            event.returnValue = files
        else
            event.returnValue = ''
    })
});

function runMake() {
    var args = ['make']
    // subscribe = spawn(path.join(basepath, 'resources', getPlatform(), 'socialite'), progargs);
    
    // var cd = spawnSync('cd', [path.join(process.resourcesPath, 'delay_generator1')]);
    // var make1 = spawnSync('make', ['-C', path.join(process.resourcesPath, 'delay_generator1')]);
    var make1 = spawnSync('make', ['-C', path.join(app.getAppPath(), 'resources', 'delay_generator')]);

    make1.stdout.on( 'data', data => {
        console.log( `stdout: ${data}` );
        console.log(String(data));
    });
    
    make1.stderr.on( 'data', data => {
        console.log( `stdout: ${data}` );
        console.log(String(data));
    });
}

ipcMain.on('generate-delay', function (event, args) {
    var delay = spawnSync(`${app.getAppPath()}` + '/resources/delay_generator/build/delay_generator', ['-o', `${args}/delay.csv`, '-r'], { stdio: 'pipe' });
    delay.stdout.on( 'data', data => {
        console.log( `stdout: ${data}` );
        console.log(String(data));
        win.webContents.send('snackbar-message', String(data));
    });

    delay.stderr.on( 'data', data => {
        console.log( `stdout: ${data}` );
        console.log(String(data));
        win.webContents.send('snackbar-message', String(data));
    });
})

ipcMain.on('generate-subfile', function (event, args) {
    /**
     * var args = {
                    subfileDir: files.filePaths[0],
                    delayFile: this.state.delayFile,
                    waveForm: this.state.waveType,

                    noiseMagnitude: this.noiseMagnitudeRef.current.value,
                    snr: this.snrRef.current.value,
                    frequency: this.frequencyRef.current.value,
                    baseline: this.baselineRef.current.value,
                    phase: this.phaseRef.current.value,
                    numberOfTiles: this.numberOfTilesRef.current.value
                }
     */
    var parameters =  ['--header_file', `${app.getAppPath()}` + '/resources/header.txt', '--subfile_output_dir', `${args.subfileDir}`, '--delay_file', `${args.delayFile}`, '--wave_type', `${args.waveForm}`, '--number_of_tiles', `${args.numberOfTiles}`]

    var snr =  args.snr !== null ? args.snr : 1 ;

    parameters.push('--snr', snr);


    switch (args.waveForm) {
        case "sinusoidal":
            parameters.push('--phase', args.phase, '--frequency', args.frequency, '--baseline', args.baseline)
            break;
        case "impulse":
            parameters.push('--baseline', args.baseline, '--duration', args.duration);
            break;
        case "gaussian":
            break;
        default:
            break;
    }
    var main = spawnSync(`${app.getAppPath()}` + '/resources/main', parameters, { stdio: 'pipe' });
    main.stdout.on( 'data', data => {
        console.log( `stdout: ${data}` );
        console.log(String(data));
        win.webContents.send('snackbar-message', String(data));
    });

    main.stderr.on( 'data', data => {
        console.log( `stdout: ${data}` );
        console.log(String(data));
        win.webContents.send('snackbar-message', String(data));
    });
})