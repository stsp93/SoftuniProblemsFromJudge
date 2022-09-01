function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const tableRows = Array.from(document.querySelectorAll('tbody tr'));
      const tdFieldsEls = Array.from(document.querySelectorAll('tbody td'));
      const searchEl = document.querySelector('#searchField');
      //Reset
      tableRows.forEach(r => r.classList.remove('select'));
      
      const matches = tdFieldsEls.filter(f => f.textContent.includes(searchEl.value));
      matches.forEach(m => {
         m.parentElement.classList.add('select');
      })
      console.log(matches);
      
      searchEl.value = '';
   }
}