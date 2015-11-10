var backup = require('../services/dbbackup');

var template = [{
  label: "Suunto Dive Manager",
  submenu: [
      { label: "Backup Database", click: backup.runBackup },
      { label: "Open Database Folder", click: backup.openFolder },
  ]}
];

module.exports = template;
