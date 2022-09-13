function solution(arg) {
    const options = {
        'upvote'(){
            this.upvotes++;
        },
        'downvote'(){
            this.downvotes++;
        },
        'score'(){
            const totalVotes = this.upvotes + this.downvotes;
            // Obfuscation
            let obfuscation = 0;
            if(totalVotes > 50) {
                obfuscation = Math.ceil(Math.max(this.upvotes, this.downvotes)*0.25);
            };
            // rating
            let rating = 'new';
            const balance = this.upvotes - this.downvotes
            if(totalVotes < 10) {
                rating = 'new';
            }else if(balance < 0) {
                rating ='unpopular';
            } else if(this.upvotes / totalVotes > 0.66){
                rating = 'hot';
            } else if(balance >= 0 && totalVotes > 100){
                rating = 'controversial';
            };
            return [this.upvotes+obfuscation, this.downvotes+obfuscation, balance, rating];
        },
    }
    return options[arg].call(this);
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 51,
    downvotes: 51
};

let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
      // (executed 50 times)
;     
console.log(score = solution.call(post, 'score'));