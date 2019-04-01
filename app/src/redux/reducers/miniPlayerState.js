import {MINI_PLAYER_STATE} from "../actions/actionTypes";
import isEmpty from "lodash/isEmpty";
let initState = {
  display: false,
};

const miniPlayerState = (miniPlayerState = initState, action) =>  {
  switch (action.type) {
    case MINI_PLAYER_STATE:
      return {
        display: action.miniPlayerState
      };
    default:
      return initState;
  }
};

export default miniPlayerState;
