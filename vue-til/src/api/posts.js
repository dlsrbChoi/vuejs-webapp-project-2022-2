// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { posts } from './index';

// 학습 노트 데이터를 목록을 조회하는 API
function fetchPosts() {
  return posts.get('/');
}

// 특정 학습 노트를 조회하는 API
function fetchPostById(id) {
  return posts.get(id);
}

// 학습 노트 데이터를 생성하는 API
function createNewPost(data) {
  return posts.post('/', data);
}

// 학습 노트 데이터를 삭제하는 API
function deletePostById(id) {
  return posts.delete(id);
}

// 학습 노트 데이터를 수정하는 API
function editPostById(id, data) {
  return posts.put(id, data);
}

export {
  fetchPosts,
  fetchPostById,
  createNewPost,
  deletePostById,
  editPostById,
};
