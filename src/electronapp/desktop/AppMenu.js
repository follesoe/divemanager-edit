var app = require('app');
var Menu = require('menu');
var MenuItem = require('menu-item');

app.on('ready', function() {
  var template = [{
    label: "Suunto Dive Manager",
    submenu: [
        { label: "Backup Database" },
        { label: "Open Database Folder" },
    ]}
  ];

  if (process.platform == 'darwin') {
    var name = require('app').getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name, role: 'about'
        },
        { type: 'separator' },
        { label: 'Services', role: 'services', submenu: [] },
        { type: 'separator' },
        { label: 'Hide ' + name, accelerator: 'Command+H', role: 'hide' },
        { label: 'Hide Others', accelerator: 'Command+Shift+H', role: 'hideothers' },
        { label: 'Show All', role: 'unhide' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); } },
      ]
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
