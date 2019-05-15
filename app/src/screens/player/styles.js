import variables from "../../theme/variables/custom";

const RN = require("react-native");
const { Dimensions, Platform } = RN;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const artWorkWidth = 55;
const artworkPlayerSize = 250;



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
    zIndex: 0,
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
  songControlMiniPlayerView: {
    width: "42%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    // backgroundColor: "blue"
  },
  artworkMiniPlayer : {
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
  controlMiniPlayerIcon: {
    color: "#333",
    width: "33%",
    fontSize: 26,
    // alignItems: "flex-end",
    textAlign: "right",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  artworkPlayer : {
    width: artworkPlayerSize,
    height: artworkPlayerSize,
    borderRadius: artworkPlayerSize / 2,
    overflow: "hidden",
    borderWidth: 3,
    marginLeft: 5,
    marginTop: 5
  },
  artworkPlayerView: {
    width: "100%",
    alignItems: "center"
  },

  sliderContainer: {
    height: 30,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: "#e5e5e5",
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#31a4db',
    borderRadius: 10 / 2,
    shadowColor: '#31a4db',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  songControlPlayerView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 10,
  },
  controlPlayerIcon: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
  },
  playPausePlayerIcon: {
    color: "#fff",
    // width: "40%",
    fontSize: 60,
    alignSelf: "center",
    textAlign: "center",
    // paddingLeft: 25,
    // paddingRight: 25,

  },
  toolbarIcon : {color: variables.playerTextColor, fontSize: 24},
  toolbarButton: {
    width: 50,
    height: 30,
    alignItems: "center"
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  barIcon: {
    fontSize: 24
  }
}
