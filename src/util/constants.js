import { AsyncStorage } from 'react-native';

const API = 'http://172.17.143.164:8080/api/v1';
const POST_PATH = '/post';
const AUTH_PATH = '/auth/login';
const SUBSCRIBE_POST_PATH = '/postSub';
const SUBSCRIBE_LOCATION_PATH = '/locationSub';

const serverJWT = AsyncStorage.getItem('@MyFbToken:serverToken');
const AUTH_TOKEN = `Bearer ${serverJWT}`;

export { API, POST_PATH, AUTH_PATH, SUBSCRIBE_POST_PATH, SUBSCRIBE_LOCATION_PATH, AUTH_TOKEN };
