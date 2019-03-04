import React, {Component} from 'react'
import {StyleSheet, Platform, Image, Text, View, AsyncStorage, Alert} from 'react-native'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import firebase from 'react-native-firebase';

import rootSaga from './src/redux/sagas'
import allReducers from './src/redux/reducers'
// import the different screens
import Loading from './src/screen/Loading'
// import SignUp from './src/screen/SignUp'
// import Login from './src/screen/Login'
import Main from './src/screens/home'
// create our app's navigation stack
import Setup from "./src/boot/setup";

const sagaMiddleware = createSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

// const RootSwitch = createSwitchNavigator (
//     {
//         Loading: Loading,
//         SignUp: SignUp,
//         Login: Login,
//         Main: Main
//     },
//     {
//         initialRouteName: 'Login'
//     }
// );
//
// const AppNavigation = createAppContainer(RootSwitch);


class App extends Component {
    async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners(); //add this line
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    showAlert(title, body) {
        Alert.alert(
          title, body,
          [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
    }


    render() {
        return <Setup/>
        // (
        //     <Provider store={store}>
        //         <AppNavigation/>
        //     </Provider>
        //     )
    }
}

export default App
