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
  Text, Item, Input, Form
} from "native-base";
import {View} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import variables from "../../theme/variables/commonColor"

class Search extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header
          style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
          span
          searchBar
        >
          {/*<Left>*/}
            {/*<Button transparent onPress={() => this.props.navigation.openDrawer()}>*/}
              {/*<Icon name="menu-fold" style={{ color: "#FFF", marginLeft: 5 }} size={24}/>*/}
            {/*</Button>*/}
          {/*</Left>*/}
          {/*<Body style={{flex:1, flexDirection:"row", alignItems:"center", justifyContent: "center"}}>*/}
            {/*<Title style={{width: 300, color: "#FFF", marginLeft: 60 }}>Tìm kiếm</Title>*/}
              <Item block style={styles.searchInput}>
                <Icon active name="search1" size={20} style={{paddingBottom: 5}} />
                <Input placeholder="Tìm kiếm" />
              </Item>
          {/*</Body>*/}
          {/*<Right>*/}
            {/*<Button transparent>*/}
              {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*/}
            {/*</Button>*/}
          {/*</Right>*/}

        </Header>

        <Content padder>
          {/*<Text>Header with Custom background color</Text>*/}
        </Content>
      </Container>
    );
  }
}

export default Search;
