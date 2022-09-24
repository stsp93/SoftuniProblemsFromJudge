class Company {
    constructor() {
        this.departments = {};
    }

    addEmployee(name, salary, position, department) {
        function checkInput(input) {
            if (input === '' || input === null || input === undefined) {
                throw new Error('Invalid input!')
            }
        }

        checkInput(name);
        checkInput(salary);
        if (salary < 0) throw new Error('Invalid input!');
        checkInput(position);
        checkInput(department);

        
        this.departments[department] ? this.departments[department].push({ name, salary, position }) : this.departments[department] = [{ name, salary, position }] ;
        return `New employee is hired. Name: ${name}. Position: ${position}`
    }

    bestDepartment() {
        const sortedDepartments = Object.entries(this.departments).sort((a,b) => {
            const avgA = a[1].reduce((acc,cur) => acc + cur.salary,0)/ a[1].length;
            const avgB = b[1].reduce((acc,cur) => acc + cur.salary,0)/ b[1].length;
            return avgB - avgA;
        });
        const [name, workers] = sortedDepartments[0];

        workers.sort((a,b) => a.name.localeCompare(b.name));
        workers.sort((a,b) => b.salary - a.salary);


        return `Best Department is: ${name}\nAverage salary: ${(workers.reduce((acc,cur) => acc + cur.salary,0)/ workers.length).toFixed(2)}\n${workers.map(obj => `${obj.name} ${obj.salary} ${obj.position}`).join('\n')}`
        
    }

}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());

