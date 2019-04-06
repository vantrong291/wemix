import {SYNC_NAVIGATION_PROPS} from "../actions/actionTypes";

let initState = {};

const syncNavigation = (syncNavigation = initState, action) =>  {
  switch (action.type) {
    case SYNC_NAVIGATION_PROPS:
      return {
        navigation: action.syncNavigation
      };
    default:
      return initState;
  }
};

export default syncNavigation;
