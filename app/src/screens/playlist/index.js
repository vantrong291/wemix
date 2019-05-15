import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text, ListItem, Thumbnail, H1, H2, H3, List, Spinner
} from "native-base";
import {View, Alert, FlatList, AsyncStorage, ScrollView, Animated, Dimensions, Image} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom"
import { connect } from "react-redux";
import { miniPlayerState } from "../../redux/actions";
import ParallaxScrollView from 'react-native-parallax-scroll-view';


import MusicFiles from "react-native-get-music-files"
import { check, checkMultiple, ANDROID_PERMISSIONS, RESULTS } from "react-native-permissions"
// const Permissions = require('react-native-permissions').default;
import TrackPlayer from "../../components/trackPlayer";
import MiniPlayer from "../../components/miniPlayer";
import { queryLocalSong } from "../../redux/actions";
import PlaylistItem from "../../components/playlistItem";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

  const defaltCover = require('../../assets/defaultCover.jpeg');

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: "",
      loading: true,
      localSongs: null
    }
  }


  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(miniPlayerState(true));
    AsyncStorage.getItem("localSongs").then(tracks => {
      this._isMounted && this.setState({ localSongs: JSON.parse(tracks) });
      this._isMounted && this.setState({ loading: false });
      // console.log(tracks);
    }).then(() => {
      // console.log(this.state.localSongs);
    });
    // this.props.dispatch(syncNavigationProps(this.props.navigation))
    // console.log(this.props.dispatch(syncNavigationProps(this.props.navigation)));
  };
  onPlay = (song) => async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: song.id,
      url: song.path,
      title: song.title,
      artist: song.author,
      artwork: song.cover,
      album: song.album ? song.album : "Chưa xác định",
      genre: song.genre ? song.genre : "Chưa xác định",
      duration: song.duration,
    });
    await TrackPlayer.play();
    // await AsyncStorage.setItem('recentTrack', JSON.stringify(song)).then(async (track) => {
    //   console.log(track);
    // });
    // console.log(song);
  };

  // renderLocalList = (lists, onPress) => {
  //   if(lists != null) {
  //     // console.log("LENGTH" + lists.length);
  //     if(lists && lists.length != 0 && lists[0]) {
  //       const listContent = lists.map((item) => (
  //         <PlaylistItem item={item} key={item.id} onPress={(item) => {this.onPlay(item)}}/>
  //       ));
  //       return listContent;
  //     }
  //     return null;
  //   }
  //   return null;
  // };

  onAddNowPlayingPress = (song) => async () => {
    await TrackPlayer.add({
      id: song.id,
      url: song.path,
      title: song.title,
      artist: song.author,
      artwork: song.cover,
      album: song.album ? song.album : "Chưa xác định",
      genre: song.genre ? song.genre : "Chưa xác định",
      duration: song.duration,
    });
    // await TrackPlayer.play();
  };

  renderItem = ({ item }) => (
    <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id}>
      <Left>
        <TouchableScale activeScale={0.95} onPress={this.onPlay(item)}>
          <Thumbnail square source={(item.cover) ? { uri: item.cover } : defaltCover} style={{borderRadius:6}}/>
        </TouchableScale>
      </Left>
      <Body>
        <TouchableScale activeScale={0.95} onPress={this.onPlay(item)}>
          <Text numberOfLines={1}>
            {item.title}
          </Text>
          <Text numberOfLines={1} note>
            {item.author}
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

  rendeLocalSong = (lists) => {
    if (lists.length !== 0) {
      return (this.state.loading) ? (<Spinner color="#f27010" />) : (
        <FlatList
          data={lists}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )
    }
    return (<Text style={{ alignSelf: "center", marginTop: 20 }}>Không có kết quả</Text>);
  };


  render() {
    return (
        <ParallaxScrollView
            headerBackgroundColor="#333"
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}

            renderBackground={() => (
                <View key="background">
                  <Image source={{uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT}}/>
                  <View style={{position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT}}/>
                </View>
            )}

            renderForeground={() => (
                <View key="parallax-header" style={ styles.parallaxHeader }>
                  <Image style={ styles.avatar } source={{
                    uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                  }}/>
                  <Text style={ styles.sectionSpeakerText }>
                    Talks by Rich Hickey
                  </Text>
                  <Text style={ styles.sectionTitleText }>
                    CTO of Cognitec, Creator of Clojure
                  </Text>
                </View>
            )}

            renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                  <Text style={styles.stickySectionText}>Rich Hickey Talks</Text>
                </View>
            )}

            renderFixedHeader={() => (
                <View key="fixed-header" style={styles.fixedSection}>
                  <Text style={styles.fixedSectionText}
                        onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                    Scroll to top
                  </Text>
                </View>
            )}>
          <View style={{ height: 500 }}>
            <Text>Scroll me</Text>
          </View>
        </ParallaxScrollView>
    );
  }

  // render() {
  //   const localSongs = this.state.localSongs;
  //   return (
  //     <Container style={styles.container}>
  //       <Header
  //         // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
  //         androidStatusBarColor={variables.secondaryColor}
  //         iosBarStyle="light-content"
  //       // span
  //       >
  //         {/*<Left>*/}
  //           {/*<Button transparent onPress={() => this.props.navigation.openDrawer()}>*/}
  //             {/*<Icon name="menu" style={{ color: "#FFF", marginLeft: 5 }} size={24} />*/}
  //           {/*</Button>*/}
  //         {/*</Left>*/}
  //         <Body style={{ alignItems: "center", justifyContent: "center" }}>
  //           <Title style={{ color: "#FFF" }}>Danh sánh nhạc</Title>
  //         </Body>
  //         {/*<Right>*/}
  //           {/*<Button transparent>*/}
  //             {/*/!*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*!/*/}
  //           {/*</Button>*/}
  //         {/*</Right>*/}
  //       </Header>
  //
  //       <Content padder>
  //         <ScrollView style={{ paddingBottom: 50 }}>
  //           <H3 style={{ margin: 13, fontWeight: "bold" }}>Nhạc Offline</H3>
  //           {localSongs && this.rendeLocalSong(localSongs)}
  //
  //           {/* {this.state.localSongs && this.state.localSongs.length !== 0 && <List dataArray={this.state.localSongs}
  //                                           renderRow={item =>
  //                                                   <ListItem style={{marginLeft: 13 }} thumbnail key={item.id} onPress={() => this.onPlay(item)}>
  //                                                     <Left>
  //                                                       <Thumbnail square source={(item.cover) ? {uri: item.cover} : defaltCover}/>
  //                                                     </Left>
  //                                                     <Body>
  //                                                     <Text numberOfLines={1}>
  //                                                       {item.title}
  //                                                     </Text>
  //                                                     <Text numberOfLines={1} note>
  //                                                       {item.author}
  //                                                     </Text>
  //                                                     </Body>
  //                                                      <Right style={{flexDirection: "row", alignItems: "center"}}>
  //                                                       <Icon name="control-play" size={20} style={{marginRight: 15 }}/>
  //                                                       <Icon name="plus" size={20}/>
  //                                                     </Right>
  //                                                   </ListItem>
  //                                                   }
  //                                           />} */}
  //           {/* {!this.state.localSongs && <Spinner color='#fff'/>} */}
  //           {/*{ this._isMounted && this.renderLocalList(this.state.localSongs, this.onPlay)}*/}
  //         </ScrollView>
  //       </Content>
  //       {/*<MiniPlayer/>*/}
  //     </Container>
  //   );
  // }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;



const mapStateToProps = state => ({
  syncNavigation: state.syncNavigation
});
//
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);


// export default Playlist;
