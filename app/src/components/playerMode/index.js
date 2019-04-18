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
  Body, Spinner,
  ActionSheet
} from "native-base";
import { Animated, Easing, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import TrackPlayer from "../trackPlayer";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

var BUTTONS = [
  { text: "Ngẫu nhiên", icon: "md-download", iconColor: "#2c8ef4" },
  { text: "Phát hết danh sách", icon: "ios-list", iconColor: "#f42ced" },
  { text: "Lặp lại danh sách", icon: "close", iconColor: "#25de5b" },
  { text: "Phát lại 1 bài", icon: "close", iconColor: "#25de5b" },
  { text: "Đóng", icon: "close", iconColor: "red" }
];
var DESTRUCTIVE_INDEX = 4;
var CANCEL_INDEX = 4;


class PlayerMode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
  };

  onOpenActionSheet = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "@wemix"
      },
      buttonIndex => {
        // this.setState({ clicked: BUTTONS[buttonIndex] });
        console.log(buttonIndex);
      }
    )
  };

  render() {
    return (
      <View style={{ width: "25%", alignItems: "center", alignSelf: "center" }}>
        <TouchableOpacity style={styles.toolbarButton} onPress={this.onOpenActionSheet}>
          <MaterialCommunityIcons name="priority-high" style={styles.toolbarIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default PlayerMode;