function solve() {
    const [recipientIn, titleIn] = document.querySelectorAll('input');
    const messageIn = document.querySelector('textarea');
    const [addBtn, resetBtn] = document.querySelectorAll('button');
    const listUl = document.querySelector('#list');
    const sentUl = document.querySelector('.sent-list');
    const deletedUl = document.querySelector('.delete-list');

    function add(e) {
        e.preventDefault();

        const recipient = recipientIn.value;
        const title = titleIn.value;
        const message = messageIn.value;

        if (recipient === '' || title === '' || message === '') return;

        reset();

        const mailLi = document.createElement('li');
        const titleH4 = document.createElement('h4');
        titleH4.textContent = 'Title: ' + title
        const recipientH4 = document.createElement('h4');
        recipientH4.textContent = 'Recipient Name: ' + recipient;
        const msgSpan = document.createElement('span');
        msgSpan.textContent = message;

        const listOfActionDiv = document.createElement('div');
        listOfActionDiv.classList.add('list-action');
        const sendBtn = document.createElement('button');
        sendBtn.type = 'submit';
        sendBtn.id = 'send';
        sendBtn.textContent = 'Send';
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'submit';
        listOfActionDiv.appendChild(sendBtn);
        listOfActionDiv.appendChild(deleteBtn);

        mailLi.appendChild(titleH4);
        mailLi.appendChild(recipientH4);
        mailLi.appendChild(msgSpan);
        mailLi.appendChild(listOfActionDiv);

        listUl.appendChild(mailLi);

        sendBtn.addEventListener('click', function (e) {
            e.preventDefault();

            mailLi.remove();

            const sentLi = document.createElement('li');
            const toSpan = document.createElement('span');
            toSpan.textContent = 'To: ' + recipient;
            const titleSpan = document.createElement('span');
            titleSpan.textContent = 'Title: ' + title;

            const btnDiv = document.createElement('div');
            btnDiv.classList.add('btn')
            const btnDel = document.createElement('button');
            btnDel.classList.add('delete');
            btnDel.textContent = 'Delete';
            btnDel.type = 'submit';

            btnDiv.appendChild(btnDel);

            sentLi.appendChild(toSpan);
            sentLi.appendChild(titleSpan);
            sentLi.appendChild(btnDiv);

            sentUl.appendChild(sentLi);

            btnDel.addEventListener('click', function (e) {
                e.preventDefault();

                sentLi.remove();

                const delLi = document.createElement('li');

                const delToSpan = document.createElement('span');
                delToSpan.textContent = 'To: ' + recipient;
                const delTitleSpan = document.createElement('span');
                delTitleSpan.textContent = 'Title: ' + title;
                delLi.appendChild(delToSpan);
                delLi.appendChild(delTitleSpan);

                deletedUl.appendChild(delLi);
            })
        });

        deleteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            mailLi.remove();

            const delLi = document.createElement('li');

            const delToSpan = document.createElement('span');
            delToSpan.textContent = 'To: ' + recipient;
            const delTitleSpan = document.createElement('span');
            delTitleSpan.textContent = 'Title: ' + title;
            delLi.appendChild(delToSpan);
            delLi.appendChild(delTitleSpan);

            deletedUl.appendChild(delLi);
        })
    }

    function reset(e) {
        if (e) e.preventDefault();

        recipientIn.value = '';
        titleIn.value = '';
        messageIn.value = '';
    }

    addBtn.addEventListener('click', add);
    resetBtn.addEventListener('click', reset)
}
solve()