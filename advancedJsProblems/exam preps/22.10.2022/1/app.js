window.addEventListener("load", solve);

function solve() {

  

  const [firstnameIn, lastnameIn, ageIn, titleIn, publishBtn] = document.querySelectorAll('input');
  const storyTextIn = document.querySelector('#story')
  const genreIn = document.querySelector('#genre')

  const previewList = document.querySelector('#preview-list');
  const mainDiv = document.querySelector('#main')


  function publish(e) {
    e.preventDefault();
    const firstname = firstnameIn.value;
    const lastname = lastnameIn.value;
    const age = ageIn.value;
    const title = titleIn.value;
    const storyText = storyTextIn.value;
    const genre = genreIn.value;

    if (firstname === '' || lastname === '' || age === '' || title === '' || storyText === '') return;

    const storyInfoLi = document.createElement('li');
    storyInfoLi.classList.add('story-info');

    const article = document.createElement('article');
    const nameH4 = document.createElement('h4');
    nameH4.textContent = `Name: ${firstname} ${lastname}`;
    const ageP = document.createElement('p');
    ageP.textContent = 'Age: ' + age;
    const titleP = document.createElement('p');
    titleP.textContent = 'Title: ' + title;
    const genreP = document.createElement('p');
    genreP.textContent = 'Genre: ' + genre;
    const textP = document.createElement('p');
    textP.textContent = storyText;
    article.appendChild(nameH4);
    article.appendChild(ageP);
    article.appendChild(titleP);
    article.appendChild(genreP);
    article.appendChild(textP);

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('save-btn');
    saveBtn.textContent = 'Save Story';
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit Story';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete Story';

    storyInfoLi.appendChild(article);
    storyInfoLi.appendChild(saveBtn);
    storyInfoLi.appendChild(editBtn);
    storyInfoLi.appendChild(deleteBtn);


    firstnameIn.value = '';
    lastnameIn.value = '';
    ageIn.value = '';
    titleIn.value = '';
    storyTextIn.value = '';
    genreIn.value = '';

    publishBtn.disabled = true;
    saveBtn.disabled = false;
    editBtn.disabled = false;
    deleteBtn.disabled = false;

    previewList.appendChild(storyInfoLi);

    editBtn.addEventListener('click', function () {
      publishBtn.disabled = false;

      storyInfoLi.remove();

      firstnameIn.value = firstname;
      lastnameIn.value = lastname;
      ageIn.value = age;
      titleIn.value = title;
      storyTextIn.value = storyText;
      genreIn.value = genre;
    });

    saveBtn.addEventListener('click', function() {
      mainDiv.innerHTML = '';
      const messageH1 = document.createElement('h1');
      messageH1.textContent = `Your scary story is saved!`
      mainDiv.appendChild(messageH1)
    })

    deleteBtn.addEventListener('click', function() {
      publishBtn.disabled = false;
      storyInfoLi.remove();
    })
  }

  publishBtn.addEventListener('click', publish)
}
