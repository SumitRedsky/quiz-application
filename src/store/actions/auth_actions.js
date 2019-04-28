import fb from './../../firebase';
import { AsyncStorage } from 'react-native';
import { LOG_IN_SUCCESS, SIGN_UP_SUCCESS, USER_STATUS_SUCCESS, LOG_OUT_SUCCESS } from '../actionTypes';
import { ROOT_URL } from './../';

export const _login = user => async (dispatch) => {
  const { email, password } = user;
  let authResponse, response, uid, loginUser;
  try {
    authResponse = await fb.auth().signInWithEmailAndPassword(email, password);
    uid = authResponse.uid;
    response = await fb.database().ref(`/users/${uid}`).once('value');
    loginUser = { ...response.val(), uid };
    var userName = JSON.stringify(loginUser.name);
    await AsyncStorage.setItem('_user', JSON.stringify(loginUser));
    await AsyncStorage.setItem('userName', userName);
    dispatch({ type: SIGN_UP_SUCCESS, payload: loginUser });
  } catch (e) {
    throw new Error(e.response ? e.response.data.error || e.response.data : e.message);
  }
};
export const _signup = (user) => async (dispatch) => {

  const { email, password } = user;
  let response;
  try {
    response = await fb.auth().createUserWithEmailAndPassword(email, password);
    user['uid'] = response.uid;
    await fb.database().ref(`/users/${user.uid}`).set(user);
    await AsyncStorage.setItem('_user', JSON.stringify(user));
    var userName = JSON.stringify(user.name);
    await AsyncStorage.setItem('userName', userName);
    dispatch({ type: SIGN_UP_SUCCESS, payload: user });
  } catch (e) {
    throw new Error(e.response ? e.response.data.error || e.response.data : e.message);
  }
};

export const fbLogin = userData => async dispatch => {
  const { credentials, profile } = userData;
  const profileData = JSON.parse(profile);
  let user;
  try {
    const exist = await fb.database().ref('/users/').child(credentials.userId).once('value');
    user = exist.val();
    if (!user) {
      user = {
        email: profileData.email,
        uid: credentials.userId,
        name: profileData.name
      }
      await fb.database().ref(`/users/${user.uid}`).set(user);
    }
    await AsyncStorage.setItem('_user', JSON.stringify(user));
    dispatch({ type: SIGN_UP_SUCCESS, payload: user });
  } catch (e) {
    throw new Error(e.message);
  }
}

export const _userStatus = () => async (dispatch) => {
  let user;
  try {
    user = await AsyncStorage.getItem('_user');
    if (user !== null) {
      dispatch({ type: USER_STATUS_SUCCESS, payload: JSON.parse(user) });
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export const _logout = () => async (dispatch) => {
  try {
    await fb.auth().signOut();
    await AsyncStorage.removeItem('_user');
    dispatch({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    throw new Error(e.response ? e.response.data.error || e.response.data : e.message);
  }
};
