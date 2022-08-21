function prevDay(year, month, day) {
    let prevDay = new Date(`${year}-${month}-${day}`)
    prevDay.setDate(prevDay.getDate() - 1);
    return `${prevDay.getFullYear()}-${prevDay.getMonth() + 1}-${prevDay.getDate()}`
}
console.log(prevDay(2016, 10, 1));
