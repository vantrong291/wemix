import React, { Component } from "react";
import {
  // View,
  // Alert,
  // Image,
  // Animated,
  // Easing,
  // AsyncStorage,
  // Modal,
  // ScrollView,
  ImageBackground,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  Button,
  // Text,
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
import EIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import Feather from "react-native-vector-icons/Feather";

import playerStyles from "./styles";
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


// class Player extends Component {
//   constructor(props) {
//     super(props);
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     this.updateIndex = this  .updateIndex.bind(this);
//     this.state = {
//       playerState: 0,
//       currentTrack: {},
//       playing: true,
//       loading: true,
//       modalVisible: false,
//       presentPosition: 10,
//       duration: 0,
//       playerStartValue: 0,
//       displayNowPlaying: false,
//       displayArtwork: true,
//       displayLyric: false,
//       selectedIndex: 1
//     };
//   }
//   presentPosition = 0;
//   _isMounted = false;
//
//   updateIndex(selectedIndex) {
//     this.setState({ selectedIndex: selectedIndex });
//     // console.log(selectedIndex);
//     if(selectedIndex == 0) {
//       this.setState({ displayNowPlaying: true, displayArtwork: false, displayLyric: false });
//     }
//     else if(selectedIndex == 1) {
//       this.setState({ displayNowPlaying: false, displayArtwork: true, displayLyric: false });
//     }
//     else if(selectedIndex == 2) {
//       this.setState({ displayNowPlaying: false, displayArtwork: false, displayLyric: true });
//     }
//   }
//
//
//   componentWillMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
//   }
//
//   componentWillUnmount() {
//     this._isMounted = false;
//     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
//   }
//
//   async handleBackButtonClick() {
//     await this.props.navigation.goBack();
//     // await this.props.dispatch(miniPlayerState(true));
//     let self = this;
//     setTimeout(await function () {
//       self.props.dispatch(miniPlayerState(true));
//     }, 100)
//     return true;
//   }
//
//   onPlay = () => {
//     let playing = !this.state.playing;
//     this._isMounted && this.setState({ playing: playing });
//     // console.log(this.state.playing);
//     TrackPlayer.play();
//   };
//
//   onPause = () => {
//     let playing = !this.state.playing;
//     this._isMounted && this.setState({ playing: playing });
//     TrackPlayer.pause();
//   };
//
//   onSkipNext = () => {
//     this._isMounted && this.setState({ playing: false });
//     TrackPlayer.skipToNext().then((res) => {
//       // console.log(res);
//       this._isMounted && this.setState({ playing: true });
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
//     this._isMounted && this.setState({ playing: false });
//     TrackPlayer.skipToPrevious().then(res => {
//       this._isMounted && this.setState({ playing: true });
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
//   onSliderComplete = (position) => {
//     // this.setState({presentPosition: position});
//     TrackPlayer.seekTo(parseInt(position));
//   };
//
//   async componentDidMount() {
//     this._isMounted = true;
//     let self = this;
//     // TrackPlayer.getPosition().then((position) => {
//     //   // console.log(parseInt(position));
//     //   this._isMounted && this.setState({ presentPosition: position });
//     // });
//
//     await TrackPlayer.getCurrentTrack().then(async (trackId) => {
//       // console.log(trackId);
//       const track = await TrackPlayer.getTrack(trackId);
//       this._isMounted && this.setState({ currentTrack: track });
//     });
//
//     await TrackPlayer.getDuration().then((duration) => {
//       // console.log(duration);
//       this._isMounted && this.setState({ duration: duration });
//       // self._isMounted && self.setState({ loading: false });
//     });
//
//
//     TrackPlayer.addEventListener("playback-track-changed", async (data) => {
//       if (data.nextTrack) {
//         const track = await TrackPlayer.getTrack(data.nextTrack);
//         this._isMounted && this.setState({ currentTrack: track });
//         // console.log(track)
//
//         TrackPlayer.getDuration().then((duration) => {
//           // console.log(duration);
//           this._isMounted && this.setState({ duration: duration });
//         });
//
//         // setTimeout(await function() {
//         //   self._isMounted && self.setState({ loading: false });
//         // }, 1000);
//       }
//     });
//
//     const { navigation } = this.props;
//     const playerState = navigation.getParam('playerState');
//     this._isMounted && this.setState({ playerState: playerState });
//
//     TrackPlayer.addEventListener("playback-state", (state) => {
//       this._isMounted && this.setState({ playerState: state.state });
//       // console.log(state);
//     });
//
//     // setInterval(() => {
//     //   TrackPlayer.getPosition().then((position) => {
//     //     // console.log(parseInt(position));
//     //     // this._isMounted && this.setState({ presentPosition: position });
//     //     this.presentPosition = position;
//     //   })
//     // },1000);
//
//     // setTimeout(await function () {
//     self._isMounted && self.setState({ loading: false });
//     // }, 500);
//   }
//
//   setModalVisible(visible) {
//     this.setState({ modalVisible: visible });
//   }
//
//   renderPlayerPlayPause = (playState, style) => {
//     return (this.state.playerState === 3)
//       ? (<Button transparent style={playerStyles.playButton} onPress={this.onPause}>
//         <Ionicons name="ios-pause" style={style} />
//       </Button>)
//       : (<Button transparent style={playerStyles.playButton} onPress={this.onPlay}>
//         <Ionicons name="ios-play" style={[style, { left: 4 }]} />
//       </Button>);
//   };
//
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   const { navigation } = this.props;
//   //   return navigation.getParam('currentTrack') !== nextProps.navigation.getParam('currentTrack');
//   // }
//
//   goBack = async () => {
//     await this.props.navigation.goBack();
//     // await this.props.dispatch(miniPlayerState(true));
//     let self = this;
//     setTimeout(await function () {
//       self.props.dispatch(miniPlayerState(true));
//     }, 100)
//   };
//
//   // shouldComponentUpdate
//
//   render() {
//     // let duration = this.state.duration;
//     // let presentPosition = this.presentPosition;
//     // console.log(this.state.playerState);
//
//     // const de = {
//     //   id: 1,
//     //   title: "La danza del fuego",
//     //   author: "Mago de Oz",
//     //   album: "Finisterra",
//     //   genre: "Folk",
//     //   duration: 121, // miliseconds
//     // };
//
//     // const { navigation } = this.props;
//     // const currentTrack = navigation.getParam('currentTrack', de);
//     // const duration = navigation.getParam('duration');
//     // // const duration = parseInt(currentTrack.duration) / 1000;
//     // console.log("fr "+duration);
//
//     const currentTrack = this.state.currentTrack;
//     const duration = this.state.duration;
//     // console.log(this.state.currentTrack);
//     const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
//     const selectedIndex = this.state.selectedIndex;
//
//     return (
//       <Container style={playerStyles.container}>
//         {!this.state.loading && <ImageBackground
//           blurRadius={15}
//           // source={(this.state.currentTrack.artwork) ? { uri: this.state.currentTrack.artwork } : defaultArtwork}
//           source={playerBackground}
//           style={styles.imageContainer}>
//           {/* <Carousel
//             autoplay={false}
//             loop={false}
//             index={1}
//           > */}
//           {this.state.displayNowPlaying && <View style={{ height: contentHeight }}>
//             <NowPlaying/>
//           </View>}
//
//           {this.state.displayArtwork && <View style={{ height: contentHeight }}>
//             <View noShadow transparent style={{ height: 70, paddingTop: 0, flexDirection: "row" }}>
//               <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15 }}>
//                 <Button transparent onPress={this.goBack}>
//                   <Icon name="chevron-thin-down" style={{ color: variables.playerTextColor, marginLeft: 5 }} size={24} />
//                 </Button>
//               </View>
//               <View style={{ width: "70%", alignSelf: "center" }}>
//                 <TextTicker
//                   duration={5000}
//                   loop
//                   bounce
//                   repeatSpacer={10}
//                   marqueeDelay={0}
//                   style={{ color: variables.playerTextColor, fontSize: 15 }}
//                 // onPress={() => NavigationService.navigate('Player')}>{this.state.currentTrack.title}</TextTicker>
//                 >{currentTrack.title}</TextTicker>
//                 <Text style={{ color: variables.playerTextColor, fontSize: 10 }}>{currentTrack.artist}</Text>
//               </View>
//             </View>
//             <View>
//               <ScrollView style={{ height: "100%" }}>
//                 <View style={playerStyles.artworkPlayerView}>
//                   <AnimationArtWork currentTrack={currentTrack} styles={playerStyles.artworkPlayer} />
//                 </View>
//                 <SeekBar duration={duration} />
//                 <View style={{ flexDirection: "row", height: 80 }}>
//                   <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
//                     <TouchableOpacity style={playerStyles.toolbarButton}>
//                       <MaterialCommunityIcons name="information-outline" style={playerStyles.toolbarIcon} />
//                     </TouchableOpacity>
//                   </View>
//                   <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
//                     <TouchableOpacity style={playerStyles.toolbarButton}>
//                       <MaterialCommunityIcons name="heart-outline" style={playerStyles.toolbarIcon} />
//                     </TouchableOpacity>
//                   </View>
//                   <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
//                     <PlayerMode />
//                     {/*<TouchableOpacity style={styles.toolbarButton}>*/}
//                     {/*<MaterialCommunityIcons name="priority-high" style={styles.toolbarIcon}/>*/}
//                     {/*</TouchableOpacity>*/}
//                   </View>
//                   <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
//                     <PlayerAction />
//                   </View>
//                 </View>
//               </ScrollView>
//             </View>
//           </View>}
//
//           {this.state.displayLyric && <View style={{ height: contentHeight }}>
//             <LyricView currentTrack={currentTrack} />
//           </View>}
//           {/* </Carousel> */}
//
//
//           <View>
//             <ButtonGroup
//               onPress={this.updateIndex}
//               selectedIndex={selectedIndex}
//               buttons={buttons}
//               containerStyle={{ height: 35, marginTop: 20, marginBottom: 20 }} />
//           </View>
//
//           <View style={playerStyles.songControlPlayerView}>
//             <TouchableOpacity>
//               <Ionicons button name="ios-skip-backward" style={styles.controlPlayerIcon} onPress={this.onSkipPrevious} />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               {/*<View style={styles.playButton}>*/}
//               {this.renderPlayerPlayPause(this.state.playState, playerStyles.playPausePlayerIcon)}
//               {/*</View>*/}
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Ionicons button name="ios-skip-forward" style={styles.controlPlayerIcon} onPress={this.onSkipNext} />
//             </TouchableOpacity>
//           </View>
//         </ImageBackground>}
//         {/*<MiniPlayer/>*/}
//       </Container>
//
//     );
//   }
// }

import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  Keyboard,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ViewPagerAndroid,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMDI from 'react-native-vector-icons/MaterialIcons'

import {
  CoordinatorLayout,
  BottomSheetHeader,
  MergedAppBarLayout,
  BackdropBottomSheet,
  BottomSheetBehavior,
  FloatingActionButton,
  ScrollingAppBarLayout,
} from 'react-native-bottom-sheet-behavior'

const { width, height } = Dimensions.get('window')

const anchorPoint = 235
const RippleColor = (...args) => (
    Platform.Version >= 21
        ? TouchableNativeFeedback.Ripple(...args)
        : null
)

const WHITE = '#FFFFFF'
const PRIMARY_COLOR = '#21B540'
const STATUS_BAR_COLOR = '#21B540'
const STAR_COLOR = '#FF5722'

const { STATE_ANCHOR_POINT, STATE_COLLAPSED } = BottomSheetBehavior

const images = [
  require('../../assets/defaultCover.jpeg'),
  require('../../assets/1-iphone-5-wallpaper.png'),
  require('../../assets/bg.jpg')
]

const initialRegion = {
  latitude: -22.920,
  longitude: -43.190,
  latitudeDelta: 0.1022,
  longitudeDelta: 0.0421,
}

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
      selectedIndex: 1,

      hidden: false,
      viewPagerSelected: 0,
    };
  }

  static contextTypes = {
    openDrawer: PropTypes.func,
  };



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
        ? (<Button transparent style={playerStyles.playButton} onPress={this.onPause}>
          <Ionicons name="ios-pause" style={style} />
        </Button>)
        : (<Button transparent style={playerStyles.playButton} onPress={this.onPlay}>
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


  // state = {
  //   hidden: false,
  //   viewPagerSelected: 0,
  // };

  handleOpenDrawer = () => {
    Keyboard.dismiss()
    this.context.openDrawer()
  }

  handleFabPress = () => {
    ToastAndroid.show('Pressed', ToastAndroid.SHORT)
  }

  handleState = (state) => {
    this.bottomSheet.setBottomSheetState(state)
  }

  handleHeaderPress = () => {
    this.handleState(STATE_ANCHOR_POINT)
  }

  handleViewPager = (e) => {
    this.setState({ viewPagerSelected: e.nativeEvent.position })
  }

  renderCard(source, title) {
    return (
        <View style={styles.card}>
          <Image source={source} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDetail}>Beer</Text>
            <View style={styles.cardStars}>
              <Text style={{ fontSize: 10, color: STAR_COLOR }}>4.2</Text>
              <Icon color={STAR_COLOR} name="md-star" size={10} />
              <Icon color={STAR_COLOR} name="md-star" size={10} />
              <Icon color={STAR_COLOR} name="md-star" size={10} />
              <Icon color={STAR_COLOR} name="md-star" size={10} />
              <Icon color={STAR_COLOR} name="md-star" size={10} />
              <Text style={{fontSize: 10}}>(52)</Text>
            </View>
          </View>
        </View>
    )
  }

  renderComment(index) {
    return (
        <View style={styles.comment}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/default-avatar.png')} style={styles.picture} />
            <View style={styles.commentLine} />
          </View>
          <View style={styles.commentContent}>
            <Text style={styles.commentName}>Lorem Ipsum</Text>
            <Text style={styles.commentNumberReviews}>2 reviews</Text>
            <View style={styles.commentStars}>
              <Icon color={STAR_COLOR} name="md-star" size={14} />
              <Icon color={STAR_COLOR} name="md-star" size={14} />
              <Icon color={STAR_COLOR} name="md-star" size={14} />
              <Icon color={STAR_COLOR} name="md-star" size={14} />
              <Icon color={STAR_COLOR} name="md-star" size={14} />
              <Text style={{fontSize: 12, marginLeft: 6}}>a month ago</Text>
            </View>
            <Text style={styles.commentDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget blandit sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla dui eros, gravida vitae mollis in, auctor eget sapien. In suscipit quam non tempus eleifend. Ut lacus massa, pellentesque vitae condimentum eu, dictum et metus
            </Text>
            <View style={styles.commentButtons}>
              <View style={styles.commentButton}>
                <Icon color='#ccc' name='md-thumbs-up' size={22} />
                <Text style={styles.commentButtonLabel}>Helpful?</Text>
              </View>
              <View style={styles.commentButton}>
                <Icon color='#ccc' name='md-share' size={22} />
                <Text style={styles.commentButtonLabel}>Share</Text>
              </View>
            </View>
          </View>
        </View>
    )
  }

  renderDetailItem(icon, text) {
    return (
        <TouchableNativeFeedback delayPressIn={0} delayPressOut={0} background={RippleColor('#d1d1d1')}>
          <View>
            <View pointerEvents="none" style={styles.detailItem}>
              <Icon name={icon} size={22} color={PRIMARY_COLOR} />
              <Text pointerEvents="none" style={styles.detailText}>{text}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
    )
  }

  renderBottomSheetContent() {
    return (
        <View style={styles.bottomSheetContent}>
          <View style={[styles.section, styles.takeoutSection]}>
            <Text style={[styles.sectionTitle, {marginLeft: 20}]}>Takeout</Text>
            <View style={styles.cards}>
              <NowPlaying/>
            </View>
          </View>
        </View>
    )
  }

  renderFloatingActionButton() {
    return (
        <FloatingActionButton
            autoAnchor
            elevation={18}
            rippleEffect={true}
            rippleColor="#55ffffff"
            icon="directions"
            iconProvider={IconMDI}
            iconColor={WHITE}
            iconColorExpanded={PRIMARY_COLOR}
            onPress={this.handleFabPress}
            backgroundColor={PRIMARY_COLOR}
            backgroundColorExpanded={WHITE}
        />
    )
  }

  renderBackdropPager(source) {
    return (
        <View>
          <Image resizeMode="cover" style={{width, height: anchorPoint}} source={source} />
        </View>
    )
  }

  renderBackdrop() {
    const { viewPagerSelected } = this.state
    return (
        <BackdropBottomSheet height={anchorPoint}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <ViewPagerAndroid onPageSelected={this.handleViewPager} style={{flex: 1}}>
              {this.renderBackdropPager(images[1])}
              {this.renderBackdropPager(images[0])}
              {this.renderBackdropPager(images[2])}
            </ViewPagerAndroid>
            <View style={styles.dots}>
              <View style={[styles.dot, viewPagerSelected === 0 && styles.dotActive]} />
              <View style={[styles.dot, viewPagerSelected === 1 && styles.dotActive]} />
              <View style={[styles.dot, viewPagerSelected === 2 && styles.dotActive]} />
            </View>
          </View>
        </BackdropBottomSheet>
    )
  }

  renderMergedAppBarLayout() {
    return (
        <MergedAppBarLayout
            mergedColor={PRIMARY_COLOR}
            toolbarColor={PRIMARY_COLOR}
            statusBarColor={STATUS_BAR_COLOR}
            style={styles.appBarMerged}>
          <Icon.ToolbarAndroid
              navIconName="md-arrow-back"
              overflowIconName='md-more'
              title='React Native Bar!'
              titleColor={WHITE}
              style={{elevation: 6}}
              onIconClicked={() => this.handleState(STATE_COLLAPSED)}
              actions={[
                {title: 'Search', show: 'always', iconName: 'md-search' },
                {title: 'More'}
              ]}
          />
        </MergedAppBarLayout>
    )
  }

  renderBottomSheet() {
    return (
        <BottomSheetBehavior
            anchorEnabled
            anchorPoint={anchorPoint}
            peekHeight={55}
            elevation={8}
            ref={(bottomSheet) => { this.bottomSheet = bottomSheet }}
            onSlide={this.handleSlide}
            onStateChange={this.handleBottomSheetChange}>
          <View style={styles.bottomSheet}>
            <BottomSheetHeader
                onPress={this.handleHeaderPress}
                textColorExpanded={WHITE}
                backgroundColor={WHITE}
                backgroundColorExpanded={PRIMARY_COLOR}>
              <View pointerEvents='none' style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetLeft}>
                  <Text selectionColor={'#000'} style={styles.bottomSheetTitle}>
                    Now Playing
                  </Text>
                  {/*<View style={styles.starsContainer}>*/}
                    {/*<Text style={{marginRight: 8}} selectionColor={STAR_COLOR}>5.0</Text>*/}
                    {/*<Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />*/}
                    {/*<Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />*/}
                    {/*<Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />*/}
                    {/*<Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />*/}
                    {/*<Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />*/}
                  {/*</View>*/}
                </View>
                {/*<View style={styles.bottomSheetRight}>*/}
                  {/*<Text style={styles.routeLabel} selectionColor={PRIMARY_COLOR}>4 min</Text>*/}
                {/*</View>*/}
              </View>
            </BottomSheetHeader>
            {this.renderBottomSheetContent()}
          </View>
        </BottomSheetBehavior>
    )
  }

  renderMaps() {
    const currentTrack = this.state.currentTrack;
    const duration = this.state.duration;
    // console.log(this.state.currentTrack);
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    const selectedIndex = this.state.selectedIndex;
    return this.state.loading ?  null : (
        <ImageBackground
              blurRadius={15}
              // source={(this.state.currentTrack.artwork) ? { uri: this.state.currentTrack.artwork } : defaultArtwork}
              source={playerBackground}
              style={[playerStyles.imageContainer, styles.containerMap]}>
            {/* <Carousel
            autoplay={false}
            loop={false}
            index={1}
          > */}
            {/*{this.state.displayNowPlaying && <View style={{ height: contentHeight }}>*/}
              {/*<NowPlaying/>*/}
            {/*</View>}*/}

            <View style={{ height: contentHeight }}>
              <View noShadow transparent style={{ height: 70, paddingTop: 0, flexDirection: "row" }}>
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15 }}>
                  <Button transparent onPress={this.goBack}>
                    <EIcon name="chevron-thin-down" style={{ color: variables.playerTextColor, marginLeft: 5 }} size={24} />
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
                  <View style={playerStyles.artworkPlayerView}>
                    <AnimationArtWork currentTrack={currentTrack} styles={playerStyles.artworkPlayer} />
                  </View>
                  <SeekBar duration={duration} />
                  <View style={{ flexDirection: "row", height: 80 }}>
                    <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
                      <TouchableOpacity style={playerStyles.toolbarButton}>
                        <MaterialCommunityIcons name="information-outline" style={playerStyles.toolbarIcon} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
                      <TouchableOpacity style={playerStyles.toolbarButton}>
                        <MaterialCommunityIcons name="heart-outline" style={playerStyles.toolbarIcon} />
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
            </View>

            {/*{this.state.displayLyric && <View style={{ height: contentHeight }}>*/}
              {/*<LyricView currentTrack={currentTrack} />*/}
            {/*</View>}*/}
            {/* </Carousel> */}


            {/*<View>*/}
              {/*<ButtonGroup*/}
                  {/*onPress={this.updateIndex}*/}
                  {/*selectedIndex={selectedIndex}*/}
                  {/*buttons={buttons}*/}
                  {/*containerStyle={{ height: 35, marginTop: 20, marginBottom: 20 }} />*/}
            {/*</View>*/}

            <View style={playerStyles.songControlPlayerView}>
              <TouchableOpacity>
                <Ionicons button name="ios-skip-backward" style={playerStyles.controlPlayerIcon} onPress={this.onSkipPrevious} />
              </TouchableOpacity>
              <TouchableOpacity>
                {/*<View style={styles.playButton}>*/}
                {this.renderPlayerPlayPause(this.state.playState, playerStyles.playPausePlayerIcon)}
                {/*</View>*/}
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons button name="ios-skip-forward" style={playerStyles.controlPlayerIcon} onPress={this.onSkipNext} />
              </TouchableOpacity>
            </View>
          </ImageBackground>

    )
  }

  renderToolbar() {
    const currentTrack = this.state.currentTrack;
    return (
        <ScrollingAppBarLayout
            style={styles.scrollAppBar}
            statusBarColor={STATUS_BAR_COLOR}
        >
          <Icon.ToolbarAndroid
              titleColor={WHITE}
              title={this.state.currentTrack.title}
              navIconName={'md-menu'}
              style={styles.toolbar}
              onIconClicked={() => this.context.openDrawer()} />
        </ScrollingAppBarLayout>
    )
  }

  render() {
    return (
        <CoordinatorLayout style={styles.container}>
          {/*<StatusBar translucent barStyle='dark-content' backgroundColor={STATUS_BAR_COLOR} />*/}
          {/*{this.renderToolbar()}*/}
          {/*<ScrollingAppBarLayout >*/}
            {/*<View style={{width:0,height:0,right:0}}>*/}
              {/*<Text/>*/}
            {/*</View>*/}
            {/*/!*<ToolbarAndroid />*!/*/}
          {/*</ScrollingAppBarLayout>*/}
          {/*<View style={{width:0,height:0,right:0, backgroundColor: "transparent"}}>*/}
            {/*<Text/>*/}
          {/*</View>*/}
          <View style={styles.content}>
            {this.renderMaps()}
          </View>
          {this.renderBackdrop()}
          {this.renderBottomSheet()}
          {this.renderMergedAppBarLayout()}
          {this.renderFloatingActionButton()}
        </CoordinatorLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    backgroundColor: 'transparent',
  },
  scrollAppBar: {
    zIndex: 1,
  },
  toolbar: {
    backgroundColor: "transparent",
  },
  appBarMerged: {
    backgroundColor: 'transparent',
  },
  containerMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height,
    width,
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonIcon: {
    padding: 16,
    borderRadius: 50,
  },
  toolbarInput: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 8,
  },
  bottomSheet: {
    // height,
    zIndex: 5,
    backgroundColor: 'white'
  },
  bottomSheetHeader: {
    padding: 16,
    paddingLeft: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Don't forget this if you are using BottomSheetHeader
    backgroundColor: 'transparent'
  },
  bottomSheetLeft: {
    flexDirection: 'column'
  },
  bottomSheetRight: {
    flexDirection: 'column'
  },
  bottomSheetTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
  },
  dots: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    marginHorizontal: 4,
    opacity: 0.8,
    backgroundColor: WHITE,
    borderRadius: 50,
  },
  dotActive: {
    width: 10,
    height: 10,
    opacity: 1,
  },
  bottomSheetContent: {
    // flex: 1,
    backgroundColor: WHITE,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
  routeLabel: {
    marginTop: 32,
    marginRight: 12,
    fontSize: 12,
    fontFamily: 'sans-serif-medium',
  },
  sectionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  iconBox: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'column'
  },
  iconLabel: {
    fontSize: 14,
    marginTop: 4,
    color: PRIMARY_COLOR
  },
  detailListSection: {
    paddingVertical: 8,
  },
  detailItem: {
    height: 42,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 26,
  },
  detailText: {
    color: '#333',
    fontSize: 14,
    marginLeft: 24,
    lineHeight: 22,
  },
  section: {
    padding: 22,
    borderColor: '#eee',
    borderTopWidth: 1,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
  },
  reviewStats: {
    marginTop: 20,
    flexDirection: 'row',
  },
  reviewStars: {
    flexDirection: 'column',
    paddingRight: 8,
  },
  reviewStatsItem: {
    marginTop: 4,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewBar: {
    paddingHorizontal: 8,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: STAR_COLOR
  },
  reviewAverage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAverageText: {
    fontSize: 42,
    textAlign: 'center',
    color: STAR_COLOR,
    fontWeight: '200',
  },
  reviewAverageStars: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  rateSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  picture: {
    width: 38,
    height: 38,
    borderRadius: 50,
    zIndex: 2,
  },
  rateTitle: {
    color: '#333',
    marginTop: 10,
  },
  rateStars: {
    marginTop: 12,
    flexDirection: 'row',
  },
  rateStar: {
    color: 'grey',
    marginHorizontal: 12,
  },
  comment: {
    paddingTop: 24,
    flexDirection: 'row',
  },
  commentLine: {
    position: 'absolute',
    width: 3,
    height: 240,
    zIndex: 1,
    backgroundColor: '#eee',
  },
  commentContent: {
    flexDirection: 'column',
    marginLeft: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  commentName: {
    color: '#333',
    fontFamily: 'sans-serif-medium',
  },
  commentNumberReviews: {
    fontSize: 10,
  },
  commentStars: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentDescription: {
    width: width - 100
  },
  commentButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
  },
  commentButtonLabel: {
    fontSize: 12,
    marginLeft: 10,
  },
  moreReviews: {
    color: PRIMARY_COLOR,
    marginTop: 20,
    marginLeft: 52,
    fontFamily: 'sans-serif-medium',
  },
  takeoutSection: {
    borderTopWidth: 1,
    paddingHorizontal: 0,
    borderColor: '#ccc',
    backgroundColor: '#eee',
  },
  cards: {
    // height: 200,
    minHeight: 1000,
    marginTop: 20,
  },
  card: {
    width: 130,
    height: 170,
    marginHorizontal: 5,
    elevation: 2,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: WHITE,
  },
  cardImage: {
    width: 130,
    height: 100,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  cardContent: {
    flexDirection: 'column',
    paddingTop: 4,
    paddingHorizontal: 8,
  },
  cardTitle: {
    color: '#333',
    fontFamily: 'sans-serif-medium',
  },
  cardDetail: {
    fontSize: 10,
  },
  cardStars: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})


const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapDispatchToProps)(Player);