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
    ionic cordova platform add android
    ```

    *Important*

    For push notifications, you need to copy your `google-services.json` file ([from Firebase](https://firebase.google.com/docs/cloud-messaging)) to `platforms/android`.

    And finally you can compile and run the app in your device:
    ```
    ionic cordova run android --device 
    ```

### Notifications icon note

In case there is a weird behaviour with the notifications app (not being the one it should be), make sure to replace `ic_launcher` strings by `fcm_push_icon` in `platforms/android/android.json`.

Also, copy `resources/notifications_icons` to `platforms/android/app/src/main/res`.
