var app = require('app');
var Menu = require('menu');
var MenuItem = require('menu-item');
var backup = require('../services/dbbackup');
var autoUpdate = require('./AutoUpdate');

function getMenuTemplate() {
  var template = [{
    label: 'Suunto Dive Manager',
    submenu: [
      { label: 'Backup Database', click: backup.runBack },
      { label: 'Open Database Folder', click: backup.openFolder },
    ]}
  ];

  if (process.platform == 'darwin') {
    var name = require('app').getName();
    template.unshift({
      label: name,
      submenu: [
        { label: 'About ' + name, role: 'about' },
        { label: 'Version ' + app.getVersion(), enabled: false },
        { label: 'Check for Update', click: autoUpdate.checkForUpdates },
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

  return template;
};

module.exports = getMenuTemplate;
