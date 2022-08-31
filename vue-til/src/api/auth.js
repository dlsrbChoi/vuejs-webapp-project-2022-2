// 로그인, 회원 가입
import { auth } from './index';

// 로그인 API
function loginUser(data) {
  return auth.post('login', data);
}

// 회원가입 API
function signupUser(data) {
  return auth.post('signup', data);
}

export { signupUser, loginUser };
