function attachEvents() {
    const [btnLoadPosts, btnViewPost] = document.querySelectorAll('button');
    const postsEl = document.querySelector('#posts');
    const postTitleEl = document.querySelector('#post-title');
    const postBodyEl = document.querySelector('#post-body');
    const postCommentsEl = document.querySelector('#post-comments');

    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts'
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments'

    let state = {
        posts: {},
        comments: {},
        currentPost: {},
        currentComments: {},
    }


    async function loadPosts() {
        try {
            const res = await fetch(postsUrl);
            const data = await res.json();

            state.posts = data;

            const markup = Object.entries(state.posts).map(([key, p]) => `<option value="${key}">${p.title}</option>`);

            postsEl.insertAdjacentHTML('beforeend', markup);

        } catch (err) {
            console.log(err);
        }
    }


    async function viewPost() {

        try {
            const res = await fetch(commentsUrl);
            const data = await res.json();

            postBodyEl.innerHTML = '';
            postTitleEl.innerHTML = '';
            postCommentsEl.innerHTML = '';

            state.comments = data;

            state.currentComments = Object.values(state.comments).filter(obj => {
                return obj.postId === postsEl.value
            });
            state.currentPost = state.posts[postsEl.value];

            postTitleEl.textContent = state.currentPost.title;
            postBodyEl.textContent = state.currentPost.body;

            const commentMarkup = state.currentComments.map(c => `<li id="${c.id}">${c.text}</li>`);

            postCommentsEl.insertAdjacentHTML('beforeend', commentMarkup);
        } catch (err) {
            console.log(err);
        }
    }

    btnLoadPosts.addEventListener('click', loadPosts)
    btnViewPost.addEventListener('click', viewPost)
}

attachEvents();