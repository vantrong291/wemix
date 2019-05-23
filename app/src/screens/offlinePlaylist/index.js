import React, {Component} from "react";
import {
    Body,
    Container,
    Content,
    H3,
    Header,
    Left,
    ListItem,
    Right,
    Text,
    Thumbnail,
    Title
} from "native-base";
import {AsyncStorage, Dimensions, FlatList, ScrollView, View, StatusBar, RefreshControl} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom"
import {connect} from "react-redux";
import {miniPlayerState} from "../../redux/actions";
// const Permissions = require('react-native-permissions').default;
import TrackPlayer from "../../components/trackPlayer";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

import {
    CoordinatorLayout,
    BackdropBottomSheet,
    BottomSheetBehavior,
    BottomSheetHeader,
    FloatingActionButton,
    MergedAppBarLayout,
    ScrollingAppBarLayout
} from 'react-native-bottom-sheet-behavior';
import MusicFiles from "react-native-get-music-files";
import Spinner from "react-native-spinkit";

const defaltCover = require('../../assets/defaultCover.jpeg');

class OfflinePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storagePermission: "",
            loading: true,
            localSongs: null,
            refreshing: false
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
            this._isMounted && this.setState({localSongs: JSON.parse(tracks)});
            this._isMounted && this.setState({loading: false});
            // console.log(tracks);
        }).then(() => {
            // console.log(this.state.localSongs);
        });
        // this.props.dispatch(syncNavigationProps(this.props.navigation))
        // console.log(this.props.dispatch(syncNavigationProps(this.props.navigation)));
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 2000);
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
    };

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

    renderItem = ({item}) => (
        <ListItem style={{marginLeft: 13}} thumbnail key={item.id}>
            <Left>
                <TouchableScale activeScale={0.95} onPress={this.onPlay(item)}>
                    <Thumbnail square source={(item.cover) ? {uri: item.cover} : defaltCover}
                               style={{borderRadius: 6}}/>
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
            <Right style={{flexDirection: "row", alignItems: "center"}}>
                <TouchableScale onPress={this.onAddNowPlayingPress(item)}>
                    <Icon name="playlist-plus" size={28}/>
                </TouchableScale>
            </Right>
        </ListItem>
    );

    rendeLocalSong = (lists) => {
        if (lists.length !== 0) {
            return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
                <FlatList
                    data={lists}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
        }
        return (<Spinner type="WanderingCubes" size={30} color="green" style={{alignSelf: "center", paddingTop: 150}}/>);
    };

    _getSongs = async () => {
        // Alert.alert('seen')
        this._isMounted && this.setState({localSongs: []});
        let songs = "";
        await MusicFiles.getAll({
            id: true,
            blured: true,
            artist: true,
            duration: true,
            genre: true,
            title: true,
            cover: true
        }).then(async (tracks) => {
            this._isMounted && this.setState({localSongs: tracks});
            console.log(this.state.localSongs);

        }).catch(error => {
            console.log(error);
        });
    };

    render() {
        const localSongs = this.state.localSongs;
        return (
            <Container style={styles.container}>
                <Content padder>
                    <ScrollView
                        style={{paddingBottom: 50}}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                        <View style={{flexDirection: "row", flex: 1}}>
                            <View style={{width: "60%"}}>
                                <Text style={{margin: 13, fontWeight: "bold", fontSize: 20}}>Nhạc Offline</Text>
                            </View>
                            <View style={{width: "40%", paddingTop: 15}}>
                                <Text style={{fontSize: 13, right: 10, top: 5, textAlign: "right", textDecorationLine: "underline"}} onPress={this._getSongs}>Làm mới</Text>
                            </View>
                        </View>
                        {localSongs && this.rendeLocalSong(localSongs)}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    syncNavigation: state.syncNavigation
});
//
const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(OfflinePlaylist);
