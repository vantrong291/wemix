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
import {View} from "react-native";
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
      this.props.dispatch(queryLocalSong(tracks));
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
        const localSongs = this.props.allTracks.tracks;
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
    // this.onPlay();
  }

  onPlay = () => {
    TrackPlayer.play();
    // TrackPlayer.getCurrentTrack().then(value => {
    //   console.log(value)
    // });
    // TrackPlayer.getState().then(value => {
    //   console.log(value)
    // })
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
              <Title style={{width: 300, color: "#FFF", marginLeft: 60 }}>Trang chủ</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>
            </Button>
          </Right>

        </Header>

        <Content padder>
          {/*<Text>Header with Custom background color</Text>*/}
          <Button onPress={this.onPlay}><Text>Play Music</Text></Button>
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
