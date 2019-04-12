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

import styles from "./styles";
import TrackPlayer from "../../components/trackPlayer";
import AnimationArtWork from "../../components/animationArtWork";
import NavigationService from "../../NavigationService";
import { miniPlayerState, syncCurrentTrack } from "../../redux/actions";
import variables from "../../theme/variables/custom";
import Slider from "react-native-slider";
import Carousel from "react-native-banner-carousel";
import {secondToMinuteString} from "../../api/TimeConvert";
import RNModal from "react-native-modal";
import PlayerAction from "../../components/playerAction";
import PlayerMode from "../../components/playerMode";
import SeekBar from "../../components/seekBar";




const defaultArtwork = require("../../assets/defaultCover.jpeg");
const playerBackground = require("../../assets/bg.jpg");

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: 0,
      currentTrack: {},
      playing: true,
      loading: true,
      modalVisible: false,
      presentPosition: 10,
      duration: 0,
      playerStartValue: 0
    };
  }
  presentPosition = 0;
  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
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

    // TrackPlayer.addEventListener("playback-track-changed", async (data) => {
    //   if (data.nextTrack) {
    //     const track = await TrackPlayer.getTrack(data.nextTrack);
    //     this._isMounted && this.setState({ currentTrack: track });
    //
    //     TrackPlayer.getDuration().then((duration) => {
    //       console.log(duration);
    //       this._isMounted && this.setState({ duration: duration });
    //     });
    //
    //     setTimeout(await function() {
    //       self._isMounted && self.setState({ loading: false });
    //     }, 1000);
    //   }
    // });
    //
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

    setTimeout(await function() {
      self._isMounted && self.setState({ loading: false });
      }, 1000);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderPlayerPlayPause = (playState, style) => {
    return (this.state.playerState === 3) ?
      <Ionicons name="ios-pause" style={style} onPress={this.onPause}/> :
      <Ionicons name="ios-play" style={[style, {left: 3}]} onPress={this.onPlay}/>;
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { navigation } = this.props;
  //   return navigation.getParam('currentTrack') !== nextProps.navigation.getParam('currentTrack');
  // }

  render() {
    // let duration = this.state.duration;
    let presentPosition = this.presentPosition;
    // console.log(this.state.playerState);

    const de = {
      id : 1,
      title : "La danza del fuego",
      author : "Mago de Oz",
      album : "Finisterra",
      genre : "Folk",
      duration : 121, // miliseconds
    };

    const { navigation } = this.props;
    const currentTrack = navigation.getParam('currentTrack', de);
    const duration = parseInt(currentTrack.duration)/1000;
    // console.log(currentTrack.duration);

    return (
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
                    }}>{currentTrack.title}</TextTicker>
                  {/*<Text style={{ color: variables.playerTextColor, fontSize: 14 }}>{this.state.currentTrack.title}</Text>*/}
                  <Text style={{ color: variables.playerTextColor, fontSize: 10 }}>{currentTrack.artist}</Text>
                </View>
              </View>
              <View>
                <ScrollView style={{ height: "100%" }}>
                  <View style={styles.artworkPlayerView}>
                    {/*<Animated.Image rounded*/}
                    {/*source={(this.state.currentTrack.artwork) ? { uri: this.state.currentTrack.artwork } : defaultArtwork}*/}
                    {/*style={[styles.artworkPlayer, { transform: [{ rotate: RotateData }] }]}/>*/}
                    <AnimationArtWork currentTrack={currentTrack} styles={styles.artworkPlayer}/>
                  </View>
                  <SeekBar duration={duration}/>
                  {/*<View style={{flexDirection: "row", marginTop: 20}}>*/}
                    {/*<View style={{width:"15%", alignItems:"center", alignSelf:"center" }}>*/}
                      {/*<Text style={{fontSize: 12, color: variables.playerTextColor }}>{secondToMinuteString(presentPosition)}</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{width:"70%"}}>*/}
                      {/*<Slider*/}
                        {/*value={this.presentPosition}*/}
                        {/*// onValueChange={value => this.setState({ value })}*/}
                        {/*style={styles.sliderContainer}*/}
                        {/*trackStyle={styles.sliderTrack}*/}
                        {/*thumbStyle={styles.sliderThumb}*/}
                        {/*minimumTrackTintColor='#31a4db'*/}
                        {/*thumbTouchSize={{ width: 50, height: 40 }}*/}
                        {/*maximumValue={duration}*/}
                        {/*step={1}*/}
                        {/*onSlidingComplete={(position) => {this.onSliderComplete(position)}}*/}
                      {/*/>*/}
                    {/*</View>*/}
                    {/*<View style={{width:"15%", alignItems:"center", alignSelf:"center" }}>*/}
                      {/*<Text style={{fontSize: 12, color:variables.playerTextColor}}>{secondToMinuteString(duration)}</Text>*/}
                    {/*</View>*/}
                  {/*</View>*/}
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
              <Ionicons button name="ios-skip-backward" style={styles.controlPlayerIcon} onPress={this.onSkipPrevious}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.playButton}>
                {this.renderPlayerPlayPause(this.state.playState, styles.playPausePlayerIcon)}
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons button name="ios-skip-forward" style={styles.controlPlayerIcon} onPress={this.onSkipNext}/>
            </TouchableOpacity>
          </View>
        </ImageBackground>}
        {/*<MiniPlayer/>*/}
      </Container>

    );
  }
}

export default Player;


