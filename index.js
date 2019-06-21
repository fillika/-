var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var score = 0; // Переменная, для подсчета результата

$start.addEventListener('click', startGame); // Начало игры по клику

$game.addEventListener('click', handleBoxClick); // функция, которая при клике будет заново создавать квадрат

function startGame() { // Функция начала игры
  $start.classList.add('hide');  // Добавляем класс hide и скрываем кнопку
  $game.style.backgroundColor = '#fff'; // Добавляем белый фон
  renderBox();
}
 
function handleBoxClick(event) { // Если при клике по div с data-атрибутом box у нас значение true, то мы запускаем renderBox заново и прибавляем к результату +1
  if (event.target.dataset.box) { 
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = ''; // После нажатия, весь контент в div очищается, чтобы квадраты не дублировались
  var box = document.createElement('div'); // Создали div и положили все в переменную box
  var boxSize = getRandom(35, 75); // Функция генерирует случайное число в диапазоне, которое мы потом используем, чтобы задать квадрату размер
  var gameSize = $game.getBoundingClientRect(); // Метод вычисляет параметры поля (так мы узнали его высоту и ширину)
  var maxTop = gameSize.height - boxSize; // Получили максимальное значение за вычетом размера по высоте
  var maxLeft = gameSize.width - boxSize; // Получили максимальное значение за вычетом размера по ширине

  box.style.height = box.style.width = boxSize + 'px'; // Задали высоту и ширину
  box.style.position = 'absolute'; // Задали позиционирование
  box.style.backgroundColor = '#000'; // Задали цвет
  box.style.top = getRandom(0, maxTop) + 'px'; // Задали позицию
  box.style.left = getRandom(0, maxLeft) + 'px'; // Задали позицию
  box.style.cursor = 'pointer'; // Курсор поинтер
  box.setAttribute('data-box', true); // Задали атрибут data-box со значением true

  $game.insertAdjacentElement('afterbegin', box); // Вставили созданный Div ( Метод добавляет переданный элемент в DOM дерево относительно элемента, вызвавшего метод)
}

function getRandom(min, max) {  // Генерируем случайные числа в заданном диапазоне между min и max
  return Math.floor(Math.random() * (max - min) + min);
}