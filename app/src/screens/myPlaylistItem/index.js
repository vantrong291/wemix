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
    Footer, FooterTab,
    Text, ListItem, Thumbnail
} from "native-base";
import {View, ScrollView, BackHandler, Image, FlatList, Dimensions} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom"
import MiniPlayer from "../../components/miniPlayer";
import { connect } from "react-redux"
import TextTicker from "react-native-text-ticker";
import { miniPlayerState, syncCurrentTrack } from "../../redux/actions";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";
const albumUrl = "http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getAlbumInfo?identify=";

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import axios from "axios";
import TrackPlayer from "../../components/trackPlayer";
import {window, AVATAR_SIZE, ROW_HEIGHT, PARALLAX_HEADER_HEIGHT, STICKY_HEADER_HEIGHT, parallaxStyles} from "../../components/parallaxStyles";
import Spinner from "react-native-spinkit";


class MyPlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
          lists: [],
          loading: true,
          albumInfo: []
      };
  };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const { navigation } = this.props;
        const identify = navigation.getParam('identify');
        const url = albumUrl + identify;
        axios.get(url)
            .then((res) => {
                this._isMounted && this.setState({ lists: res.data.data.list_item });
                this._isMounted && this.setState({ albumInfo: res.data.data });
                this._isMounted && this.setState({ loading: false });
            });
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

    onPlayAllPress = async () => {
        const datas = this.state.lists;
        await TrackPlayer.reset();
        await datas.map((track) => {
            TrackPlayer.add({
                id: track.id,
                url: track.download_url,
                title: track.name,
                artist: track.singer,
                artwork: track.image310,
                album: track.album ? track.album : "Chưa xác định",
                genre: track.genre ? track.genre : "Chưa xác định",
                description: track.lyric
                // duration: song.duration,
            });
        });
        await TrackPlayer.play();
    };

    renderItem = ({ item }) => (
        <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id}>
            <Left>
                <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
                    <Thumbnail square source={{ uri: item.image }} style={{borderRadius: 6}}/>
                </TouchableScale>
            </Left>
            <Body>
            <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
                <Text numberOfLines={1}>
                    {item.name}
                </Text>
                <Text numberOfLines={1} note>
                    {item.singer}
                </Text>
            </TouchableScale>
            </Body>
            <Right style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableScale onPress={this.onAddNowPlayingPress(item)}>
                    <Icon name="playlist-plus" size={28}/>
                </TouchableScale>
            </Right>
        </ListItem>
    );

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      this._isMounted = false;

  }

  async handleBackButtonClick() {
    await this.props.navigation.goBack();
    // await this.props.dispatch(miniPlayerState(true));
    let self = this;
    // setTimeout(await function () {
    //   self.props.dispatch(miniPlayerState(true));
    // }, 100);
    return true;
  }

  // renderChart = ({ item }) => (
  //   <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id} onPress={() => console.log("Pressed")}>
  //     <Left>
  //       <Thumbnail square source={{ uri: item.image }} />
  //     </Left>
  //     <Body>
  //       <Text>
  //         {item.name}
  //       </Text>
  //       <Text numberOfLines={1} note>
  //         {item.singer}
  //       </Text>
  //     </Body>
  //     <Right style={{ flexDirection: "row", alignItems: "center" }}>
  //       <Icon name="control-play" size={20} style={{ marginRight: 15 }} />
  //       <Icon name="plus" size={20} />
  //     </Right>
  //   </ListItem>
  // );

  render() {
    const { navigation } = this.props;
    const identify = navigation.getParam('identify');

      const datas = this.state.lists;
      const albumCover = this.state.albumInfo.cover ? this.state.albumInfo.cover : this.state.albumInfo.image310;
      const albumTitle = this.state.albumInfo.name;
      const singer = this.state.albumInfo.singer;

    return (
      <Container style={styles.container}>
        <ParallaxScrollView
            ref="ScrollView"
            backgroundColor="#30d453"
            headerBackgroundColor="#333"
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}
            // style={{paddingBottom: 50}}
            renderBackground={() => (
                <View key="background">
                  <Image source={{uri: albumCover,
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
                <View key="parallax-header" style={ parallaxStyles.parallaxHeader }>
                    <Image style={ parallaxStyles.avatar } source={{
                    uri: albumCover,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                  }}/>
                  <Text style={ parallaxStyles.sectionSpeakerText }>
                      {albumTitle}
                  </Text>
                  <Text style={ parallaxStyles.sectionTitleText }>
                      {singer}
                  </Text>
                </View>
            )}

            renderStickyHeader={() => (
                <View key="sticky-header" style={parallaxStyles.stickySection}>
                  {/*<Text style={styles.stickySectionText}>Rich Hickey Talks</Text>*/}
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left-thick" style={{ color: "#FFF", marginLeft: 15, paddingBottom: 8 }} size={24} />
                    </Button>
                </View>
            )}

            renderFixedHeader={() => (
                <View key="fixed-header" style={parallaxStyles.fixedSection}>
                  <Icon name="format-align-top" style={parallaxStyles.fixedSectionText}
                        onPress={() => this.refs.ScrollView.scrollTo({ x: 0, y: 0 })}>
                  </Icon>

                </View>
            )}>
            {!this.state.loading && <FlatList
              style={{paddingBottom: 50}}
              data={datas}
              initialNumToRender={10}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
          />}
            {this.state.loading && <Spinner type="WanderingCubes" size={30} color="green" style={{alignSelf: "center", paddingTop: 150}}/>}

            {/*</ParallaxScrollView>*/}

        {/*/!*<ScrollView  style={{paddingBottom: 50}}>*!/*/}
            {/*<AlbumItem identify={identify} />*/}
          {/*/!*</ScrollView>*!/*/}
        {/*</Content>*/}
        </ParallaxScrollView>
        <Footer>
          <FooterTab>
            <Button onPress={this.onPlayAllPress} active full>
              <Text>Nghe tất cả</Text>
            </Button>
          </FooterTab>
        </Footer>
        {/*<MiniPlayer/>*/}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapDispatchToProps)(MyPlaylistItem);
