import React, { Component } from "react";
import { Body, Left, ListItem, Right, Spinner, Text, Thumbnail, Title } from "native-base";
import axios from "axios";
import { FlatList, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { FlatGrid } from 'react-native-super-grid';
import NavigationService from '../../NavigationService';
import styles from "./styles";

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

const PAGE = 1;
const NUM = 20;
const albumHotUrl = `http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getListAlbumHotV1?page=${PAGE}&num=${NUM}`;

class AlbumHot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      loading: true
    };
  }


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get(albumHotUrl)
      .then((res) => {
        this._isMounted && this.setState({ lists: res.data.data });
        this._isMounted && this.setState({ loading: false });
      });
  };

  onPressItem = (item) => async () => {
    NavigationService.navigate('Album', {"identify": item.identify});
  };

  renderItem = ({ item }) => (
    <TouchableScale activeScale={0.95} style={styles.albumContainer} onPress={this.onPressItem(item)}>
      <Image source={{ uri: item.image }} style={styles.albumCover}/>
      <Text style={{ alignSelf: "center", color: "#333", fontSize: 13,  padding: 5 }}>{item.name}</Text>
      <Text style={{ alignSelf: "center", fontSize: 10 }}>{item.singer}</Text>
    </TouchableScale>
  );

  render() {
    const datas = this.state.lists;

    return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
        <FlatGrid
            itemDimension={150}
            items={datas}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item, index }) => (
                <TouchableScale activeScale={0.98} style={styles.albumContainer} onPress={this.onPressItem(item)}>
                  <Image source={{ uri: item.image }} style={styles.albumCover}/>
                  <Text style={{ alignSelf: "center", color: "#333", fontSize: 13,  paddingHorizontal: 5, paddingTop: 5 }} numberOfLines={1}>{item.name}</Text>
                  <Text style={{ alignSelf: "center", fontSize: 10, paddingHorizontal: 5 }} numberOfLines={1}>{item.singer}</Text>
                </TouchableScale>
            )}
        />
    );
  }
}

export default AlbumHot;
