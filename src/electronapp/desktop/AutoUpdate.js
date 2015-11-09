var os = require('os');
var app = require('app');
var autoUpdater = require('auto-updater');

if (process.platform == 'darwin') {
  autoUpdater.on('error', function(e, m) {
    console.log('error', e, m);
  });

  autoUpdater.on('checking-for-update', function(e, m) {
    console.log('checking-for-update', e, m);
  });

  autoUpdater.on('update-available', function(e, m) {
    console.log('update-available', e, m);
  });

  autoUpdater.on('update-not-available', function(e, m) {
    console.log('update-not-available', e, m);
  });

  autoUpdater.on('update-downloaded', function(e, m) {
    console.log('update-downloaded', e, m);
  });

  var platform = os.platform() + '_' + os.arch();
  var version = app.getVersion();
  try {
    autoUpdater.setFeedUrl('https://suuntodmeditornuts.herokuapp.com//update/'+platform+'/'+version);
  }  catch(err) {
    console.log(err);
  }
}
