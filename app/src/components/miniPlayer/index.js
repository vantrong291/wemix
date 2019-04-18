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
  TouchableOpacity
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

import styles from "./style";
import TrackPlayer from "../trackPlayer";
import AnimationArtWork from "../animationArtWork";
import NavigationService from "../../NavigationService";
import { miniPlayerState, syncCurrentTrack } from "../../redux/actions";
import variables from "../../theme/variables/custom";
import Slider from "react-native-slider";
import Carousel from "react-native-banner-carousel";
import { secondToMinuteString } from "../../api/TimeConvert";
import PlayerAction from "../../components/playerAction";
import PlayerMode from "../../components/playerMode";



const defaultArtwork = require("../../assets/defaultCover.jpeg");
const playerBackground = require("../../assets/bg.jpg");

class MiniPlayer extends Component {
  constructor(props) {
    super(props);
    // this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      playerState: 1,
      currentTrack: {},
      playing: true,
      loading: true,
      modalVisible: false,
      presentPosition: 0,
      duration: 0,
      playerStartValue: 0
    };
  };

  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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

  async componentDidMount() {
    this._isMounted = true;
    let self = this;
    TrackPlayer.addEventListener("playback-track-changed", async (data) => {
      if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        this._isMounted && this.setState({ currentTrack: track });

        setTimeout(() => {
          TrackPlayer.getDuration().then((duration) => {
            console.log("dr " + duration);
            this._isMounted && this.setState({ duration: duration });
          })
        }, 2000);

        setTimeout(await function () {
          self._isMounted && self.setState({ loading: false });
        }, 1000);
      }
    });
    // this.startImageRotateFunction();

    TrackPlayer.addEventListener("playback-state", (state) => {
      this._isMounted && this.setState({ playerState: state.state });
    });

    this.props.dispatch(miniPlayerState(true));

    // setInterval(() => {
    //   TrackPlayer.getPosition().then((position) => {
    //     // console.log(parseInt(position));
    //     this._isMounted && this.setState({ presentPdosition: position });
    //   })
    // },1000);
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.currentTrack !== nextState.currentTrack;
  // }

  // startImageRotateFunction() {
  //   this.RotateValueHolder.setValue(0);
  //   Animated.timing(this.RotateValueHolder, {
  //     toValue: 1,
  //     duration: 6000,
  //     easing: Easing.linear
  //   }).start(() => this.startImageRotateFunction());
  // }

  renderPlayPause = (playState, style) => {
    return (this.state.playerState === 3) ?
      <Icon name="controller-paus" style={style} onPress={this.onPause} /> :
      <Icon name="controller-play" style={style} onPress={this.onPlay} />;
  };

  renderPlayerPlayPause = (playState, style) => {
    return (this.state.playerState === 3) ?
      <Ionicons name="ios-pause" style={style} onPress={this.onPause} /> :
      <Ionicons name="ios-play" style={[style, { left: 3 }]} onPress={this.onPlay} />;
  };

  renderPlayer = () => {

  };

  onSliderComplete = (position) => {
    // this.setState({presentPosition: position});
    TrackPlayer.seekTo(parseInt(position));
  };

  openPlayer = async () => {
    const currentTrack = this.state.currentTrack;
    // await this.setState({loading: true});
    await this.props.dispatch(miniPlayerState(false));
    await NavigationService.navigate('Player', { currentTrack: currentTrack, playerState: this.state.playerState, duration: this.state.duration })
  };

  render() {

    let duration = this.state.duration;
    let presentPosition = this.state.presentPosition;

    // console.log("m" + this.props.miniPlayerState.display);

    return (!this.state.loading && this.props.miniPlayerState.display) ? (
      <View style={styles.miniPlayer}>
        <TouchableOpacity style={styles.artworkView} onPress={this.openPlayer}>
          <AnimationArtWork currentTrack={this.state.currentTrack} styles={styles.artworkMiniPlayer} playing={this.state.playerState === 3} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.songInfoView} onPress={this.openPlayer}>
          <TextTicker
            duration={5000}
            loop
            bounce
            repeatSpacer={10}
            marqueeDelay={0}
            style={styles.songTitle}
          >{this.state.currentTrack.title}</TextTicker>
          <Text style={styles.songArtist} numberOfLines={1}>{this.state.currentTrack.artist}</Text>
        </TouchableOpacity>
        <View style={styles.songControlMiniPlayerView}>
          <Icon button name="controller-jump-to-start" style={styles.controlMiniPlayerIcon} onPress={this.onSkipPrevious} />
          {this.renderPlayPause(this.state.playState, styles.controlMiniPlayerIcon)}
          <Icon button name="controller-next" style={styles.controlMiniPlayerIcon} onPress={this.onSkipNext} />
        </View>
      </View>) : null;
  }
}

const mapStateToProps = state => ({
  miniPlayerState: state.miniPlayerState,
});
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
