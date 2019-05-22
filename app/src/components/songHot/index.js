import React, {Component} from "react";
import {Spinner, Text} from "native-base";
import axios from "axios";
import {FlatList, Image} from "react-native";
// import { ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import styles from "./styles";
import NavigationService from "../../NavigationService";
import {Col, Row, Grid} from "react-native-easy-grid";
import Svg, {
    Rect,
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
    Circle,
    G
} from "react-native-svg";
import ContentLoader from 'rn-content-loader';
import TrackPlayer from "../trackPlayer";


const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

const songHotUrl = `http://vip.service.keeng.vn:8080/KeengWSRestful//ws/edm/getBxhEdm?item_type=1&rank_type=49`;

class SongHot extends Component {
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
        axios.get(songHotUrl)
            .then((res) => {
                this._isMounted && this.setState({lists: res.data.data});
                this._isMounted && this.setState({loading: false});
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

    renderItem = ({item}) => (
        <TouchableScale activeScale={0.98} style={styles.songContainer} onPress={this.onItemPress(item)}>
            <Image source={{uri: item.image310}} style={styles.songCover}/>
            <Text style={{alignSelf: "center", color: "#333", fontSize: 13, paddingVertical: 5, paddingTop: 5}} numberOfLines={1}>{item.name}</Text>
            <Text style={{alignSelf: "center", fontSize: 10}} numberOfLines={1}>{item.singer}</Text>
        </TouchableScale>
    );

    render() {
        const datas = this.state.lists;

        return (this.state.loading) ? (
            <ContentLoader height={200} width={335} primaryColor="#f5f5f5" secondaryColor="#dddddd">
                <Rect x="10" y="0" rx="5" ry="5" width="150" height="150"/>
                <Rect x="20" y="155" rx="4" ry="4" width="130" height="15"/>
                <Rect x="25" y="175" rx="4" ry="4" width="120" height="10"/>

                <Rect x="175" y="0" rx="5" ry="5" width="150" height="150"/>
                <Rect x="185" y="155" rx="4" ry="4" width="130" height="15"/>
                <Rect x="190" y="175" rx="4" ry="4" width="120" height="10"/>
            </ContentLoader>
        ) : (
            <FlatList
                horizontal
                data={datas}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

export default SongHot;