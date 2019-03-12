import React, { Component } from "react";
import { Image, View, ImageBackground, Alert } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
  Right,
  Badge, Thumbnail, H3
} from "native-base";
import {connect} from "react-redux";
import firebase from "react-native-firebase";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";
import { loginSuccess, logoutSuccess } from "../../redux/actions";

const drawerCover = require("../../assets/drawer-cover.png");
const drawerImage = require("../../assets/logo-kitchen-sink.png");
const datas = [
  {
    name: "Trang cá nhân",
    route: "Anatomy",
    icon: "user-circle",
    bg: "#C5F442"
  },
  {
    name: "Cài đặt",
    route: "Header",
    icon: "dharmachakra",
    bg: "#477EEA",
    types: "11"
  },

];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  renderUserContainer = () => {
    if(this.props.auth.isAuthenticated) {
      const user = this.props.auth.user._auth._user;
      const email = user.email ? user.email : "Bạn chưa cập nhật địa chỉ email";
      const username = user.displayName ? user.displayName : email;
      const photoUrl = user.photoURL ? user.photoURL : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png";
      return <View style={styles.drawerUserContainer}>
        <Thumbnail source={{uri: photoUrl}} />
        <H3 style={styles.username}>{username}</H3>
        <Text style={styles.small}>{email}</Text>
      </View>
    };
    return <View><Text>Empty</Text></View>
  };

  onSignout = () => {
    if(this.props.auth.isAuthenticated) {
      firebase.auth().signOut().then((res) => {
        this.props.dispatch(logoutSuccess());
        this.props.navigation.navigate("Login");
      }).catch(function(error) {
        // An error happened.
        Alert.alert(
          "Error",
          error.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: true }
        );
      });
    }
  };

  render() {
    // console.log(this.props.auth.user);
    const u = "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png";
    return (
      <Container>
          <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          {/*<Image source={drawerCover} style={styles.drawerCover} />*/}
          {/*<Image square style={styles.drawerImage} source={drawerImage} />*/}
          <ImageBackground source={drawerCover} style={styles.drawerCover}>
            {this.renderUserContainer()}
          </ImageBackground>
            <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
            <List style={{borderTopWidth: 0.5, borderTopColor: "#777777c9", marginTop: 15}}>
              <ListItem
                button
                noBorder
                onPress={this.onSignout}
              >
                <Left>
                  <Icon
                    active
                    name="sign-out-alt"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Đăng xuất
                  </Text>
                </Left>

              </ListItem>
            </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.user
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
