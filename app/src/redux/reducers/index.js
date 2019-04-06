import {combineReducers} from "redux"
import userReducers from "./userReducers"
import localTrackReducers from "./localTrackReducers"
import miniPlayerState from "./miniPlayerState"
import syncNavigation from "./navReducers"


const rootReducers = combineReducers({
  user: userReducers,
  localTracks: localTrackReducers,
  miniPlayerState: miniPlayerState,
  syncNavigation: syncNavigation
});

export default rootReducers;
