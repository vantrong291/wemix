import React, { Component } from "react";
import { View, Alert, Image, Animated, Easing, AsyncStorage, ScrollView } from "react-native";
import TrackPlayer from "../../components/trackPlayer";
import { Body, Button, Container, Content, Header, Left, Right, Title } from "native-base";
import styles from "./styles";
import variables from "../../theme/variables/commonColor";
import Icon from "react-native-vector-icons/AntDesign";
const defaultArtwork = require("../../assets/defaultCover.jpeg");
import Slider from "react-native-slider";


class Player extends Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      playerState : 1,
      currentTrack: {},
      playing: true,
      loading: true,
      value: 0
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
    this._isMounted && this.setState({playing: false});
    TrackPlayer.skipToPrevious().then(res => {
      this._isMounted && this.setState({playing: true});
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

  async componentDidMount(){
    this._isMounted = true;
    let self = this;
    TrackPlayer.getCurrentTrack().then((trackId) => {
      TrackPlayer.getTrack(trackId).then(async (track) => {
        this._isMounted && this.setState({ currentTrack: track });
        setTimeout(await function () {
          self._isMounted && self.setState({loading: false})
        }, 1000);
      })
    });

    TrackPlayer.addEventListener("playback-track-changed", async (data) => {
      if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        this._isMounted && this.setState({ currentTrack: track });
        setTimeout(await function () {
          self._isMounted && self.setState({loading: false})
        }, 1000);
      }
    });
    this.startImageRotateFunction();

    TrackPlayer.addEventListener("playback-state", (state)=> {
      this._isMounted && this.setState({playerState: state.state});
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

    console.log(this.state.currentTrack);
    return (
      <Container style={styles.container}>
        { !this.state.loading &&
        <Header
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
          noShadow
          style={{backgroundColor: "#f5f5f5"}}
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="menu-fold" style={{ color: "#333", marginLeft: 5 }} size={24}/>
            </Button>
          </Left>
          <Body>
          <Title style={{color: "#333"}}>{this.state.currentTrack.title}</Title>
          </Body>
          {/*<Right>*/}
            {/*<Button transparent>*/}
              {/*/!*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*!/*/}
            {/*</Button>*/}
          {/*</Right>*/}
        </Header>}
        { !this.state.loading &&
        <Content padder>
          <ScrollView>
            <View style={styles.artworkView}>
              <Animated.Image rounded source={ (this.state.currentTrack.artwork) ? {uri: this.state.currentTrack.artwork} : defaultArtwork} style={[styles.artwork, { transform: [{ rotate: RotateData }]}]} />
            </View>
            <View>
              <Slider
                value={this.state.value}
                onValueChange={value => this.setState({ value })}
                thumbTouchSize={{width: 2, height: 2}}
                thumbStyle={{width: 2, height: 2}}
              />
            </View>
          </ScrollView>
        </Content>}
        {/*<MiniPlayer/>*/}
      </Container>
    );
  }
}

export default Player;
