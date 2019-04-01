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
  Text, H2, H1, H3
} from "native-base";
import { View, ScrollView, AsyncStorage, PermissionsAndroid } from "react-native";
// import TrackPlayer from 'react-native-track-player';
import TrackPlayer from "../../components/trackPlayer";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import variables from "../../theme/variables/commonColor";
import { check, checkMultiple, ANDROID_PERMISSIONS, RESULTS, Permission } from "react-native-permissions";
import MusicFiles from "react-native-get-music-files";

import { connect } from "react-redux";
import { queryLocalSong } from "../../redux/actions";
import MiniPlayer from "../../components/miniPlayer";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: ""
    };
  };


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  _getSongs = async () => {
    // Alert.alert('seen')
    let songs = "";
    await MusicFiles.getAll({
        id: true,
        blured: true,
        artist: true,
        duration: true,
        genre: true,
        title: true,
        cover: true
      }).then(async (tracks) => {
        songs = JSON.stringify(tracks);

        // try {
        //   await AsyncStorage.setItem("localSongs", JSON.stringify(tracks));
        // } catch (error) {
        //   // Error saving data
        // }

        // this.props.dispatch(queryLocalSong(tracks));
      }).catch(error => {
        console.log(error);
      });

    try {
      await AsyncStorage.setItem("localSongs", songs);
    } catch (error) {
      // Error saving data
    }

  };

  // let localSongs = [];
  // await AsyncStorage.getItem("localSongs").then( tracks => {
  //     localSongs = JSON.parse(tracks);
  //   }).then(() => {
  //     if(!localSongs.isEmpty){
  //       localSongs.forEach((song, index) => {
  //         // console.log(song.duration);
  //         // TrackPlayer.add({
  //         //   id: song.id,
  //         //   url: song.path,
  //         //   title: song.title,
  //         //   artist: song.author,
  //         //   artwork: song.cover,
  //         //   album: song.album ? song.album : "Chưa xác định",
  //         //   genre: song.genre ? song.genre : "Chưa xác định",
  //         //    duration: song.duration,
  //         // });
  //       });
  //     }
  //   });


  async componentDidMount() {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    this._isMounted = true;
    // Permission.request('storage').then(response => {
    //   this.setState({ storagePermission: response })
    // });
    await check(ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this._isMounted && this.setState({ storagePermission: response });
      console.log(response);
      // if(response === "granted") {
      //   // this._getSongs();
      //   console.log("done");
      // }
    });
    await this._getSongs();
    // AsyncStorage.setItem('name', 'I like to save it.');
    // this.onPlay();
  }

  onPlay = () => {
    // TrackPlayer.play();

    // TrackPlayer.getCurrentTrack().then(value => {
    //   console.log(value)
    // });
    // TrackPlayer.getState().then(value => {
    //   console.log(value)
    // })0000
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header
          style={{ backgroundColor: "#fff" }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
          noShadow
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu-fold" style={{ color: variables.primaryColor, marginLeft: 0 }} size={24}/>
            </Button>
          </Left>
          <Body>
          {/*<H3 style={{fontWeight: "bold", color: variables.primaryColor, marginLeft: 0}}>Trang chủ</H3>*/}
          <Title style={{ color: variables.primaryColor, marginLeft: 0 }}>EnV-Music</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="profile" style={{ marginRight: 0 }} size={24}/>
            </Button>
          </Right>
        </Header>

        <Content padder style={{ paddingLeft: 10, paddingRight: 10 }}>
          <ScrollView>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allTracks: state.localTracks
  };
};
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;

