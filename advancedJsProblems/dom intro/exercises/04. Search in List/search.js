function search() {
   // TODO
   const townsEls =Array.from( document.querySelectorAll('#towns > li'));
   townsEls.forEach(t => {
      t.style.fontWeight = ''
         t.style.textDecoration = ''
   })
   const searchText = document.querySelector('#searchText');
   let result = document.querySelector('#result');
   result.textContent = ''
   if(!searchText.value) return;

   const matchedTowns = [];
   for(let town of townsEls) {
      if(town.textContent.includes(searchText.value)) {
         matchedTowns.push(town);
         town.style.fontWeight = 'bold'
         town.style.textDecoration = 'underline'
      }
   }
   console.log(matchedTowns);
   result.textContent = `${matchedTowns.length} matches found`;
}
