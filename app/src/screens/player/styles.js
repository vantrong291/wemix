const artworkSize = 300;

export default {
  artworkView: {
    width: "100%",
    alignItems: "center"
  },
  artwork : {
    width: artworkSize,
    height: artworkSize,
    borderRadius: artworkSize / 2,
    overflow: "hidden",
    borderWidth: 3,
    marginLeft: 5,
    marginTop: 5
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
}
