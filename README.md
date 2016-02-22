# Suunto Dive Manager Editor
Suunto Dive Manager Editor is an application that enables you to edit data stored in the Suunto Dive Manager Database.

The application is implemented using web technologies and hosted in [Electron](http://electron.atom.io/). The application is intended both as a practical application for users of Suunto Dive Manager, as well as a demo on how to build desktop applications using web technologies and Electron.

![alt tag](http://static.follesoe.no/SuuntoDMEditorScreenshot.png)

## Original usecase
The original usecase for this application is the ability to change a dive mode from Gauge to Free. This is useful if you use your D6 or D9 as a freediving instrument, and want to synchronize it with Movescount. The default behaviour is that all your free dives will be logged as scuba diving moves, with mode set to Gauge.

By changing the mode of your free dives from Gauge to Free you will get correct activity type on Movescount.com and in DM4. This will give you better statistis about your diving, as your free dives will not be mixed with your scuba dives.

## NDC London Presentation
I gave a presentation about building desktop applications using web technologies at NDC London 11-15. January 2016. The presentation was recorded, and is [available on Vimeo](https://vimeo.com/155663940).

![alt tag](http://static.follesoe.no/NDCLondonVimeo.png)
