function solve() {
  const questionEls =Array.from(document.querySelectorAll('section')) ;
  console.log(questionEls);
  const quizieEl = document.querySelector('#quizzie');
  const resultsEl = document.querySelector('#results');

  let score = 0;
  let questionNum = 0;
  const answers = {
    'onclick':1,
    'JSON.stringify()':1,
    'A programming API for HTML and XML documents':1,
  };

  const onClick = function (e) {
    if (e.target.className !== 'answer-text') return; //Change if bug   
    if(answers[e.target.textContent]){
      score++;
    }
    questionNum++;
    // questionEls.forEach(el => el.style.display = 'none');
    questionEls[questionNum-1].style.display = 'none';
    if(questionNum < questionEls.length ) {
      questionEls[questionNum].style.display = 'block';
    } else {
      resultsEl.style.display = 'block'
    }

    // 
    if(score === 3){
      resultsEl.children[0].children[0].textContent = 'You are recognized as top JavaScript fan!'
    } else {
      resultsEl.children[0].children[0].textContent = `You have ${score} right answers`

    }
  }
  quizieEl.addEventListener('click', onClick)
}
