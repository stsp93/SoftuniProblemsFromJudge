function calculator() {
    let num1,num2,result;
    const init = function(selector1, selector2,resultSelector){
        num1 = document.querySelector(selector1)
        num2 = document.querySelector(selector2)
        result = document.querySelector(resultSelector)
    };
    const add = function(){
        result.value = +num1.value + +num2.value
    };
    const subtract = function(){
        result.value = +num1.value - +num2.value
    };
    return {init, add,subtract}
}

const calculate = calculator (); 
calculate.init ('#num1', '#num2', '#result'); 



