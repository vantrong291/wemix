const RN = require("react-native");
const { Dimensions, Platform } = RN;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const artWorkWidth = 65;

export default {
  miniPlayer: {
    position: "absolute",
    width: "100%",
    height: 62,
    backgroundColor: "#fff",
    left: 0,
    bottom: 55,
    // elevation: 3,
    borderTopColor: "#888",
    borderTopWidth: 0.5,
    flexDirection: "row"
  },
  artworkView: {
    width: artWorkWidth,
  },
  songInfoView: {
    width: "40%",
    paddingTop: 12,
    // left: artWorkWidth,
    // backgroundColor: "red",
    // height: "100%"
  },
  songControlView: {
    width: "40%",
    // right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    // backgroundColor: "blue"
  },
  artwork : {
    marginTop: 5,
    marginLeft: 5,
    width: 50,
    height: 50
  },
  songTitle: {
    fontSize: 14,
    // fontWeight: "bold"
  },
  songArtist: {
    fontSize: 11,
  },
  controlIcon: {
    color: "#333",
    width: "33%",
    fontSize: 26,
    alignItems: "center"
  }
}
