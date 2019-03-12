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
import TrackPlayer from 'react-native-track-player';
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import variables from "../../theme/variables/commonColor"
import { check, checkMultiple, ANDROID_PERMISSIONS, RESULTS } from "react-native-permissions";
import MusicFiles from "react-native-get-music-files";

import {connect} from 'react-redux'
import {queryLocalSong} from '../../redux/actions'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: ""
    }
  };

  _getSongs = () => {
    // Alert.alert('seen')
    MusicFiles.getAll({}).then(tracks => {
      this.props.dispatch(queryLocalSong(tracks));
    }).then(() => {
      // console.log(this.props.allTracks);
      TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SEEK_TO
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
        ]
      }).then(async () => {
        // Adds a track to the queue
        const localSongs = this.props.allTracks.tracks;
        console.log(localSongs);
        if(!localSongs.isEmpty){
          localSongs.forEach(async (song, index) => {
            console.log(song.duration);
            await TrackPlayer.add({
              id: song.duration,
              url: song.path,
              title: song.title,
              artist: 'Track Artist',
              artwork: require('../../assets/camera.png')
            });
          });
        }
      });
    }).catch(error => {
      console.log(error);
    });
  };

  // componentWillMount(): void {
  //   this._getSongs();
  // }

  componentDidMount(): void {
    check(ANDROID_PERMISSIONS.READ_EXTERNAL_STORAGE).then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // console.log(response);
      this.setState({ storagePermission: response });
    });
    this._getSongs();

    // console.log(this.props);


    // let then = TrackPlayer.setupPlayer();
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
    //
    //   ],
    //   compactCapabilities: [
    //     TrackPlayer.CAPABILITY_PLAY,
    //     TrackPlayer.CAPABILITY_PAUSE
    //   ]
    // }).then(async () => {
    //   // Adds a track to the queue
    //   const localSongs = this.props.allTracks.tracks;
    //   console.log(localSongs);
    //   if(!localSongs.isEmpty){
    //
    //     localSongs.forEach((song, index) => {
    //       console.log(song.duration);
    //     });
    //     await TrackPlayer.add({
    //       id: 'trackId',
    //       url: 'http://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/14033a2d036aea34b37b/3492656630613786320?authen=exp=1552183878~acl=/14033a2d036aea34b37b/*~hmac=e4912828945d0921a39893f189d34acf',
    //       title: 'Track Title',
    //       artist: 'Track Artist',
    //       artwork: require('../../assets/camera.png')
    //     });
    //   }
    //   });

    }

  onPlay = () => {
    TrackPlayer.play();
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
