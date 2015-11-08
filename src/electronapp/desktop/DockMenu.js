var app = require('app');
var Menu = require('menu');

app.on('ready', function() {
  var template = [
    { label: 'New Window', click: function() { console.log('New Window'); } },
    { label: 'New Window with Settings', submenu: [
      { label: 'Basic' },
      { label: 'Pro'}
    ]},
    { label: 'New Command...'}
  ];

  var dockMenu = Menu.buildFromTemplate(template);
  app.dock.setMenu(dockMenu);
});
