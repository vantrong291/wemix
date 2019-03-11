import {LOGIN_SUCCESS, LOGOUT_SUCCESS, FB_LOGIN_SUCCESS, FB_SIGNUP_SUCCESS, GG_LOGIN_SUCCESS, GG_SIGNUP_SUCCESS, SIGNUP_SUCCESS, SYNC_AUTH_STATUS} from "../actions/actionTypes.js";
import isEmpty from "lodash/isEmpty";
let initState = {
  isAuthenticated: false,
  user: {}
};

const userReducers = (auth = initState, action) =>  {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case FB_LOGIN_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case GG_LOGIN_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case SIGNUP_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case GG_SIGNUP_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case FB_SIGNUP_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case SYNC_AUTH_STATUS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case LOGOUT_SUCCESS:
      return initState;
    default:
      return auth
  }

};

export default userReducers;
