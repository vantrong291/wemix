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
import { FlatList } from "react-native"
import View from "../../theme/components/View";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import TrackPlayer from "../trackPlayer";

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";


class ChartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: [],
      loading: true
    }
  }


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const url = this.props.rankUrl;
    axios.get(url)
      .then((res) => {
        this._isMounted && this.setState({ loading: false });
        this._isMounted && this.setState({ chart: res.data });
      })
  };

  onItemPress = (item) => async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: item.id,
      url: item.download_url,
      title: item.name,
      artist: item.singer,
      artwork: item.image310,
      album: item.album ? item.album : "Chưa xác định",
      genre: item.genre ? item.genre : "Chưa xác định",
      description: item.lyric
      // duration: song.duration,
    });
    await TrackPlayer.play();
  };

  onAddNowPlayingPress = (item) => async () => {
    await TrackPlayer.add({
      id: item.id,
      url: item.download_url,
      title: item.name,
      artist: item.singer,
      artwork: item.image310,
      album: item.album ? item.album : "Chưa xác định",
      genre: item.genre ? item.genre : "Chưa xác định",
      description: item.lyric
      // duration: song.duration,
    });
    // await TrackPlayer.play();
  };

  renderChart = ({ item }) => (
    <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id}>
      <Left>
        <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
          <Thumbnail square source={{ uri: item.image }} style={{borderRadius: 6}}/>
        </TouchableScale>
      </Left>
      <Body>
        <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
          <Text>
            {item.name}
          </Text>
          <Text numberOfLines={1} note>
            {item.singer}
          </Text>
        </TouchableScale>
      </Body>
      <Right style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableScale onPress={this.onAddNowPlayingPress(item)}>
          <Icon name="playlist-plus" size={28} />
        </TouchableScale>
      </Right>
    </ListItem>
  );

  render() {
    const datas = this.state.chart.data;
    // console.log(datas);
    // return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
    //   <List>
    //     {this.renderChart()}
    //   </List>
    //   );
    return (this.state.loading) ? (<Spinner color="#f27010" />) : (
      <FlatList
        data={datas}
        renderItem={this.renderChart}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }
}

export default ChartItem;
