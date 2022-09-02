function solve() {
  //TODO
  const text = document.querySelector('#input').value;
  const output = document.querySelector('#output');
  const sentences = text.match(/.+?\./g);
  let paragraphs = [];
  for(let i =0; i < sentences.length; i+=3){
    if(sentences[i]) paragraphs[i] = sentences[i];
    if(sentences[i+1])paragraphs[i] += sentences[i+1];
    if(sentences[i+2])paragraphs[i] += sentences[i+2];
  }
  paragraphs = paragraphs.filter(e => e !== '').map(e => `<p>${e}</p>`).join('\n');
  output.innerHTML = paragraphs
  console.log(paragraphs);
}

