<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <PageHeader>회원가입</PageHeader>
      <form @submit.prevent="registerUser" class="form">
        <div>
          <label for="username">ID: </label>
          <input
            id="username"
            type="text"
            v-model="username"
            :class="usernameValidClass"
          />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid">
              이메일 형식으로 입력해 주세요.
            </span>
          </p>
        </div>
        <div>
          <label for="password">PW: </label>
          <input
            id="password"
            type="text"
            v-model="password"
            :class="passwordValidClass"
          />
          <p class="validation-text">
            <span class="warning" v-if="!isPasswordValid">
              비밀번호는 8자 이상이어야 합니다.
            </span>
          </p>
        </div>
        <div>
          <label for="nickname">이름: </label>
          <input
            id="nickname"
            type="text"
            v-model="nickname"
            :class="nicknameValidClass"
          />
        </div>
        <button
          type="submit"
          class="btn"
          :class="isButtonDisabled"
          :disabled="isButtonDisabled"
        >
          회원 가입
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { signupUser } from '@/api/auth';
import { validateEmail, validatePassword } from '@/utils/validation';
import PageHeader from '@/components/common/PageHeader';

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      // form values
      username: '',
      password: '',
      nickname: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    usernameValidClass() {
      if (!this.username) {
        return;
      }
      return validateEmail(this.username) ? 'valid' : 'invalid';
    },
    isUsernameValid() {
      if (!this.username) {
        return true;
      }
      return validateEmail(this.username);
    },
    passwordValidClass() {
      if (!this.password) {
        return;
      }
      return validatePassword(this.password) ? 'valid' : 'invalid';
    },
    isPasswordValid() {
      if (!this.password) {
        return true;
      }
      return validatePassword(this.password);
    },
    nicknameValidClass() {
      return this.nickname ? 'valid' : null;
    },
    isButtonDisabled() {
      return !this.username ||
        !this.password ||
        !this.nickname ||
        !validateEmail(this.username) ||
        !validatePassword(this.password)
        ? 'disabled'
        : null;
    },
  },
  methods: {
    async registerUser() {
      try {
        await signupUser({
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        });
        this.logMessage = `${this.username} 님이 가입되었습니다.`;
        this.initForm();
      } catch (e) {
        console.log(e.response);
        if (e.response.status === 409) {
          this.logMessage = `${this.username} 는(은) 이미 사용중입니다.`;
        }
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style>
.form {
  width: 460px;
  height: 100%;
}
.form .validation-text {
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
}
.btn {
  color: white;
}
.log {
  width: 460px;
}
</style>
