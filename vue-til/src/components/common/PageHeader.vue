<template>
  <div class="page-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>

<style scoped>
.page-header {
  font-size: 45px;
  font-weight: 600;
  color: #456155;
  padding: 30px 5px 15px;
}
</style>
