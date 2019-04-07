import {LOGIN_SUCCESS, LOGOUT_SUCCESS, FB_LOGIN_SUCCESS, FB_SIGNUP_SUCCESS, GG_LOGIN_SUCCESS, GG_SIGNUP_SUCCESS, SIGNUP_SUCCESS, SYNC_AUTH_STATUS, QUERY_LOCAL_SONG, MINI_PLAYER_STATE, SYNC_NAVIGATION_PROPS, SYNC_CURRENT_TRACK} from "./actionTypes.js";

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user: user
  }
};

export const signupSuccess = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    user: user
  }
};

export const fbLoginSuccess = (user) => {
  return {
    type: FB_LOGIN_SUCCESS,
    user: user
  }
};

export const ggLoginSuccess = (user) => {
  return {
    type: GG_LOGIN_SUCCESS,
    user: user
  }
};

export const fbSignupSuccess = (user) => {
  return {
    type: FB_SIGNUP_SUCCESS,
    user: user
  }
};

export const ggSignupSuccess = (user) => {
  return {
    type: GG_SIGNUP_SUCCESS,
    user: user
  }
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
};

export const syncAuthStatus = (user) => {
  return {
    type: SYNC_AUTH_STATUS,
    user: user
  }
};

export const queryLocalSong = (tracks) => {
  return {
    type: QUERY_LOCAL_SONG,
    tracks: tracks
  }
};

export const miniPlayerState = (state) => {
  return {
    type: MINI_PLAYER_STATE,
    miniPlayerState: state
  }
};

export const syncNavigationProps = (navigation) => {
  return {
    type: SYNC_NAVIGATION_PROPS,
    syncNavigation: navigation
  }
};

export const syncCurrentTrack = (track) => {
  return {
    type: SYNC_CURRENT_TRACK,
    currentTrack: track
  }
};