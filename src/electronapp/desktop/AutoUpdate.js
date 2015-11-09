var os = require('os');
var app = require('app');
var autoUpdater = require('auto-updater');
var notifier = require('node-notifier');
var path = require('path');

if (process.platform == 'darwin') {
  var msg = {
    title: 'Auto Update',
    message: '',
    icon: path.join(__dirname, '../icons/main.iconset/icon_128x128.png')
  };

  autoUpdater.on('error', function(e, m) {
    msg.message = 'Error: ' + m;
    notifier.notify(msg);
    console.log('error', e, m);
  });

  autoUpdater.on('checking-for-update', function(e, m) {
    msg.message = 'Checking for update';
    notifier.notify(msg);
    console.log('checking-for-update', e, m);
  });

  autoUpdater.on('update-available', function(e, m) {
    msg.message = 'Downloading update';
    notifier.notify(msg);
    console.log('update-available', e, m);
  });

  autoUpdater.on('update-not-available', function(e, m) {
    msg.message = 'Update not available';
    notifier.notify(msg);
    console.log('update-not-available', e, m);
  });

  autoUpdater.on('update-downloaded', function(e, m) {
    msg.message = 'Update downloaded, installing';
    notifier.notify(msg);
    autoUpdater.quitAndInstall();
    console.log('update-downloaded', e, m);
  });

  var platform = os.platform() + '_' + os.arch();
  var version = app.getVersion();
  var feedUrl = 'https://suuntodmeditornuts.herokuapp.com/update/'+platform+'/'+version;
  try {
    autoUpdater.setFeedUrl(feedUrl);
    autoUpdater.checkForUpdates();
  }  catch(err) {
    console.log(err);
  }
}
