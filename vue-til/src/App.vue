<template>
  <div class="app">
    <AppHeader></AppHeader>
    <div class="app-contents">
      <router-view></router-view>
    </div>
    <AppFooter></AppFooter>
    <ToastPopup></ToastPopup>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';
import AppFooter from '@/components/common/AppFooter';
import ToastPopup from '@/components/common/ToastPopup';

export default {
  components: {
    AppHeader,
    AppFooter,
    ToastPopup,
  },
};
</script>
<style>
@import './css/reset.css';
@import './css/common.css';
</style>
