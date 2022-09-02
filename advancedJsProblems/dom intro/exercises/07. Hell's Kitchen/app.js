function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      const input = JSON.parse(document.querySelector('#inputs textarea').value);
      const bestRestEl = document.querySelector('#bestRestaurant>p');
      const workersEl = document.querySelector('#workers>p');
      let avgSalary = 0;
      let workers;
      let bestName = ''
      let output = {}

      for(let line of input) {
         let [restaurantName, workersInfo] = line.split(' - ');
         let workersData = workersInfo.split(', ');
         for(let worker of workersData) {
            let [name, salary] = worker.split(' ');
            if(!output.hasOwnProperty(restaurantName)) {
               output[restaurantName] = {}
            } 
            if(output.hasOwnProperty(restaurantName)){
               output[restaurantName][name] = +salary;
            }        
         }
      }

      let entries = Object.entries(output);

      function calcAvg(obj) {
         const divisor = Object.keys(obj).length
        return +(Object.values(obj).reduce((acc,cur) => acc + +cur, 0) / divisor)
      }
      entries.sort((a,b) =>calcAvg(b[1]) - calcAvg(a[1]));
      
      bestName = entries[0][0];
      workers = entries[0][1]
      avgSalary =calcAvg( workers);
      const sortedWorkers = Object.entries(workers).sort((a,b) => b[1] - a[1]);
      console.log(entries);

      bestRestEl.textContent = `Name: ${bestName} Average Salary: ${avgSalary.toFixed(2)} Best Salary: ${sortedWorkers[0][1].toFixed(2)}`;

      workersEl.textContent = sortedWorkers.map(w => `Name: ${w[0]} With Salary: ${w[1]}`).join(' ');
   }
}