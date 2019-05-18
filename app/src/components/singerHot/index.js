import React, {Component} from "react";
import {Spinner, Text} from "native-base";
import axios from "axios";
import {FlatList, Image} from "react-native";
// import { ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import styles from "./styles";
import NavigationService from "../../NavigationService";
import {Col, Row, Grid} from "react-native-easy-grid";
import {FlatGrid} from 'react-native-super-grid';
import ContentLoader from 'rn-content-loader';
import Svg, {
    Rect,
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
    Circle,
    G
} from "react-native-svg";


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
                this._isMounted && this.setState({lists: res.data.data});
                this._isMounted && this.setState({loading: false});
            });
    };

    onPressItem = (item) => async () => {
        NavigationService.navigate('Singer', {"slug": item.slug});
    };

    renderItem = ({item}) => (
        <TouchableScale activeScale={0.95} style={styles.albumContainer} onPress={this.onPressItem(item)}>
            <Image source={{uri: item.image310}} style={styles.albumCover}/>
            <Text style={{alignSelf: "center", color: "#333", fontSize: 13, padding: 5}}>{item.name}</Text>
            {/*<Text style={{ alignSelf: "center", fontSize: 10 }}>{item.singer}</Text>*/}
        </TouchableScale>
    );

    render() {
        const datas = this.state.lists;

        return (this.state.loading) ? (
            <ContentLoader height={600} width={335} primaryColor="#f5f5f5" secondaryColor="#dddddd">
                <Rect x="10" y="0" rx="5" ry="5" width="150" height="150"/>
                <Rect x="20" y="155" rx="4" ry="4" width="130" height="15"/>
                <Rect x="25" y="175" rx="4" ry="4" width="120" height="10"/>

                <Rect x="175" y="0" rx="5" ry="5" width="150" height="150"/>
                <Rect x="185" y="155" rx="4" ry="4" width="130" height="15"/>
                <Rect x="190" y="175" rx="4" ry="4" width="120" height="10"/>

                <Rect x="10" y="195" rx="5" ry="5" width="150" height="150"/>
                <Rect x="20" y="350" rx="4" ry="4" width="130" height="15"/>
                <Rect x="25" y="370" rx="4" ry="4" width="120" height="10"/>

                <Rect x="175" y="195" rx="5" ry="5" width="150" height="150"/>
                <Rect x="185" y="350" rx="4" ry="4" width="130" height="15"/>
                <Rect x="190" y="370" rx="4" ry="4" width="120" height="10"/>

                <Rect x="10" y="390" rx="5" ry="5" width="150" height="150"/>
                <Rect x="20" y="545" rx="4" ry="4" width="130" height="15"/>
                <Rect x="25" y="565" rx="4" ry="4" width="120" height="10"/>

                <Rect x="175" y="390" rx="5" ry="5" width="150" height="150"/>
                <Rect x="185" y="545" rx="4" ry="4" width="130" height="15"/>
                <Rect x="190" y="565" rx="4" ry="4" width="120" height="10"/>

            </ContentLoader>
        ) : (
            <FlatGrid
                itemDimension={150}
                items={datas}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                // spacing={20}
                renderItem={({item, index}) => (
                    <TouchableScale activeScale={0.98} style={styles.albumContainer} onPress={this.onPressItem(item)}>
                        <Image source={{uri: item.image310}} style={styles.albumCover}/>
                        <Text style={{
                            alignSelf: "center",
                            color: "#333",
                            fontSize: 13,
                            paddingHorizontal: 5,
                            paddingTop: 5
                        }} numberOfLines={1}>{item.name}</Text>
                        <Text style={{alignSelf: "center", fontSize: 10, paddingHorizontal: 5}}
                              numberOfLines={1}>{item.singer}</Text>
                    </TouchableScale>
                )}
            />
        );
    }
}

export default SingerHot;
