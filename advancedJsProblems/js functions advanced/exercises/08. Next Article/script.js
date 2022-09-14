function getArticleGenerator(articles) {
    
    return function() {
        if(articles.length === 0) return;
    const articleEl = document.querySelector('#content');
    const article = document.createElement('article');
    article.textContent = articles.shift();
    articleEl.appendChild(article);
    };
}
