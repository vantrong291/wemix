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
    Text
} from "native-base";
import {View, ScrollView, Image} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import variables from "../../theme/variables/custom"
import MiniPlayer from "../../components/miniPlayer";
import ChartItem from "../../components/chartItem";
import CategoryComponent from "../../components/chartCategory";
import {
    AVATAR_SIZE,
    PARALLAX_HEADER_HEIGHT,
    parallaxStyles,
    STICKY_HEADER_HEIGHT,
    window
} from "../../components/parallaxStyles";
import ParallaxScrollView from "react-native-parallax-scroll-view";
const drawerCover = require("../../assets/482216347x.jpg");
const chartAvatar = require("../../assets/How-to-maintain-keyword-ranking-once-you-reach-the-top.jpg");



class ChartCategory extends React.PureComponent {

    render() {
        return (
            <Container style={styles.container}>
                {/*<Header*/}
                {/*// style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}*/}
                {/*androidStatusBarColor={variables.secondaryColor}*/}
                {/*iosBarStyle="light-content"*/}
                {/*>*/}
                {/*/!*<Left>*!/*/}
                {/*/!*<Button transparent onPress={() => this.props.navigation.openDrawer()}>*!/*/}
                {/*/!*<Icon name="menu-fold" style={{ color: "#FFF", marginLeft: 5 }} size={24} />*!/*/}
                {/*/!*</Button>*!/*/}
                {/*/!*</Left>*!/*/}
                {/*<Body style={{ alignItems: "center", justifyContent: "center" }}>*/}
                {/*<Title style={{ color: "#FFF" }}>Bảng xếp hạng</Title>*/}
                {/*</Body>*/}
                {/*/!*<Right>*!/*/}
                {/*/!*<Button transparent>*!/*/}
                {/*/!*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24} />*!/*/}
                {/*/!*</Button>*!/*/}
                {/*/!*</Right>*!/*/}
                {/*</Header>*/}
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
                            }]} source={chartAvatar}/>
                            <Text style={parallaxStyles.sectionSpeakerText}>
                                Bảng xếp hạng
                            </Text>
                            <Text style={parallaxStyles.sectionTitleText}>
                                Top những bài hát HOT nhất
                            </Text>
                        </View>
                    )}

                    // renderStickyHeader={() => (
                    //     {/*<View key="sticky-header" style={parallaxStyles.stickySection}>*/}
                    //         {/*/!*<Text style={styles.stickySectionText}>Rich Hickey Talks</Text>*!/*/}
                    //         {/*<Button transparent onPress={() => this.props.navigation.goBack()}>*/}
                    //             {/*<Icon name="arrow-left-thick" style={{color: "#FFF", marginLeft: 15, paddingBottom: 8}}*/}
                    //                   {/*size={24}/>*/}
                    //         {/*</Button>*/}
                    //     {/*</View>*/}
                    // )}
                    //
                    // renderFixedHeader={() => (
                    //     {/*<View key="fixed-header" style={parallaxStyles.fixedSection}>*/}
                    //         {/*<Icon name="format-align-top" style={parallaxStyles.fixedSectionText}*/}
                    //               {/*onPress={() => this.refs.ScrollView.scrollTo({x: 0, y: 0})}>*/}
                    //         {/*</Icon>*/}
                    //
                    //     {/*</View>*/}
                    // )}
                >
                    <Content padder>
                        {/*<Text style={{*/}
                            {/*paddingLeft: 10,*/}
                            {/*paddingVertical: 10,*/}
                            {/*fontSize: 26,*/}
                            {/*fontWeight: "bold",*/}
                            {/*textAlign: "center"*/}
                        {/*}}>Bảng xếp hạng</Text>*/}
                        <ScrollView style={{paddingBottom: 50}}>
                            <CategoryComponent/>
                        </ScrollView>
                    </Content>
                </ParallaxScrollView>

                {/*<MiniPlayer/>*/}
            </Container>
        );
    }
}

export default ChartCategory;
