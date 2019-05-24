# React Native Music app player: WEMIX
## Các chức năng chính
* Đăng nhập, đăng ký

* Phát nhạc

* Tìm kiếm bài hát Online

* Quản lý tài khoản

* Download bài hát

* Gửi thông báo

## Hình ảnh 
![Alt][1]
![Alt][18]
![Alt][19]
![Alt][2]
![Alt][3]
![Alt][4]
![Alt][5]
![Alt][6]
![Alt][7]
![Alt][8]
![Alt][9]
![Alt][10]
![Alt][11]
![Alt][12]
![Alt][13]
![Alt][14]
![Alt][15]
![Alt][16]
![Alt][17]




[1]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-47-24.jpg "Splash Screen"
[2]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-47-31.jpg "Home Screen"
[3]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-47-43.jpg "Ranking Screen"
[4]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-47-48.jpg "Search Screen"
[5]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-47-51.jpg "Local Songs Screen"
[6]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-47-54.jpg "Personal Screen"
[7]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-48-02.jpg "A Album Screen"
[8]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-48-21.jpg "An Another Album Screen"
[9]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-48-32.jpg "A Singer Screen"
[10]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-48-49.jpg "VN Ranking Screen"
[11]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-49-11.jpg "Search Results Screen"
[12]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-49-24.jpg "Player Screen"
[13]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-49-34.jpg "AddToPlaylist Screen"
[14]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-49-45.jpg "Personal Information Screen"
[15]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-49-52.jpg "Personal Playlist Screen"
[16]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-49-55.jpg "A Playlist Detail Screen"
[17]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-50-12.jpg "Send Notification Screen (Only Admin)"
[18]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-50-21.jpg "Login Screen"
[19]: https://raw.githubusercontent.com/vantrong291/wemix/master/screenshots/Screenshot_2019-05-24-11-50-24.jpg "Signup Screen"

----------------
```
adb reverse tcp:8097 tcp:8097
react-native log-android
adb kill-server
adb devices
npm start -- reset-cached


rm -rf /tmp/haste-map-react-native-packager-*
rm -rf /tmp/metro-bundler-cache-*
rm -rf node_modules/
npm i

sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p

keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

```
