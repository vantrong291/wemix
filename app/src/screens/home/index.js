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
import {View, ScrollView, AsyncStorage} from "react-native";
// import TrackPlayer from 'react-native-track-player';
import TrackPlayer from '../../components/trackPlayer';
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import variables from "../../theme/variables/commonColor"
import { check, checkMultiple, ANDROID_PERMISSIONS, RESULTS } from "react-native-permissions";
import MusicFiles from "react-native-get-music-files";

import {connect} from 'react-redux'
import {queryLocalSong} from '../../redux/actions'
import MiniPlayer from "../../components/miniPlayer"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: ""
    }
  };

  _getSongs = () => {
    // Alert.alert('seen')
    MusicFiles.getAll({
      id: true,
      blured : true,
      artist : true,
      duration : true,
      genre : true,
      title : true,
      cover : true,
    }).then(tracks => {
      AsyncStorage.setItem("localSongs", JSON.stringify(tracks));
      // this.props.dispatch(queryLocalSong(tracks));
    }).then(() => {
      // console.log(this.props.allTracks);
      // TrackPlayer.setupPlayer();
      // TrackPlayer.updateOptions({
      //   stopWithApp: true,
      //   capabilities: [
      //     TrackPlayer.CAPABILITY_PLAY,
      //     TrackPlayer.CAPABILITY_PAUSE,
      //     TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      //     TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      //     TrackPlayer.CAPABILITY_STOP,
      //     TrackPlayer.CAPABILITY_SEEK_TO
      //   ],
      //   compactCapabilities: [
      //     TrackPlayer.CAPABILITY_PLAY,
      //     TrackPlayer.CAPABILITY_PAUSE,
      //     TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      //     TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      //   ]
      // }).then(async () => {


        // Adds a track to the queue
        let localSongs = [];
        AsyncStorage.getItem("localSongs").then(tracks => {
          localSongs = JSON.parse(tracks);
        }).then(() => {
          // console.log(localSongs);
          if(!localSongs.isEmpty){
            localSongs.forEach((song, index) => {
              // console.log(song.duration);
              TrackPlayer.add({
                id: song.id,
                url: song.path,
                title: song.title,
                artist: song.author,
                artwork: song.cover,
                album: song.album ? song.album : "Chưa xác định",
                genre: song.genre ? song.genre : "Chưa xác định",
                 duration: song.duration,
              });
            });
          }
        });
      // });
    }).catch(error => {
      console.log(error);
    });
  };

  componentDidMount() {
    check(ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ storagePermission: response });
      if(response === "granted") {
        // this._getSongs();
        console.log("done");
      }
    });
    this._getSongs();
    // AsyncStorage.setItem('name', 'I like to save it.');
    // this.onPlay();
  }

  onPlay = () => {
    TrackPlayer.play();

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
          style={{ backgroundColor: "#fff"}}
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

        <Content padder style={{paddingLeft: 10 , paddingRight: 10}}>
          {/*<Text>Header with Custom background color</Text>*/}
          <ScrollView>
            {/*<H1 style={{fontWeight: "bold", color: variables.primaryColor, marginLeft: 10}}>Trang chủ</H1>*/}
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
            <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
          </ScrollView>
        </Content>
        {/*<MiniPlayer/>*/}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allTracks: state.localTracks
  }
};
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
