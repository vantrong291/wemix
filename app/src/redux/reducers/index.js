import {combineReducers} from "redux"
import userReducers from "./userReducers"
import localTrackReducers from "./localTrackReducers"
import miniPlayerState from "./miniPlayerState"

const rootReducers = combineReducers({
  user: userReducers,
  localTracks: localTrackReducers,
  miniPlayerState: miniPlayerState
});

export default rootReducers;
