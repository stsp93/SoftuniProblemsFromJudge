function solution() {
    const available = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };
    const recipes = {
        'apple': { protein: 0, carbohydrate: 1, fat: 0, flavour: 2, },
        'lemonade': { protein: 0, carbohydrate: 10, fat: 0, flavour: 20, },
        'burger': { protein: 0, carbohydrate: 5, fat: 7, flavour: 3, },
        'eggs': { protein: 5, carbohydrate: 0, fat: 1, flavour: 1, },
        'turkey': { protein: 10, carbohydrate: 10, fat: 10, flavour: 10, },
    };
    const cmds = {
        restock(microel, qty) {
            available[microel] += +qty
            return 'Success';
        },
        prepare(rec, qty) {
            while (+qty > 0) {
                for (let ingredient in recipes[rec]) {
                    if (available[ingredient] - recipes[rec][ingredient] < 0) {
                        return `Error: not enough ${ingredient} in stock`;
                    } else {
                        available[ingredient] -= recipes[rec][ingredient];
                    }
                }
                +qty--;
            }

            return `Success`;
            ;
        },
        report() {
            let output = []
            for(let [ingr, qty] of Object.entries(available)){
                output.push(`${ingr}=${qty}`) 
            }
            return output.join(' ');
        }
    }

    return function (string) {
        let [cmd,...args] = string.split(' ');
        return cmds[cmd](...args);
    }
}

let manager = solution (); 
console.log (manager ("restock flavour 50")); // Success
console.log (manager ("report")); 
console.log (manager ("prepare lemonade 4")); // Success
console.log (manager ("report")); 
console.log (manager ("restock carbohydrate 10")); 
console.log (manager ("report")); 
console.log (manager ("restock flavour 10")); 
console.log (manager ("report")); 
console.log (manager ("prepare apple 1")); 
console.log (manager ("report")); 
console.log (manager ("restock fat 10")); 
console.log (manager ("report")); 
console.log (manager ("prepare burger 1")); 
console.log (manager ("report")); 
