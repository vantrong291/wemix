import React from 'react'
import {StyleSheet, Alert, StatusBar, ImageBackground, View, TextInput} from 'react-native'
import {Container, Header, Content, Form, Item, Input, Label, Button, Text, H2, Spinner} from 'native-base';
import firebase from 'react-native-firebase'
// import Button from 'react-native-button'
// import {connect} from 'react-redux'

// import * as ActionTypes from '../../redux/actionTypes'
// import styles from "../screens/home/styles";

// const launchscreenBg = require("../../assets/launchscreen-bg.png");
const launchscreenBg = require("../../assets/bg.jpg");

class Login extends React.Component {
    state = {loaded: false, email: '', password: '', errorMessage: null, loading: false}

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
        this.setState({loading: true });
        if (this.state.email.trim() != "" && this.state.password.trim() != "") {
            firebase.auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res);
                    this.setState({loading: false });
                    this.props.navigation.navigate('Drawer')
                })
                .catch((err) => {
                    Alert.alert(
                      'Error',
                      err.message,
                      [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      {cancelable: true}
                    );
                    this.setState({loading: false });
                    console.log(err.message);
                })
        } else {
            Alert.alert(
                'Warning',
                'Bạn chưa nhập Email hoặc Mật khẩu. Vui lòng xem lại',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: true}
            );
            this.setState({loading: false });
        }
    };

    componentWillReceiveProps(nextProps) {
        console.log('login componentWillReceiveProps', JSON.stringify(nextProps.user))
        if (nextProps.user.userInfo) {
            this.props.navigation.navigate('Drawer')
        }
    };

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Button rounded success style={{marginRight: 3, width: 110}}><Spinner color='#fff' style={{marginLeft: 40}} /></Button>
        }
        return <Button rounded success style={{marginRight: 3}} onPress={this.handleLogin}><Text>Đăng nhập</Text></Button>;
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#21B540" barStyle="light-content" />
                <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
                    <Content contentContainerStyle={styles.content}>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 20, alignSelf: "center"}}>
                            <H2 style={{color: "#fff"}}>Đăng nhập</H2>
                        </View>
                        <Form style={styles.form}>
                            <Item rounded style={styles.loginInput}>
                                {/*<Label>Email</Label>*/}
                                <Input
                                    style={{color: "#f5f5f5", paddingLeft: 10, paddingRight: 10}}
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    placeholderTextColor="#fff"
                                    onChangeText={email => this.setState({email})}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item rounded style={styles.loginInput}>
                                {/*<Label>Password</Label>*/}
                                <Input
                                    style={{color: "#fff", paddingLeft: 10, paddingRight: 10}}
                                    secureTextEntry
                                    placeholder="Mật khẩu"
                                    placeholderTextColor="#f5f5f5"
                                    autoCapitalize="none"
                                    onChangeText={password => this.setState({password})}
                                    value={this.state.password}
                                />
                            </Item>
                        </Form>
                    </Content>

                        <View  style={styles.buttonRow}>
                            {/*<Button rounded success style={{marginRight: 3}} onPress={this.handleLogin}><Text>Đăng nhập</Text></Button>*/}
                            <View>
                                {this.renderButtonOrLoading()}
                            </View>
                            <View>
                                <Button
                                  rounded
                                  info
                                  style={{marginLeft: 3}}
                                  onPress={() => this.props.navigation.navigate('Signup')}
                                ><Text>Đăng ký</Text></Button>
                            </View>
                        </View>

                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        // bottom: 200,
        // paddingTop: 180,
        // paddingLeft: 10,
        // paddingRight: 30,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 1,
        width: null,
        height: null
    },
    loginInput: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
        height: 50
    },
    form: {
        width: "90%"
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: "center",
        justifyContent: "center"
    }
});

// const mapStateToProps = state => ({
//     user: state.user
// })
//
// const mapDispatchToProps = dispatch => ({
//     dispatch: dispatch
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login;
