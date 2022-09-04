function attachGradientEvents() {
    const gradientEl = document.querySelector('#gradient');
    const resultEl = document.querySelector('#result');
    
    gradientEl.addEventListener('mousemove',function(e) {
        resultEl.textContent = Math.floor((+e.offsetX/+gradientEl.clientWidth) * 100) + '%'
    })
}