import {combineReducers} from "redux"
import userReducers from "./userReducers"
import projectReducers from  "./projectReducers"

const rootReducers = combineReducers({
  user: userReducers,
  project: projectReducers
});

export default rootReducers;
