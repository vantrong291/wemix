import React from 'react'
import {StyleSheet, Alert, StatusBar, ImageBackground, View, TextInput} from 'react-native'
import {Container, Header, Content, Form, Item, Input, Label, Button, Text, H2, Spinner} from 'native-base';
import firebase from 'react-native-firebase'

const launchscreenBg = require("../assets/launchscreen-bg.png");

export default class SignUp extends React.Component {
    state = {email: '', password: '', errorMessage: null, loading: false}

    handleSignUp = () => {
        this.setState({loading: true });
        const {email, password} = this.state
        if (email.trim() != "" && password.trim() != "") {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    this.setState({loading: false });
                    user => this.props.navigation.navigate('Main')
                })
                .catch((err) => {
                    this.setState({loading: false });
                    this.setState({errorMessage: err.message})
                })
        } else {
            Alert.alert(
                'Warning'/**/,
                'Bạn chưa nhập Email hoặc Mật khẩu. Vui lòng xem lại',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: true}
            );
            this.setState({loading: false });
        }
    };

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Button rounded info style={{marginLeft: 3, width: 92}}><Spinner color='#fff' style={{marginLeft: 30}} /></Button>
        }
        return <Button rounded info style={{marginLeft: 3}} onPress={this.handleSignUp}><Text>Đăng ký</Text></Button>;
    };

    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content"/>
                <ImageBackground source={launchscreenBg} style={customStyles.imageContainer}>
                    <Content style={customStyles.content}>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 20, alignSelf: "center"}}>
                            <H2 style={{color: "#fff"}}>Đăng ký</H2>
                        </View>
                        <Form>
                            <Item>
                                <Input
                                    style={{color: "#fff", paddingLeft: 10, paddingRight: 10}}
                                    placeholder="Email"
                                    placeholderTextColor="#f5f5f5"
                                    autoCapitalize="none"
                                    onChangeText={email => this.setState({email})}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item>
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
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20, alignSelf: "center"}}>
                                <Button rounded
                                        success
                                        style={{marginRight: 3}}
                                        onPress={() => this.props.navigation.navigate('Login')}
                                ><Text>Đăng nhập</Text></Button>
                                {this.renderButtonOrLoading()}
                                {/*<Button*/}
                                    {/*rounded info*/}
                                    {/*style={{marginLeft: 3}}*/}
                                    {/*onPress={this.handleSignUp}*/}
                                {/*><Text>Đăng ký</Text></Button>*/}
                            </View>
                        </Form>
                    </Content>
                </ImageBackground>
            </Container>
        )
    }
}

const customStyles = StyleSheet.create({
    content: {
        paddingTop: 180,
        paddingLeft: 10,
        paddingRight: 30,
    },
    imageContainer: {
        flex: 1,
        width: null,
        height: null
    },
});