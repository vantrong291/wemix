import React, {Component} from "react";
import {Root, Button} from "native-base";
import {SafeAreaView, Text} from "react-native";
import {
    createDrawerNavigator,
    createStackNavigator,
    createMaterialTopTabNavigator, MaterialTopTabBar, BottomTabBar, createSwitchNavigator
} from "react-navigation";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";
import NavigationService from './NavigationService';
import Login from "./screens/login";
import Signup from "./screens/signup";
import Home from "./screens/home";
import Chart from "./screens/chart";
import Search from "./screens/search";
import OfflinePlaylist from "./screens/offlinePlaylist";
import Personal from "./screens/personal";
import ChartCategory from "./screens/chartCategory";
import Album from "./screens/album";
import Singer from "./screens/singer";
import PersonalInfo from "./screens/personalInfo";
import MyPlaylist from "./screens/myPlaylist";
import MyPlaylistItem from "./screens/myPlaylistItem";
import AddToPlaylist from "./screens/addToPlaylist";
import SendNoti from "./screens/sendNoti";


import MiniPlayer from "./components/miniPlayer";
import Player from "./screens/player";
import variables from "./theme/variables/custom"
// import {Text} from "react-native-paper";

const Switcher = createMaterialTopTabNavigator(
    {
        BXH: {
            screen: ChartCategory,
            navigationOptions: {
                tabBarLabel: "BXH",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="barschart" color={tintColor} size={24}/>
                )
            }
        },
        Search: {
            screen: Search,
            navigationOptions: {
                tabBarLabel: "Tìm kiếm",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="search1" color={tintColor} size={24}/>
                )
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "Trang chủ",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="home" color={tintColor} size={24}/>
                )
            }
        },
        OfflinePlaylist: {
            screen: OfflinePlaylist,
            navigationOptions: {
                tabBarLabel: "Nhạc Offline",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="bars" color={tintColor} size={24}/>
                )
            }
        },
        Personal: {
            screen: Personal,
            navigationOptions: {
                tabBarLabel: "Cá nhân",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="user" color={tintColor} size={24}/>
                )
            },
        }
    },
    {
        initialRouteName: "Home",
        order: ["Home", "BXH", "Search", "OfflinePlaylist", "Personal"],
        // activeTintColor: "#e91d62",
        // barStyle: { backgroundColor: '#f5f5f5' },
        // shifting:true

        // tabBarComponent: MyTabBar,
        tabBarPosition: "top",
        swipeEnabled: true,
        animationEnabled: true,
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
                height: 50,
                // elevation: 3,
            },
            iconStyle: {},
            indicatorStyle: {
                height: 0
            },
            showIcon: true,
            showLabel: false
        }
    }
);

class Main extends React.Component {
    render() {
        return <Switcher/>;
    }
}

const AppStackNavigator = createStackNavigator(
    {
        Main: {screen: Main},
        Home: {screen: Home},
        ChartDetail: {screen: Chart},
        Player: {
            screen: Player
        },
        Album: {screen: Album},
        Singer: {screen: Singer},
        PersonalInfo: {screen: PersonalInfo},
        MyPlaylist: {screen: MyPlaylist},
        MyPlaylistItem: {screen: MyPlaylistItem},
        AddToPlaylist: {screen: AddToPlaylist},
        SendNoti: {screen: SendNoti}
    },
    {
        initialRouteName: "Main",
        headerMode: "none"
    }
);


const AppSwitchNavigator = createSwitchNavigator(
    {
        Login: {screen: Login},
        Signup: {screen: Signup},
        Stack: {screen: AppStackNavigator}
    },
    {
        initialRouteName: "Login"
    }
);

export default () =>
    <Root>
        {/*<Text>dfsjkng</Text>*/}
        <AppSwitchNavigator ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
        <MiniPlayer/>
    </Root>;

// export default AppNavigator;
