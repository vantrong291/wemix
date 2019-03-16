import React, { Component } from "react";
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
import {View} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import variables from "../../theme/variables/commonColor"
import MiniPlayer from "../../components/miniPlayer";


class Chart extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header
          style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
          span
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu-fold" style={{ color: "#FFF", marginLeft: 5 }} size={24}/>
            </Button>
          </Left>
          <Body style={{alignItems:"center", justifyContent: "center"}}>
          <Title style={{width: 300, color: "#FFF", marginLeft: 60 }}>Bảng xếp hạng</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>
            </Button>
          </Right>

        </Header>

        <Content padder>
          <Text>Header with Custom background color</Text>
        </Content>

        {/*<MiniPlayer/>*/}
      </Container>
    );
  }
}

export default Chart;
