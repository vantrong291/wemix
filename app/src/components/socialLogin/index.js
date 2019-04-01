import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, Text, Toast } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./style";
import firebase from "react-native-firebase";
import {GoogleSignin} from "react-native-google-signin";
import {connect} from "react-redux";
import {fbLoginSuccess, ggLoginSuccess} from '../../redux/actions'

const FBSDK = require("react-native-fbsdk");
const {
  LoginManager,
  AccessToken
} = FBSDK;

class SocialLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GoogleSignin.configure({
      clientID : "138796014905-h5l8dp1nbiog26muisgkkk88uu0ghs56.apps.googleusercontent.com"
    })
  }

  onFacebookLogin = () => {
    let self = this;
    // return (dispatch) => {
    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(
        (result) => {
          if (result.isCancelled) {
            Alert.alert("Whoops!", "You cancelled the sign in.");
          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                firebase.auth().signInWithCredential(credential)
                  .then((res) => {
                    const user = firebase.auth().currentUser;
                    this.props.dispatch(fbLoginSuccess(user))
                    Toast.show({
                      text: "Xin chào " + user.email,
                      textStyle: { color: "yellow" },
                      buttonText: "Okay",
                      duration: 3000
                    });
                    this.props.goHomeAfterSignin(true);
                  })
                  .catch((err) => {
                    Alert.alert(
                      "Error",
                      JSON.stringify(err.message),
                      [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                      ],
                      { cancelable: true }
                    );
                  });
              });
          }
        },
        (error) => {
          console.log("Login fail with error: " + error);
          Alert.alert(
            "Error",
            error,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true }
          );}
      );
    // };
  };

  onGoogleLogin = () => {
    GoogleSignin.signIn().then((data) => {
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      return firebase.auth().signInWithCredential(credential);
    }).then((currentUser) => {
      console.log(`Google user:  ${JSON.stringify(currentUser)}`);
      const user = firebase.auth().currentUser;
      this.props.dispatch(ggLoginSuccess(user));
      Toast.show({
        text: "Xin chào " + currentUser.additionalUserInfo.profile.name,
        textStyle: { color: "yellow" },
        buttonText: "Okay",
        duration: 3000
      });
      this.props.goHomeAfterSignin(true);
    }).catch((err) => {
      console.log(`Login fail with error ${err}`);
    })
  };

  render() {
    return (
      <View style={styles.socialButton}>
        <View style={{ width: "40%" }}>
          <Button
            rounded
            info
            iconLeft
            style={{ width: "98%", backgroundColor: "#4267b2", marginRight: 5 }}
            onPress={this.onFacebookLogin}
          ><Icon active name='facebook-f' size={20} style={{ color: "#fff", marginLeft: 20 }}/><Text>Facebook</Text>
          </Button>
        </View>
        <View style={{ width: "40%" }}>
          <Button
            rounded
            info
            style={{ width: "98%", backgroundColor: "#dc4e42", marginLeft: 5 }}
            onPress={this.onGoogleLogin}
          ><Icon active name='google' size={20} style={{ color: "#fff", marginLeft: 20 }}/><Text>Google</Text>
          </Button>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.user
});
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);

