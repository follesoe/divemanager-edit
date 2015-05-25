# Assumes you have a copy of nw.js app bundle called SuuntoDMEditor.app in root of repo
iconutil -c icns main.iconset
cp main.icns SuuntoDMEditor.app/Contents/Resources

cd src && zip -r ../SuuntoDMEditor.nw *
cd ..
cp SuuntoDMEditor.nw SuuntoDMEditor.app/Contents/Resources/app.nw
