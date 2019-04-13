#!/bin/sh
sudo sysctl fs.inotify.max_user_watches=524288 && sudo sysctl -p && rm -rf /tmp/haste-map-react-native-packager-* && rm -rf /tmp/metro-bundler-cache-* && rm -rf node_modules/ && npm i && npm start -- --reset-cache

