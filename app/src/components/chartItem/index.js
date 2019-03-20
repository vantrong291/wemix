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
  Body, Spinner
} from "native-base";
import axios from "axios";
import View from "../../theme/components/View";
import Icon from "react-native-vector-icons/SimpleLineIcons"

class ChartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get('http://vip.service.keeng.vn:8080/KeengWSRestful/ws/common/getRankDetail?item_type=1&rank_type=50')
      .then((res) => {
        this.setState({loading: false});
        this.setState({chart: res.data});
      })
  };

  renderChart = () => {
    if(this.state.chart.length !== 0) {
      const chartItems = this.state.chart.data;
      const chartContent = chartItems.map((item) => (
        <ListItem style={{marginLeft: 13}} thumbnail key={item.id}>
          <Left>
            <Thumbnail square source={{uri: item.image}}/>
          </Left>
          <Body>
          <Text>
            {item.name}
          </Text>
          <Text numberOfLines={1} note>
            {item.singer}
          </Text>
          </Body>
          <Right style={{flexDirection: "row", alignItems: "center"}}>
              <Icon name="control-play" size={20} style={{marginRight: 15 }}/>
              <Icon name="plus" size={20}/>
          </Right>
        </ListItem>
      ));
      return chartContent;
    }
    return null;
  };

  render() {
    const datas = this.state.chart.data;
    return (this.state.loading) ? (<Spinner color="#f27010"/>) : (
      <List>
        {this.renderChart()}
      </List>
      );
  }
}

export default ChartItem;
