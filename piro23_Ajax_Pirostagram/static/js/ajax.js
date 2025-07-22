// CSRF 토큰 가져오기 함수
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// axios 기본 설정
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

document.body.addEventListener('click', async function(e) {
  // --- 좋아요 버튼 클릭 처리 ---
  if (e.target.classList.contains('like-btn')) {
    const postSection = e.target.closest('.post__section');
    const postId = postSection.dataset.postId;
    
    try {
      const { data } = await axios.post(`/like/${postId}/`);
      const likeBtn = e.target;
      const likeCountSpan = postSection.querySelector('.like-count');
      
      likeCountSpan.textContent = data.like_count;
      likeBtn.innerHTML = data.liked ? '♥' : '♡';
    } catch (err) {
      console.error(err);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  }

  // --- 댓글 삭제 버튼 클릭 처리 ---
  if (e.target.classList.contains('delete-comment-btn')) {
    const commentDiv = e.target.closest('.comment');
    const commentId = commentDiv.dataset.commentId;
    
    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      try {
        const { data } = await axios.post(`/comment/delete/${commentId}/`);
        if (data.result === 'ok') {
          commentDiv.remove();
        } else {
          alert('댓글 삭제에 실패했습니다.');
        }
      } catch (err) {
        console.error(err);
        alert('댓글 삭제 중 오류가 발생했습니다.');
      }
    }
  }
});

// --- 댓글 작성 폼 제출 처리 ---
document.body.addEventListener('submit', async function(e) {
  if (e.target.classList.contains('add-comment-form')) {
    e.preventDefault();
    
    const form = e.target;
    const postId = form.closest('.post__section').dataset.postId;
    const textInput = form.querySelector('input[name="text"]');
    const commentsContainer = form.closest('.post__section').querySelector('.comments');
    const formData = new FormData(form);

    try {
      const { data } = await axios.post(`/comment/add/${postId}/`, formData);
      if (data.error) {
        alert(data.error);
      } else {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.dataset.commentId = data.id;
        newComment.innerHTML = `
          <span><b>${data.user}</b>: ${data.text}</span>
          <button class="delete-comment-btn">삭제</button>
        `;
        commentsContainer.appendChild(newComment);
        textInput.value = '';
      }
    } catch (err) {
      console.error(err);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  }
});
