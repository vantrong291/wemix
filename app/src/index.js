import React, { Component } from "react";
import { Root } from "native-base";
import { SafeAreaView } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator, MaterialTopTabBar, BottomTabBar
} from "react-navigation";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";

import Login from "./screens/login";
import Signup from "./screens/signup";
import Header from "./screens/Header/";
import Header1 from "./screens/Header/1";
import Header2 from "./screens/Header/2";
import Header3 from "./screens/Header/3";
import Header4 from "./screens/Header/4";
import Header5 from "./screens/Header/5";
import Header6 from "./screens/Header/6";
import Header7 from "./screens/Header/7";
import Header8 from "./screens/Header/8";
import HeaderSpan from "./screens/Header/header-span";
import HeaderNoShadow from "./screens/Header/header-no-shadow";
import HeaderTransparent from "./screens/Header/header-transparent";
import HeaderNoLeft from "./screens/Header/header-noLeft";

import Anatomy from "./screens/anatomy/";
import SideBar from "./screens/sidebar";
import Home from "./screens/home";
import Chart from "./screens/chart";
import Search from "./screens/search";
import Playlist from "./screens/playlist";
import Personal from "./screens/personal";

import MiniPlayer from "./components/miniPlayer"
// const tinColor = "#f5f5f5";


import variables from "./theme/variables/commonColor"

class MyTabBar extends Component {
  render() {
    return (
      <MaterialTopTabBar>
        <MiniPlayer/>
      </MaterialTopTabBar>
    )
  }
}

const Switcher = createMaterialTopTabNavigator(
  {
    BXH: {
      screen: Chart,
      navigationOptions: {
        tabBarLabel: "BXH",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="barschart" color={tintColor} size={24}/>
        )
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: "Tìm kiếm",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search1" color={tintColor} size={24}/>
        )
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Trang chủ",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24}/>
        )
      }
    },
    Playlist: {
      screen: Playlist,
      navigationOptions: {
        tabBarLabel: "Playlist",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bars" color={tintColor} size={24}/>
        )
      }
    },
    Personal: {
      screen: Personal,
      navigationOptions: {
        tabBarLabel: "Cá nhân",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor} size={24}/>
        )
      }
    }

  },
  {
    initialRouteName: "Home",
    // order: ["Home", "BXH", "Search", "Playlist"],
    // activeTintColor: "#e91d62",
    // barStyle: { backgroundColor: '#f5f5f5' },
    // shifting:true

    // tabBarComponent: MyTabBar,
    tabBarPosition: "bottom",
    swipeEnabled: true,
    animationEnabled: true,
    // lazy: true,
    optimizationsEnabled: true,
    tabBarOptions: {
      activeTintColor: variables.primaryColor,
      inactiveTintColor: "grey",
      upperCaseLabel: false,
      pressColor: "#21b54063",
      pressOpacity: 1,
      labelStyle: {
        fontSize: 10,
        marginTop: 2,
        marginLeft: 0,
        marginRight: 0
      },
      style: {
        backgroundColor: "#fff",
        borderTopWidth: 0.5,
        borderTopColor: "grey",
        height: 55
      },
      iconStyle: {},
      indicatorStyle: {
        height: 0
      },
      showIcon: true
    }
  }
);


// class MySwitchera extends Component {
//   render() {
//     return (
//       <View>
//         <MiniPlayer>
//           <Switcher/>
//         </MiniPlayer>
//       </View>
//     );
//   }
// }


// const AppSwitcher = createStackNavigator({
//   Home: {
//     screen: Switcher
//   }
// });

// const MySwitcher = createAppContainer(AppSwitcher);

const Drawer = createDrawerNavigator(
  {
    // Login: { screen: Login },
    // Signup: { screen: Signup },
    Switcher: { screen: Switcher },
    Home: { screen: Home },
    Anatomy: { screen: Anatomy },
    Header: { screen: Header },
  },
  {
    initialRouteName: "Switcher",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    Login: { screen: Login },
    Signup: { screen: Signup },
    Header1: { screen: Header1 },
    Header2: { screen: Header2 },
    Header3: { screen: Header3 },
    Header4: { screen: Header4 },
    Header5: { screen: Header5 },
    Header6: { screen: Header6 },
    Header7: { screen: Header7 },
    Header8: { screen: Header8 },
    HeaderSpan: { screen: HeaderSpan },
    HeaderNoShadow: { screen: HeaderNoShadow },
    HeaderNoLeft: { screen: HeaderNoLeft },
    HeaderTransparent: { screen: HeaderTransparent },
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

// const AppContainer = createAppContainer(AppNavigator);
//
export default () =>
  <Root>
    <AppNavigator>
    </AppNavigator>
    <MiniPlayer/>
  </Root>;

// export default AppNavigator;
