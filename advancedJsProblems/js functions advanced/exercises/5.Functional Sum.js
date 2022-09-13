function add(a) {
    const func = function (b) {
        return add(a + b)
    }
    
    func.toString = () => a;
    return func
}


console.log(add(1)(8)(-6).toString());

