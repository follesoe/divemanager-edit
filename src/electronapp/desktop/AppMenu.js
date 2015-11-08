var app = require('app');
var Menu = require('menu');
var MenuItem = require('menu-item');

app.on('ready', function() {
  var template = [{
      label: "SuuntoDMEditor",
      submenu: [
          { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Suunto Dive Manager",
      submenu: [
          { label: "Backup Database" },
          { label: "Open Database Folder" },
      ]}
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
