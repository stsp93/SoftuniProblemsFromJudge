class Contact {
    constructor(firstName, lastName, phone, email) {
        this.article = document.createElement('article');
        this.titleDiv = document.createElement('div');
        this.titleDiv.classList.add('title');
        this.titleDiv.textContent = `${firstName} ${lastName}`;

        this.button = document.createElement('button');
        this.button.innerHTML = '&#8505';

        this.infoDiv = document.createElement('div');
        this.infoDiv.classList.add('info');

        const phoneSpan = document.createElement('span');
        phoneSpan.textContent ='☎ '+ phone;
        const emailSpan = document.createElement('span');
        emailSpan.textContent = '✉ ' +email;

        this.titleDiv.appendChild(this.button)
        this.infoDiv.appendChild(phoneSpan)
        this.infoDiv.appendChild(emailSpan)
        this.article.appendChild(this.titleDiv)
        this.article.appendChild(this.infoDiv)

        this.infoDiv.style.display = 'none';

        this.button.addEventListener('click', (function() {
            this.infoDiv.style.display = this.infoDiv.style.display === 'none' ? 'block' : 'none';
        }).bind(this))
        this._online = false;
    }


    render(id) {
        document.querySelector(`#${id}`).appendChild(this.article)
    }

    get online() {
        return this._online;
    }

    set online(boolean) {
        if(boolean === true) {
            this.titleDiv.classList.add('online');
        } else if(boolean === false) {
            this.titleDiv.classList.remove('online');
        }
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
  ];
  contacts.forEach(c => c.render('main'));
  
  // After 1 second, change the online status to true
  setTimeout(() => contacts[1].online = true, 2000);
  
  