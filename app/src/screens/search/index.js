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
  Text, Item, Input, Form, Tab, Tabs, ListItem, Thumbnail
} from "native-base";
import { View, ScrollView, AsyncStorage } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/SimpleLineIcons"
import variables from "../../theme/variables/commonColor";
import ChartItem from "../../components/chartItem";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      song_result: [],
      singer_result: [],
      playlist_result: [],
      album_result: []
    }
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSearch = (keyword) => {
    let self = this;
    let _timeout;
    this._isMounted && this.setState({keyword: keyword});
    clearTimeout(_timeout);
    _timeout = setTimeout(() => {
      axios.get('http://testrec.keeng.net/solr/media/select/?group=true&group.limit=20&group.field=type&sort=score%20desc,%20listen_no%20desc&wt=json&', {
        params: {
          indent: true,
          q: keyword,
        }
      }).then((res) => {
        const all_group = (res.data.grouped.type.groups);
        if(self._isMounted) {
          const songs = Object.values(all_group).filter(group => group.groupValue === 'song')[0].doclist.docs;
          self.setState({ song_result: songs });
          const singers = Object.values(all_group).filter(group => group.groupValue === 'singer')[0].doclist.docs;
          self.setState({ singer_result: singers });
          const albums = Object.values(all_group).filter(group => group.groupValue === 'album')[0].doclist.docs;
          self.setState({ album_result: albums });
          const playlists = Object.values(all_group).filter(group => group.groupValue === 'playlist')[0].doclist.docs;
          self.setState({ playlist_result: playlists });
        }
      }).catch((res) => {
        console.log(res);
      })
    },1000);

  };

  renderResult = (result) => {
    if(result.length !== 0) {
      // const chartItems = this.state.chart.data;
      const imgurl =  "http://vip.img.cdn.keeng.vn";
      const resultContent = result.map((item) => (
        <ListItem thumbnail key={item.id}>
          <Left>
            <Thumbnail square source={{uri: imgurl + item.image}}/>
          </Left>
          <Body>
          <Text>
            {item.full_name}
          </Text>
          <Text numberOfLines={1} note>
            {item.full_singer}
          </Text>
          </Body>
          <Right style={{flexDirection: "row", alignItems: "center"}}>
            <Icon name="control-play" size={20} style={{marginRight: 15 }}/>
            <Icon name="plus" size={20}/>
          </Right>
        </ListItem>
      ));
      return resultContent;
    }
    return <Text style={{alignSelf: "center", marginTop: 20}}>Không có kết quả</Text>;
  };

  renderContent = () => {
     return (this.state.keyword.length === 0) ? (<ScrollView>
       <ChartItem/>
     </ScrollView>) :
       (
         <Tabs tabBarUnderlineStyle={{backgroundColor: "#333", height: 1}}>
           <Tab tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor: "#fff"}} activeTextStyle={{color: "#333"}} textStyle={{color: "#333"}} heading="Bài hát">
             <ScrollView>
               {this.renderResult(this.state.song_result)}
             </ScrollView>
           </Tab>
           <Tab tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor: "#fff"}} activeTextStyle={{color: "#333"}} textStyle={{color: "#333"}} heading="Nghệ sĩ">
             <ScrollView>
               {this.renderResult(this.state.singer_result)}
             </ScrollView>
           </Tab>
           <Tab tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor: "#fff"}} activeTextStyle={{color: "#333"}} textStyle={{color: "#333"}} heading="Album">
             <ScrollView>
               {this.renderResult(this.state.album_result)}
             </ScrollView>
           </Tab>
           <Tab tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor: "#fff"}} activeTextStyle={{color: "#333"}} textStyle={{color: "#333"}} heading="Playlist">
             <ScrollView>
               {this.renderResult(this.state.playlist_result)}
             </ScrollView>
           </Tab>
         </Tabs>
       )
  };

  render() {
    // AsyncStorage.getItem("vt291").then(console.log);
    return (
      <Container style={styles.container}>
        <Header
          // style={{ backgroundColor: variables.primaryColor, borderBottomLeftRadius: 400, borderBottomRightRadius: 400, height: 100 }}
          androidStatusBarColor={variables.secondaryColor}
          iosBarStyle="light-content"
        >

          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" style={{ color: "#FFF", marginLeft: 5 }} size={20}/>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Tìm kiếm</Title>
          </Body>
          <Right>
            <Button transparent>
              {/*<Icon name="profile" style={{ color: "#FFF", marginRight: 5 }} size={24}/>*/}
            </Button>
          </Right>

        </Header>

        <View padder style={styles.searchContainer}>
          <Item block style={styles.searchInput}>
            <Icon active name="magnifier" size={18} style={{paddingBottom: 6}} />
            <Input placeholder="Tên bài hát, ca sĩ"
                   onChangeText={keyword=>this.onSearch(keyword)}
                   value={this.state.keyword}
            />
          </Item>
          {/*<Text>Header with Custom background color</Text>*/}
        </View>
        <Content>
          {this.renderContent()}
        </Content>
      </Container>
    );
  }
}

export default Search;
