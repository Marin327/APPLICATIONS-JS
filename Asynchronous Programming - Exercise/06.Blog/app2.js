async function attachEvents() {
    const postsSelect = document.getElementById('posts')
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const commentsList = document.getElementById('post-comments');

    document.getElementById('btnLoadPosts')
        .addEventListener('click', loadPostsHandler);

    document.getElementById('btnViewPost')
        .addEventListener('click', loadPostDetailsHandler)

    await loadPostsHandler();
    await loadPostDetailsHandler();

    function displayPost(post) {
        postTitle.textContent = post.title;
        postBody.textContent = post.body;
    }

    function displayComments(comments) {
        commentsList.innerHTML = '';
        comments.map(c => {
            commentsList.appendChild(ce('li', {id: c.id}, c.text));
        })
    }

    async function loadPostDetailsHandler() {
        try {
            const posts = loadData('http://localhost:3030/jsonstore/blog/posts/');
            const postDetails = loadData('http://localhost:3030/jsonstore/blog/comments');
            let postId = postsSelect.value;
            let title = postsSelect.options[postsSelect.selectedIndex].text;

            Promise.all([posts, postDetails])
                .then(([posts, data]) => {
                    let post = Object.values(posts).filter((post => post.title === title))[0];
                    let postDetails = Object.values(data).filter(c => c.postId === postId);

                    displayPost(post);
                    displayComments(postDetails);
                });
        } catch (e) {
            alert(e.message);
        }
    }

    async function loadPostsHandler() {
        const data = await loadData('http://localhost:3030/jsonstore/blog/posts');
        postsSelect.innerHTML = '';
        Object.entries(data)
            .forEach(([key, post]) => postsSelect.appendChild(
                ce('option', {text: post.title, value: key})));
    }
}

async function loadData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error ${response.status} (${response.statusText})`)
    }

    return await response.json();
}

attachEvents();

function ce(type, attributes, ...content) {
    const result = document.createElement(type);

    Object.entries(attributes || {})
        .forEach(([attribute, value]) => {
            if (isEventListener(attribute)) {
                result.addEventListener(attribute.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attribute] = value;
            }
        });

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (isElement(e)) {
            result.appendChild(e);
        } else {
            const node = document.createTextNode(e);
            result.appendChild(node);
        }
    });

    return result;

    function isEventListener(attr) {
        return attr.substring(0, 2).localeCompare('on') === 0;
    }

    function isElement(element) {
        return typeof element != 'string' && typeof element != 'number';
    }
}