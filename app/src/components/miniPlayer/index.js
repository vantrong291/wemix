import React, { Component } from "react";
import { View, Alert, Image, Animated, Easing, AsyncStorage } from "react-native";
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
      playing: true,
      loading: true
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
    let self = this;
    TrackPlayer.addEventListener("playback-track-changed", async (data) => {
      if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        this._isMounted && this.setState({ currentTrack: track });
      }
    });
    this.startImageRotateFunction();

    AsyncStorage.getItem("recentTrack").then(async (track) => {
      await self._isMounted && self.setState({currentTrack: track});
      // console.log(self.state.currentTrack);
      setTimeout(await function () {
        self._isMounted && self.setState({loading: false})
      }, 3000);
      // console.log(self.state.loading);
    });
    // Animated.timing(
    //   this.spinValue,
    //   {
    //     toValue: 1,
    //     duration: 3000,
    //     easing: Easing.linear
    //   }
    // ).start()
    TrackPlayer.addEventListener("playback-state", (state)=> {
      // console.log(state);
      this._isMounted && this.setState({playerState: state.state});

      // if(this.state.playerState != 3 && this.state.playerState != state.state) {
      //   this._isMounted && this.setState({playerState: state.state});
      //   if (this.state.playerState === 3) {
      //     TrackPlayer.getCurrentTrack().then(value => {
      //       TrackPlayer.getTrack(value).then(track => {
      //         // console.log(track);
      //         this._isMounted && this.setState({currentTrack: track});
      //       });
      //     });
      //   }
      // }
    });
  };

  startImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
    }).start(() => this.startImageRotateFunction());
  }

  renderPlayPause = (playState) => {
    return (this.state.playerState === 3) ? <Icon name="controller-paus" style={styles.controlIcon} onPress={this.onPause}/> : <Icon name="controller-play" style={styles.controlIcon} onPress={this.onPlay}/>;
  };

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    let artwork = " ";
    let title = "Chưa xác định";
    let artist = "Chưa xác định";
    if(this.state.currentTrack) {
      artwork = this.state.currentTrack.artwork ? this.state.currentTrack.artwork : " ";
      title = (this.state.currentTrack.title) ? this.state.currentTrack.title : title;
      artist = this.state.currentTrack.artist;
    }
    // const spin = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // });
    // console.log(artwork);


    return (!this.state.loading) ? (
      <View style={styles.miniPlayer}>
        <View style={styles.artworkView}>
          <Animated.Image rounded source={ (this.state.currentTrack.artwork) ? {uri: this.state.currentTrack.artwork} : defaultArtwork} style={[styles.artwork, { transform: [{ rotate: RotateData }]}]} />
        </View>
        <View style={styles.songInfoView}>
          <TextTicker
            duration={5000}
            loop
            bounce
            repeatSpacer={10}
            marqueeDelay={0}
            style={styles.songTitle}>{this.state.currentTrack.title}</TextTicker>
          <Text style={styles.songArtist}>{this.state.currentTrack.artist}</Text>
        </View>
        <View style={styles.songControlView}>
          <Icon button name="controller-jump-to-start" style={styles.controlIcon} onPress={this.onSkipPrevious}/>
          {this.renderPlayPause(this.state.playState)}
          <Icon button name="controller-next" style={styles.controlIcon} onPress={this.onSkipNext}/>
        </View>
        {/*<MaterialTopTabBar/>*/}
      </View>
    ) : null;
  }
}
