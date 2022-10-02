'use strict';
function legendFarming(input) {
    input = input.split(' ')
    const keyMaterials = {fragments:0, motes:0, shards:0};
    const junk = {};
    outer :for (let i = 0; i < input.length; i += 2) {
        let quantity = +input[i];
        let material = input[i + 1].toLowerCase();

        if (material === 'shards' ||
            material === 'fragments' ||
            material === 'motes') {
            keyMaterials[material] += quantity;
        } else {
            junk.hasOwnProperty(material) ? junk[material] += quantity : junk[material] = quantity;
        }
        for (let [material, value] of Object.entries(keyMaterials)) {
            if (value >= 250) {
                if (material === 'shards') console.log(`Shadowmourne obtained!`);
                if (material === 'fragments') console.log(`Valanyr obtained!`);
                if (material === 'motes') console.log(`Dragonwrath obtained!`);
                keyMaterials[material] -= 250;
                break outer
            };
        }
    };
    let sortedKeyMaterials = Object.entries(keyMaterials).sort((a, b) => a[0].localeCompare(b[0])).sort((a, b) => b[1] - a[1]);
    let sortedJunk = Object.entries(junk).sort((a, b) => a[0].localeCompare(b[0]));
    for (let [material, value] of sortedKeyMaterials) {
            console.log(`${material}: ${value}`);
    };
    for(let [material, value] of sortedJunk) {
        console.log(`${material}: ${value}`);
    }
}
legendFarming('123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver');