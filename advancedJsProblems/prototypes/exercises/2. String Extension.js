(function solve() {
   String.prototype.ensureStart = function (str) {
    if (this.startsWith(str)) return this.toString();
    return str + this.toString();
}
String.prototype.ensureEnd = function (str) {
    if (this.endsWith(str)) return this.toString();
    return this.toString() + str;
}
String.prototype.isEmpty = function () {
    return this.toString() === ''
}
String.prototype.truncate = function (n) {
    if(n <= 3) return '.'.repeat(n);

    if(this.toString().length <= n) {
        return this.toString();
    } else {
        let lastIndex = this.substring(0, n-2).lastIndexOf(' ');

        if(lastIndex !== -1) {
            return this.substring(0,lastIndex) + '...'
        } else {
            return this.substring(0, n-3) + '...'
        }
    }
}

String.format = function (string, ...params) {

    let str = string;

    params.forEach((p,i) => {
        str = str.replace(`{${i}}`,p)
    })

    return str;
} 
})()




var testString = 'quick brown fox jumps over the lazy dog';
var answer = testString.ensureStart('the ');
answer = answer.ensureStart('the ');
console.log(answer);