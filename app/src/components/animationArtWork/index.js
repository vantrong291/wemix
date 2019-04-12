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


class AnimationArtWork extends React.PureComponent {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
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
      duration: 6000,
      easing: Easing.linear
    }).start(() => this.startImageRotateFunction());
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.currentTrack !== nextProps.currentTrack;
  // }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    // let
    // console.log(1);

    return (
      <Animated.Image rounded
                      source={(this.props.currentTrack.artwork) ? { uri: this.props.currentTrack.artwork } : defaultArtwork}
                      style={[this.props.styles, { transform: [{ rotate: RotateData }] }]}
                      // style={[this.props.styles ]}
      />
    )
  }
}

// const mapStateToProps = state => ({
//   scurrentTrack: state.currentTrack
// });
//
// export default connect(mapStateToProps)(AnimationArtWork);

export default AnimationArtWork;