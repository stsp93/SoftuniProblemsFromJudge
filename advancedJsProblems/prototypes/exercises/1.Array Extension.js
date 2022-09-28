
(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1]
    }

    Array.prototype.skip = function (n) {
        if(n < 0) return this;
        return this.slice(n);
    }

    Array.prototype.take = function (n) {
        if(n < 0) return [];
        return this.slice(0, n)
    }

    Array.prototype.sum = function () {
        return this.reduce((acc, cur) => acc + cur, 0)
    }
    Array.prototype.average = function() {
        return this.sum() / this.length
    }
})()

Array.prototype.last = function () {
    return this[this.length - 1]
}

Array.prototype.skip = function (n) {
    if(n < 0) return this;
    return this.slice(n);
}

Array.prototype.take = function (n) {
    if(n < 0) return [];
    return this.slice(0, n)
}

Array.prototype.sum = function () {
    return this.reduce((acc, cur) => acc + cur, 0)
}
Array.prototype.average = function() {
    return this.sum() / this.length
}

   const myarr = [5,2,5,2];
console.log(myarr.average());
   
