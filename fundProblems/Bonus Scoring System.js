'use strict'
function bonus(input) {
    const studentsCount = +input[0];
    const lecturesCount = +input[1];
    const addidionalBonus = +input[2];
    let maxBonus = 0;
    let attended = 0;
    for (let i = 3; i < 3 + studentsCount; i++) {
        let studentAttendence = input[i];
        const totalBns = studentAttendence / lecturesCount * (5 + addidionalBonus);
        maxBonus = totalBns > maxBonus ? totalBns : maxBonus;
        attended = maxBonus === totalBns ? studentAttendence : attended;
    }
    console.log(`Max Bonus: ${Math.ceil(maxBonus)}.`);
    console.log(`The student has attended ${attended} lectures.`);

}
bonus([
    '0', '30', '14', '8',
    '23', '27'
]

)