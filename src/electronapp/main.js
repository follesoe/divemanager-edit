var app = require('app');
var Tray = require('tray');
var BrowserWindow = require('browser-window');

require('./desktop/AppMenu');
require('./desktop/DockMenu');
require('./desktop/TrayMenu');
require('./desktop/AutoUpdate');

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 720});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.on('error', function(error) {
    console.log(error);
  });
});
