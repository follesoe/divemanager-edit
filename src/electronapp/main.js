var app = require('app');
var ipc = require('electron').ipcMain;
var autoUpdater  = require('auto-updater');
var Tray = require('tray');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

var getAppMenuTemplate = require('./desktop/AppMenu');
var menuTemplate = require('./desktop/MenuTemplate');

var appMenu, trayMenu, trayIcon, mainWindow = null;

ipc.on('dive-changed', function() {
  app.dock.setBadge('1');
  app.dock.bounce('informational');
});

ipc.on('dive-saved', function() {
  app.dock.setBadge('');
});

autoUpdater.on('update-downloaded', function(e, releaseNotes, releaseName) {
  var installItem = appMenu.items[0].submenu.items[3];
  installItem.label = `Install ${releaseName}`;
  installItem.enabled = true;
  installItem.visible = true;
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 720});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.toggleDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('error', error => {
    console.log(error);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(app.getName() + ' - ' + app.getVersion());
  });

  appMenu = Menu.buildFromTemplate(getAppMenuTemplate());
  Menu.setApplicationMenu(appMenu);

  dockMenu = Menu.buildFromTemplate(menuTemplate());
  app.dock.setMenu(dockMenu);

  /*
  TODO: Figure out why it crash when signed
  trayIcon = new Tray('images/trayicon.png');
  trayIcon.setToolTip('SuuntoDMEditor');
  trayIcon.setContextMenu(menuTemplate[0].submenu);
  */
});
