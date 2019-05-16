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
import { FlatList, TouchableOpacity, ScrollView } from "react-native";
import View from "../../theme/components/View";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { ListItem } from 'react-native-elements';
import TrackPlayer from "../trackPlayer";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import HTMLView from "react-native-htmlview";

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";
const defaltCover = require('../../assets/defaultCover.jpeg');


class NowPlaying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
    };
  }

  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillMount() {
  }

  componentDidMount() {
    this._isMounted = true;
    console.log("queue");
    TrackPlayer.getQueue().then(queue => {
      console.log(queue);
      this._isMounted && this.setState({items: queue, loading: false});
    });
  };

  onItemPress = (item) => async () => {
    TrackPlayer.skip(item.id);
  };

  renderItem = ({ item }) => (
    <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id}>
      <Left>
        <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
          <Thumbnail square source={(item.artwork) ? { uri: item.artwork } : defaltCover} style={{borderRadius: 6}}/>
        </TouchableScale>
      </Left>
      <Body>
      <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
        <Text numberOfLines={1}>
          {item.title}
        </Text>
        <Text numberOfLines={1} note>
          {item.artist}
        </Text>
      </TouchableScale>
      </Body>
      <Right style={{ flexDirection: "row", alignItems: "center" }}>
        {/*<TouchableScale onPress={this.onAddNowPlayingPress(item)}>*/}
          {/*<Icon name="playlist-plus" size={28}/>*/}
        {/*</TouchableScale>*/}
      </Right>
    </ListItem>
  );

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.loading !== nextState.loading;
  // }

  render() {
    const items = this.state.items;
    return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
      <ScrollView>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

export default NowPlaying;
