import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Badge
} from "native-base";
import styles from "./styles";

class BadgeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    };
  }
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Footer</Title>
          </Body>
          <Right />
        </Header>

        <Content padder />

        <Footer>
          <FooterTab style={{ backgroundColor: "#f5f5f5" }}>
            <Button
              active={this.state.tab1}
              onPress={() => this.toggleTab1()}
              style={
                this.state.tab1
                  ? styles.buttonPress
                  : styles.button
              }
              vertical
              badge
            >
              <Badge>
                <Text>2</Text>
              </Badge>
              <Icon
                active={this.state.tab1}
                style={ this.state.tab1 ? styles.iconActive : styles.iconButton}
                name="ios-home"
              />
              <Text style={ this.state.tab1 ? styles.textActive : styles.textButton}>Trang chủ</Text>
            </Button>
            <Button
              active={this.state.tab2}
              style={
                this.state.tab2
                  ? styles.buttonPress
                  : styles.button
              }
              onPress={() => this.toggleTab2()}
            >
              <Icon active={this.state.tab2} style={ this.state.tab2 ? styles.iconActive : styles.iconButton} name="ios-stats" />
              <Text style={ this.state.tab2 ? styles.textActive : styles.textButton}>BXH</Text>
            </Button>
            <Button
              active={this.state.tab3}
              onPress={() => this.toggleTab3()}
              style={
                this.state.tab3
                  ? styles.buttonPress
                  : styles.button
              }
              vertical
              badge
            >
              <Badge style={{ backgroundColor: "green" }}>
                <Text>51</Text>
              </Badge>
              <Icon active={this.state.tab3} style={ this.state.tab3 ? styles.iconActive : styles.iconButton} name="ios-search" />
              <Text style={ this.state.tab3 ? styles.textActive : styles.textButton}>Tìm kiếm</Text>
            </Button>
            <Button
              active={this.state.tab4}
              onPress={() => this.toggleTab4()}
              style={
                this.state.tab4
                  ? styles.buttonPress
                  : styles.button
              }
            >
              <Icon active={this.state.tab4} style={ this.state.tab4 ? styles.iconActive : styles.iconButton} name="ios-list" />
              <Text style={ this.state.tab4 ? styles.textActive : styles.textButton}>Playlist</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default BadgeFooter;


// import React, { Component } from "react";
// import { ImageBackground, View, StatusBar } from "react-native";
// import { Container, Button, H3, Text } from "native-base";
// import { DrawerActions } from 'react-navigation';
//
// import styles from "./styles";
//
// const launchscreenBg = require("../../assets/bg.jpg");
// const launchscreenLogo = require("../../assets/logo-kitchen-sink.png");
//
// class Home extends Component {
//   render() {
//     return (
//       <Container>
//         <StatusBar barStyle="light-content" />
//         <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
//           <View style={styles.logoContainer}>
//             <ImageBackground source={launchscreenLogo} style={styles.logo} />
//           </View>
//           <View
//             style={{
//               alignItems: "center",
//               marginBottom: 50,
//               backgroundColor: "transparent"
//             }}
//           >
//             <H3 style={styles.textButton}>App to showcase</H3>
//             <View style={{ marginTop: 8 }} />
//             <H3 style={styles.textButton}>NativeBase components</H3>
//             <View style={{ marginTop: 8 }} />
//           </View>
//           <View style={{ marginBottom: 80 }}>
//             <Button
//               style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
//               onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
//             >
//               <Text>Lets Go!</Text>
//             </Button>
//           </View>
//         </ImageBackground>
//       </Container>
//     );
//   }
// }
//
// export default Home;
