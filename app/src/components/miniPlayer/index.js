import React, { Component } from "react";
import { View, Alert, Image, Animated, Easing } from "react-native";
import { Button, Text, Toast, Thumbnail } from "native-base";
import {MaterialTopTabBar, BottomTabBar
} from "react-navigation";
import TextTicker from 'react-native-text-ticker'
import Icon from "react-native-vector-icons/Entypo";
import styles from "./style";
import TrackPlayer from "../trackPlayer";
// import { Image } from "react-native-paper/typings/components/Avatar";

const defaultArtwork = require("../../assets/defaultCover.jpeg");

export default class MiniPlayer extends Component {
  constructor(props) {
    super(props);
    // this.onPause = this.onPause.bind(this);
    // this.onPlay = this.onPlay.bind(this);
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      playerState : 1,
      currentTrack: {},
      playing: true
    }
  };

  // spinValue = new Animated.Value(0);
  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  onPlay = () => {
    let playing = !this.state.playing;
    this._isMounted && this.setState({playing: playing});
    // console.log(this.state.playing);
    TrackPlayer.play();
  };

  onPause = () => {
    let playing = !this.state.playing;
    this._isMounted && this.setState({playing: playing});
    TrackPlayer.pause();
  };

  onSkipNext = () => {
    this._isMounted && this.setState({playing: false});
    TrackPlayer.skipToNext().then((res) => {
      // console.log(res);
      this._isMounted && this.setState({playing: true});
    });
  };

  onSkipPrevious = () => {
    this._isMounted && this.setState({playing: false});
    TrackPlayer.skipToPrevious().then(res => {
      this._isMounted && this.setState({playing: true});
    });
  };

  componentDidMount(){
    this._isMounted = true;
    TrackPlayer.addEventListener("playback-track-changed", async (data) => {
      if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        this._isMounted && this.setState({ currentTrack: track });
      }
    });
    this.startImageRotateFunction();
    // Animated.timing(
    //   this.spinValue,
    //   {
    //     toValue: 1,
    //     duration: 3000,
    //     easing: Easing.linear
    //   }
    // ).start()

  };

  startImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
    }).start(() => this.startImageRotateFunction());
  }

  renderPlayPause = (playing) => {
    return (playing) ? <Icon name="controller-paus" style={styles.controlIcon} onPress={this.onPause}/> : <Icon name="controller-play" style={styles.controlIcon} onPress={this.onPlay}/>;
  };

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    TrackPlayer.addEventListener("playback-state", (state)=> {
      if(this.state.playerState != 3 && this.state.playerState != state.state) {
        this._isMounted && this.setState({playerState: state.state});
        if (this.state.playerState === 3) {
          TrackPlayer.getCurrentTrack().then(value => {
            TrackPlayer.getTrack(value).then(track => {
              // console.log(track);
              this._isMounted && this.setState({currentTrack: track});
            });
          });
        }
      }
    });

    let artwork = defaultArtwork;
    let title = "Chưa xác định";
    let artist = "Chưa xác định";
    if(this.state.currentTrack) {
      artwork = this.state.currentTrack.artwork ? this.state.currentTrack.artwork : null;
      // console.log(artwork);
      title = (this.state.currentTrack.title) ? this.state.currentTrack.title : title;
        // ? this.state.currentTrack.title.substring(0, 25) + " ..." : this.state.currentTrack.title;
      artist = this.state.currentTrack.artist;
    }

    // const spin = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // });

    return (this.state.playerState === 3) ? (
      <View style={styles.miniPlayer}>
        <View style={styles.artworkView}>
          <Animated.Image rounded source={ (artwork) ? {uri: artwork} : defaultArtwork} style={[styles.artwork, { transform: [{ rotate: RotateData }]}]} />
        </View>
        <View style={styles.songInfoView}>
          <TextTicker
            duration={5000}
            loop
            bounce
            repeatSpacer={10}
            marqueeDelay={1000}
            style={styles.songTitle} onPress={() => this.props.navigation.navigate('Login')}>{title}</TextTicker>
          <Text style={styles.songArtist}>{artist}</Text>
        </View>
        <View style={styles.songControlView}>
          <Icon button name="controller-jump-to-start" style={styles.controlIcon} onPress={this.onSkipPrevious}/>
          {this.renderPlayPause(this.state.playing)}
          <Icon button name="controller-next" style={styles.controlIcon} onPress={this.onSkipNext}/>
        </View>
        {/*<MaterialTopTabBar/>*/}
      </View>
    ) : null;
  }
}
