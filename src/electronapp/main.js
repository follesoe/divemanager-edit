var app = require('app');
var Tray = require('tray');
var BrowserWindow = require('browser-window');

require('./desktop/AppMenu');
require('./desktop/DockMenu');

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

/*var appIcon = null;
app.on('ready', function(){
  appIcon = new Tray('images/depthicon.png');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
});
*/
//app.dock.setBadge('hello world!');
