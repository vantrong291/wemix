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
import axios from "axios";
import { FlatList, TouchableOpacity, ScrollView } from "react-native"
import View from "../../theme/components/View";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// import { ListItem } from 'react-native-elements';
import TrackPlayer from "../trackPlayer";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import HTMLView from 'react-native-htmlview';

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

class LyricView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyric: ''
    }
  }

  _isMounted = false;
  lyric = ''

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillMount() {
    const currentTrack = this.props.currentTrack;
    
    this.lyric = currentTrack.description;
  }

  componentDidMount() {
    this._isMounted = true;
    const lyric = this.props.currentTrack.description;
    this._isMounted && this.setState({lyric: lyric});
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.loading !== nextState.loading;
  // }

  render() {
    const rawLyric = this.lyric;
    return (
      <ScrollView>
        <HTMLView value={rawLyric}/>
      </ScrollView>
    )
    
    // return <Text style={{ alignSelf: "center", marginTop: 20 }}>Không có kết quả</Text>;
  }
}

export default LyricView;
