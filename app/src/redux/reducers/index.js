import {combineReducers} from "redux"
import userReducers from "./userReducers"
import localTrackReducers from "./localTrackReducers"
import miniPlayerState from "./miniPlayerState"
import syncCurrentTrack from "./currentTrackReducers"


const rootReducers = combineReducers({
  user: userReducers,
  localTracks: localTrackReducers,
  miniPlayerState: miniPlayerState,
  syncCurrentTrack: syncCurrentTrack
});

export default rootReducers;
