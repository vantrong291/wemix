import React, {Component} from "react";
import {Spinner, Text} from "native-base";
import axios from "axios";
import {FlatList, Image} from "react-native";
// import { ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import styles from "./styles";
import NavigationService from "../../NavigationService";
import { Col, Row, Grid } from "react-native-easy-grid";


const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

const PAGE = 1;
const NUM = 20;
const albumHotUrl = `http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getSingerList?page=${PAGE}&num=${NUM}`;

class SingerHot extends Component {
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
    NavigationService.navigate('Singer', {"slug": item.slug});
  };

  renderItem = ({ item }) => (
    <TouchableScale activeScale={0.95} style={styles.albumContainer} onPress={this.onPressItem(item)}>
      <Image source={{ uri: item.image310 }} style={styles.albumCover}/>
      <Text style={{ alignSelf: "center", color: "#333", fontSize: 13,  padding: 5 }}>{item.name}</Text>
      {/*<Text style={{ alignSelf: "center", fontSize: 10 }}>{item.singer}</Text>*/}
    </TouchableScale>
  );

  render() {
    const datas = this.state.lists;

    return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
      <FlatList
          horizontal
        data={datas}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default SingerHot;
