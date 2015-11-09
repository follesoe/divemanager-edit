var app = require('app');
var Menu = require('menu');

app.on('ready', function() {
  var template = [{
    label: "Suunto Dive Manager",
    submenu: [
        { label: "Backup Database" },
        { label: "Open Database Folder" },
    ]}
  ];

  var dockMenu = Menu.buildFromTemplate(template);
  app.dock.setMenu(dockMenu);
});
