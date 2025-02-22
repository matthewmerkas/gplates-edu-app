# GPlates Education Ionic App

## Run the app in the simulators

**Important: You need to export the correct JAVA_HOME and ANDROID_SDK_ROOT in set-env.sh**

The following steps worked on my Macbook Pro.

- `git clone https://github.com/michaelchin/gplates-edu-app.git test`
- `cd test`
- `conda deactivate`
- `nvm use 16`
- `npm install`
- `source ./set-env.sh`
- `ionic capacitor run android`
- `ionic capacitor run ios`

## Serve as a web page

- `craco start`

## Deploy on Android device

- If resources have not been generated yet:
- `cordova-res android --icon-background-source '#FFFFFF' --copy`
- Update static files:
- `craco build`
- Copy to android folder:
- `npx cap copy android`
- Open in Android Studio:
- `npx cap open android`
- Choose your device and click the "run" button in Android Studio

## Deploy on ios device

- If resources have not been generated yet:
- `cordova-res ios --copy`
- Update static files:
- `craco build`
- Add an account with your Apple ID and choose the team under "signing&capabilities" in XCode
- `npx cap run ios -l --external`
- On your ios device, go to "Settings > General > Device Management" to trust the developer

## Some random notes

* nvm use 16
* source ./set-env.sh
* ionic capacitor add android
* ionic capacitor run android
* ionic capacitor run ios
* npx cap open android
* npx cap serve
* npx cap open ios

#### use chrome inspect to debug android chrome://inspect/#devices

`convert output.png -resize 1000x1000 -background Black -gravity center -extent 2000x2000 out.png`

Use xcode to change icon and splash image.

## Framework candidates

#### Cordova

https://cordova.apache.org

* WebView-based
* time-saving, easier to maintain and cost-effective

#### Ionic

https://ionicframework.com

* based on Cordova and support moden frameworks, such as React, Angular, Vue.

#### React Native

https://reactnative.dev

* not web-based
* learning curve???
* work with cesiumjs??? https://github.com/CesiumGS/cesium/issues/7629#issuecomment-531862873


## 3D globe candidates

#### Cesiumjs

https://cesium.com/platform/cesiumjs/

* We already have experience with it. Easy to find support.

#### globe.gl

https://globe.gl

* small, unfamiliar, hard to find help


#### Use the following command to extent/resize image

resize the output.png to 1000x1000 and put the resized image at the center of a 2000x2000 canvas.

`convert output.png -resize 1000x1000 -background Black -gravity center -extent 2000x2000 out.png`
