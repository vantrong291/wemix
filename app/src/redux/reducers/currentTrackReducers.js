import {SYNC_CURRENT_TRACK} from "../actions/actionTypes";
import isEmpty from "lodash/isEmpty";
let initState = {
  title: '',
  genre: '',
  album: '',
  url: '',
  id: '',
  artwork: '',
  artist: '',
  duration: ''
};


const currentTrack = (currentTrack = initState, action) =>  {
  switch (action.type) {
    case SYNC_CURRENT_TRACK:
      return {
        currentTrack: action.currentTrack
      };
    default:
      return initState;
  }
};

export default currentTrack;
