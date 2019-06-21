var $start = document.querySelector('#start');
var $game = document.querySelector('#game');

$start.addEventListener('click', startGame); // Начало игры по клику

$game.addEventListener('click', handleBoxClick); // функция, которая при клике будет заново создавать квадрат

function startGame() { // Функция начала игры
  $start.classList.add('hide');  // Добавляем класс hide и скрываем кнопку
  $game.style.backgroundColor = '#fff'; // Добавляем белый фон
  renderBox();
}

function handleBoxClick(event) {
  if (event.target.dataset.box) {
    renderBox();
  }
}

function renderBox() {
  var box = document.createElement('div'); // Создали div и положили все в переменную box

  box.style.height = box.style.width = '50px'; // Задали высоту и ширину
  box.style.position = 'absolute'; // Задали позиционирование
  box.style.backgroundColor = '#000'; // Задали цвет
  box.style.top = '50px'; // Задали позицию
  box.style.left = '70px'; // Задали позицию
  box.style.cursor = 'pointer'; // Курсор поинтер
  box.setAttribute('data-box', 'true'); // Задали атрибут data-box


  $game.insertAdjacentElement('afterbegin', box); // Вставили созданный Div ( Метод добавляет переданный элемент в DOM дерево относительно элемента, вызвавшего метод)
}