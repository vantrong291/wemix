import {combineReducers} from "redux"
import userReducers from "./userReducers"
import localTrackReducers from "./localTrackReducers"
import miniPlayerState from "./miniPlayerState"
import syncNavigation from "./navReducers"
import syncCurrentTrack from "./currentTrackReducers"


const rootReducers = combineReducers({
  user: userReducers,
  localTracks: localTrackReducers,
  miniPlayerState: miniPlayerState,
  syncNavigation: syncNavigation,
  syncCurrentTrack: syncCurrentTrack
});

export default rootReducers;
