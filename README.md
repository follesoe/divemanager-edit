# Suunto DM4 Editor
This application enables you to edit data in the Suunto DM4 database.

The original usecase for this application is the ability to change a dive mode from Gauge to Free. This is useful if you use your D6 or D9 as a freediving instrument, and want to synchronize it with Movescount. The default behaviour is that all your free dives will be logged as scuba diving moves, with mode set to Gauge.

By changing the mode of your free dives from Gauge to Free you will get correct activity type on Movescount.com and in DM4. This will give you better statistis about your diving, as your free dives will not be mixed with your scuba dives.

## Building sqlite3 from source
The default sqlite3 npm module does not work with node-webkit, so you need to build it from source. Se [https://github.com/mapbox/node-sqlite3#building-for-node-webkit](https://github.com/mapbox/node-sqlite3#building-for-node-webkit) for more information.

```
npm install sqlite3 --build-from-source --runtime=node-webkit --target_arch=x64 --target=0.10.5
```
