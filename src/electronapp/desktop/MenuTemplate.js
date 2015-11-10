var backup = require('../services/dbbackup');

function getTemplate() {
  var template = [{
    label: "Suunto Dive Manager",
    submenu: [
        { label: "Backup Database", click: backup.runBackup },
        { label: "Open Database Folder", click: backup.openFolder },
    ]}
  ];
  return template;
}

module.exports = getTemplate;
