import React, { Component } from "react";
import {
  View,
} from "react-native";
import {
  Text,
} from "native-base";
import { MaterialTopTabBar, BottomTabBar} from "react-navigation";
import styles from "./style";
import TrackPlayer from "../trackPlayer";
import variables from "../../theme/variables/custom";
import Slider from "react-native-slider";
import {secondToMinuteString} from "../../api/TimeConvert";

class SeekBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentPosition: 0,
      duration: 0,
    };
  };

  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    let self = this;

    setInterval(() => {
      TrackPlayer.getPosition().then((position) => {
        // console.log(parseInt(position));
        this._isMounted && this.setState({ presentPosition: position });
      })
    },1000);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.presentPosition !== nextState.presentPosition;
  }

  onSliderComplete = (position) => {
    // this.setState({presentPosition: position});
    TrackPlayer.seekTo(parseInt(position));
  };

  render() {
    let duration = this.props.duration;
    let presentPosition = this.state.presentPosition;
    // let currentTrack = this.state.currentTrack;
    //
    // console.log(this.state.currentTrack);

    return (
      <View style={{flexDirection: "row", marginTop: 20}}>
        <View style={{width:"15%", alignItems:"center", alignSelf:"center" }}>
          <Text style={{fontSize: 12, color: variables.playerTextColor }}>{secondToMinuteString(presentPosition)}</Text>
        </View>
        <View style={{width:"70%"}}>
          <Slider
            value={this.state.presentPosition}
            // onValueChange={value => this.setState({ presentPosition: value })}
            style={styles.sliderContainer}
            trackStyle={styles.sliderTrack}
            thumbStyle={styles.sliderThumb}
            minimumTrackTintColor='#31a4db'
            thumbTouchSize={{ width: 50, height: 40 }}
            maximumValue={duration}
            step={1}
            onSlidingComplete={(position) => {this.onSliderComplete(position)}}
          />
        </View>
        <View style={{width:"15%", alignItems:"center", alignSelf:"center" }}>
          <Text style={{fontSize: 12, color:variables.playerTextColor}}>{secondToMinuteString(duration)}</Text>
        </View>
      </View>
    )
  }
}

export default SeekBar;
