var os = require('os');
var app = require('app');
var autoUpdater = require('auto-updater');
var notifier = require('node-notifier');
var path = require('path');

var feedUrl = '';

if (process.platform == 'darwin') {
  var msg = {
    title: '',
    message: '',
    sender: 'com.electron.suuntodmeditor'
  };

  autoUpdater.on('error', function(e, m) {
    msg.title = 'Auto Update Error';
    msg.message = 'Error: ' + m;
    notifier.notify(msg);
    console.log('error', e, m);
  });

  autoUpdater.on('checking-for-update', function(e) {
    msg.title = 'Auto Updater';
    msg.message = 'Checking for update.';
    notifier.notify(msg);
    console.log('checking-for-update');
  });

  autoUpdater.on('update-available', function(e) {
    msg.title = 'Auto Updater';
    msg.message = 'Downloading update.';
    notifier.notify(msg);
    console.log('update-available');
  });

  autoUpdater.on('update-not-available', function(e) {
    msg.title = 'No update available';
    msg.message = 'Version ' + app.getVersion() + ' is the latest version.';
    notifier.notify(msg);
    console.log('update-not-available');
  });

  autoUpdater.on('update-downloaded', function(e, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    console.log('update-downloaded');
    msg.title = releaseName + " downloaded.";
    msg.message = releaseNotes;
    notifier.notify(msg);
  });

  var platform = os.platform() + '_' + os.arch();
  var version = app.getVersion();

  var feedHost = process.resourcesPath.endsWith('electron-prebuilt/dist/Electron.app/Contents/Resources') ?
    'http://localhost:3000' : 'https://suuntodmeditornuts.herokuapp.com';
  //feedUrl = feedHost + '/update/'+platform+'/'+version;
  feedUrl = 'http://localhost:3000/update/'+platform+'/'+version;
}

function checkForUpdates() {
  try {
    autoUpdater.setFeedURL(feedUrl);
    autoUpdater.checkForUpdates();
  } catch(err) {
    console.log(err);
  }
}

function quitAndInstall() {
  autoUpdater.quitAndInstall();
}

module.exports = {
  checkForUpdates: checkForUpdates,
  quitAndInstall: quitAndInstall
};
