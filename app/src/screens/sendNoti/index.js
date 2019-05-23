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
import {Form, Item, Input, Label} from 'native-base';

import {View, ScrollView, BackHandler, Image, FlatList, Dimensions, ToastAndroid} from "react-native";
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


class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            loading: true,
            displayName: "Wemix thông báo",
            email: "Cùng Wemix thưởng thức Âm nhạc mới nhất..."
        };
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const user = this.props.auth.user._auth._user;
        // this.setState({displayName: user.displayName, email: user.email});
        // const { navigation } = this.props;
        // const identify = navigation.getParam('identify');
        // const url = albumUrl + identify;
        // axios.get(url)
        //     .then((res) => {
        //         this._isMounted && this.setState({ lists: res.data.data.list_item });
        //         this._isMounted && this.setState({ albumInfo: res.data.data });
        this._isMounted && this.setState({loading: false});
        //     });
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

    updateProfile = () => {
        axios.post("https://fcm.googleapis.com/fcm/send",{
            "to": "/topics/wemix",
            "notification":{ "title": this.state.displayName, "body": this.state.email, "sound":"default", "click_action":"FCM_PLUGIN_ACTIVITY"}
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=AIzaSyDV6gR8mU-t1Y4NxOXdoOUc7dSC_keGKow"
            }
        }).then((res) => {
            ToastAndroid.show("Gửi thông báo thành công", ToastAndroid.SHORT);
        }).catch((err) => {
            ToastAndroid.show("Đã xảy ra lỗi. Vui lòng xem lại", ToastAndroid.SHORT);
        })
    };


    render() {
        const user = this.props.auth.user._auth._user;
        const photoUrl = user.photoURL ? user.photoURL : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png";

        return (
            <Container style={styles.container}>
                <ParallaxScrollView
                    ref="ScrollView"
                    backgroundColor="#30d453"
                    headerBackgroundColor="#333"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={220}
                    backgroundSpeed={10}
                    // style={{paddingBottom: 50}}
                    renderBackground={() => (
                        <View key="background">
                            <Image source={drawerCover}
                                   style={{
                                       width: window.width,
                                       height: 220
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
                                uri: photoUrl,
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE
                            }}/>
                            <Text style={parallaxStyles.sectionSpeakerText}>
                                {/*{albumTitle}*/}
                            </Text>
                            <Text style={parallaxStyles.sectionTitleText}>
                                {/*{singer}*/}
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
                    <View>
                        <Form>
                            <Item stackedLabel>
                                <Label>Tiêu đề:</Label>
                                <Input
                                    value={this.state.displayName}
                                    onChangeText={displayName => this.setState({displayName})}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Nội dung thông báo:</Label>
                                <Input
                                    value={this.state.email}
                                    onChangeText={email => this.setState({email})}
                                />
                            </Item>
                            <View style={{marginHorizontal: 80, marginVertical: 30}}>
                                <Button block active success rounded onPress={this.updateProfile}>
                                    <Text>Gửi</Text>
                                </Button>
                            </View>
                        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
