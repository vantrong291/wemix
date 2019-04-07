import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body, Spinner
} from "native-base";
import { Animated, Easing } from "react-native";
import styles from "../miniPlayer/style";
import TrackPlayer from "../trackPlayer";
import { connect } from "react-redux";


const defaultArtwork = require("../../assets/defaultCover.jpeg");


class AnimationArtWork extends Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      currentTrack: {},
      loading: true,
    }
  }


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    this.startImageRotateFunction();
  };

  startImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 9000,
      easing: Easing.linear
    }).start(() => this.startImageRotateFunction());
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    // let
    return (
      <Animated.Image rounded
                      source={(this.props.currentTrack.artwork) ? { uri: this.props.currentTrack.artwork } : defaultArtwork}
                      style={[this.props.styles, { transform: [{ rotate: RotateData }] }]}/>
    )
  }
}
//
// const mapStateToProps = state => ({
//   scurrentTrack: state.currentTrack
// });
//
// export default connect(mapStateToProps)(AnimationArtWork);

export default AnimationArtWork;