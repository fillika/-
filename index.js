var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $gameTime = document.querySelector('#game-time');

var score = 0; // Переменная, для подсчета результата
var isGameStarted = false; // Переменная для отслеживания состояния игры (изначально false, после начала игры становится true, когда время кончается, меняем на false)

$start.addEventListener('click', startGame); // Начало игры по клику
$game.addEventListener('click', handleBoxClick); // функция, которая при клике будет заново создавать квадрат
$gameTime.addEventListener('input', setGameTime);

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}

function startGame() { // Функция начала игры
  score = 0;
  setGameTime ();
  $gameTime.setAttribute('disabled', true);
  isGameStarted = true;
  hide($start);  // Добавляем класс hide и скрываем кнопку
  $game.style.backgroundColor = '#fff'; // Добавляем белый фон

  var interval = setInterval(function() {  // Функция setInterval производит действие каждые x милисекунд
    var time = parseFloat($time.textContent);
    
    if (time <= 0) {
      clearInterval(interval); // Останавливаем таймер, чтобы не кушать память
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}

function setGameScore () { // Функция выводит результат игры в виде строки
  $result.textContent = score.toString();
}

function setGameTime () { // Функция задает время игры
  var time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function endGame () {  // Функция окончания игры
  isGameStarted = false;
  setGameScore ();
  $game.innerHTML = '';
  show($start);
  $game.style.backgroundColor = '#ccc';
  hide($timeHeader);
  show($resultHeader);
  $gameTime.removeAttribute('disabled');
 
}

function handleBoxClick(event) { // Если при клике по div с data-атрибутом box у нас значение true, то мы запускаем renderBox заново и прибавляем к результату +1
  if (!isGameStarted) {
    return; // Пишем return, чтобы данная функция не выполнялась
  }

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
  box.style.backgroundColor = 'rgb(' + getRandom(0, 255) + ',' + getRandom(0, 255) + ',' + getRandom(0, 255) + ')'; // Задали цвет
  box.style.top = getRandom(0, maxTop) + 'px'; // Задали позицию
  box.style.left = getRandom(0, maxLeft) + 'px'; // Задали позицию
  box.style.cursor = 'pointer'; // Курсор поинтер
  box.setAttribute('data-box', true); // Задали атрибут data-box со значением true

  $game.insertAdjacentElement('afterbegin', box); // Вставили созданный Div ( Метод добавляет переданный элемент в DOM дерево относительно элемента, вызвавшего метод)
}

function getRandom(min, max) {  // Генерируем случайные числа в заданном диапазоне между min и max
  return Math.floor(Math.random() * (max - min) + min);
}