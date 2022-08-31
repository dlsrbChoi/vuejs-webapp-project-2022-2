<template>
  <div class="contents">
    <PageHeader>Edit Post</PageHeader>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="editForm">
        <div>
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents:</label>
          <textarea id="contents" cols="30" rows="5" v-model="contents" />
          <p v-if="!isContentsVaild" class="validation-text warning">
            Contents length nust be less than 200
          </p>
        </div>
        <button
          type="submit"
          class="btn"
          :class="isButtonDisabled"
          :disabled="isButtonDisabled"
        >
          Edit
        </button>
      </form>
      <p class="log">
        {{ resultMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/common/PageHeader';
import { fetchPostById, editPostById } from '@/api/posts';
import bus from '@/utils/bus';

export default {
  name: 'PostEditForm',
  components: {
    PageHeader,
  },
  data() {
    return {
      title: '',
      contents: '',
      resultMessage: '',
    };
  },
  computed: {
    isButtonDisabled() {
      return !this.title || !this.contents ? 'disabled' : null;
    },
    isContentsVaild() {
      return this.contents.length <= 200;
    },
  },
  methods: {
    setForm({ title, contents }) {
      this.title = title;
      this.contents = contents;
    },
    async editForm() {
      try {
        const id = this.$route.params.id;
        const response = await editPostById(id, {
          title: this.title,
          contents: this.contents,
        });
        bus.$emit('show:toast', `${response.data.title} was editted`);
        await this.$router.push('/main');
      } catch (e) {
        console.log(e);
        this.resultMessage = e;
      }
    },
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const { data } = await fetchPostById(id);
      this.setForm(data);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.form-wrapper .form {
  width: 100%;
}
.btn {
  background-color: #fc5185;
  color: white;
}
.log {
  width: 420px;
}
</style>
