import React from "react";
import { StyleSheet, Alert, StatusBar, ImageBackground, View, TextInput, ScrollView, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  H2,
  Spinner,
  Icon as NBIcon
} from "native-base";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Keyboard } from "react-native";
import SocialLogin from "../../components/socialLogin";
import { connect } from "react-redux";
import { loginSuccess, syncAuthStatus } from "../../redux/actions";

const launchscreenBg = require("../../assets/bg.jpg");
const emotion = require("../../assets/undraw_walk_in_the_city_1ma6.png");

const RN = require("react-native");
const { Dimensions, Platform } = RN;
const deviceHeight = Dimensions.get("window").height;


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.state = {
      loaded: false,
      email: "123@gmail.com",
      password: "123456",
      errorMessage: null,
      loading: false,
      isVisible: true
    };
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  handleLogin = () => {
    // console.log("Press");
    // let userInfo = {
    //     email: this.state.email,
    //     password: this.state.password
    // };
    // if (userInfo.email.trim() != "" && userInfo.password.trim() != "") {
    //     this.props.dispatch({type: ActionTypes.LOGIN, userInfo})
    // } else {
    //     Alert.alert(
    //         'Warning',
    //         'Bạn chưa nhập Email hoặc Mật khẩu. Vui lòng xem lại',
    //         [
    //             {text: 'OK', onPress: () => console.log('OK Pressed')},
    //         ],
    //         {cancelable: true}
    //     )
    // }
    this._isMounted && this.setState({ loading: true });
    if (this.state.email.trim() !== "" && this.state.password.trim() !== "") {
      firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( async (res) => {
          // console.log(res);
          this.props.dispatch(loginSuccess(res.user));
          this._isMounted && this.setState({ loading: false });
          this.props.navigation.navigate("Drawer");
        })
        .catch((err) => {
          Alert.alert(
            "Error",
            err.message,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true }
          );
          this._isMounted && this.setState({ loading: false });
          console.log(err.message);
        });
    } else {
      Alert.alert(
        "Warning",
        "Bạn chưa nhập Email hoặc Mật khẩu. Vui lòng xem lại",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
      this._isMounted && this.setState({ loading: false });
    }
  };

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener("keyboardDidShow", this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener("keyboardDidHide", this.keyboardWillHide);
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      this.props.dispatch(syncAuthStatus(user));
      this.props.navigation.navigate(user ? "Drawer" : "Login");
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    this._isMounted && this.setState({
      isVisible: false
    });
  };

  keyboardWillHide = event => {
    this._isMounted && this.setState({
      isVisible: true
    });
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log("login componentWillReceiveProps", JSON.stringify(nextProps.user));
  //   if (nextProps.user.userInfo) {
  //     this.props.navigation.navigate("Drawer");
  //   }
  // };

  goHomeAfterSignin = (done) => {
    return done ? this.props.navigation.navigate("Drawer") : console.log(this.state.finishFBSignin);
  };

  renderButtonOrLoading() {
    return (this.state.loading) ?
      <Button rounded block success style={styles.loginButton}><Spinner color='#fff'/></Button> :
      <Button rounded block success style={styles.loginButton} onPress={this.handleLogin}><Text>Đăng
        nhập</Text></Button>;
  }

  renderSocialButton() {
    return (this.state.isVisible) ?
      <View>
        <View style={{ flexDirection: "row", marginBottom: 10, paddingTop: 30, alignSelf: "center" }}>
          <Text>hoặc</Text>
        </View>
        <SocialLogin goHomeAfterSignin={this.goHomeAfterSignin}/>
      </View>
      : null;
  };

  renderSignupLink() {
    return (this.state.isVisible) ?
      <View style={{ flexDirection: "row", marginBottom: 10, alignSelf: "center", bottom: 0 }}>
        <Text style={{ color: "#fff", marginBottom: 5 }} onPress={() => this.props.navigation.navigate("Signup")}>Chưa
          có tài khoản? Đăng ký ngay </Text>
      </View>
      : null;
  }

  render() {
    // console.log(this.state.isVisible);
    return (
      <Container>
        <StatusBar backgroundColor="#21B540" barStyle="light-content"/>

        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <ScrollView contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: 20,
            paddingBottom: 20
          }}>
            {/*<Image source={}></Image>*/}
            <Content contentContainerStyle={styles.content}>
              <View style={styles.logoContainer}>
                <Image source={emotion} style={styles.logo} />
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10, alignSelf: "center" }}>
                <H2 style={{ color: "#333" }}>Đăng nhập</H2>
              </View>
              <Form style={styles.form}>
                <Item style={styles.loginInput}>
                  <Icon active name="user-circle" style={{ color: "#21B540", paddingBottom: 10 }} size={18}/>
                  <Input
                    style={styles.inputText}
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="#949090"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                  />
                </Item>
                <Item style={styles.loginInput}>
                  <Icon active name="lock" style={{ color: "#21B540", paddingBottom: 10 }} size={18}/>
                  <Input
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Mật khẩu"
                    placeholderTextColor="#949090"
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    // value="123456"
                  />
                </Item>
              </Form>
              <View style={styles.loginButtonView}>
                {this.renderButtonOrLoading()}
              </View>
              {this.renderSocialButton()}
            </Content>
          </ScrollView>
          {this.renderSignupLink()}
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  loginInput: {
    elevation: 3,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 100,
    marginLeft: 0
  },
  inputText: { color: "#333", paddingLeft: 10, paddingRight: 10, fontSize: 16 },
  form: {
    width: "85%"
  },
  socialButton: {
    flexDirection: "row",
    // width: "85%",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center"
  },
  loginButtonView: {
    marginTop: 15,
    alignSelf: "center",
    justifyContent: "center"
  },
  loginButton: {
    width: "85%"
  },
  logoContainer: {
    marginBottom: 20,
    height: 120,
    width: 200
  },
  logo: {
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = state => ({
  auth: state.user
});
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default connect(mapStateToProps, mapDispatchToProps)(Login);
