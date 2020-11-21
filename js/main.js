//Проанализировать с какими селекторами работать

const generateId = () => `Id${Math.round(Math.random()* 1e8).toString(16)}`


const   totalBalance = document.querySelector('.total__balance'),                    // Баланс
        totalMoneyIncome = document.querySelector('.total__money-income'),           // Доход
        totalMoneyExpenses = document.querySelector('.total__money-expenses'),       // Расход
        historyList = document.querySelector('.history__list'),                      // История операций
        form = document.querySelector('#form'),                                      // Форма операций
        operationName = document.querySelector('.operation__name'),                  // Имя операции
        operationAmount = document.querySelector('.operation__amount');              // Сумма операции

// Нам нужно где-то хранить данные, нам понадобиться массив внутри которого будут объекты.
// Стоит почитать и порешать задачи на тему массивов и объектов
let dbOperation = JSON.parse(localStorage.getItem('calc')) || [];



// Выше у нас сформированна База данных операций, которую уже можно выводить на страницу.




const renderOperation = (operation) => {                    // Обьявление стрелочной функции
                                                            // Рендер операций

const className = operation.amount < 0 ? 'history__item-minus' : 'history__item-plus';      // Тернарное выражение , ( содержание вопроса ? 'значение при true' : 'значение при false'


    const listItem = document.createElement('li');          // Создаём элемент li с помощью doc.createElement
          listItem.classList.add('history__item');            // Добавляем с помощью classList.add класс в li
          listItem.classList.add(className);
                                                            // Добавляем с помощью innerHtml вёрстку внутрь элемента li
          listItem.innerHTML = `${operation.description}
            <span class="history__money">${operation.amount} ₽</span>
            <button class="history_delete" data-id="${operation.id}">x</button>
          `;
    

          historyList.append(listItem);
          //Прочитать про метод append
}
//Создаю переменную для рендера операций на страницу.
// Стоит почитать и порешать задачи на тему стрелочных функций.


//Следом нам нужен цикл, который берёт данные из массива с обьектами и присваивает их в функцию рендера карточек.


const updateBalance = () => {
    const resultIncome = dbOperation
        .filter( (item) => {
        return item.amount > 0;                                 // Поместит true(попадает) или false(не попадает) в переменную resultIncome, и будет собирать следуйщий обьект массива(при true).
        })
        .reduce((result, item) => result + item.amount , 0)     // Суммирование дохода


    const resultExpenses = dbOperation.filter( (item) => {
        return item.amount < 0;                                 // Поместит true(попадает) или false(не попадает) в переменную resultExpenses, и будет собирать следуйщий обьект массива(при true).
        })
        .reduce((result, item) => result + item.amount , 0)     // Суммирование расхода

        totalMoneyIncome.textContent = resultIncome + ' ₽';                    // Вывод общего дохода
        totalMoneyExpenses.textContent = resultExpenses + ' ₽';                // Вывод общего расхода
        totalBalance.textContent = (resultIncome + resultExpenses) + ' ₽';       // Общий баланс
        
} 

const addOperation = (event) => {
    event.preventDefault();         // Отмена стандартного поведения элемента.

    const operationNameValue = operationName.value , // тут идёт присваивание переменным , введённых данных в форму!!!
      operationAmountValue = operationAmount.value ;

        operationName.style.borderColor = '';       // Сброс красного цвета полей.
        operationAmount.style.borderColor = '';     
    if (operationNameValue && operationAmountValue) {
        const operation = {
            id: generateId(),                   // Выше написанна вспомогательная функция генерирования ID.
            description: operationNameValue,
            amount: +operationAmountValue,      // + даёт нам конвертирование из строчного типа данных в числовой.
        };

        dbOperation.push(operation);
        init();
        console.log(dbOperation);
    }
        else{
            if (!operationNameValue) operationName.style.borderColor = 'red';
            if (!operationAmountValue) operationAmount.style.borderColor = 'red';
        }
        operationName.value   = ''; // Очищение полей ввода после добавления операции.
        operationAmount.value   = ''; // Очищение полей ввода после добавления операции.
    };


    const deleteOperation = (event) => {                    // Функция удаления операций
        const target = event.target;

        if(target.classList.contains('history_delete')) {
            dbOperation = dbOperation
                .filter(operation => operation.id !== target.dataset.id);
            
            init();
        }
       

    };


    const init = () => {                    // Инициализация
    historyList.textContent = '';       // Нужно чистое поле для выведения операций.
    dbOperation.forEach (renderOperation);
    // Тут метод перебора массива forEach, который обращаеться к БД и присваивает данные по порядку в стрелочной функции вызываеться функция рендера и зовётся той же переменной, или просто присвоить имя функции рендера.
    updateBalance();    
    localStorage.setItem('calc', JSON.stringify(dbOperation));
    }


form.addEventListener('submit', addOperation);

historyList.addEventListener('click', deleteOperation);



init();



// 1. Ввывели элементы страниц с помощью селекторов. (Переменные)
// 2. Создали БД dbOperation (массив в котором объекты)
// 3. Создали функцию рендера карточек (то есть элемент , назначили ему класс и внутреннюю вёрстку)
// 4. Создали переменную инициализации в которой работает метод forEach, как цикл(но это не цикл) перебора БД и присваивание данных после каждого цикла переменной operation.
// 5. Добавили об