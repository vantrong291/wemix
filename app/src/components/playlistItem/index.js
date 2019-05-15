import React, { Component } from "react";
import { Body, Left, ListItem, Right, Text, Thumbnail } from "native-base";
import Icon from "react-native-vector-icons/SimpleLineIcons"

const defaltCover = require('../../assets/defaultCover.jpeg');

const onPlay =  async (song) => {
  console.log(song.title);

};

const PlaylistItem = ({item}) => {
  return (
    <ListItem style={{marginLeft: 13 }} thumbnail key={item.id}>
      <Left>
        <Thumbnail square source={(item.cover) ? {uri: item.cover} : defaltCover} style={{borderRadius: 6}}/>
      </Left>
      <Body>
      <Text numberOfLines={1}>
        {item.title}
      </Text>
      <Text numberOfLines={1} note>
        {item.author}
      </Text>
      </Body>
      <Right style={{flexDirection: "row", alignItems: "center"}}>
        <Icon name="control-play" size={20} style={{marginRight: 15 }}/>
        <Icon name="plus" size={20}/>
      </Right>
    </ListItem>
  )
};

export default PlaylistItem;
