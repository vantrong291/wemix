// import React, { Component } from "react";
// import {
//   Container,
//   Header,
//   Title,
//   Content,
//   Button,
//   List,
//   ListItem,
//   Text,
//   Thumbnail,
//   Left,
//   Right,
//   Body, Spinner
// } from "native-base";
// import axios from "axios";
// import { FlatList, ImageBackground, ScrollView, Image } from "react-native";
// import View from "../../theme/components/View";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// // import { ListItem } from 'react-native-elements';
// import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
// import TrackPlayer from "../trackPlayer";
// import styles from "./styles";
//
// const imgUrl = "http://vip.img.cdn.keeng.vn";
// const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";
//
// const singerUrl = "http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getSingerDetailAll?slug=";
//
// class SingerItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lists: [],
//       loading: true,
//       singerInfo: []
//     };
//   }
//
//
//   _isMounted = false;
//
//   componentWillUnmount() {
//     this._isMounted = false;
//   }
//
//   componentDidMount() {
//     this._isMounted = true;
//     const slug = this.props.slug;
//     const url = singerUrl + slug;
//     axios.get(url)
//       .then((res) => {
//         this._isMounted && this.setState({ lists: res.data.data.media_item.list_song });
//         this._isMounted && this.setState({ singerInfo: res.data.data });
//         this._isMounted && this.setState({ loading: false });
//       });
//   };
//
//   onItemPress = (item) => async () => {
//     await TrackPlayer.reset();
//     await TrackPlayer.add({
//       id: item.id,
//       url: item.download_url,
//       title: item.name,
//       artist: item.singer,
//       artwork: item.image310,
//       album: item.album ? item.album : "Chưa xác định",
//       genre: item.genre ? item.genre : "Chưa xác định",
//       description: item.lyric
//       // duration: song.duration,
//     });
//     await TrackPlayer.play();
//   };
//
//   onAddNowPlayingPress = (item) => async () => {
//     await TrackPlayer.add({
//       id: item.id,
//       url: item.download_url,
//       title: item.name,
//       artist: item.singer,
//       artwork: item.image310,
//       album: item.album ? item.album : "Chưa xác định",
//       genre: item.genre ? item.genre : "Chưa xác định",
//       description: item.lyric
//       // duration: song.duration,
//     });
//     // await TrackPlayer.play();
//   };
//
//   renderItem = ({ item }) => (
//     <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id}>
//       <Left>
//         <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
//           <Thumbnail square source={{ uri: item.image }} style={{borderRadius: 6}}/>
//         </TouchableScale>
//       </Left>
//       <Body>
//       <TouchableScale  activeScale={0.98} onPress={this.onItemPress(item)}>
//         <Text numberOfLines={1}>
//           {item.name}
//         </Text>
//         <Text numberOfLines={1} note>
//           {item.singer}
//         </Text>
//       </TouchableScale>
//       </Body>
//       <Right style={{ flexDirection: "row", alignItems: "center" }}>
//         <TouchableScale onPress={this.onAddNowPlayingPress(item)}>
//           <Icon name="playlist-plus" size={28}/>
//         </TouchableScale>
//       </Right>
//     </ListItem>
//   );
//
//   render() {
//     const datas = this.state.lists;
//     const singerCover = this.state.singerInfo.cover ? this.state.singerInfo.cover : this.state.singerInfo.image310;
//     const singerName = this.state.singerInfo.name;
//     // console.log(singerCover);
//
//     return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
//         <ScrollView style={{ paddingBottom: 50 }}>
//           <Image source={{ uri: singerCover }} style={styles.singerCover}/>
//           <Title style={{alignSelf: "center", color: "#333"}}>Các ca khúc của {singerName}</Title>
//           <Text style={{alignSelf: "center"}}>________________________</Text>
//           <FlatList
//             data={datas}
//             renderItem={this.renderItem}
//             keyExtractor={(item, index) => index.toString()}
//           />
//         </ScrollView>
//
//     );
//   }
// }
//
// export default SingerItem;
