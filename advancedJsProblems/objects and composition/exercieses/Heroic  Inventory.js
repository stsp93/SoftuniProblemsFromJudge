function heroicInventory(input){
    const output = []
    for(let line of input) {
        let [name, level, items] = line.split(' / ')
        level = +level;
        items = items ? items.split(', '): [];
        output.push({name,level,items})
    }
    return JSON.stringify(output) ;
}
console.log(heroicInventory(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']
));
