import React, { Component } from "react";
import { StyleProvider } from "native-base";
import { View } from "react-native";
import App from "..";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import MiniPlayer from "../components/miniPlayer";

export default class Setup extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        {/*<View>*/}
          <App/>
          {/*<MiniPlayer/>*/}
        {/*</View>*/}
      </StyleProvider>
    );
  }
}
