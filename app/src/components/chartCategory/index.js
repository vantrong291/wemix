import React from 'react';
import { FlatList, ImageBackground, Image } from "react-native";
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
// import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import NavigationService from "../../NavigationService";
import { connect } from "react-redux";
import { miniPlayerState, syncCurrentTrack } from "../../redux/actions";


const vnChart = require('../../assets/chart-song-vn.png');
const usChart = require('../../assets/chart-song-us.png');
const krChart = require('../../assets/chart-song-kpop.png');


const categories = [
    {
        name: "BXH Việt Nam",
        background: vnChart,
        url: "http://vip.service.keeng.vn:8080/KeengWSRestful/ws/common/getRankDetail?item_type=1&rank_type=50",
        type: "vn"
    },
    {
        name: "BXH US-UK",
        background: usChart,
        url: "http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getRankDetail?item_type=1&rank_type=52",
        type: "us"
    },
    {
        name: "BXH KPOP",
        background: krChart,
        url: "http://vip.service.keeng.vn:8080/KeengWSRestful//ws/common/getRankDetail?item_type=1&rank_type=51",
        type: "kpop"
    },
];

class CategoryComponent extends React.PureComponent {

    goDetail = (url, type) => async () => {
        // await this.props.dispatch(miniPlayerState(false));
        await NavigationService.navigate('ChartDetail', {url: url, type: type})
    };

    // openPlayer = async () => {
    //     const currentTrack = this.state.currentTrack;
    //     // await this.setState({loading: true});
    //     await this.props.dispatch(miniPlayerState(false));
    //     await NavigationService.navigate('Player', {currentTrack: currentTrack, playerState: this.state.playerState})
    //   };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <TouchableScale
            activeScale={0.95}
            friction={90}
            tension={100}
            onPress={this.goDetail(item.url, item.type)}
            >
            <Image
                source={item.background} style={{
                    alignSelf: "stretch",
                    height: 180,
                    width: null,
                    position: "relative",
                    marginBottom: 10,
                    borderRadius: 10
                }} />
        </TouchableScale>
    );

    render() {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={categories}
                renderItem={this.renderItem}
            />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
  });

export default connect(mapDispatchToProps)(CategoryComponent);