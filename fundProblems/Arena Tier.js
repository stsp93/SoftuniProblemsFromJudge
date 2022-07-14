'use strict';
function arenaTier(input) {
    const gladiators = {};
    let index = 0;
    while (input[index] !== 'Ave Cesar') {
        let data = input[index];


        if (data.includes('->')) {
            let [gladiator, technique, skill] = data.split(' -> ');
            skill = +skill;
            if (!gladiators.hasOwnProperty(gladiator)) {
                gladiators[gladiator] = { [technique]: skill };
            } else {
                if (!gladiators[gladiator].hasOwnProperty(technique)) {
                    gladiators[gladiator][technique] = skill;
                } else {
                    gladiators[gladiator][technique] > skill ? gladiators[gladiator][technique] : gladiators[gladiator][technique] = skill;
                }
            }
        } else {
            let [gladiator1, gladiator2] = data.split(' vs ');
            if (gladiators.hasOwnProperty(gladiator1) && gladiators.hasOwnProperty(gladiator2)) {
                for (let tech in gladiators[gladiator1]) {
                    if (gladiators[gladiator2].hasOwnProperty(tech)) {
                        if (gladiators[gladiator1][tech] > gladiators[gladiator2][tech]) {
                            delete gladiators[gladiator2];
                            break;
                        } else if(gladiators[gladiator1][tech] < gladiators[gladiator2][tech]){
                            delete gladiators[gladiator1];
                            break;
                        }
                    }
                }
            }
        }
        index++;
    }
    for (let gladiator in gladiators) {
        const skill = Object.values(gladiators[gladiator]).reduce((acc, cur) => acc + cur, 0);
        gladiators[gladiator]['skill'] = skill;
    }
    let sortedGladiators = Object.entries(gladiators).sort((a, b) => a[0].localeCompare(b[0])).sort((a, b) => b[1].skill - a[1].skill);

    for(let [name, techniques] of sortedGladiators) {
        let sortedTech = Object.entries(techniques).sort((a, b) => a[0].localeCompare([b[0]])).sort((a, b) => b[1] - a[1]);
        console.log(`${name}: ${techniques.skill} skill`);
        sortedTech.forEach(tech => {
            if(tech[0] !== 'skill') {
                console.log(`- ${tech[0]} <!> ${tech[1]}`);
            }
        })
    }

}
arenaTier(
    [
    'Peter -> BattleCry -> 400',
    'Alex -> PowerPunch -> 300',
    'Stefan -> Duck -> 200',
    'Stefan -> Tiger -> 250',
    'Ave Cesar'
    ]
    
    

)