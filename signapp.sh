#!/bin/bash

# Name of your app.
APP="SuuntoDMEditor"
# The path of you app to sign.
APP_PATH="output/$APP-darwin-x64/$APP.app"
# The name of certificates you requested.
APP_KEY="Developer ID Application: Jonas Folleso (F9MU884WT4)"

# signing application
echo "Signing Application"
codesign --deep --force --verbose --sign "$APP_KEY" "$APP_PATH"

# verifying application
echo "Verifying Application Signature"
codesign --verify -vvvv "$APP_PATH"
spctl -a -vvvv "$APP_PATH"
