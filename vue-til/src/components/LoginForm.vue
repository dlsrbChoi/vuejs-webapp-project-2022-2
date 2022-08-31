<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <PageHeader>로그인</PageHeader>
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">ID:</label>
          <input id="username" type="text" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              이메일 형식으로 입력해주세요.
            </span>
          </p>
        </div>
        <div>
          <label for="password">PW:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
          :class="!isUsernameValid || !password ? 'disabled' : null"
        >
          로그인
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/common/PageHeader';
import { validateEmail } from '@/utils/validation';
import bus from '@/utils/bus';

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      // form values
      username: '',
      password: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      if (!this.username || !this.password) {
        alert('Fill in the account information');
        return;
      }
      try {
        const response = await this.$store.dispatch('LOGIN', {
          username: this.username,
          password: this.password,
        });
        // console.log(response);
        bus.$emit('show:toast', response.data.message);
        await this.$router.push('/main');
        this.initForm();
        // // 비즈니스 로직
        // const userData = {
        //   username: this.username,
        //   password: this.password,
        // };
        // // actions 호출
        // await this.$store.dispatch('LOGIN', userData);
        // bus.$emit('show:toast', userData.data.message);
        // await this.$router.push('/main');
        // this.initForm();
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error);
        this.logMessage = error.response.data;
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
