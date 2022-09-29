function solution() {
    class Employee {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.tasks = [];
            this.salary = 0;
            this.curTask = 0
        }

        work() {
            console.log(this.tasks[this.curTask]);
            this.curTask++;
            if (this.curTask === this.tasks.length) this.curTask = 0;
        }

        collectSalary() {
            console.log(`${this.name} received ${this.dividend ? this.dividend + this.salary : this.salary} this month.`);
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} is working on a simple task.`]
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} is working on a complicated task.`,
            `${this.name} is taking time off work.`,
            `${this.name} is supervising junior workers.`,];
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} scheduled a meeting.`,
            `${this.name} is preparing a quarterly report.`];
            this.dividend = 0;
        }
    }
    return { Employee, Junior, Senior, Manager }
}

const result = solution();
// const junior = new classes.Junior('Ivan',25); 

// junior.work();  
// junior.work();  

// junior.salary = 5811; 
// junior.collectSalary();  

// const sinior = new classes.Senior('Alex', 31); 

// sinior.work();  
// sinior.work();  
// sinior.work();  
// sinior.work();  

// sinior.salary = 12050; 
// sinior.collectSalary();  

var guy3 = new result.Manager('ivan', 22);
console.log(guy3.hasOwnProperty('dividend'));
