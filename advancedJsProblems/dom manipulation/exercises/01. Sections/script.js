function create(words) {
   const content = document.querySelector('#content');
   for (let word of words) {
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = word;
      p.style.display = 'none'
      div.appendChild(p);
      content.appendChild(div);
      div.addEventListener('click', function() {
         this.children[0].style.display = '';
      })
   }
   
}