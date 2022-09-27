function toStringExtension() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
        toString() {
            let lastArg = '';
            if (this.course !== undefined) lastArg = `, course: ${this.course}`;
            if (this.subject !== undefined) lastArg = `, subject: ${this.subject}`;
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email}`+lastArg+')';
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);
            this.course = course;
        }
    }

    return {
        Person,
        Teacher,
        Student
    }
}
const construct = toStringExtension();
const student1 = new construct.Student('asdasd', 'asd', 'asdasd');
const person1 = new construct.Person('asda', 'dgfdg')
console.log(person1.toString());

