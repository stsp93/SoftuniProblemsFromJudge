function solve() {

   const [authorIn, titleIn, categoryIn] = document.querySelectorAll('input');
   const contentIn = document.querySelector('#content')
   const createBtn = document.querySelector('.create');
   const mainSection = document.querySelector('main section');
   const archiveOl = document.querySelector('.archive-section ol')

   function create(e) {
      e.preventDefault();

      const author = authorIn.value
      const title = titleIn.value
      const category = categoryIn.value
      const content = contentIn.value

      const article = document.createElement('article');
      const h1 = document.createElement('h1');
      h1.textContent = title;
      
      const categoryP = document.createElement('p');
      categoryP.textContent = 'Category:';
      const catStrong = document.createElement('strong');
      catStrong.textContent = category;
      categoryP.appendChild(catStrong);

      const creatorP = document.createElement('p');
      creatorP.textContent = 'Creator:'
      const createStrong = document.createElement('strong');
      createStrong.textContent = author;
      creatorP.appendChild(createStrong);

      const contentP = document.createElement('p');
      contentP.textContent = content;



      const btnDiv = document.createElement('div');
      btnDiv.classList.add('buttons');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent= 'Delete';
      deleteBtn.classList.add('btn', 'delete');
      
      const archiveBtn = document.createElement('button')
      archiveBtn.textContent= 'Archive';
      archiveBtn.classList.add('btn', 'archive');

      btnDiv.appendChild(deleteBtn);
      btnDiv.appendChild(archiveBtn);

      article.appendChild(h1);
      article.appendChild(categoryP);
      article.appendChild(creatorP);
      article.appendChild(contentP);
      article.appendChild(btnDiv);

      mainSection.appendChild(article);

      deleteBtn.addEventListener('click', function() {
         article.remove();
      })

      archiveBtn.addEventListener('click', function() {
         const li = document.createElement('li');
         li.textContent = title;
         article.remove();

         archiveOl.appendChild(li);

         const sorted = Array.from(archiveOl.querySelectorAll('li')).sort((a,b) => a.textContent.localeCompare(b.textContent));

         sorted.forEach(l => archiveOl.appendChild(l))
      })

   }


   createBtn.addEventListener('click', create)
}
