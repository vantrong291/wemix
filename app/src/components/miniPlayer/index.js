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
import Feather from "react-native-vector-icons/Feather";

import styles from "./style";
import TrackPlayer from "../trackPlayer";
import AnimationArtWork from "../animationArtWork";
import NavigationService from "../../NavigationService";
import { miniPlayerState, syncCurrentTrack } from "../../redux/actions";
import variables from "../../theme/variables/custom";
import Slider from "react-native-slider";
import Carousel from "react-native-banner-carousel";
import {secondToMinuteString} from "../../api/TimeConvert";
import RNModal from "react-native-modal";
import PlayerAction from "../../components/playerAction";
import PlayerMode from "../../components/playerMode";



const defaultArtwork = require("../../assets/defaultCover.jpeg");
const playerBackground = require("../../assets/bg.jpg");

class MiniPlayer extends Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
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

        TrackPlayer.getDuration().then((duration) => {
          console.log(duration);
          this._isMounted && this.setState({ duration: duration });
        });

        setTimeout(await function() {
          self._isMounted && self.setState({ loading: false });
        }, 1000);
      }
    });
    this.startImageRotateFunction();

    TrackPlayer.addEventListener("playback-state", (state) => {
      this._isMounted && this.setState({ playerState: state.state });
    });

    this.props.dispatch(miniPlayerState(true));

    setInterval(() => {
      TrackPlayer.getPosition().then((position) => {
        // console.log(parseInt(position));
        this._isMounted && this.setState({ presentPosition: position });
      })
    },1000);
  };

  startImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear
    }).start(() => this.startImageRotateFunction());
  }

  renderPlayPause = (playState, style) => {
    return (this.state.playerState === 3) ?
      <Icon name="controller-paus" style={style} onPress={this.onPause}/> :
      <Icon name="controller-play" style={style} onPress={this.onPlay}/>;
  };

  renderPlayerPlayPause = (playState, style) => {
    return (this.state.playerState === 3) ?
      <MaterialCommunityIcons name="pause-circle-outline" style={style} onPress={this.onPause}/> :
      <MaterialCommunityIcons name="play-circle-outline" style={style} onPress={this.onPlay}/>;
  };

  renderPlayer = () => {

  };

  onSliderComplete = (position) => {
    // this.setState({presentPosition: position});
    TrackPlayer.seekTo(parseInt(position));
  };

  render() {

    // // if(this.props.syncNavigation.navigation) {
    // //   console.log(this.props.syncNavigation.navigation.state.isDrawerOpen);
    // //
    // //   // console.log(this.props.syncNavigation.navigation.state.isDrawerOpen);
    // //   // console.log(this.props.syncNavigation);
    // //   // const parent = this.props.syncNavigation.navigation.dangerouslyGetParent();
    // //   // const isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen;
    // //   //
    // //   // // console.log(this.props.syncNavigation);
    // //   // console.log(parent);
    // }

    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    let duration = this.state.duration;
    let presentPosition = this.state.presentPosition;


    // console.log(this.state.currentTrack);

    return (!this.state.loading && this.props.miniPlayerState.display) ? (
      <View style={styles.miniPlayer}>
        <View style={styles.artworkView}>
          {/*<Animated.Image rounded*/}
                          {/*source={(this.state.currentTrack.artwork) ? { uri: this.state.currentTrack.artwork } : defaultArtwork}*/}
                          {/*style={[styles.artworkMiniPlayer, { transform: [{ rotate: RotateData }] }]}/>*/}
          <AnimationArtWork currentTrack={this.state.currentTrack} styles={styles.artworkMiniPlayer}/>
        </View>
        <View style={styles.songInfoView}>
          <TextTicker
            duration={5000}
            loop
            bounce
            repeatSpacer={10}
            marqueeDelay={0}
            style={styles.songTitle}
            // onPress={() => NavigationService.navigate('Player')}>{this.state.currentTrack.title}</TextTicker>
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>{this.state.currentTrack.title}</TextTicker>
          <Text style={styles.songArtist}>{this.state.currentTrack.artist}</Text>
        </View>
        <View style={styles.songControlMiniPlayerView}>
          <Icon button name="controller-jump-to-start" style={styles.controlMiniPlayerIcon} onPress={this.onSkipPrevious}/>
          {this.renderPlayPause(this.state.playState, styles.controlMiniPlayerIcon)}
          <Icon button name="controller-next" style={styles.controlMiniPlayerIcon} onPress={this.onSkipNext}/>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <Container style={styles.container}>
            {!this.state.loading && <ImageBackground
                                                     blurRadius={15}
                                                     // source={(this.state.currentTrack.artwork) ? { uri: this.state.currentTrack.artwork } : defaultArtwork}
                                                     source={playerBackground}
                                                     style={styles.imageContainer}>
              <Carousel
                autoplay={false}
                loop={false}
                index={1}
              >
                <View style={{ height: "80%" }}>
                  <Text>
                    If you like React, you'll also like React Native.
                  </Text>
                  <Text>
                    Instead of 'div' and 'span', you'll use native components
                    like 'View' and 'Text'.
                  </Text>
                </View>

                <View style={{ height: "80%" }}>
                  <View noShadow transparent style={{ height: 70, paddingTop: 0, flexDirection: "row"}}>
                    <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}>
                      <Button transparent onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                        <Icon name="chevron-thin-down" style={{ color: variables.playerTextColor, marginLeft: 5 }} size={24}/>
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
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>{this.state.currentTrack.title}</TextTicker>
                      {/*<Text style={{ color: variables.playerTextColor, fontSize: 14 }}>{this.state.currentTrack.title}</Text>*/}
                      <Text style={{ color: variables.playerTextColor, fontSize: 10 }}>{this.state.currentTrack.artist}</Text>
                    </View>
                  </View>
                  <View>
                    <ScrollView style={{ height: "100%" }}>
                      <View style={styles.artworkPlayerView}>
                        {/*<Animated.Image rounded*/}
                                        {/*source={(this.state.currentTrack.artwork) ? { uri: this.state.currentTrack.artwork } : defaultArtwork}*/}
                                        {/*style={[styles.artworkPlayer, { transform: [{ rotate: RotateData }] }]}/>*/}
                        <AnimationArtWork currentTrack={this.state.currentTrack} styles={styles.artworkPlayer}/>
                      </View>
                      <View style={{flexDirection: "row", marginTop: 20}}>
                        <View style={{width:"15%", alignItems:"center", alignSelf:"center" }}>
                          <Text style={{fontSize: 12, color: variables.playerTextColor }}>{secondToMinuteString(presentPosition)}</Text>
                        </View>
                        <View style={{width:"70%"}}>
                          <Slider
                            value={this.state.presentPosition}
                            onValueChange={value => this.setState({ value })}
                            style={styles.sliderContainer}
                            trackStyle={styles.sliderTrack}
                            thumbStyle={styles.sliderThumb}
                            minimumTrackTintColor='#31a4db'
                            thumbTouchSize={{ width: 50, height: 40 }}
                            maximumValue={this.state.duration}
                            step={1}
                            onSlidingComplete={(position) => {this.onSliderComplete(position)}}
                          />
                        </View>
                        <View style={{width:"15%", alignItems:"center", alignSelf:"center" }}>
                          <Text style={{fontSize: 12, color:variables.playerTextColor}}>{secondToMinuteString(duration)}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: "row", height: 100}}>
                        <View style={{width: "25%", alignItems:"center", alignSelf:"center" }}>
                          <TouchableOpacity style={styles.toolbarButton}>
                            <MaterialCommunityIcons name="information-outline" style={styles.toolbarIcon}/>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: "25%", alignItems:"center", alignSelf:"center" }}>
                          <TouchableOpacity style={styles.toolbarButton}>
                            <MaterialCommunityIcons name="heart-outline" style={styles.toolbarIcon}/>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: "25%", alignItems:"center", alignSelf:"center" }}>
                          <PlayerMode/>
                          {/*<TouchableOpacity style={styles.toolbarButton}>*/}
                            {/*<MaterialCommunityIcons name="priority-high" style={styles.toolbarIcon}/>*/}
                          {/*</TouchableOpacity>*/}
                        </View>
                        <View style={{width: "25%", alignItems:"center", alignSelf:"center" }}>
                          <PlayerAction/>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>

                <View style={{ height: "80%" }}>
                  <Text>
                    If you like React, you'll also like React Native.
                  </Text>
                  <Text>
                    Instead of 'div' and 'span', you'll use native components
                    like 'View' and 'Text'.
                  </Text>
                </View>
              </Carousel>
              <View style={styles.songControlPlayerView}>
                <TouchableOpacity>
                  <Icon button name="controller-jump-to-start" style={styles.controlPlayerIcon} onPress={this.onSkipPrevious}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  {this.renderPlayerPlayPause(this.state.playState, styles.playPausePlayerIcon)}
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon button name="controller-next" style={styles.controlPlayerIcon} onPress={this.onSkipNext}/>
                </TouchableOpacity>
              </View>
            </ImageBackground>}
            {/*<MiniPlayer/>*/}
          </Container>

          {/*</ScrollView>*/}
          {/*</Tab>*/}
          {/*<Tab tabStyle={{backgroundColor:variables.playerTextColor}} activeTabStyle={{backgroundColor: variables.playerTextColor}} activeTextStyle={{color: "#333"}} textStyle={{color: "#333"}} heading="Bài hát">*/}
          {/*<ScrollView>*/}
          {/*<Container style={styles.container}>*/}
          {/*{ !this.state.loading && <ImageBackground blurRadius={8} source={(this.state.currentTrack.artwork) ? {uri: this.state.currentTrack.artwork} : defaultArtwork} style={styles.imageContainer}>*/}
          {/*<Header noShadow transparent style={{height: 50}}>*/}
          {/*<Left>*/}
          {/*<Button transparent onPress={() => {*/}
          {/*this.setModalVisible(!this.state.modalVisible);*/}
          {/*}}>*/}
          {/*<Icon name="chevron-thin-down" style={{ color: "#333", marginLeft: 5 }} size={24}/>*/}
          {/*</Button>*/}
          {/*</Left>*/}
          {/*<Body>*/}
          {/*<Title style={{color: "#333"}}>{this.state.currentTrack.title}</Title>*/}
          {/*</Body>*/}
          {/*/!*<Right>*!/*/}
          {/*/!*<Button transparent>*!/*/}
          {/*/!*<Icon name="profile" style={{ color: variables.playerTextColor, marginRight: 5 }} size={24}/>*!/*/}
          {/*/!*</Button>*!/*/}
          {/*/!*</Right>*!/*/}
          {/*</Header>*/}
          {/*<Content padder>*/}
          {/*<ScrollView>*/}
          {/*<View style={styles.artworkPlayerView}>*/}
          {/*<Animated.Image rounded source={ (this.state.currentTrack.artwork) ? {uri: this.state.currentTrack.artwork} : defaultArtwork} style={[styles.artworkPlayer, { transform: [{ rotate: RotateData }]}]} />*/}
          {/*</View>*/}
          {/*<View>*/}
          {/*<Slider*/}
          {/*value={this.state.value}*/}
          {/*onValueChange={value => this.setState({ value })}*/}
          {/*thumbTouchSize={{width: 2, height: 2}}*/}
          {/*thumbStyle={{width: 2, height: 2}}*/}
          {/*/>*/}
          {/*</View>*/}
          {/*</ScrollView>*/}
          {/*</Content>*/}
          {/*</ImageBackground>}*/}
          {/*/!*<MiniPlayer/>*!/*/}
          {/*</Container>*/}
          {/*</ScrollView>*/}
          {/*</Tab>*/}

          {/*</Tabs>*/}
        </Modal>
      </View>) : null;
  }
}

const mapStateToProps = state => ({
  miniPlayerState: state.miniPlayerState,
  syncNavigation: state.syncNavigation
});
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
