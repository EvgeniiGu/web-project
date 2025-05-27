let currentAnimationInterval = null;

window.onload = function() {
    // Загружаем первый текст при загрузке
    loadText(1);
    
    // Добавляем обработчики для кнопок
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', function() {
            const number = this.dataset.number;
            loadText(number);
            setActiveButton(this);
        });
    });
}

function loadText(num) {
    // Останавливаем текущую анимацию
    if(currentAnimationInterval) clearInterval(currentAnimationInterval);
    
    fetch(`text${num}.txt`)
        .then(response => response.text())
        .then(text => animateText(text))
        .catch(error => console.error('Error loading text:', error));
}

function animateText(data) {
    const ele = document.getElementById("text");
    ele.innerHTML = "";
    const txt = data.split("");
    
    currentAnimationInterval = setInterval(() => {
        if(!txt.length) {
            clearInterval(currentAnimationInterval);
            return;
        }
        ele.innerHTML += txt.shift();
    }, 10);
}

function setActiveButton(activeButton) {
    document.querySelectorAll('.buttons button').forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}