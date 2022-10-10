class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
    }

    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`;
        };
        if (this._likes.length === 1) {
            return `${this._likes[0]} likes this story!`;
        };

        return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`;
    }

    like(username) {
        if (this._likes.includes(username)) {
            throw new Error(`You can't like the same story twice!`);
        }
        if (this.creator === username) {
            throw new Error(`You can't like your own story!`);
        }
        this._likes.push(username);
        return `${username} liked ${this.title}!`;
    }

    dislike(username) {
        if (!this._likes.includes(username)) {
            throw new Error(`You can't dislike this story!`);
        }

        this._likes.splice(this._likes.indexOf(username), 1);
        return `${username} disliked ${this.title}`;
    }

    comment(username, content, id) {
        if (id === undefined || !this._comments.some(c => c.id === id)) {
            this._comments.push({ id: this._comments.length + 1, username, content, replies: [] });
            return `${username} commented on ${this.title}`
        } else {
            const comment = this._comments.find(c => c.id === id);
            comment.replies.push({ id: comment.id + ((comment.replies.length + 1) / 10), username, content });
            return `You replied successfully`
        }
    }

    toString(sortingType) {
        if (sortingType == 'asc') {
            this._comments.sort((a, b) => a.id - b.id);
            this._comments.forEach(c => {
                if (c.replies) c.replies.sort((a, b) => a.id - b.id)
            })
        }
        if (sortingType == 'desc') {
            this._comments.sort((a, b) => b.id - a.id);
            this._comments.forEach(c => {
                if (c.replies) c.replies.sort((a, b) => b.id - a.id)
            })
        }
        if (sortingType == 'username') {
            this._comments.sort((a, b) => a.username.localeCompare(b.username));
            this._comments.forEach(c => {
                if (c.replies) c.replies.sort((a, b) => a.username.localeCompare(b.username))
            })
        }
        const comments = this._comments.map(c => {
            if (c.replies.length > 0) {
                const replies = c.replies.map(r => `--- ${r.id}. ${r.username}: ${r.content}`);
                return `-- ${c.id}. ${c.username}: ${c.content}\n${replies.join('\n')}`
            }
            return `-- ${c.id}. ${c.username}: ${c.content}`
        })
        if (this._comments.length === 0) {
            return `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:`
        }
        return `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n${comments.join('\n')}`
    }
}

let art = new Story("My Story", "Anny");
// art.like("Anny"), "Steven liked My Story!";
console.log(art.likes);
// ;
// art.comment("Anny", "Some Content"),"Anny commented on My Story";
// art.comment("Ammy", "New Content", 10),"You replied successfully";
// art.comment("Zane", "Reply", 20),"Zane commented on My Story";
// art.comment("Zanee", "Reply", 2),"Zane commented on My Story";
// art.comment("Jessy", "Nice :)"), "Jessy commented on My Story";
// console.log(art.comment("SAmmy", "Reply@", 2), "You replied successfully");
console.log(art);
console.log(art.toString('asc'));

