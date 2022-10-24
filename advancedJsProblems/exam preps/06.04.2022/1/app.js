window.addEventListener("load", solve);

function solve() {
  const [titleIn, categIn] = document.querySelectorAll('input');
  const contentIn = document.querySelector('textarea');
  const publishBtn = document.querySelector('#publish-btn');
  const clearBtn = document.querySelector('#clear-btn');
  const profitEl = document.querySelector('#profit');

  const reviewListUl = document.querySelector('#review-list')
  const publishedListUl = document.querySelector('#published-list');


  function publish(e) {
    e.preventDefault();

    const title = titleIn.value;
    const category = categIn.value;
    const content = contentIn.value;

    if (title === '' || category === '' || content === '') return;


    titleIn.value = '';
    categIn.value = '';
    contentIn.value = '';

    const postLi = document.createElement('li');
    postLi.classList.add('rpost');
    const article = document.createElement('article');
    const titleH4 = document.createElement('h4');
    titleH4.textContent = title;
    const catP = document.createElement('p');
    catP.textContent = 'Category: ' + category;
    const contentP = document.createElement('p');
    contentP.textContent = 'Content: ' + content;
    article.appendChild(titleH4);
    article.appendChild(catP);
    article.appendChild(contentP);

    const editBtn = document.createElement('button');
    editBtn.classList.add('action-btn');
    editBtn.classList.add('edit');
    editBtn.textContent = 'Edit';
    const approveBtn = document.createElement('button');
    approveBtn.classList.add('action-btn');
    approveBtn.classList.add('approve');
    approveBtn.textContent = 'Approve';

    postLi.appendChild(article);
    postLi.appendChild(editBtn);
    postLi.appendChild(approveBtn);

    reviewListUl.appendChild(postLi);

    editBtn.addEventListener('click', function () {
      titleIn.value = title;
      categIn.value = category;
      contentIn.value = content;

      postLi.remove();
    })

    approveBtn.addEventListener('click', function() {

      editBtn.remove();
      approveBtn.remove();
      publishedListUl.appendChild(postLi);
    })


  }

  clearBtn.addEventListener('click', function() {
    publishedListUl.innerHTML = '';
  })

  publishBtn.addEventListener('click', publish)
}
