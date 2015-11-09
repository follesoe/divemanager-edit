var app = require('app');
var Menu = require('menu');
var Tray = require('tray');

var appIcon = null;

app.on('ready', function(){
  var template = [
    { label: "Backup Database" },
    { label: "Open Database Folder" }
  ];

  var menu = Menu.buildFromTemplate(template);
  appIcon = new Tray('images/trayicon.png');
  appIcon.setToolTip('SuuntoDMEditor');
  appIcon.setContextMenu(menu);
});

//app.dock.setBadge('hello world!');
