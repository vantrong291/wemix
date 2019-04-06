import React, {Component} from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, ScrollView } from "react-native";
import styles from "../personal/styles";
import { Body, Button, Container, Content, Header, Left, Right, Title } from "native-base";
import variables from "../../theme/variables/commonColor";
import Icon from "../personal";

class Player extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          {/*<View style={{marginTop: 22}}>*/}
            {/*<View>*/}
              {/*<Text>Hello World!</Text>*/}

              {/*<TouchableHighlight*/}
                {/*onPress={() => {*/}
                  {/*this.setModalVisible(!this.state.modalVisible);*/}
                {/*}}>*/}
                {/*<Text>Hide Modal</Text>*/}
              {/*</TouchableHighlight>*/}
            {/*</View>*/}
          {/*</View>*/}
          <Container style={styles.container}>
            <Header
              // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
              androidStatusBarColor={variables.secondaryColor}
              iosBarStyle="light-content"
            >
              <Left>
                <Button transparent onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                  <Icon name="menu-fold" style={{ color: "#FFF", marginLeft: 5 }} size={24}/>
                </Button>
              </Left>
              <Body>
              <Title style={{color: "#FFF"}}>Trang cá nhân</Title>
              </Body>
              <Right>
                <Button transparent>
                  {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*/}
                </Button>
              </Right>
            </Header>
            <Content padder>
              <ScrollView>
                {/*<Text onPress={this._getSongs}>get songs</Text>*/}
              </ScrollView>
            </Content>
            {/*<MiniPlayer/>*/}
          </Container>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
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
