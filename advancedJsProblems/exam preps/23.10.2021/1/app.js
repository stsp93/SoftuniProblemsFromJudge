window.addEventListener('load', solve);

function solve() {
    const [genreIn, nameIn, authorIn, dateIn] = document.querySelectorAll('input');
    const addBtn = document.querySelector('#add-btn');
    const allHitsDiv = document.querySelector('.all-hits-container')
    const savedHitsDiv = document.querySelector('.saved-container');
    const likesP = document.querySelector('.likes p')

    function add(e) {
        e.preventDefault();

        const genre = genreIn.value;
        const name = nameIn.value;
        const author = authorIn.value;
        const date = dateIn.value;

        if (genre === '' || name === '' || author === '' || date === '') return;

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('hits-info');


        const img = document.createElement('img');
        img.src = './static/img/img.png';
        const genreH2 = document.createElement('h2');
        genreH2.textContent = 'Genre: ' + genre;
        const nameH2 = document.createElement('h2');
        nameH2.textContent = 'Name: ' + name;
        const authorH2 = document.createElement('h2')
        authorH2.textContent = 'Author: ' + author;
        const dateH2 = document.createElement('h3')
        dateH2.textContent = 'Date: ' + date;

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('save-btn');
        saveBtn.textContent = 'Save song';
        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.textContent = 'Like song';
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';

        infoDiv.appendChild(img);
        infoDiv.appendChild(genreH2);
        infoDiv.appendChild(nameH2);
        infoDiv.appendChild(authorH2);
        infoDiv.appendChild(dateH2);
        infoDiv.appendChild(saveBtn);
        infoDiv.appendChild(likeBtn);
        infoDiv.appendChild(deleteBtn);


        allHitsDiv.appendChild(infoDiv);

        genreIn.value = '';
        nameIn.value = '';
        authorIn.value = '';
        dateIn.value = '';

        likeBtn.addEventListener('click', function() {
            let likes = +likesP.textContent.slice(12);
            likes++;
            likesP.textContent = 'Total Likes: ' + likes;
            likeBtn.disabled = true;
        })

        saveBtn.addEventListener('click', function() {
            likeBtn.remove();
            saveBtn.remove();
            savedHitsDiv.appendChild(infoDiv);
        })

        deleteBtn.addEventListener('click', function() {
            infoDiv.remove();
        })
    }

    addBtn.addEventListener('click', add)
}