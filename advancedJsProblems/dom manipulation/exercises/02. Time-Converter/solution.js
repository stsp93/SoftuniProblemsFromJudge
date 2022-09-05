function attachEventsListeners() {

    const daysInput = document.querySelector('#days');
    const hoursInput = document.querySelector('#hours');
    const minutesInput = document.querySelector('#minutes');
    const secondsInput = document.querySelector('#seconds');

    const daysBtn = document.querySelector('#daysBtn');
    const hoursBtn = document.querySelector('#hoursBtn');
    const minutesBtn = document.querySelector('#minutesBtn');
    const secondsBtn = document.querySelector('#secondsBtn');


    daysBtn.addEventListener('click', function () {
        const days = daysInput.value;
        hoursInput.value = days * 24
        minutesInput.value = days * 24 * 60
        secondsInput.value = days * 24 * 3600
    })
    hoursBtn.addEventListener('click', function () {
        const hours = hoursInput.value;
        daysInput.value = hours / 24;
        minutesInput.value = hours *60;
        secondsInput.value = hours * 3600;
    })
    minutesBtn.addEventListener('click', function () {
        const minutes = minutesInput.value;
        daysInput.value = minutes /24 / 60;
        hoursInput.value = minutes / 60;
        secondsInput.value = minutes * 60
    })
    secondsBtn.addEventListener('click', function () {
        const seconds = secondsInput.value;
        daysInput.value = seconds /24/3600;
        hoursInput.value = seconds / 3600;
        minutesInput.value = seconds / 60;
    })

}