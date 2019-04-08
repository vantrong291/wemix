import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body, Spinner, Icon
} from "native-base";
import { Animated, Easing, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import TrackPlayer from "../trackPlayer";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNModal from "react-native-modal";



class PlayerAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
  };

  setModalVisible(visible) {
    // console.log(visible);
    this.setState({ isVisible: visible });
  }

  render() {
    return (
      <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
        <TouchableOpacity style={styles.toolbarButton} onPress={() => {
          this.setModalVisible(!this.state.isVisible);
        }}>
          <MaterialCommunityIcons name="dots-horizontal" style={styles.toolbarIcon} />
        </TouchableOpacity>
        <RNModal isVisible={this.state.isVisible}
                 style={styles.bottomModal}
                 // animationInTiming={1000}
                 // animationOutTiming={1000}
                 // backdropTransitionInTiming={1000}
                 // backdropTransitionOutTiming={1000}
        >
          <View style={styles.modalContent}>
            <Header transparent>
              <Text onPress={() => {
                this.setModalVisible(!this.state.isVisible);
              }}> Đóng</Text>
            </Header>
            <ListItem icon >
              <Left>
                <Button transparent>
                  <MaterialCommunityIcons active style={styles.toolbarIcon} name="arrow-collapse-down" />
                </Button>
              </Left>
              <Body>
              <Text>Tải xuống</Text>
              </Body>
              <Right>
                {/*<Switch value={false} />*/}
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <MaterialCommunityIcons active name="playlist-plus" style={styles.toolbarIcon} />
                </Button>
              </Left>
              <Body>
              <Text>Thêm vào danh sách</Text>
              </Body>
              <Right>
                {/*<Text>GeekyAnts</Text>*/}
                {/*<Icon active name="arrow-forward" />*/}
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon active name="bluetooth" style={styles.toolbarIcon}/>
                </Button>
              </Left>
              <Body>
              <Text>Bluetooth</Text>
              </Body>
              <Right>
                {/*<Text>On</Text>*/}
                {/*<Icon active name="arrow-forward" />*/}
              </Right>
            </ListItem>
          </View>
        </RNModal>
      </View>
    );
  }
}

//
// const mapStateToProps = state => ({
//   scurrentTrack: state.currentTrack
// });
//
// export default connect(mapStateToProps)(AnimationArtWork);

export default PlayerAction;