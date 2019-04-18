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
  Footer, FooterTab,
  Text
} from "native-base";
import { View, ScrollView, BackHandler } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import variables from "../../theme/variables/custom"
import MiniPlayer from "../../components/miniPlayer";
import AlbumItem from "../../components/albumItem";
import { connect } from "react-redux"
import { miniPlayerState, syncCurrentTrack } from "../../redux/actions";

const imgUrl = "http://vip.img.cdn.keeng.vn";
const mediaUrl = "http://cdn1.keeng.net/bucket-audio-keeng";


class Album extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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

  // renderChart = ({ item }) => (
  //   <ListItem style={{ marginLeft: 13 }} thumbnail key={item.id} onPress={() => console.log("Pressed")}>
  //     <Left>
  //       <Thumbnail square source={{ uri: item.image }} />
  //     </Left>
  //     <Body>
  //       <Text>
  //         {item.name}
  //       </Text>
  //       <Text numberOfLines={1} note>
  //         {item.singer}
  //       </Text>
  //     </Body>
  //     <Right style={{ flexDirection: "row", alignItems: "center" }}>
  //       <Icon name="control-play" size={20} style={{ marginRight: 15 }} />
  //       <Icon name="plus" size={20} />
  //     </Right>
  //   </ListItem>
  // );

  render() {
    const { navigation } = this.props;
    const identify = navigation.getParam('identify');

    return (
      <Container style={styles.container}>
        <Header
          // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left-thick" style={{ color: "#FFF", marginLeft: 5 }} size={24} />
            </Button>
          </Left>
          <Body style={{ alignItems: "center", justifyContent: "center" }}>
            <Title style={{ color: "#FFF" }}>Bảng xếp hạng</Title>
          </Body>
          <Right>
            {/*<Button transparent>*/}
              {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24} />*/}
            {/*</Button>*/}
          </Right>
        </Header>

        <Content padder>
          <ScrollView  style={{paddingBottom: 50}}>
            <AlbumItem identify={identify} />
          </ScrollView>
        </Content>
        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Nghe tất cả</Text>
            </Button>
          </FooterTab>
        </Footer>
        {/*<MiniPlayer/>*/}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(mapDispatchToProps)(Album);
