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
  Text, ListItem, Thumbnail, H1, H2, H3, List
} from "native-base";
import {View, Alert, AsyncStorage, ScrollView, TouchableOpacity} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/SimpleLineIcons"
import variables from "../../theme/variables/commonColor"
import {
  RkButton, RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten'

import MusicFiles from "react-native-get-music-files"
import {check, checkMultiple, ANDROID_PERMISSIONS, RESULTS} from "react-native-permissions"
// const Permissions = require('react-native-permissions').default;
import TrackPlayer from "../../components/trackPlayer";
import MiniPlayer from "../../components/miniPlayer";
import { queryLocalSong } from "../../redux/actions";


const defaltCover = require('../../assets/defaultCover.jpeg');

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: "",
      loading: true,
      localSongs: null
    }
  }


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    // check(ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE).then(response => {
    //   // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //   // console.log(response);
    //   this.setState({ storagePermission: response })
    // });
    AsyncStorage.getItem("localSongs").then(tracks => {
      this._isMounted &&  this.setState({ localSongs: JSON.parse(tracks)});
    }).then(() => {
      // console.log(this.state.localSongs);
    });
  };

  renderLocalList = (lists) => {
    if(lists != null) {
      console.log("LENGTH" + lists.length);
      if(lists && lists.length != 0 && lists[0]) {
        const listContent = lists.map((item) => (
          <ListItem style={{marginLeft: 13 }} thumbnail key={item.id}>
            <Left>
              <Thumbnail square source={(item.cover) ? {uri: item.cover} : defaltCover}/>
            </Left>
            <Body>
            <Text numberOfLines={1}>
              {item.title}
            </Text>
            <Text numberOfLines={1} note>
              {item.author}
            </Text>
            </Body>
            <Right style={{flexDirection: "row", alignItems: "center"}}>
              <Icon name="control-play" size={20} style={{marginRight: 15 }}/>
              <Icon name="plus" size={20}/>
              {/*<Button transparent>*/}
                {/*<Icon name="play" size={16}/>*/}
              {/*</Button>*/}
            </Right>
          </ListItem>
        ));
        return listContent;
      }
      return null;
    }
    return null;
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header
          // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
          // span
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" style={{ color: "#FFF", marginLeft: 5 }} size={24}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#FFF"}}>Nhạc của tôi</Title>
          </Body>
          <Right>
            <Button transparent>
              {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*/}
            </Button>
          </Right>


        </Header>

        <Content padder>
          <ScrollView>
            <H3 style={{margin:13, fontWeight: "bold"}}>Nhạc Offline</H3>
            <List>
              { this._isMounted && this.renderLocalList(this.state.localSongs)}
            </List>
          </ScrollView>
        </Content>
        {/*<MiniPlayer/>*/}
      </Container>
    );
  }
}

export default Playlist;
