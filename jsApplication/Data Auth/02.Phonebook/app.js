function attachEvents() {
    const [personIn, phoneIn] = document.querySelectorAll('input');
    const [loadBtn, createBtn] = document.querySelectorAll('button');
    const phonebookEl = document.getElementById('phonebook');
    const URL = `http://localhost:3030/jsonstore/phonebook`


    async function load() {
        try {
            const res = await fetch(URL);
            const data = await res.json();
            const list = Object.entries(data).map(createLi);
            phonebookEl.innerHTML = ''
            phonebookEl.append(...list)

            console.log(data);
        } catch (err) {
            console.log(err.message);
        }

    }



    async function deleteData(id) {
        try{
            const res = await fetch(`${URL}/${id}`, {
             method: 'DELETE',
         });
         const data = await res.json();
         return data;
        } catch (err) {
            console.log(err);
        }
    }


    function createLi(entry) {
        const [key, personObj] = entry;
        const li = document.createElement('li');
        li.dataset.id = personObj._id;
        const deleteBtn = document.createElement('button');
        li.textContent = `${personObj.person}: ${personObj.phone}`;
        deleteBtn.textContent = 'Delete'
        li.appendChild(deleteBtn)


        return li;
    }

    async function create() {
        try {
            const contactData = {
                person: personIn.value,
                phone: phoneIn.value,
            }
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            })
            const data = await res.json();

            personIn.value = '';
            phoneIn.value = '';
            load();

            console.log(data);

        } catch (err) {
            console.log(err.message);
        }
    }

    loadBtn.addEventListener('click', load)
    createBtn.addEventListener('click', create)
    phonebookEl.addEventListener('click', function(ev) {
        if(ev.target.textContent !== 'Delete') return;

        const element = ev.target.parentElement;
        deleteData(element.dataset.id)
        element.remove();
    })
}

attachEvents();



