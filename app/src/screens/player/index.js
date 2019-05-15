import React, { Component } from "react";
import {
  View,
  Alert,
  Image,
  Animated,
  Easing,
  AsyncStorage,
  Modal,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  Button,
  Text,
  Toast,
  Thumbnail,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Container,
  Tab,
  Tabs
} from "native-base";
import { MaterialTopTabBar, BottomTabBar, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import TextTicker from "react-native-text-ticker";
import Icon from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import Feather from "react-native-vector-icons/Feather";

import styles from "./styles";
import TrackPlayer from "../../components/trackPlayer";
import AnimationArtWork from "../../components/animationArtWork";
import NavigationService from "../../NavigationService";
import { miniPlayerState, syncCurrentTrack } from "../../redux/actions";
import variables from "../../theme/variables/custom";
import Slider from "react-native-slider";
import Carousel from "react-native-banner-carousel";
import { secondToMinuteString } from "../../api/TimeConvert";
import PlayerAction from "../../components/playerAction";
import PlayerMode from "../../components/playerMode";
import SeekBar from "../../components/seekBar";
import LyricView from "../../components/lyricView";
import NowPlaying from "../../components/nowPlaying";
import { ButtonGroup } from 'react-native-elements';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



const defaultArtwork = require("../../assets/defaultCover.jpeg");
const playerBackground = require("../../assets/bg.jpg");
const contentHeight = "70%";
const component1 = () => <MaterialCommunityIcons name="information-outline" style={styles.barIcon} />;
const component2 = () => <Text>Home</Text>;
const component3 = () => <Text>Lyric</Text>;


class Player extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.updateIndex = this  .updateIndex.bind(this);
    this.state = {
      playerState: 0,
      currentTrack: {},
      playing: true,
      loading: true,
      modalVisible: false,
      presentPosition: 10,
      duration: 0,
      playerStartValue: 0,
      displayNowPlaying: false,
      displayArtwork: true,
      displayLyric: false,
      selectedIndex: 1
    };
  }
  presentPosition = 0;
  _isMounted = false;

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex: selectedIndex });
    // console.log(selectedIndex);
    if(selectedIndex == 0) {
      this.setState({ displayNowPlaying: true, displayArtwork: false, displayLyric: false });
    }
    else if(selectedIndex == 1) {
      this.setState({ displayNowPlaying: false, displayArtwork: true, displayLyric: false });
    }
    else if(selectedIndex == 2) {
      this.setState({ displayNowPlaying: false, displayArtwork: false, displayLyric: true });
    }
  }


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  async handleBackButtonClick() {
    await this.props.navigation.goBack();
    // await this.props.dispatch(miniPlayerState(true));
    let self = this;
    setTimeout(await function () {
      self.props.dispatch(miniPlayerState(true));
    }, 100)
    return true;
  }

  onPlay = () => {
    let playing = !this.state.playing;
    this._isMounted && this.setState({ playing: playing });
    // console.log(this.state.playing);
    TrackPlayer.play();
  };

  onPause = () => {
    let playing = !this.state.playing;
    this._isMounted && this.setState({ playing: playing });
    TrackPlayer.pause();
  };

  onSkipNext = () => {
    this._isMounted && this.setState({ playing: false });
    TrackPlayer.skipToNext().then((res) => {
      // console.log(res);
      this._isMounted && this.setState({ playing: true });
    }).catch((err) => {
      Alert.alert(
        "Oppp :(",
        "Danh sách phát đã hết",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    });
  };

  onSkipPrevious = () => {
    this._isMounted && this.setState({ playing: false });
    TrackPlayer.skipToPrevious().then(res => {
      this._isMounted && this.setState({ playing: true });
    }).catch((err) => {
      Alert.alert(
        "Oppp :(",
        "Không có bài liền trước",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    });
  };

  onSliderComplete = (position) => {
    // this.setState({presentPosition: position});
    TrackPlayer.seekTo(parseInt(position));
  };

  async componentDidMount() {
    this._isMounted = true;
    let self = this;
    // TrackPlayer.getPosition().then((position) => {
    //   // console.log(parseInt(position));
    //   this._isMounted && this.setState({ presentPosition: position });
    // });

    await TrackPlayer.getCurrentTrack().then(async (trackId) => {
      // console.log(trackId);
      const track = await TrackPlayer.getTrack(trackId);
      this._isMounted && this.setState({ currentTrack: track });
    });

    await TrackPlayer.getDuration().then((duration) => {
      // console.log(duration);
      this._isMounted && this.setState({ duration: duration });
      // self._isMounted && self.setState({ loading: false });      
    });


    TrackPlayer.addEventListener("playback-track-changed", async (data) => {
      if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        this._isMounted && this.setState({ currentTrack: track });
        // console.log(track)

        TrackPlayer.getDuration().then((duration) => {
          // console.log(duration);
          this._isMounted && this.setState({ duration: duration });
        });

        // setTimeout(await function() {
        //   self._isMounted && self.setState({ loading: false });
        // }, 1000);
      }
    });

    const { navigation } = this.props;
    const playerState = navigation.getParam('playerState');
    this._isMounted && this.setState({ playerState: playerState });

    TrackPlayer.addEventListener("playback-state", (state) => {
      this._isMounted && this.setState({ playerState: state.state });
      // console.log(state);
    });

    // setInterval(() => {
    //   TrackPlayer.getPosition().then((position) => {
    //     // console.log(parseInt(position));
    //     // this._isMounted && this.setState({ presentPosition: position });
    //     this.presentPosition = position;
    //   })
    // },1000);

    // setTimeout(await function () {
    self._isMounted && self.setState({ loading: false });
    // }, 500);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderPlayerPlayPause = (playState, style) => {
    return (this.state.playerState === 3)
      ? (<Button transparent style={styles.playButton} onPress={this.onPause}>
        <Ionicons name="ios-pause" style={style} />
      </Button>)
      : (<Button transparent style={styles.playButton} onPress={this.onPlay}>
        <Ionicons name="ios-play" style={[style, { left: 4 }]} />
      </Button>);
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { navigation } = this.props;
  //   return navigation.getParam('currentTrack') !== nextProps.navigation.getParam('currentTrack');
  // }

  goBack = async () => {
    await this.props.navigation.goBack();
    // await this.props.dispatch(miniPlayerState(true));
    let self = this;
    setTimeout(await function () {
      self.props.dispatch(miniPlayerState(true));
    }, 100)
  };

  // shouldComponentUpdate

  render() {
    // let duration = this.state.duration;
    // let presentPosition = this.presentPosition;
    // console.log(this.state.playerState);

    // const de = {
    //   id: 1,
    //   title: "La danza del fuego",
    //   author: "Mago de Oz",
    //   album: "Finisterra",
    //   genre: "Folk",
    //   duration: 121, // miliseconds
    // };

    // const { navigation } = this.props;
    // const currentTrack = navigation.getParam('currentTrack', de);
    // const duration = navigation.getParam('duration');    
    // // const duration = parseInt(currentTrack.duration) / 1000;
    // console.log("fr "+duration);

    const currentTrack = this.state.currentTrack;
    const duration = this.state.duration;
    // console.log(this.state.currentTrack);
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    const selectedIndex = this.state.selectedIndex;

    return (
      <Container style={styles.container}>
        {!this.state.loading && <ImageBackground
          blurRadius={15}
          // source={(this.state.currentTrack.artwork) ? { uri: this.state.currentTrack.artwork } : defaultArtwork}
          source={playerBackground}
          style={styles.imageContainer}>
          {/* <Carousel
            autoplay={false}
            loop={false}
            index={1}
          > */}
          {this.state.displayNowPlaying && <View style={{ height: contentHeight }}>
            <NowPlaying/>
          </View>}

          {this.state.displayArtwork && <View style={{ height: contentHeight }}>
            <View noShadow transparent style={{ height: 70, paddingTop: 0, flexDirection: "row" }}>
              <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15 }}>
                <Button transparent onPress={this.goBack}>
                  <Icon name="chevron-thin-down" style={{ color: variables.playerTextColor, marginLeft: 5 }} size={24} />
                </Button>
              </View>
              <View style={{ width: "70%", alignSelf: "center" }}>
                <TextTicker
                  duration={5000}
                  loop
                  bounce
                  repeatSpacer={10}
                  marqueeDelay={0}
                  style={{ color: variables.playerTextColor, fontSize: 15 }}
                // onPress={() => NavigationService.navigate('Player')}>{this.state.currentTrack.title}</TextTicker>
                >{currentTrack.title}</TextTicker>
                <Text style={{ color: variables.playerTextColor, fontSize: 10 }}>{currentTrack.artist}</Text>
              </View>
            </View>
            <View>
              <ScrollView style={{ height: "100%" }}>
                <View style={styles.artworkPlayerView}>
                  <AnimationArtWork currentTrack={currentTrack} styles={styles.artworkPlayer} />
                </View>
                <SeekBar duration={duration} />
                <View style={{ flexDirection: "row", height: 80 }}>
                  <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity style={styles.toolbarButton}>
                      <MaterialCommunityIcons name="information-outline" style={styles.toolbarIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity style={styles.toolbarButton}>
                      <MaterialCommunityIcons name="heart-outline" style={styles.toolbarIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
                    <PlayerMode />
                    {/*<TouchableOpacity style={styles.toolbarButton}>*/}
                    {/*<MaterialCommunityIcons name="priority-high" style={styles.toolbarIcon}/>*/}
                    {/*</TouchableOpacity>*/}
                  </View>
                  <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
                    <PlayerAction />
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>}

          {this.state.displayLyric && <View style={{ height: contentHeight }}>
            <LyricView currentTrack={currentTrack} />
          </View>}
          {/* </Carousel> */}


          <View>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 35, marginTop: 20, marginBottom: 20 }} />
          </View>

          <View style={styles.songControlPlayerView}>
            <TouchableOpacity>
              <Ionicons button name="ios-skip-backward" style={styles.controlPlayerIcon} onPress={this.onSkipPrevious} />
            </TouchableOpacity>
            <TouchableOpacity>
              {/*<View style={styles.playButton}>*/}
              {this.renderPlayerPlayPause(this.state.playState, styles.playPausePlayerIcon)}
              {/*</View>*/}
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons button name="ios-skip-forward" style={styles.controlPlayerIcon} onPress={this.onSkipNext} />
            </TouchableOpacity>
          </View>
        </ImageBackground>}
        {/*<MiniPlayer/>*/}
      </Container>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapDispatchToProps)(Player);