import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, Text, Toast, Thumbnail } from "native-base";
import {MaterialTopTabBar, BottomTabBar
} from "react-navigation";
import TextTicker from 'react-native-text-ticker'
import Icon from "react-native-vector-icons/Entypo";
import styles from "./style";
import TrackPlayer from "../trackPlayer";

const defaultArtwork = require("../../assets/defaultCover.jpeg");

export default class MiniPlayer extends Component {
  constructor(props) {
    super(props);
    // this.onPause = this.onPause.bind(this);
    // this.onPlay = this.onPlay.bind(this);
    this.state = {
      playerState : 1,
      currentTrack: {},
      playing: true
    }
  };

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

    })
  }

  renderPlayPause = (playing) => {
    return (playing) ? <Icon name="controller-paus" style={styles.controlIcon} onPress={this.onPause}/> : <Icon name="controller-play" style={styles.controlIcon} onPress={this.onPlay}/>;
  };

  render() {
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

    return (this.state.playerState === 3) ? (
      <View style={styles.miniPlayer}>
        <View style={styles.artworkView}>
          <Thumbnail square source={ (artwork) ? {uri: artwork} : defaultArtwork} style={styles.artwork} />
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
