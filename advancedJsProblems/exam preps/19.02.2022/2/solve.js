class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        if (this.books.length >= this.capacity) {
            throw new Error("Not enough space in the collection.")
        }

        this.books.push({ bookName, bookAuthor, payed: false });
        return `The ${bookName}, with an author ${bookAuthor}, collect.`
    }

    payBook(bookName) {
        const book = this.books.filter(b => b.bookName === bookName)[0];

        if (!book) {
            throw new Error(`${bookName} is not in the collection.`)
        }

        if (book.payed) {
            throw new Error(`${bookName} has already been paid.`)
        }

        book.payed = true;
        return `${bookName} has been successfully paid.`
    }

    removeBook(bookName) {
        const book = this.books.filter(b => b.bookName === bookName)[0];

        if (!book) {
            throw new Error("The book, you're looking for, is not found.")
        }
        if (!book.payed) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`)
        }

        this.books.splice(this.books.indexOf(book), 1);
        return `${bookName} remove from the collection.`
    }

    getStatistics(bookAuthor) {
        if (bookAuthor) {
            const book = this.books.filter(b => b.bookAuthor === bookAuthor)[0];
            if (book) {
                return `${book.bookName} == ${book.bookAuthor} - ${book.payed ? 'Has Paid' : 'Not Paid'}.`
            }

            throw new Error(`${bookAuthor} is not in the collection.`) 
        }

        const emptySlots = this.capacity - this.books.length;
        let sortedBooks = this.books.sort((a,b) => a.bookName.localeCompare(b.bookName));
        sortedBooks = sortedBooks.map(b => `${b.bookName} == ${b.bookAuthor} - ${b.payed ? 'Has Paid' : 'Not Paid'}.`).join('\n')
        return `The book collection has ${emptySlots} empty spots left.\n${sortedBooks}`;
    }
}

const library = new LibraryCollection(5)
library.addBook('Don Quixote', 'Miguel de Cervantes');
library.payBook('Don Quixote');
library.addBook('In Search of Lost Time', 'Marcel Proust');
library.addBook('Ulysses', 'James Joyce');
console.log(library.getStatistics());




