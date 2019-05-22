import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Text, Item, Input, Form, Tab, Tabs, ListItem, Thumbnail, Spinner, H2, H3
} from "native-base";
import { View, ScrollView, AsyncStorage, Alert, FlatList, Keyboard } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/SimpleLineIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom";
import SearchItem from "../../components/searchItem";
import axios from "axios";

import { Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import RecommendSong from "../../components/recommendSongs";

const imgurl = "http://vip.img.cdn.keeng.vn";


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      song_result: [],
      singer_result: [],
      playlist_result: [],
      album_result: [],
      loading: false,
      displayRecent: true,
      displaySearch: false,
    }
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSearch = () => {
    const keyword = this.state.keyword;
    Keyboard.dismiss();
    if (keyword.length !== 0) {
      this._isMounted && this.setState({ loading: true, displayRecent: false });
      console.log(keyword);
      let self = this;
      // this._isMounted && this.setState({ keyword: keyword });
      axios.get('http://testrec.keeng.net/solr/media/select/?group=true&group.limit=20&group.field=type&sort=score%20desc,%20listen_no%20desc&wt=json&', {
        params: {
          indent: true,
          q: keyword,
        }
      }).then((res) => {
        const all_group = (res.data.grouped.type.groups);
        //console.log(all_group);
        if (self._isMounted) {
          const songsArr = Object.values(all_group).filter(group => group.groupValue === 'song');
          const songs = songsArr.length !== 0 ? songsArr[0].doclist.docs : [];
          self.setState({ song_result: songs });

          const singersArr = Object.values(all_group).filter(group => group.groupValue === 'singer');
          const singers = singersArr.length !== 0 ? singersArr[0].doclist.docs : [];
          self.setState({ singer_result: singers });

          const albumsArr = Object.values(all_group).filter(group => group.groupValue === 'album');
          const albums = albumsArr.length !== 0 ? albumsArr[0].doclist.docs : [];
          self.setState({ album_result: albums });

          const playlistsArr = Object.values(all_group).filter((group) => group.groupValue === 'playlist');
          const playlists = playlistsArr.length !== 0 ? playlistsArr[0].doclist.docs : [];
          self.setState({ playlist_result: playlists });
        }
        this._isMounted && this.setState({ loading: false, displaySearch: true });
      }).catch((res) => {
        console.log(res);
      })
    }
    else {
      Alert.alert(
        "Oppp :(",
        "Bạn chưa nhập keyword kìa :(",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    }
  };

  onUpdate = (keyword) => {
    const url = "http://testrec.keeng.net/solr/media/select/?wt=json&fl=id,score,listen_no,type,full_name,full_singer,is_singer,search_info,url,slug,identify,image&sort=score%20desc,%20listen_no%20desc&indent=true&fq=type:song&rows=20&start=0&";
    if (keyword.length === 0) {
      this._isMounted && this.setState({ displayRecent: true });
    }
    this._isMounted && this.setState({ keyword: keyword });
  };

  // renderItem = ({ item }) => (
  //   <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id} onPress={() => console.log("Pressed " + item.full_name)}>
  //     <Left>
  //       <Thumbnail square source={{ uri: imgurl + item.image }} />
  //     </Left>
  //     <Body>
  //       <Text>
  //         {item.full_name}
  //       </Text>
  //       <Text numberOfLines={1} note>
  //         {item.full_singer}
  //       </Text>
  //     </Body>
  //     <Right style={{ flexDirection: "row", alignItems: "center" }}>
  //       <Icon name="control-play" size={20} style={{ marginRight: 15 }} />
  //       <Icon name="plus" size={20} />
  //     </Right>
  //   </ListItem>
  // );

  // onSingerPress = (name) => {
  //   console.log("Singer " + name);
  // }

  // renderResult = (result) => {
  //   if (result.length !== 0) {
  //     const content = (
  //       <FlatList
  //         data={result}
  //         renderItem={this.renderItem}
  //         keyExtractor={(item, index) => index.toString()}
  //       />
  //     )
  //     return content;
  //   }
  //   return <Text style={{ alignSelf: "center", marginTop: 20 }}>Không có kết quả</Text>;
  // };

  renderContent = () => {
    if (this.state.keyword.length === 0 || this.state.displayRecent) {
      return (<ScrollView>
        <Text style={{paddingLeft: 12, paddingVertical: 10, fontSize: 20, fontWeight: "bold"}}>Bài hát gợi ý</Text>
        <RecommendSong/>
      </ScrollView>)
    }
    else {
      if (!this.state.loading) {
        return (
          <Tabs tabBarUnderlineStyle={{ backgroundColor: "#333", height: 1 }}>
            <Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Bài hát">
              <ScrollView style={{paddingBottom: 50}}>
                <SearchItem data={this.state.song_result} type="song"/>
                {/* {this.renderResult(this.state.song_result)} */}
              </ScrollView>
            </Tab>
            <Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Nghệ sĩ">
              <ScrollView style={{paddingBottom: 50}}>
                <SearchItem data={this.state.singer_result} type="singer"/>
                {/* {this.renderResult(this.state.singer_result)} */}
              </ScrollView>
            </Tab>
            <Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Album">
              <ScrollView style={{paddingBottom: 50}}>
                {/* {this.renderResult(this.state.album_result)} */}
                <SearchItem data={this.state.album_result} type="album"/>
              </ScrollView>
            </Tab>
            {/*<Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Playlist">*/}
              {/*<ScrollView style={{paddingBottom: 50}}>*/}
                {/*<SearchItem data={this.state.playlist_result} type="playlist"/>*/}
                {/*/!* {this.renderResult(this.state.playlist_result)} *!/*/}
              {/*</ScrollView>*/}
            {/*</Tab>*/}
          </Tabs>
        )
      }
      else {
        return (
          <Tabs tabBarUnderlineStyle={{ backgroundColor: "#333", height: 1 }}>
            <Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Bài hát">
              <ScrollView>
                <Spinner color="#f27010" />
              </ScrollView>
            </Tab>
            <Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Nghệ sĩ">
              <ScrollView>
                <Spinner color="#f27010" />
              </ScrollView>
            </Tab>
            <Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Album">
              <ScrollView>
                <Spinner color="#f27010" />
              </ScrollView>
            </Tab>
            {/*<Tab tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} activeTextStyle={{ color: "#333" }} textStyle={{ color: "#333" }} heading="Playlist">*/}
              {/*<ScrollView>*/}
                {/*<Spinner color="#f27010" />*/}
              {/*</ScrollView>*/}
            {/*</Tab>*/}
          </Tabs>
        )
      }
    }
  };




  render() {
    // AsyncStorage.getItem("vt291").then(console.log);
    const { keyword } = this.state;

    return (
      <Container style={styles.container}>
        {/* <Header
          // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
        /> */}

        {/* <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" style={{ color: "#FFF", marginLeft: 5 }} size={20}/>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Tìm kiếm</Title>
          </Body>
          <Right>
            <Button transparent> */}
        {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*/}
        {/* </Button>
          </Right>
        </Header> */}

        <View padder style={styles.searchContainer}>
          <Item block style={styles.searchInput}>
            <Icon active name="magnifier" size={18} style={{ paddingBottom: 6 }} />
            <Input placeholder="Tên bài hát, ca sĩ"
              onChangeText={this.onUpdate}
              value={keyword}
              style={{ paddingLeft: 10 }}
            />
            {/* <Button title="Go" style={{padding: 0 }}/> */}
            <TouchableScale
              activeScale={0.5}
              friction={90}
              tension={100}
              onPress={this.onSearch}>
              <MaterialCommunityIcons active name="send" size={26} style={{ paddingBottom: 6, color: "#3578e5" }} />
            </TouchableScale>
          </Item>

        </View>

        <Content>
          {this.renderContent()}
        </Content>
      </Container>
    );
  }
}

export default Search;
