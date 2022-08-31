import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// instance & interceptor
function create(url, options) {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  return instance;
}

function createWithAuth(url, options) {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  setInterceptors(instance);
  return instance;
}

export const auth = create(process.env.VUE_APP_API_URL);
export const posts = createWithAuth(`${process.env.VUE_APP_API_URL}posts/`);

// import axios from 'axios';
// import { setInterceptors } from './common/interceptors';
//
// function createInstance() {
//   return axios.create({
//     baseURL: process.env.VUE_APP_API_URL,
//   });
// }
//
// // axios 초기화 함수
// function createInstanceWithAuth(url) {
//   const instance = axios.create({
//     baseURL: `${process.env.VUE_APP_API_URL}${url}`,
//   });
//   return setInterceptors(instance);
// }
//
// export const instance = createInstance();
// export const posts = createInstanceWithAuth('posts');
