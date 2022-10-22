class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = { "picture": 200, "photo": 50, "item": 250 };
        this.listOfArticles = [];
        this.guests = []
    }

    addArticle(articleModel, articleName, quantity) {
        if (!Object.keys(this.possibleArticles).includes(articleModel.toLowerCase())) {
            throw new Error(`This article model is not included in this gallery!`)
        }
        const articles = this.listOfArticles.filter(a => a.articleName === articleName);
        let article = articles.find(a => a.articleModel === articleModel.toLowerCase());
        if (article) {
            article.quantity += quantity;
        } else {
            this.listOfArticles.push({ 'articleModel': articleModel.toLowerCase(), articleName, quantity });
        }
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`
    }

    inviteGuest(guestName, personality) {
        if (this.guests.some(g => g.guestName === guestName)) {
            throw new Error(`${guestName} has already been invited.`)
        }
        let points = 50;
        if (personality === 'Vip') points = 500;
        if (personality === 'Middle') points = 250;
        this.guests.push({ guestName, points, purchaseArticle: 0 });

        return `You have successfully invited ${guestName}!`
    }

    buyArticle( articleModel, articleName, guestName) {
        const articles = this.listOfArticles.filter(a => a.articleName === articleName);
        let article = articles.find(a => a.articleModel === articleModel.toLowerCase());
        if(!article) {
            throw new Error("This article is not found.")
        } 
        if(article.quantity === 0){
            return `The ${articleName} is not available.`
        } 
        const guest = this.guests.find(g => g.guestName === guestName)
        if (!guest) {
            return `This guest is not invited.`
        }
        const pointsNeeded = this.possibleArticles[article.articleModel]
        if(guest.points < pointsNeeded) {
            return `You need to more points to purchase the article.`
        } else {
            guest.points -= pointsNeeded;
            guest.purchaseArticle++;
            article.quantity--;
        }
        return `${guestName} successfully purchased the article worth ${pointsNeeded} points.`
    }

    showGalleryInfo (criteria) {
        if(criteria === 'article') {
            const articles = this.listOfArticles.map(a => `${a.articleModel} - ${a.articleName} - ${a.quantity}`).join('\n')
            return `Articles information:\n${articles}`
        } 
        if(criteria === 'guest') {
            const guests = this.guests.map(g => `${g.guestName} - ${g.purchaseArticle}`).join('\n')
            return `Guests information:\n${guests}`
        } 
    }
}

const artGallery = new ArtGallery('Curtis Mayfield'); 
artGallery.addArticle('picture', 'Mona Liza', 3);
artGallery.addArticle('Item', 'Ancient vase', 2);
artGallery.addArticle('picture', 'Mona Liza', 1);
artGallery.inviteGuest('John', 'Vip');
artGallery.inviteGuest('Peter', 'Middle');
artGallery.buyArticle('picture', 'Mona Liza', 'John');
artGallery.buyArticle('item', 'Ancient vase', 'Peter');
console.log(artGallery.showGalleryInfo('article'));
console.log(artGallery.showGalleryInfo('guest'));



