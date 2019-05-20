import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Header, Left, Text, Thumbnail, Title, H2, H1, H3} from "native-base";
import {AsyncStorage, Image, PermissionsAndroid, RefreshControl, ScrollView} from "react-native";
// import TrackPlayer from 'react-native-track-player';
import styles from "./styles";
import variables from "../../theme/variables/custom";
import {ANDROID_PERMISSIONS, check, Permission} from "react-native-permissions";
import MusicFiles from "react-native-get-music-files";

import {connect} from "react-redux";
import AlbumHot from "../../components/albumHot";
import SingerHot from "../../components/singerHot";
import SongHot from "../../components/songHot";


const logo = require("../../assets/logo.png");
const cardImage = require("../../assets/drawer-cover.png");


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: "",
      refreshing: false
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
  //         //   artworkMiniPlayer: song.cover,
  //         //   album: song.album ? song.album : "Chưa xác định",
  //         //   genre: song.genre ? song.genre : "Chưa xác định",
  //         //    duration: song.duration,
  //         // });
  //       });
  //     }
  //   });

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  };

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

  render() {
    return (
      <Container style={styles.container}>
        <Header
          // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
        >
          {/*<Left>*/}
          {/*<Button transparent onPress={() => this.props.navigation.openDrawer()}>*/}
          {/*<Icon name="menu-fold" style={{ color: "#FFF", marginLeft: 5 }} size={24} />*/}
          {/*</Button>*/}
          {/*</Left>*/}
          <Body style={{ alignItems: "center", justifyContent: "center" }}>
            <Title style={{ color: "#FFF" }}>Trang chủ</Title>
          </Body>
          {/*<Right>*/}
          {/*<Button transparent>*/}
          {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24} />*/}
          {/*</Button>*/}
          {/*</Right>*/}
        </Header>

        <Content padder>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <Text style={{paddingLeft: 10, paddingVertical: 10, fontSize: 20, fontWeight: "bold"}}>Bài hát Hot</Text>
            <SongHot/>
            <Text style={{paddingLeft: 10, paddingVertical: 10, fontSize: 20, fontWeight: "bold"}}>Album Hot</Text>
            <AlbumHot/>
            <Text style={{paddingLeft: 10, paddingVertical: 10, fontSize: 20, fontWeight: "bold"}}>Ca sỹ Hot</Text>
            <SingerHot/>

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

