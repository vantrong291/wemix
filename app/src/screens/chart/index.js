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
    Text, ListItem, Thumbnail, Fab
} from "native-base";
import {View, ScrollView, BackHandler, Image, FlatList} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom"
import MiniPlayer from "../../components/miniPlayer";
import ChartItem from "../../components/chartItem";
import {connect} from "react-redux"
import {miniPlayerState, syncCurrentTrack} from "../../redux/actions";
import axios from "axios";
import TrackPlayer from "../../components/trackPlayer";
import {
    AVATAR_SIZE,
    PARALLAX_HEADER_HEIGHT,
    parallaxStyles,
    STICKY_HEADER_HEIGHT,
    window
} from "../../components/parallaxStyles";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import Spinner from "react-native-spinkit";

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";

// const vnChartCover = require('../../assets/vn-chart-cover.jpg');
// const usChartCover = require('../../assets/us-chart-cover.jpg');
// const kpopChartCover = require('../../assets/kpop-chart-cover.jpg');

const vnChartCover = "http://vip.img.cdn.keeng.vn/web_v5//images/bang_xep_hang/BXH1vietnam.jpg";
const usChartCover = "http://vip.img.cdn.keeng.vn/web_v5//images/bang_xep_hang/bxhaumi1.jpg";
const kpopChartCover = "http://vip.img.cdn.keeng.vn/web_v5//images/bang_xep_hang/BXH2CHAUA.jpg";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            chart: [],
            loading: true
        }
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const {navigation} = this.props;
        const url = navigation.getParam('url');
        axios.get(url)
            .then((res) => {
                this._isMounted && this.setState({loading: false});
                this._isMounted && this.setState({chart: res.data});
            })
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
        const datas = this.state.chart.data;
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


    renderChart = (item, index) => (
        <ListItem style={{marginLeft: 13}} thumbnail key={item.id}>
            <Left>
                <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
                    <Thumbnail square source={{uri: item.image}} style={{borderRadius: 6}}/>
                </TouchableScale>
            </Left>
            <Body>
            <TouchableScale activeScale={0.98} onPress={this.onItemPress(item)}>
                <Text numberOfLines={1}>
                    {index + 1}. {item.name}
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

    getCover = () => {
        const {navigation} = this.props;
        const type = navigation.getParam('type');
        return type === "vn" ? vnChartCover : type === "us" ? usChartCover : type === "kpop" ? kpopChartCover : null;
    };

    getTitle = () => {
        const {navigation} = this.props;
        const type = navigation.getParam('type');
        return type === "vn" ? "Bảng xếp hạng Việt Nam" : type === "us" ? "Bảng xếp hạng Âu Mỹ" : type === "kpop" ? "Bảng xếp hạng KPOP" : null;
    };

    render() {
        const datas = this.state.chart.data;

        const {navigation} = this.props;
        const url = navigation.getParam('url');
        // console.log(url);

        return (
            <Container style={styles.container}>
                <ParallaxScrollView
                    ref="ScrollView"
                    backgroundColor="#30d453"
                    headerBackgroundColor="#333"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View key="background">
                            <Image source={{
                                uri: this.getCover(),
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
                            <Image style={parallaxStyles.avatar}
                                   source={{uri: this.getCover(), height: AVATAR_SIZE, width: AVATAR_SIZE}}/>
                            <Text style={parallaxStyles.sectionSpeakerText}>
                                {this.getTitle()}
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
                        renderItem={({item, index}) => this.renderChart(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    }
                    {this.state.loading && <Spinner type="WanderingCubes" size={30} color="green"
                                                    style={{alignSelf: "center", paddingTop: 150}}/>}

                </ParallaxScrollView>
                {/*<MiniPlayer/>*/}
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
});

export default connect(mapDispatchToProps)(Chart);
