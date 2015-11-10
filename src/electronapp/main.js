var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

var getAppMenuTemplate = require('./desktop/AppMenu');
var menuTemplate = require('./desktop/MenuTemplate');
var startUpdater = require('./desktop/AutoUpdate');

var mainWindow = null;
var trayIcon = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 720});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('error', error => {
    console.log(error);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(app.getName() + ' - ' + app.getVersion());
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(getAppMenuTemplate()));
  app.dock.setMenu(Menu.buildFromTemplate(menuTemplate));

  trayIcon = new Tray('images/trayicon.png');
  trayIcon.setToolTip('SuuntoDMEditor');
  trayIcon.setContextMenu(menuTemplate[0].submenu);

  startUpdater();
});
