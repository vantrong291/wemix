import React, {Component} from "react";
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
import {View, ScrollView, BackHandler, Image, FlatList} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom"
import MiniPlayer from "../../components/miniPlayer";
import {connect} from "react-redux"
import {miniPlayerState, syncCurrentTrack} from "../../redux/actions";
import axios from "axios";
import TrackPlayer from "../../components/trackPlayer";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import {
    window,
    AVATAR_SIZE,
    ROW_HEIGHT,
    PARALLAX_HEADER_HEIGHT,
    STICKY_HEADER_HEIGHT,
    parallaxStyles
} from "../../components/parallaxStyles";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Spinner from "react-native-spinkit";


const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

const numberOfSong = 60;

const singerUrl = "http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getSingerDetailAll?slug=";
const singerSongUrl = `http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getSingerDetail?type=1&page=1&num=${numberOfSong}&id=`;

class Singer extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            lists: [],
            loading: true,
            singerInfo: []
        };
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const {navigation} = this.props;
        const slug = navigation.getParam('slug');
        const url = singerUrl + slug;
        let singerId = "";
        axios.get(url)
            .then((res) => {
                singerId = res.data.data.singer_id;
                // this._isMounted && this.setState({lists: res.data.data.media_item.list_song});
                this._isMounted && this.setState({singerInfo: res.data.data});
                // this._isMounted && this.setState({loading: false});
                axios.get(singerSongUrl + singerId).then((res) => {
                    this._isMounted && this.setState({lists: res.data.data});
                    this._isMounted && this.setState({loading: false});
                })
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
            // description: item.lyric
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
            // description: item.lyric
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
                // description: track.lyric
                // duration: song.duration,
            });
        });
        await TrackPlayer.play();
    };

    renderItem = ({item}) => (
        <ListItem style={{marginLeft: 13}} thumbnail key={item.id}>
            <Left>
                <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
                    <Thumbnail square source={{uri: item.image}} style={{borderRadius: 6}}/>
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
            <Right style={{flexDirection: "row", alignItems: "center"}}>
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
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
        const datas = this.state.lists;
        const singerCover = this.state.singerInfo.cover ? this.state.singerInfo.cover : this.state.singerInfo.image310;
        const singerName = this.state.singerInfo.name;
        const singerAvatar = this.state.singerInfo.image310;

        return (
            <Container style={styles.container}>
                <ParallaxScrollView
                    ref="ScrollView"
                    backgroundColor="#30d453"
                    headerBackgroundColor="#333"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    // style={{paddingBottom: 50}}
                    renderBackground={() => (
                        <View key="background">
                            <Image source={{
                                uri: singerCover,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT
                            }}/>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                width: window.width,
                                backgroundColor: 'rgba(0,0,0,.4)',
                                height: PARALLAX_HEADER_HEIGHT
                            }}/>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={parallaxStyles.parallaxHeader}>
                            <Image style={parallaxStyles.avatar} source={{
                                uri: singerAvatar,
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE
                            }}/>
                            <Text style={parallaxStyles.sectionSpeakerText}>
                                {singerName}
                            </Text>
                            <Text style={parallaxStyles.sectionTitleText}>
                                {singerName}
                            </Text>
                            <TouchableScale activeScale={0.98} onPress={this.onPlayAllPress}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15,
                                    paddingVertical: 5,
                                    textAlign: "center",
                                    textDecorationLine: "underline"
                                }}>
                                    Nghe tất cả
                                </Text>
                            </TouchableScale>
                        </View>
                    )}

                    renderStickyHeader={() => (
                        <View key="sticky-header" style={parallaxStyles.stickySection}>
                            {/*<Text style={styles.stickySectionText}>Rich Hickey Talks</Text>*/}
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="arrow-left-thick" style={{color: "#FFF", marginLeft: 15, paddingBottom: 8}}
                                      size={24}/>
                            </Button>
                        </View>
                    )}

                    renderFixedHeader={() => (
                        <View key="fixed-header" style={parallaxStyles.fixedSection}>
                            <Icon name="format-align-top" style={parallaxStyles.fixedSectionText}
                                  onPress={() => this.refs.ScrollView.scrollTo({x: 0, y: 0})}>
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
                </ParallaxScrollView>

            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
});

export default connect(mapDispatchToProps)(Singer);