// import React, { Component } from "react";
// import { View, Alert, Image, Animated, Easing, AsyncStorage, ScrollView, ImageBackground } from "react-native";
// import TrackPlayer from "../../components/trackPlayer";
// import { Body, Button, Container, Content, Header, Left, Right, Title } from "native-base";
// import styles from "./styles";
// import variables from "../../theme/variables/commonColor";
// import Icon from "react-native-vector-icons/AntDesign";
// const defaultArtwork = require("../../assets/defaultCover.jpeg");
// import Slider from "react-native-slider";
// import { connect } from "react-redux";
// import {miniPlayerState} from "../../redux/actions"
//
//
// class Player extends Component {
//   constructor(props) {
//     super(props);
//     this.RotateValueHolder = new Animated.Value(0);
//     this.state = {
//       playerState : 1,
//       currentTrack: {},
//       playing: true,
//       loading: true,
//       value: 0
//     }
//   };
//
//   _isMounted = false;
//
//   componentWillUnmount() {
//     this._isMounted = false;
//     this.props.dispatch(miniPlayerState(true));
//   }
//
//   onPlay = () => {
//     let playing = !this.state.playing;
//     this._isMounted && this.setState({playing: playing});
//     // console.log(this.state.playing);
//     TrackPlayer.play();
//   };
//
//   onPause = () => {
//     let playing = !this.state.playing;
//     this._isMounted && this.setState({playing: playing});
//     TrackPlayer.pause();
//   };
//
//   onSkipNext = () => {
//     this._isMounted && this.setState({playing: false});
//     TrackPlayer.skipToNext().then((res) => {
//       // console.log(res);
//       this._isMounted && this.setState({playing: true});
//     }).catch((err) => {
//       Alert.alert(
//         "Oppp :(",
//         "Danh sách phát đã hết",
//         [
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ],
//         { cancelable: true }
//       );
//     });
//   };
//
//   onSkipPrevious = () => {
//     this._isMounted && this.setState({playing: false});
//     TrackPlayer.skipToPrevious().then(res => {
//       this._isMounted && this.setState({playing: true});
//     }).catch((err) => {
//       Alert.alert(
//         "Oppp :(",
//         "Không có bài liền trước",
//         [
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ],
//         { cancelable: true }
//       );
//     });
//   };
//
//   async componentDidMount(){
//     this._isMounted = true;
//     let self = this;
//     this.props.dispatch(miniPlayerState(false));
//     TrackPlayer.getCurrentTrack().then((trackId) => {
//       TrackPlayer.getTrack(trackId).then(async (track) => {
//         this._isMounted && this.setState({ currentTrack: track });
//         setTimeout(await function () {
//           self._isMounted && self.setState({loading: false})
//         }, 1000);
//       })
//     });
//
//     TrackPlayer.addEventListener("playback-track-changed", async (data) => {
//       if (data.nextTrack) {
//         const track = await TrackPlayer.getTrack(data.nextTrack);
//         this._isMounted && this.setState({ currentTrack: track });
//         setTimeout(await function () {
//           self._isMounted && self.setState({loading: false})
//         }, 1000);
//       }
//     });
//     this.startImageRotateFunction();
//
//     TrackPlayer.addEventListener("playback-state", (state)=> {
//       this._isMounted && this.setState({playerState: state.state});
//     });
//   };
//
//   startImageRotateFunction() {
//     this.RotateValueHolder.setValue(0);
//     Animated.timing(this.RotateValueHolder, {
//       toValue: 1,
//       duration: 6000,
//       easing: Easing.linear,
//     }).start(() => this.startImageRotateFunction());
//   }
//
//   renderPlayPause = (playState) => {
//     return (this.state.playerState === 3) ? <Icon name="controller-paus" style={styles.controlMiniPlayerIcon} onPress={this.onPause}/> : <Icon name="controller-play" style={styles.controlMiniPlayerIcon} onPress={this.onPlay}/>;
//   };
//
//   render() {
//     const RotateData = this.RotateValueHolder.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '360deg'],
//     });
//
//     console.log(this.state.currentTrack);
//     return (
//       <Container style={styles.container}>
//         { !this.state.loading && <ImageBackground blurRadius={8} source={(this.state.currentTrack.artworkMiniPlayer) ? {uri: this.state.currentTrack.artworkMiniPlayer} : defaultArtwork} style={styles.imageContainer}>
//         <Header noShadow transparent>
//           <Left>
//             <Button transparent onPress={() => this.props.navigation.goBack()}>
//               <Icon name="menu-fold" style={{ color: "#333", marginLeft: 5 }} size={24}/>
//             </Button>
//           </Left>
//           <Body>
//           <Title style={{color: "#333"}}>{this.state.currentTrack.title}</Title>
//           </Body>
//           {/*<Right>*/}
//             {/*<Button transparent>*/}
//               {/*/!*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*!/*/}
//             {/*</Button>*/}
//           {/*</Right>*/}
//         </Header>
//         <Content padder>
//           <ScrollView>
//             <View style={styles.artworkView}>
//               <Animated.Image rounded source={ (this.state.currentTrack.artworkMiniPlayer) ? {uri: this.state.currentTrack.artworkMiniPlayer} : defaultArtwork} style={[styles.artworkMiniPlayer, { transform: [{ rotate: RotateData }]}]} />
//             </View>
//             <View>
//               <Slider
//                 value={this.state.value}
//                 onValueChange={value => this.setState({ value })}
//                 thumbTouchSize={{width: 2, height: 2}}
//                 thumbStyle={{width: 2, height: 2}}
//               />
//             </View>
//           </ScrollView>
//         </Content>
//         </ImageBackground>}
//         {/*<MiniPlayer/>*/}
//       </Container>
//     );
//   }
// }
//
// const mapDispatchToProps = dispatch => ({
//   dispatch: dispatch
// });
//
// export default connect(mapDispatchToProps)(Player);
//
//
// // export default Player;
