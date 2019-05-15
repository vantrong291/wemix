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
import { FlatList, TouchableOpacity } from "react-native"
import View from "../../theme/components/View";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// import { ListItem } from 'react-native-elements';
import TrackPlayer from "../trackPlayer";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import NavigationService from '../../NavigationService';


const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    console.log('Mounted');
    setTimeout(() => {
      this._isMounted && this.setState({ loading: false })
    }, 500)
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loading !== nextState.loading;
  }

  onItemPress = (item) => async () => {
    const type = this.props.type;
    if (type === "song") {
      // console.log(item);
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: item.id,
        url: mediaUrl + item.url,
        title: item.full_name,
        artist: item.full_singer,
        artwork: imgUrl + item.image,
        album: item.album ? item.album : "Chưa xác định",
        genre: item.genre ? item.genre : "Chưa xác định",
        // duration: song.duration,
      });
      await TrackPlayer.play();

    }
    else if (type === "singer") {
      console.log(item.full_name);
      NavigationService.navigate('Singer', {"slug": item.slug});
    }
    else if (type === "album") {
      console.log(item.identify);
      NavigationService.navigate('Album', {"identify": item.identify});
    }
    // else if (type === "playlist") {
    //   console.log(item.full_name);
    // }
  };

  onAddNowPlayingPress = (item) => async () => {
    await TrackPlayer.add({
      id: item.id,
      url: mediaUrl + item.url,
      title: item.full_name,
      artist: item.full_singer,
      artwork: imgUrl + item.image,
      album: item.album ? item.album : "Chưa xác định",
      genre: item.genre ? item.genre : "Chưa xác định",
      // duration: song.duration,
    });
    // await TrackPlayer.play();
  };

  renderItem = ({ item }) => (
    <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id}>
      <Left>
        <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
          <Thumbnail square source={{ uri: imgUrl + item.image }} style={{borderRadius: 6}}/>
        </TouchableScale>
      </Left>
      <Body>
        <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
          <Text numberOfLines={1}>
            {item.full_name}
          </Text>
          <Text numberOfLines={1} note>
            {item.full_singer}
          </Text>
        </TouchableScale>
      </Body>
      <Right style={{ flexDirection: "row", alignItems: "center" }}>
        {this.props.type === "song" && <TouchableScale onPress={this.onAddNowPlayingPress(item)}>
          <Icon name="playlist-plus" size={28} />
        </TouchableScale>}
      </Right>
    </ListItem>
  );

  render() {
    const datas = this.props.data;
    // console.log(datas);
    // return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
    //   <List>
    //     {this.renderChart()}
    //   </List>
    //   );
    // return (this.state.loading) ? (<Spinner color="#f27010" />) : (
    //   <FlatList
    //     data={datas}
    //     renderItem={this.renderChart}
    //     keyExtractor={(item, index) => index.toString()}
    //   />
    // )
    if (datas.length !== 0) {
      return (this.state.loading) ? (<Spinner color="#f27010" />) : (
        <FlatList
          data={datas}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )
    }
    return <Text style={{ alignSelf: "center", marginTop: 20 }}>Không có kết quả</Text>;
  }
}

export default SearchItem;
