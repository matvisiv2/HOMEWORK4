// Practical task 4
'use strict';

// 1. Реалізуйте функцію calcRectangleArea(width, height), яка приймає 2 параметри ширина прямокутника width і висота прямокутника height
// і обраховує його площу. Передбачити припинення виконання програми і генерацію винятку у випадку, якщо функції передано не числові параметри.
// Напишіть код, який використовує цю функцію та обробляє можливі виняткові ситуації.
function calcRectangleArea (width, height) {
    if (isNaN(width)) {
        throw new Error("width isn't a number");
    }

    if (isNaN(height)) {
        throw new Error("height isn't a number");
    }
    return width * height;
}

function task01 () {
    const width = document.getElementById('widthT01').value;
    const height = document.getElementById('heightT01').value;
    try {
        const res = calcRectangleArea(width, height);
        document.getElementById('squareT01').innerHTML = res;
    } catch (err) {
        document.getElementById('squareT01').innerHTML = 'no result';
        console.log(err);
        alert(err);
    }
}

// 2. Напишіть функцію checkAge(), яка пропонуватиме юзеру ввести свій вік
// і генерувати в модальному вікні помилки у випадку, коли:
// 	- юзер ввів порожню стрічку (наприклад “The field is empty! Please enter your age”),
// 	- нечислове значення
// 	- вік юзера менше 14 років.
// В іншому разі юзер отримує доступ до перегляду фільму.
// В блокові catch передбачити виведення назви і опису помилки.
function checkAge () {
    const age = prompt('Enter your age:');
    if (age.trim() == '') {
        throw new Error('The field is empty! Please enter your age');
    }
    if (isNaN(age)) {
        throw new Error("The value isn't a number! Please enter your age");
    }

    if (age < 14) {
        throw new Error('You are too young!');
    }
}

function task02 () {
    const resElement = document.getElementById('resultT02');
    const accessAllowedElement = document.getElementById('accessAllowedT02');
    const accessDeniedElement = document.getElementById('accessDeniedT02');
    try {
        checkAge();
        accessAllowedElement.removeAttribute('hidden');
        accessDeniedElement.setAttribute('hidden', 'true');
        resElement.setAttribute('class', 'task-result');
        resElement.innerHTML = 'Access allowed';
    } catch (err) {
        console.log(err);
        alert(err);
        accessAllowedElement.setAttribute('hidden', 'true');
        accessDeniedElement.removeAttribute('hidden');
        resElement.setAttribute('class', 'access-denied');
        resElement.innerHTML = 'Access denied';
    }
}

// 3. Створіть клас MonthException, конструктор якого приймає параметр message і ініціалізує поле name значенням 'MonthException'.
// Реалізуйте функцію showMonthName(month), в якій параметр month – це порядковий номер місяця в році.
// Функція повертає назву місяця відповідно до введеного номера місяця. У випадку некоректного вводу кидається ексепшн у вигляді
// об’єкта класу MonthException з повідомленням 'Incorrect month number'.
// Напишіть код, який використовує цю функцію, передбачте обробку можливих винятків.
// 	Приклад роботи програми:
// > console.log(showMonthName(5));
// May
// > console.log(showMonthName(14));
// MonthException Incorrect month number
class MonthException {
    constructor (message) {
        this.name = 'MonthException';
        this.message = message;
    }
}

function showMonthName (month) {
    if (month < 1 || month > 12) {
        throw new MonthException('Incorrect month number');
    }

    return new Date(0, month, 0).toLocaleDateString('en-UK', {
        month: 'long',
    });
}

function task03 () {
    const resultElement = document.getElementById('resultT03');
    try {
        const month = document.getElementById('monthT03').value;
        const result = showMonthName(month);
        resultElement.innerHTML = result;
        console.log(result);
    } catch (err) {
        const resultError = `${err.name}: ${err.message}`;
        resultElement.innerHTML = resultError;
        console.log(resultError);
    }
}

// 4. Реалізуйте функцію showUser(id), яка приймає параметром користувацьке id
// і повертає об’єкт, який містить значення переданої id.
// Також функція викидає помилку у разі якщо введено від’ємне id.

// 	Реалізуйте функцію showUsers(ids), яка приймає параметром масив користувацьких айді ids,
// перевіряє з використанням функції showUser() кожен елемент масиву ids на коректність,
// в разі виключної ситуації виводить повідомлення про помилку.
// Функція showUsers(ids) повертає масив об’єктів, де значеннями ключів є коректні елементи ids.

// 	Приклад роботи програми:
// showUsers([7, -12, 44, 22]);
// Error: ID must not be negative: -12
// [ {id: 7}, {id: 44}, {id: 22} ]

function showUser (id) {
    if (id < 0) {
        throw Error(`ID must not be negative: ${id}`);
    }
    return { id };
}

function showUsers (ids) {
    const result = [];

    for (let id of ids) {
        try {
            const user = showUser(id);
            result.push(user);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return result;
}

function task04 () {
    const inputArray = document
        .getElementById('idsT04')
        .value.replace(/\s+/g, '')      // remove all spaces
        .split(',');                    // to array
    const resultElement = document.getElementById('resultT04');

    const result = showUsers(inputArray).filter((obj) => obj != null);

    resultElement.innerHTML = JSON.stringify(result);
    console.log(`result = ${JSON.stringify(result)}`);
}
