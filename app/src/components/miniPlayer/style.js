const RN = require("react-native");
const { Dimensions, Platform } = RN;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const artWorkWidth = 55;

export default {
  miniPlayer: {
    position: "absolute",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    left: 0,
    bottom: 55,
    // elevation: 3,
    borderTopColor: "#888",
    borderTopWidth: 0.5,
    flexDirection: "row",
    zIndex: 1,
  },
  artworkView: {
    width: artWorkWidth,
  },
  songInfoView: {
    width: "40%",
    paddingTop: 7,
    // left: artWorkWidth,
    // backgroundColor: "red",
    // height: "100%"
  },
  songControlView: {
    width: "42%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    // backgroundColor: "blue"
  },
  artwork : {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: "hidden",
    borderWidth: 3,
    marginLeft: 5,
    marginTop: 5
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
    // alignItems: "flex-end",
    textAlign: "right",
  }
}
