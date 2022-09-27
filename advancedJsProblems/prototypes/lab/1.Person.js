function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    Object.defineProperty(this,'fullName',{
        get() {
            return `${this.firstName} ${this.lastName}`
        },
        set(value) {
            const [first, last] = value.split(' ');
            if(first !== undefined && last !== undefined) {
                this.firstName = first;
                this.lastName = last;
            }
        }
    } )

}


let person = new Person("Albert", "Simpson");
console.log(person.fullName); //Albert Simpson
person.firstName = "Simon";
console.log(person.fullName); //Simon Simpson
person.fullName = "Peter";
console.log(person.firstName);  // Simon
console.log(person.lastName);  // Simpson

