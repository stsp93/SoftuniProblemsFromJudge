'use strict';
function minerTask(input) {
    const resources = {}
    for(let i = 0; i < input.length; i += 2) {
        const ore = input[i];
        const quantity = +input[i + 1];
        resources.hasOwnProperty(ore) ? resources[ore] += quantity: resources[ore] = quantity;
    }
    for(let ore in resources) {
        console.log(`${ore} -> ${resources[ore]}`);
    }
}
minerTask([
    'gold',
    '155',
    'silver',
    '10',
    'copper',
    '17',
    'gold',
    '15'
    ]
    
    )