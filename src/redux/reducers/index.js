import {combineReducers} from "redux"
import userReducers from "./userReducers"
import localTrackReducers from "./localTrackReducers"

const rootReducers = combineReducers({
  user: userReducers,
  localTracks: localTrackReducers
});

export default rootReducers;
