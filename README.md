# filmaffin-ionic-app
Filmaffin Ionic App. Playing around with ionic framework to get data from an API and render results.

## Steps to run

```
npm install
```

* Run app in browser:
    ```
    ionic serve
    ```

* Run app in device:
    ```
    cordova platform add android
    ```

    *Important*

    For push notifications, you need to copy your `google-services.json` file ([from Firebase](https://firebase.google.com/docs/cloud-messaging)) to `platforms/android`.

    And finally you can compile and run the app in your device:
    ```
    ionic cordova run android --device 
    ```
