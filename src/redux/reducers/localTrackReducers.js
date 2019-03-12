import {QUERY_LOCAL_SONG} from "../actions/actionTypes";
import isEmpty from "lodash/isEmpty";
let initState = {
  isEmpty: true,
  tracks: []
};

const localTrackReducers = (allTracks = initState, action) =>  {
  switch (action.type) {
    case QUERY_LOCAL_SONG:
      return {
        isEmpty: isEmpty(action.tracks),
        tracks: action.tracks
      };
    default:
      return initState;
  }
};

export default localTrackReducers;
