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
  Body, Spinner, Icon,
  ActionSheet
} from "native-base";
import { Animated, Easing, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import TrackPlayer from "../trackPlayer";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

var BUTTONS = [
  { text: "Tải xuống", icon: "md-download", iconColor: "#2c8ef4" },
  { text: "Thêm vào playlist", icon: "ios-list", iconColor: "#f42ced" },
  { text: "Đóng", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;


class PlayerAction extends Component {
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
          <MaterialCommunityIcons name="dots-horizontal" style={styles.toolbarIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default PlayerAction;