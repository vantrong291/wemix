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
import {View, Alert, ScrollView} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import variables from "../../theme/variables/commonColor"
import MusicFiles from "react-native-get-music-files"
import {check, checkMultiple, ANDROID_PERMISSIONS, RESULTS} from "react-native-permissions"
// const Permissions = require('react-native-permissions').default;
import TrackPlayer from "../../components/trackPlayer";
import MiniPlayer from "../../components/miniPlayer";

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: "",
      active: false,
    }
  }


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    // check(ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE).then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // console.log(response);
      // this.setState({ photoPermission: response })
    // })
  }

  _getSongs =() =>{
    TrackPlayer.skipToNext()
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header
          // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu-fold" style={{ color: "#FFF", marginLeft: 5 }} size={24}/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: "#FFF"}}>Trang cá nhân</Title>
          </Body>
          <Right>
            <Button transparent>
              {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*/}
            </Button>
          </Right>
        </Header>
        <Content padder>
          <ScrollView>
            {/*<Text onPress={this._getSongs}>get songs</Text>*/}
          </ScrollView>
        </Content>
        {/*<MiniPlayer/>*/}
      </Container>
    );
  }
}

export default Personal;
