import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import {View, Alert} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import variables from "../../theme/variables/commonColor"
import MusicFiles from "react-native-get-music-files"
import {check, checkMultiple, ANDROID_PERMISSIONS, RESULTS} from "react-native-permissions"
// const Permissions = require('react-native-permissions').default;

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: ""
    }
  }

  componentDidMount() {
    check(ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE).then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // console.log(response);
      this.setState({ photoPermission: response })
    })
  }

  _getSongs =() =>{
    // Alert.alert('seen')
    MusicFiles.getAll({
    }).then(tracks => {
      console.log(tracks)
    }).catch(error => {
      console.log(error);
    })
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header
          style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
          span
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu-fold" style={{ color: "#FFF", marginLeft: 5 }} size={24}/>
            </Button>
          </Left>
          <Body style={{alignItems:"center", justifyContent: "center"}}>
          <Title style={{width: 300, color: "#FFF", marginLeft: 60 }}>My play list</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>
            </Button>
          </Right>

        </Header>

        <Content padder>
          <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <Text onPress={this._getSongs}>get songs</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Playlist;
