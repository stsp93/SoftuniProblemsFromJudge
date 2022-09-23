function tickets(inputArr, sortBy) {

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = +price;
            this.status = status;
        }
    }
    const outputArr = inputArr.map(el => {
        const [destination, price, status] = el.split('|');
        return new Ticket(destination, price, status);
    });
    if(sortBy === 'price') {
        outputArr.sort((a,b) => a.price - b.price)
    }else {
        outputArr.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    return outputArr
}

console.log(tickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|available',
'Philadelphia|132.20|departed',
'Chicago|140.20|available',
'Dallas|144.60|sold',
'New York City|206.20|sold',
'New York City|240.20|departed',
'New York City|305.20|departed'],
'price')

);