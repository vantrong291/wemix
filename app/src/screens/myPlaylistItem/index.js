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
    Text, Thumbnail, ListItem, Accordion
} from "native-base";
import {Form, Item, Input, Label} from 'native-base';

import {View, ScrollView, BackHandler, Image, FlatList, Dimensions, ToastAndroid, AsyncStorage, Alert} from "react-native";
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
const drawerCover = require("../../assets/cover-personal.jpeg");
const playlistAvatar = require("../../assets/defaultCover.jpeg");
const avatar = require('../../assets/background-with-circle-colored-musical-notes_23-2147635161.jpg');


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


class MyPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            loading: true,
            lists: [],
        };
    };

    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;

        const {navigation} = this.props;
        const playlistId = navigation.getParam('playlistId');

        const url = API_URL + `/playlistDetail/${playlistId}`;
        let jsonTrack = [];

        await axios.get(url)
            .then((res) => {
                const rawTracks = res.data.tracks;
                const arrayTrack = rawTracks.split("//EDGE//");
                for(let i = 0; i < arrayTrack.length; i++){
                    if ( arrayTrack[i] !== '') {
                        jsonTrack.push(JSON.parse(arrayTrack[i]))
                    }
                }
                console.log(jsonTrack);
            });
        await this._isMounted && this.setState({lists: jsonTrack});
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


    async handleBackButtonClick() {
        await this.props.navigation.goBack();
        // await this.props.dispatch(miniPlayerState(true));
        let self = this;
        // setTimeout(await function () {
        //   self.props.dispatch(miniPlayerState(true));
        // }, 100);
        return true;
    }


    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
        <ListItem style={{marginLeft: 13}} thumbnail>
                <Left>
                    <Thumbnail square style={{borderRadius: 6}} source={{uri: item.artwork}}/>
                </Left>
                <Body>
                <Text numberOfLines={1}>
                    {item.title}
                </Text>
                <Text numberOfLines={1} note>
                    {item.artist}
                </Text>
                </Body>
                <Right style={{flexDirection: "row", alignItems: "center"}}>
                    <TouchableScale activeScale={0.95} onPress={this.onPlay(item)}>
                        <MaterialCommunityIcons name="play" size={28} style={{marginLeft: 15}}/>
                    </TouchableScale>
                    <TouchableScale activeScale={0.95} onPress={this.addToNowPlaying(item)}>
                        <MaterialCommunityIcons name="playlist-play" size={28} style={{marginLeft: 15}}/>
                    </TouchableScale>
                    <TouchableScale activeScale={0.95} onPress={this.onAskForDeleting(item)}>
                        <MaterialCommunityIcons name="delete-sweep" size={28} style={{marginLeft: 15, color: "red"}}/>
                    </TouchableScale>
                </Right>
        </ListItem>
    );

    onPlay = (track) => async () => {
      TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.play();
    };

    addToNowPlaying = (track) => () => {
        TrackPlayer.add(track);
    };

    onPlayAll = async () => {
      const list = this.state.lists;
      await TrackPlayer.reset();
      await list.map((item)=> {
          TrackPlayer.add(item);
      });
      await TrackPlayer.play();
    };

    onAskForDeletePlaylist = () => {
        const {navigation} = this.props;
        const playlistName = navigation.getParam('playlistName');
        Alert.alert(
            "Xác nhận xóa",
            `Bạn có chắc chắn muốn xóa playlist \"${playlistName}\"?`,
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: this.onDeletePlaylist},
            ],
            {cancelable: false},
        );
    };

    onDeletePlaylist = () => {
        const {navigation} = this.props;
        const playlistId = navigation.getParam('playlistId');
        const playlistName = navigation.getParam('playlistName');
        const url = API_URL + "/playlist";
        axios.delete(url,{data: {"id": playlistId}}).then((res) => {
            // console.log(res);
            ToastAndroid.show(`Đã xóa thành công playlist \"${playlistName}\"`, ToastAndroid.SHORT);
            this.props.navigation.goBack();
            this.props.navigation.state.params.reload();

        }).catch((err) => {
            console.log(err);
        })
    };

    onAskForDeleting = (track) => () => {
        Alert.alert(
            "Xác nhận xóa",
            `Bạn có chắc chắn muốn xóa \"${track.title}\" khỏi playlist?`,
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: this.onDeleteFromPlaylist(track)},
            ],
            {cancelable: false},
        );
    };

    onDeleteFromPlaylist = (track) => () => {
        let strTrack = JSON.stringify(track);
        const {navigation} = this.props;
        const playlistId = navigation.getParam('playlistId');
        const url = API_URL + "/removeFromPlaylist";
        axios.post(url, {
            playlist_id: playlistId,
            track: JSON.stringify(track).replace('"', '\"')
        }).then(async (res) => {
            // console.log(res);
            ToastAndroid.show(`Đã xóa thành công \"${track.title}\"`, ToastAndroid.SHORT);
            const {navigation} = this.props;
            const playlistId = navigation.getParam('playlistId');

            const url = API_URL + `/playlistDetail/${playlistId}`;
            let jsonTrack = [];

            await axios.get(url)
                .then((res) => {
                    const rawTracks = res.data.tracks;
                    const arrayTrack = rawTracks.split("//EDGE//");
                    for(let i = 0; i < arrayTrack.length; i++){
                        if ( arrayTrack[i] !== '') {
                            jsonTrack.push(JSON.parse(arrayTrack[i]))
                        }
                    }
                    console.log(jsonTrack);
                });
            await this._isMounted && this.setState({lists: jsonTrack});

        }).catch((err) => {
            console.log(err)
        });
        // console.log(strTrack);
    };


    render() {
        const user = this.props.auth.user._auth._user;
        const photoUrl = user.photoURL ? user.photoURL : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png";

        const lists = this.state.lists;
        const {navigation} = this.props;
        const playlistName = navigation.getParam('playlistName');

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
                            <Image style={[parallaxStyles.avatar, {
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE
                            }]} source={avatar}/>
                            <Text style={parallaxStyles.sectionSpeakerText}>
                                {playlistName}
                            </Text>
                            <View style={{flexDirection: "row", paddingTop: 10}}>
                                <Button success style={{borderRadius: 6, marginRight: 3}} onPress={this.onPlayAll}>
                                    <Text style={{fontSize: 12}}>Phát tất cả</Text>
                                </Button>
                                <Button warning style={{borderRadius: 6, marginLeft: 3}} onPress={this.onAskForDeletePlaylist}>
                                    <Text style={{fontSize: 12}}>Xóa playlist</Text>
                                </Button>
                            </View>

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
                    <View>
                        {!this.state.loading && <FlatList
                            keyExtractor={this.keyExtractor}
                            data={lists}
                            renderItem={this.renderItem}
                            style={{paddingBottom: 53}}
                        />}
                        {this.state.loading && <Spinner type="WanderingCubes" size={30} color="green"
                                                        style={{alignSelf: "center", paddingTop: 150}}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPlaylist);
