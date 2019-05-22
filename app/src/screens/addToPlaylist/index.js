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
    Text, Thumbnail, ListItem
} from "native-base";
import {Form, Item, Input, Label} from 'native-base';

import {View, ScrollView, BackHandler, Image, FlatList, Dimensions, ToastAndroid, AsyncStorage} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom"
import MiniPlayer from "../../components/miniPlayer";
import {connect} from "react-redux"
import TextTicker from "react-native-text-ticker";
import {miniPlayerState, syncCurrentTrack} from "../../redux/actions";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";
const albumUrl = "http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getAlbumInfo?identify=";
const drawerCover = require("../../assets/cover-personal.jpeg");
const playlistAvatar = require("../../assets/defaultCover.jpeg");



import ParallaxScrollView from 'react-native-parallax-scroll-view';
import axios from "axios";
import TrackPlayer from "../../components/trackPlayer";
import {
    window,
    AVATAR_SIZE,
    ROW_HEIGHT,
    PARALLAX_HEADER_HEIGHT,
    STICKY_HEADER_HEIGHT,
    parallaxStyles
} from "../../components/parallaxStyles";
import Spinner from "react-native-spinkit";
import API_URL from "../../api/apiUrl";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



class AddToPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            loading: true,
            playlists: [],
            newPlaylistName: ""
        };
    };

    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        const user = this.props.auth.user._auth._user;
        this.setState({displayName: user.displayName, email: user.email});

        let userId = 0;
        await AsyncStorage.getItem("userId").then((res) => {
            userId = res;
        });
        const url = API_URL + `/playlist/${userId}`;
        await axios.get(url)
            .then((res) => {
                // console.log(res.data[0].name);
                this._isMounted && this.setState({ playlists: res.data });
            });

        this._isMounted && this.setState({loading: false});
        // this.addToPlaylist(1);
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._isMounted = false;

    }

    addToPlaylist = (playlistId) => () => {
        const {navigation} = this.props;
        const track = navigation.getParam('track');
        console.log(playlistId);
        const url = API_URL + "/addToPlaylist";
        axios.post(url, {
            playlist_id: playlistId,
            track: (track).toString()
        }).then((res) => {
            console.log(res);
            ToastAndroid.show(`Đã cập nhật thành công playlist`, ToastAndroid.SHORT)
        }).catch((err) => {
            console.log(err)
        })
    };

    async handleBackButtonClick() {
        await this.props.navigation.goBack();
        // await this.props.dispatch(miniPlayerState(true));
        let self = this;
        // setTimeout(await function () {
        //   self.props.dispatch(miniPlayerState(true));
        // }, 100);
        return true;
    }

    onUpdate = (name) => {
        this._isMounted && this.setState({ newPlaylistName: name });
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem style={{ marginLeft: 13 }} thumbnail>
            <Left>
                <Thumbnail rounded source={playlistAvatar}/>
            </Left>
            <Body style={{justifyContent: "flex-start"}}>
                <Text numberOfLines={1}>
                    {item.name}
                </Text>
                <Text numberOfLines={1} note>
                    @wemix_id: {item.id}
                </Text>
            </Body>
            <Right style={{flexDirection: "row", alignItems: "center"}}>
                <TouchableScale onPress={this.addToPlaylist(item.id)}>
                    <Icon name="plus" size={28}/>
                </TouchableScale>
            </Right>
        </ListItem>
    );

    onCreateNewPlaylist = async () => {
        const url = API_URL + "/playlist";
        let userId = 0;
        await AsyncStorage.getItem("userId").then((res) => {
            userId = res;
        });
        await axios.post(url, {
            name : this.state.newPlaylistName,
            tracks : "",
            user : userId
        }).then(async (res) => {
            // console.log(res);
            ToastAndroid.show(`Tạo thành công playlist ${this.state.newPlaylistName}`, ToastAndroid.SHORT)
            const rurl = API_URL + `/playlist/${userId}`;
            await axios.get(rurl)
                .then((res) => {
                    // console.log(res.data[0].name);
                    this._isMounted && this.setState({ playlists: res.data });
                });
            await this._isMounted && this.setState({ newPlaylistName: "" });

        }).catch((err) => {
            console.log(err);
        })

    };

    render() {
        const user = this.props.auth.user._auth._user;
        const photoUrl = user.photoURL ? user.photoURL : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png";
        const {navigation} = this.props;
        const track = JSON.parse(navigation.getParam('track'));
        const playlists = this.state.playlists;

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
                            <Image source={drawerCover}
                                   style={{
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
                                uri: track.artwork,
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE
                            }}/>
                            <Text style={parallaxStyles.sectionSpeakerText}>
                                Thêm bài hát vào Playlist
                            </Text>
                            <Text style={[parallaxStyles.sectionTitleText, {textDecorationLine: "underline"}]} onPress={() => this.props.navigation.navigate("MyPlaylist")}>
                                Quản lý Playlist
                            </Text>
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
                    <View padder style={styles.searchContainer}>
                        <Item block style={styles.searchInput}>
                            {/*<Icon active name="magnifier" size={18} style={{ paddingBottom: 6 }} />*/}
                            <Text style={{ paddingBottom: 10, fontSize: 18 }}>Tạo mới </Text>
                            <Input placeholder="Tên playlist"
                                   onChangeText={this.onUpdate}
                                   value={this.state.newPlaylistName}
                                   style={{ paddingLeft: 10 }}
                            />
                            {/* <Button title="Go" style={{padding: 0 }}/> */}
                            <TouchableScale
                                activeScale={0.5}
                                friction={90}
                                tension={100}
                                onPress={this.onCreateNewPlaylist}>
                                <MaterialCommunityIcons active name="send" size={26} style={{ paddingBottom: 6, color: "#3578e5" }} />
                            </TouchableScale>
                        </Item>

                    </View>
                    <View>
                        {!this.state.loading && <FlatList
                            keyExtractor={this.keyExtractor}
                            data={playlists}
                            renderItem={this.renderItem}
                        />}
                        {this.state.loading && <Spinner type="WanderingCubes" size={30} color="green" style={{alignSelf: "center", paddingTop: 150}}/>}
                    </View>
                </ParallaxScrollView>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.user
});


const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylist);
