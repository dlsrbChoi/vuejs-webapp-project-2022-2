import store from '@/store/index';

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = store.state.token;
      // console.log(config);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (respones) {
      return respones;
    },
    function (error) {
      //  401 에러, 또는 403
      return Promise.reject(error);
    },
  );
  return instance;
}
