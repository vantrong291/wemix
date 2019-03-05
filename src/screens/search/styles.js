const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  // imageContainer: {
  //   flex: 1,
  //   width: null,
  //   height: null
  // },
  // logoContainer: {
  //   flex: 1,
  //   marginTop: deviceHeight / 8,
  //   marginBottom: 30
  // },
  // logo: {
  //   position: "absolute",
  //   left: Platform.OS === "android" ? 40 : 50,
  //   top: Platform.OS === "android" ? 35 : 60,
  //   width: 280,
  //   height: 100
  // },
  // // text: {
  // //   color: "#D8D8D8",
  // //   bottom: 6,
  // //   marginTop: 5
  // // },
  // container: {
  //   backgroundColor: "#FFF"
  // },
  // text: {
  //   alignSelf: "center",
  //   marginBottom: 7
  // },
  // mb: {
  //   marginBottom: 15
  // },
  // button: {
  //   backgroundColor: '#f5f5f5'
  // },
  // buttonPress: {
  //   backgroundColor: "#f5f5f5",
  //   color: '#e91d62'
  // },
  // textActive: {
  //   alignSelf: "center",
  //   color: '#e91d62',
  //   fontSize: 10
  // },
  // textButton: {
  //   alignSelf: "center",
  //   fontSize: 10
  // },
  // iconActive: {
  //   alignSelf: "center",
  //   color: '#e91d62'
  // },
  // iconButton: {
  //   alignSelf: "center",
  // },
  searchInput: {
    borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 3,
    height: 45,
    top: -5,
    marginLeft: 20,
    marginRight: 20 }
};
