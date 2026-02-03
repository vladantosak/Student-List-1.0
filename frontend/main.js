const SERVER_URL = 'http://localhost:3000';

// Отправка данные на сервер
async function serverAddStudent(student) {
  const response = await fetch(SERVER_URL + '/api/students', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

  let data = await response.json();
  return data;
}

// Получение данных с сервера
let listData = [];

async function serverGetStudent() {
  const response = await fetch(SERVER_URL + '/api/students', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
}

// Пример данных  
// const listData = [

//   {
//     name: 'Иван',
//     surname: 'Иванович',
//     lastname: 'Иванов',
//     birthday: new Date(2000, 9, 12),
//     studyStart: 2021,
//     faculty: 'Программирование',
//   },
//   {
//     name: 'Мария',
//     surname: 'Сергеевна',
//     lastname: 'Петрова',
//     birthday: new Date(2001, 4, 8),
//     studyStart: 2021,
//     faculty: 'Инженерный',
//   },
//   {
//     name: 'Александр',
//     surname: 'Алексеевич',
//     lastname: 'Смирнов',
//     birthday: new Date(2001, 9, 10),
//     studyStart: 2020,
//     faculty: 'Дизайн',
//   },
//   {
//     name: 'Екатерина',
//     surname: 'Игоревна',
//     lastname: 'Кузнецова',
//     birthday: new Date(2003, 11, 10),
//     studyStart: 2022,
//     faculty: 'Программирование',
//   },
//   {
//     name: 'Николай',
//     surname: 'Игоревич',
//     lastname: 'Конреев',
//     birthday: new Date(2000, 7, 31),
//     studyStart: 2023,
//     faculty: 'Программирование',
//   },
// ];

// Переменные для сортировки

let sortColumnFlag = 'fio';
let sortDirFlag = true;

const $app = document.getElementById('app');
const $table = document.createElement('table');
const $tableHead = document.createElement('thead');
const $tableBody = document.createElement('tbody');
const $tableHeadTr = document.createElement('tr');
const $tableHeadThFIO = document.createElement('th');
const $tableHeadThBirthday = document.createElement('th');
const $tableHeadThStudyStart = document.createElement('th');
const $tableHeadThFaculty = document.createElement('th');
const $tableHeadThDelete = document.createElement('th');

// Настройка таблицы
$table.classList.add('table', 'table-dark', 'table-bordered');

// Настройка заголовков
$tableHeadThFIO.textContent = 'ФИО';
$tableHeadThBirthday.textContent = 'Возраст';
$tableHeadThStudyStart.textContent = 'Год начала обучения и курс';
$tableHeadThFaculty.textContent = 'Факультет';

// Пустой заголовок для кнопки удаления
$tableHeadThDelete.textContent = '';
$tableHeadThDelete.classList.add('text-center');

// Добавление классов сортировки
$tableHeadThFIO.classList.add('sortable');
$tableHeadThBirthday.classList.add('sortable');
$tableHeadThStudyStart.classList.add('sortable');
$tableHeadThFaculty.classList.add('sortable');

$tableHeadThFIO.setAttribute('data-sort', 'fio');
$tableHeadThBirthday.setAttribute('data-sort', 'birthYear');
$tableHeadThStudyStart.setAttribute('data-sort', 'studyStart');
$tableHeadThFaculty.setAttribute('data-sort', 'faculty');

// Добавление заголовков в строку заголовка таблицы
$tableHeadTr.appendChild($tableHeadThFIO);
$tableHeadTr.appendChild($tableHeadThBirthday);
$tableHeadTr.appendChild($tableHeadThStudyStart);
$tableHeadTr.appendChild($tableHeadThFaculty);
$tableHeadTr.appendChild($tableHeadThDelete);

$tableHead.appendChild($tableHeadTr);
$table.appendChild($tableHead);
$table.appendChild($tableBody);
$app.appendChild($table);


//создание формы
document.addEventListener('DOMContentLoaded', function () {
  const form = document.createElement('form');
  form.id = 'add-form';
  form.classList.add('form', 'form-table');

  const surnameLabel = document.createElement('label');
  surnameLabel.textContent = 'Фамилия: ';
  const surnameInput = document.createElement('input');
  surnameInput.id = 'input-surname';
  surnameInput.classList.add('form-control');
  surnameInput.type = 'text';
  surnameInput.name = 'surname';
  surnameLabel.appendChild(surnameInput);

  const surnameError = document.createElement('div');
  surnameError.classList.add('error-message');
  surnameLabel.appendChild(surnameError);

  const surnameContainer = document.createElement('div');
  surnameContainer.classList.add('form-group');
  surnameContainer.appendChild(surnameLabel);

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Имя: ';
  const nameInput = document.createElement('input');
  nameInput.id = 'input-name';
  nameInput.classList.add('form-control');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameLabel.appendChild(nameInput);

  const nameError = document.createElement('div');
  nameError.classList.add('error-message');
  nameLabel.appendChild(nameError);

  const nameContainer = document.createElement('div');
  nameContainer.classList.add('form-group');
  nameContainer.appendChild(nameLabel);

  const lastnameLabel = document.createElement('label');
  lastnameLabel.textContent = 'Отчество: ';
  const lastnameInput = document.createElement('input');
  lastnameInput.id = 'input-lastname';
  lastnameInput.classList.add('form-control');
  lastnameInput.type = 'text';
  lastnameInput.name = 'lastname';
  lastnameLabel.appendChild(lastnameInput);

  const lastnameError = document.createElement('div');
  lastnameError.classList.add('error-message');
  lastnameLabel.appendChild(lastnameError);

  const lastnameContainer = document.createElement('div');
  lastnameContainer.classList.add('form-group');
  lastnameContainer.appendChild(lastnameLabel);

  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Дата рождения: ';
  const dateInput = document.createElement('input');
  dateInput.id = 'input-date';
  dateInput.classList.add('form-control');
  dateInput.type = 'date';
  dateInput.min = '1990-01-01';

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  dateInput.max = todayString;

  dateLabel.appendChild(dateInput);

  const dateContainer = document.createElement('div');
  dateContainer.classList.add('form-group');
  dateContainer.appendChild(dateLabel);

  const studyStartLabel = document.createElement('label');
  studyStartLabel.textContent = 'начало\u00A0обучения: ';
  const studyStartInput = document.createElement('input');
  studyStartInput.id = 'input-studyStart';
  studyStartInput.classList.add('form-control');
  studyStartInput.type = 'number';
  studyStartInput.min = '2000';
  const studyStartCurrentYear = new Date().getFullYear();
  studyStartInput.max = studyStartCurrentYear;
  studyStartLabel.appendChild(studyStartInput);

  const studyStartContainer = document.createElement('div');
  studyStartContainer.classList.add('form-group');
  studyStartContainer.appendChild(studyStartLabel);

  const facultyLabel = document.createElement('label');
  facultyLabel.textContent = 'Факультет: ';
  const facultyInput = document.createElement('input');
  facultyInput.id = 'input-faculty';
  facultyInput.classList.add('form-control');
  facultyInput.type = 'text';
  facultyLabel.appendChild(facultyInput);

  const facultyContainer = document.createElement('div');
  facultyContainer.classList.add('form-group');
  facultyContainer.appendChild(facultyLabel);

  const submitButton = document.createElement('button');
  submitButton.id = 'btn-submit';
  submitButton.classList.add('btn', 'btn-primary', 'button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Отправить';

  const errorContainer = document.createElement('div');
  errorContainer.id = 'error-container';
  errorContainer.classList.add('error-container');

  form.append(surnameContainer);
  form.append(nameContainer);
  form.append(lastnameContainer);
  form.append(dateContainer);
  form.append(studyStartContainer);
  form.append(facultyContainer);
  form.append(submitButton);
  form.append(errorContainer);

  document.getElementById('app').prepend(form);

  // Функция для ограничения ввода только буквами русского алфавита и отображения ошибки
  function restrictToRussianLetters(event) {
    const errorElement = this.nextElementSibling;
    const invalidCharacters = this.value.match(/[^А-Яа-яЁё -]/g);
    if (invalidCharacters) {
      errorElement.textContent = 'Используйте только символы русского алфавита';
      this.value = this.value.replace(/[^А-Яа-яЁё -]/g, '');
    } else {
      errorElement.textContent = '';
    }
  }

  // Добавление обработчиков событий для каждого поля ввода
  surnameInput.addEventListener('input', restrictToRussianLetters);
  nameInput.addEventListener('input', restrictToRussianLetters);
  lastnameInput.addEventListener('input', restrictToRussianLetters);

 //функция создания одного студента
 function createOneUserTr(oneUser) {
  const $oneUserTr = document.createElement('tr');
  const $oneUserThFIO = document.createElement('td');
  const $oneUserThBirthday = document.createElement('td');
  const $oneUserThStudyStart = document.createElement('td');
  const $oneUserThFaculty = document.createElement('td');

  //первая буква заглавная
  function capitalizeFirstLetter(word) {
    if (typeof word !== 'string' || word.length === 0) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const capitalizedLastname = oneUser.lastname ? capitalizeFirstLetter(oneUser.lastname) : '';
  const capitalizedName = oneUser.name ? capitalizeFirstLetter(oneUser.name) : '';
  const capitalizedSurname = oneUser.surname ? capitalizeFirstLetter(oneUser.surname) : '';
  const capitalizedFullName = `${capitalizedLastname} ${capitalizedName} ${capitalizedSurname}`;
  $oneUserThFIO.textContent = capitalizedFullName;
//расчет даты рождения
  function calculateAge(birthday) {
    const today = new Date();
    const dob = new Date(birthday);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }

  const age = calculateAge(oneUser.birthday);
  const birthdayString = `${new Date(oneUser.birthday).getDate()}.${new Date(oneUser.birthday).getMonth() + 1}.${new Date(oneUser.birthday).getFullYear()}`;
//курс 
  function calculateCourse(studyStart) {
    const currentYear = new Date().getFullYear();
    const course = currentYear - studyStart + 1;
    return course <= 4 ? course : 'закончил';
  }

  const currentCourse = calculateCourse(oneUser.studyStart);
  let courseWord = currentCourse !== 'закончил' ? 'курс' : '';


  $oneUserThBirthday.textContent = `${age} лет (${birthdayString})`;
  $oneUserThStudyStart.textContent = `${oneUser.studyStart} (${currentCourse} ${courseWord})`;
  $oneUserThFaculty.textContent = oneUser.faculty;


//кнопка удаления
const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');

    deleteButton.addEventListener('click', async function () {
      await fetch(`${SERVER_URL}/api/students/${oneUser.id}`, {
        method: 'DELETE',
      });
    
      listData = listData.filter(student => student.id !== oneUser.id);
      renderTable(listData);
    });
    

    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);

    $oneUserTr.appendChild($oneUserThFIO);
    $oneUserTr.appendChild($oneUserThBirthday);
    $oneUserTr.appendChild($oneUserThStudyStart);
    $oneUserTr.appendChild($oneUserThFaculty);
    $oneUserTr.appendChild(deleteCell);

    return $oneUserTr;
}

  

  // Создаём форму фильтрации
  const filterForm = document.createElement('form');
  filterForm.id = 'filter-form';
  filterForm.classList.add('form', 'filter-form', 'input-group');

  const filterFioLabel = document.createElement('label');
  filterFioLabel.textContent = 'Отфильтровать по ФИО:';
  const filterFioInput = document.createElement('input');
  filterFioInput.id = 'filter-fio';
  filterFioInput.classList.add('form-control');
  filterFioInput.type = 'text';
  filterFioInput.name = 'fio';
  filterFioLabel.appendChild(filterFioInput);

  const filterFioContainer = document.createElement('div');
  filterFioContainer.classList.add('form-group');
  filterFioContainer.appendChild(filterFioLabel);


  const filterstudyStartLabel = document.createElement('label');
  filterstudyStartLabel.textContent = 'Отфильтровать по году начала обучения:';
  const filterstudyStartInput = document.createElement('input');
  filterstudyStartInput.id = 'filter-studyStart';
  filterstudyStartInput.classList.add('form-control');
  filterstudyStartInput.type = 'number';
  filterstudyStartInput.name = 'studyStart';
  filterstudyStartInput.min = '2000';

  const currentYear = new Date().getFullYear();
  filterstudyStartInput.max = currentYear;
  filterstudyStartLabel.appendChild(filterstudyStartInput);

  const filterstudyStartContainer = document.createElement('div');
  filterstudyStartContainer.classList.add('form-group');
  filterstudyStartContainer.appendChild(filterstudyStartLabel);

  const filterfacultyLabel = document.createElement('label');
  filterfacultyLabel.textContent = 'Отфильтровать по факультету:';
  const filterfacultyInput = document.createElement('input');
  filterfacultyInput.id = 'filter-faculty';
  filterfacultyInput.classList.add('form-control');
  filterfacultyInput.type = 'text';
  filterfacultyInput.name = 'faculty';
  filterfacultyLabel.appendChild(filterfacultyInput);

  const filterfacultyContainer = document.createElement('div');
  filterfacultyContainer.classList.add('form-group');
  filterfacultyContainer.appendChild(filterfacultyLabel);

  filterForm.append(filterFioContainer);
  filterForm.append(filterstudyStartContainer);
  filterForm.append(filterfacultyContainer);

  $app.prepend(filterForm);

  // Фильтрация данных
  function filter(arr, prop, value) {
     if (prop === 'startLearn') {
        return arr.filter(oneUser => oneUser[prop] === parseInt(value.trim(), 10));
    } else {
        return arr.filter(oneUser => oneUser[prop].toString().toLowerCase().includes(value.trim().toLowerCase()));
    }
}

  //рендер таблицы
  function renderTable(data = listData) {
    $tableBody.innerHTML = ''; // очищаем тело таблицы перед повторной отрисовкой
  
    let copyListData = [...data].map(oneUser => {
      oneUser.fio = `${oneUser.lastname} ${oneUser.name} ${oneUser.surname}`;
      oneUser.birthYear = new Date(oneUser.birthday).getFullYear(); // Преобразование строки в объект Date
      return oneUser;
    });
  
    copyListData = copyListData.sort((a, b) => {
      let sort = a[sortColumnFlag] < b[sortColumnFlag] ? -1 : 1;
      if (!sortDirFlag) sort *= -1;
      return sort;
    });
  
    if (filterFioInput.value.trim() !== "") {
      copyListData = filter(copyListData, 'fio', filterFioInput.value);
    }
    if (filterstudyStartInput.value.trim() !== "") {
      copyListData = filter(copyListData, 'studyStart', filterstudyStartInput.value);
    }
    if (filterfacultyInput.value.trim() !== "") {
      copyListData = filter(copyListData, 'faculty', filterfacultyInput.value);
    }
  
    for (const oneUser of copyListData) {
      const $newTr = createOneUserTr(oneUser);
      $tableBody.append($newTr);
    }


    

  
    // Если нет данных для отображения
    if (copyListData.length === 0) {
      const $noDataTr = document.createElement('tr');
      const $noDataTd = document.createElement('td');
      $noDataTd.colSpan = 5;
      $noDataTd.textContent = 'Нет данных для отображения';
      $noDataTr.appendChild($noDataTd);
      $tableBody.appendChild($noDataTr);
    }
  }
  

   // Изначальная отрисовка таблицы
  renderTable();     
  
 form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const surname = surnameInput.value.trim();
    const name = nameInput.value.trim();
    const lastname = lastnameInput.value.trim();
    const birthday = new Date(dateInput.value);
    const studyStart = parseInt(studyStartInput.value.trim());
    const faculty = facultyInput.value.trim();

    // Очистка контейнера с ошибками и удаление класса анимации
    errorContainer.innerHTML = '';
    errorContainer.classList.remove('show');


    if (!surname) {
      errorContainer.innerHTML = 'Ошибка: Вы не ввели фамилию.';
      errorContainer.classList.add('show');
      return;
    }

    if (!name) {
      errorContainer.innerHTML = 'Ошибка: Вы не ввели имя.';
      errorContainer.classList.add('show');
      return;
    }

    if (!lastname) {
      errorContainer.innerHTML = 'Ошибка: Вы не ввели отчество.';
      errorContainer.classList.add('show');
      return;
    }

    if (isNaN(birthday.getTime())) {
      errorContainer.innerHTML = 'Ошибка: Вы не ввели дату рождения.';
      errorContainer.classList.add('show');
      return;
    }

    if (!studyStart) {
      errorContainer.innerHTML = 'Ошибка: Вы не ввели дату начала обучения.';
      errorContainer.classList.add('show');
      return;
    }

    if (!faculty) {
      errorContainer.innerHTML = 'Ошибка: Вы не ввели факультет.';
      errorContainer.classList.add('show');
      return;
    }

    const oneUser = {
      surname: surname,
      name: name,
      lastname: lastname,
      birthday: birthday,
      studyStart: studyStart,
      faculty: faculty,
    };
// Добавление нового студента в список и отправка на сервер
let serverData = await serverAddStudent(oneUser);
listData.push(serverData);
    renderTable();
    form.reset();
  });

// Функция для получения и обработки данных
async function fetchAndProcessData() {
    try {
      const serverData = await serverGetStudent(); // Получение данных с сервера
      listData = serverData; // Обновление переменной данных
      renderTable(); // Отображение данных в таблице
    } catch (error) {
      console.error('Ошибка при получении данных', error); // Обработка ошибок
    }
  }
  
  // Вызов функции для получения и отображения данных
  fetchAndProcessData();


// стрелки направления
  function toggleArrow(element, ascending) {
    element.classList.toggle('asc', ascending);
    element.classList.toggle('desc', !ascending);
  }

  $tableHeadThFIO.addEventListener('click', () => {
    sortColumnFlag = 'fio';
    sortDirFlag = !sortDirFlag;
    toggleArrow($tableHeadThFIO, sortDirFlag);
    renderTable();
});

$tableHeadThBirthday.addEventListener('click', () => {
    sortColumnFlag = 'birthYear';
    sortDirFlag = !sortDirFlag;
    toggleArrow($tableHeadThBirthday, sortDirFlag);
    renderTable();
});

  $tableHeadThStudyStart.addEventListener('click', () => {
    sortColumnFlag = 'studyStart';
    sortDirFlag = !sortDirFlag;
    toggleArrow($tableHeadThStudyStart, sortDirFlag);
    renderTable();
});

  $tableHeadThFaculty.addEventListener('click', () => {
    sortColumnFlag = 'faculty';
    sortDirFlag = !sortDirFlag;
    toggleArrow($tableHeadThFaculty, sortDirFlag);
    renderTable();
});

  filterForm.addEventListener('submit', function (event) {
    event.preventDefault();
  });
  filterFioInput.addEventListener('input', function () {
    renderTable(listData);
  });
  filterstudyStartInput.addEventListener('input', function () {
    renderTable(listData);
  });
  filterfacultyInput.addEventListener('input', function () {
    renderTable(listData);
  });

  surnameInput.addEventListener('input', function () {
    if (surnameInput.value.trim() !== '') {
      errorContainer.classList.remove('show');
    }
  });

  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim() !== '') {
      errorContainer.classList.remove('show');
    }
  });

  lastnameInput.addEventListener('input', function () {
    if (lastnameInput.value.trim() !== '') {
      errorContainer.classList.remove('show');
    }
  });

  dateInput.addEventListener('input', function () {
    if (dateInput.value.trim() !== '') {
      errorContainer.classList.remove('show');
    }
  });

  studyStartInput.addEventListener('input', function () {
    if (studyStartInput.value.trim() !== '') {
      errorContainer.classList.remove('show');
    }
  });

  facultyInput.addEventListener('input', function () {
    if (facultyInput.value.trim() !== '') {
      errorContainer.classList.remove('show');
    }
  });

  renderTable();

});
// });
