import React from "react";
import { StyleSheet, Alert, StatusBar, ImageBackground, View, TextInput, Keyboard, ScrollView } from "react-native";
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, H2, Spinner } from "native-base";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/FontAwesome5";
import SocialLogin from "../../components/socialLogin";
import { connect } from "react-redux";


import { loginSuccess, signupSuccess } from "../../redux/actions";

const launchscreenBg = require("../../assets/bg.jpg");
const emotion = require("../../assets/splashicon.svg");

const RN = require("react-native");
const { Dimensions, Platform } = RN;
const deviceHeight = Dimensions.get("window").height;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.state = {
      loaded: false,
      email: "",
      password1: "",
      password2: "",
      errorMessage: null,
      loading: false,
      isVisible: true,
      finishFBSignin: false
    };
  }

  handleSignUp = () => {
    this.setState({ loading: true });
    const mstate = this.state;
    if (mstate.email.trim() !== "" && mstate.password1.trim() !== "" && mstate.password2.trim() !== "") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mstate.email, mstate.password1)
        .then((res) => {
          this.props.dispatch(signupSuccess(res.user));
          this.setState({ loading: false });
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
          this.setState({ loading: false });
          this.setState({ errorMessage: err.message });
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
      this.setState({ loading: false });
    }
  };

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener("keyboardDidShow", this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener("keyboardDidHide", this.keyboardWillHide);
    // firebase.auth().onAuthStateChanged(user => {
    //   this.props.navigation.navigate(user ? 'Drawer' : 'Login')
    // });
    this.goHomeAfterSignin();
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    });
  };

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    });
  };

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Button rounded block success style={styles.loginButton}><Spinner color='#fff'/></Button>;
    }
    return <Button rounded block success style={styles.loginButton} onPress={this.handleSignUp}><Text>Đăng
      ký</Text></Button>;
  }

  renderSocialButton() {
    const finishFBSignin = this.state.finishFBSignin;
    // console.log(finishFBSignin + "AFSNFIDASFN");
    if (this.state.isVisible) {
      return <View>
        <View style={{ flexDirection: "row", marginBottom: 10, paddingTop: 30, alignSelf: "center" }}>
          <Text>hoặc</Text>
        </View>
        <SocialLogin goHomeAfterSignin={this.goHomeAfterSignin}/>
      </View>;
    }
    return null;
  };

  goHomeAfterSignin = (done) => {
    return done ? this.props.navigation.navigate("Drawer") : console.log(this.state.finishFBSignin);
  };

  renderLoginLink() {
    if (this.state.isVisible) {
      return <View style={{ flexDirection: "row", marginBottom: 10, alignSelf: "center" }}>
        <Text style={{ color: "#fff", marginBottom: 5 }} onPress={() => this.props.navigation.navigate("Login")}>Đăng
          nhập </Text>
      </View>;
    }
    return null;
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#21B540" barStyle="light-content"/>
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <ScrollView contentContainerStyle={{
            flex: 1,
            justifyContent: "space-between",
            paddingTop: 20,
            paddingBottom: 20
          }}>
            <Content contentContainerStyle={styles.content}>
              {/*<View style={styles.logoContainer}>*/}
              {/*<ImageBackground source={emotion} style={styles.logo} />*/}
              {/*</View>*/}
              <View style={{ flexDirection: "row", marginBottom: 10, alignSelf: "center" }}>
                <H2 style={{ color: "#333" }}>Đăng ký</H2>
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
                    onChangeText={password1 => this.setState({ password1 })}
                    value={this.state.password1}
                  />
                </Item>
                <Item style={styles.loginInput}>
                  <Icon active name="lock" style={{ color: "#21B540", paddingBottom: 10 }} size={18}/>
                  <Input
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor="#949090"
                    autoCapitalize="none"
                    onChangeText={password2 => this.setState({ password2 })}
                    value={this.state.password2}
                  />
                </Item>
              </Form>
              <View style={styles.loginButtonView}>
                {this.renderButtonOrLoading()}
              </View>
              {this.renderSocialButton()}
            </Content>
          </ScrollView>
          {this.renderLoginLink()}
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
  }
});

const mapStateToProps = state => ({
  auth: state.user
});
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
