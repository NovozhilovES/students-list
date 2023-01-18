(() => {
    document.addEventListener('DOMContentLoaded', () => {

        let studentStorage = [];
        let studentObject = {};
        let todayDate = [];
        let year = null;

        function todayDateCalc() {
            let d = new Date();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            year = d.getFullYear();
            if(day < 10) {
                day = "0" + day;
            }
            if(month < 10) {
                month = "0" + month;
            }
            todayDate.push(year);
            todayDate.push(month);
            todayDate.push(day);   
        }

        function drawPanel() {
            const container = document.createElement('div');
            const containerAdd = document.createElement('form');
            const containerFilter = document.createElement('form');
            const containerPerson = document.createElement('div');
            const containerDate = document.createElement('div');
            const containerSearch = document.createElement('div');
            const headerText = document.createElement('h1');
            const inputSurname = document.createElement('input');
            const inputName = document.createElement('input');
            const fatherName = document.createElement('input');
            const dateOfBirth = document.createElement('input');
            const receiptDate = document.createElement('input');
            const faculty = document.createElement('input');
            const buttonAdd = document.createElement('button');
            const searchName = document.createElement('input');
            const searchFaculty = document.createElement('input');
            const yearStart = document.createElement('input');
            const yearFinish = document.createElement('input');
            const btnFilter = document.createElement('button');
            const tableHead = document.createElement('div');
            const getFIO = document.createElement('div');
            const getFaculty = document.createElement('div');
            const getYearStart = document.createElement('div');
            const getYearFinish = document.createElement('div');
            const containerList = document.createElement('div');

            document.body.append(container);
            container.append(headerText);
            container.append(containerAdd);
            container.append(containerFilter);
            container.append(tableHead);
            container.append(containerList);
            containerAdd.append(containerPerson);
            containerAdd.append(containerDate);
            containerPerson.append(inputSurname);
            containerPerson.append(inputName);
            containerPerson.append(fatherName);
            containerDate.append(dateOfBirth);
            containerDate.append(receiptDate);
            containerDate.append(faculty);
            containerAdd.append(buttonAdd);
            containerFilter.append(containerSearch);
            containerSearch.append(searchName);
            containerSearch.append(searchFaculty);
            containerSearch.append(yearStart);
            containerSearch.append(yearFinish);
            containerSearch.append(btnFilter);
            tableHead.append(getFIO);
            tableHead.append(getFaculty);
            tableHead.append(getYearStart);
            tableHead.append(getYearFinish);

            headerText.innerHTML = 'Панель управления студентами';
            getFIO.innerHTML = 'ФИО';
            getFaculty.innerHTML = 'Факультет';
            getYearStart.innerHTML = 'Дата рождения (возраст)';
            getYearFinish.innerHTML = 'Год начала и окончания обучения (курс)';
            inputSurname.placeholder = 'Фамилия';
            inputName.placeholder = 'Имя';
            fatherName.placeholder = 'Отчество';
            dateOfBirth.placeholder = 'Дата рождения';
            receiptDate.placeholder = 'Дата поступления';
            searchName.placeholder = 'ФИО';
            searchFaculty.placeholder = 'Факультет';
            searchFaculty.disabled = true;
            yearStart.placeholder = 'Дата начала обучения';
            yearStart.disabled = true;
            yearFinish.placeholder = 'Дата окончания обучения';
            yearFinish.disabled = true;
            faculty.placeholder = 'Факультет';
            buttonAdd.textContent = 'Добавить';
            btnFilter.textContent = 'Фильтр'
            container.classList.add('container');
            containerAdd.classList.add('container-add');
            containerFilter.classList.add('container-filter');
            tableHead.classList.add('table-head');
            containerPerson.classList.add('container-person');
            containerDate.classList.add('container-date');
            containerFilter.classList.add('container-filter');
            containerSearch.classList.add('container-search');
            buttonAdd.classList.add('add-person');
            getFIO.classList.add('get-fio');
            getFaculty.classList.add('get-faculty');
            getYearStart.classList.add('get-year-start');
            getYearFinish.classList.add('get-year-finish');
            containerList.classList.add('container-list');

            todayDateCalc();
            let dateCorrected = todayDate.join('-');

            dateOfBirth.setAttribute("min", "1900-01-01");
            dateOfBirth.setAttribute("max", dateCorrected);
            receiptDate.setAttribute("min", '2000');
            receiptDate.setAttribute("max", year);

            inputSurname.type = 'text';
            inputName.type = 'text';
            fatherName.type = 'text';
            dateOfBirth.type = 'date';
            receiptDate.type = 'number';
            faculty.type = 'text';

            getData();


            return {
                containerAdd,
                containerFilter,
                containerPerson,
                containerDate,
                headerText,
                inputSurname,
                inputName,
                fatherName,
                dateOfBirth,
                receiptDate,
                faculty,
                buttonAdd,
                searchName,
                searchFaculty,
                yearStart,
                yearFinish,
                getFIO,
                getFaculty,
                getYearStart,
                getYearFinish,
                containerList,
                btnFilter,
            };
        }

        const createPanel = drawPanel();
        let surnameValue = null;
        let nameValue = null;
        let fatherNameValue = null;
        let birthDayValue = null;
        let receiptValue = null;
        let facultyValue = null;
        let listYearAge = null;
        let education = null;
        let course = null;
        let StudyList = null;
        let searchChild = document.querySelector('.container-list');
        let getStudyID = null;
        let warningWindow = null;

        function addStudent() {
            createPanel.containerAdd.addEventListener('submit', (e) => {
                e.preventDefault();
                surnameValue = createPanel.inputSurname.value;
                nameValue = createPanel.inputName.value;
                fatherNameValue = createPanel.fatherName.value;
                birthDayValue = createPanel.dateOfBirth.value;
                receiptValue = createPanel.receiptDate.value;
                facultyValue = createPanel.faculty.value;
                validate();
            });
        }

        createPanel.btnFilter.addEventListener('click', (e) => {
            e.preventDefault();
            filterInputForm();
        });

        function filter(arr, prop, value) {
            if(searchChild) {
                searchChild.replaceChildren();
            }
            return arr.filter(search => search[prop].includes(value));
        }

        function filterInputForm() {
                if(createPanel.searchName.value.trim() !== "") {
                    StudyList = filter(StudyList, "fio", createPanel.searchName.value.trim());
                    createPanel.searchFaculty.disabled = false;
                }
                if(createPanel.searchFaculty.value.trim() !== "") {
                    StudyList = filter(StudyList, "faculty", createPanel.searchFaculty.value.trim());
                    createPanel.yearStart.disabled = false;
                    createPanel.yearFinish.disabled = false;
                }
                if(createPanel.yearStart.value.trim() !== "") {
                    StudyList = filter(StudyList, "receipt", createPanel.yearStart.value.trim());
                }
                if(createPanel.yearFinish.value.trim() !== "") {
                    StudyList = filter(StudyList, "receiptOut", createPanel.yearFinish.value.trim());
                }
                createListStudent(StudyList);
        }

        function sortStudent(prop) {
            if(searchChild) {
                searchChild.replaceChildren();
            }
            return (a, b) => a[prop] > b[prop] ? 1 : -1;
        }

        createPanel.getFIO.addEventListener('click', () => {
            StudyList.sort(sortStudent("fio"));
            createListStudent(StudyList);
        });

        createPanel.getFaculty.addEventListener('click', () => {
            StudyList.sort(sortStudent("faculty"));
            createListStudent(StudyList);
        });

        createPanel.getYearStart.addEventListener('click', () => {
            StudyList.sort(sortStudent("dateOfBirth"));
            createListStudent(StudyList);
        });

        createPanel.getYearFinish.addEventListener('click', () => {
            StudyList.sort(sortStudent("receiptOut"));
            createListStudent(StudyList);
        });

        function windowPopup(value) {
            createPanel.buttonAdd.replaceChildren();
            createPanel.buttonAdd.textContent = 'Добавить';
            const errorText = document.createElement('p');
            errorText.classList.add('error-text');
            createPanel.buttonAdd.append(errorText);
            errorText.textContent = [value];
        }

        function validate() {
            if(surnameValue === "") {
                windowPopup("Укажите фамилию!");
            }
            else if(nameValue === "") {
                windowPopup("Укажите имя!");
            }
            else if(fatherNameValue === "") {
                windowPopup("Укажите отчество!");
            }
            else if(birthDayValue === "") {
                windowPopup("Укажите дату рождения!");
            }
            else if(receiptValue === "") {
                windowPopup("Укажите дату поступления!");
            }
            else if(facultyValue === "") {
                windowPopup("Укажите факультет!");
            } 
            else if(surnameValue != "" && nameValue != "" && fatherNameValue != "" && birthDayValue != "" && receiptValue != "" && facultyValue != "") {
                createPanel.buttonAdd.replaceChildren();
                createPanel.buttonAdd.textContent = 'Добавить';
                calcAge();
                studentPushObject();
            }
        }

        function calcAge() {
            let yearBirth = birthDayValue;
            let yearToday = todayDate.join('-');
            let calcAgeStudent = yearBirth.substr(5,5);
            let calcToday = yearToday.substr(5,5);
            let calcCourse = yearToday.substr(0,4);
            education = Number(receiptValue) + 4;
            calcAgeStudent < calcToday ? listYearAge = calcCourse - yearBirth.substr(0,4) : listYearAge = calcCourse - yearBirth.substr(0,4) - 1;
            education < calcCourse ? course = 'Закончил' : calcCourse === calcCourse + 1 ? course = "1" + " " + "курс" : course = Number(calcCourse) - Number(receiptValue) + " " + "курс";
        }

        async function postData() {
            let response = await fetch('http://localhost:3000/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentObject)
            });
            return await response.json();
        }

        async function searchData(value) {
            await fetch(`http://localhost:3000/api/students/${value}`)
            .then((receive) => {
                return receive.json();
            })
            .then((data) => {
                warningWindow = data.fio;
                if(confirm('Вы уверены, что хотите удалить' + " " + warningWindow + '?')) {
                    deleteData(getStudyID);
                }
            });
        }

        async function getData() {
            await fetch('http://localhost:3000/api/students')
            .then((receive) => {
                return receive.json();
            })
            .then((data) => {
                StudyList = data;
                createListStudent(StudyList);
                deleteStudent();
            });
        }

        async function deleteData(value) {
            await fetch(`http://localhost:3000/api/students/${value}`, {method: 'DELETE'});
            searchChild.replaceChildren();
            await getData();
        }


        function studentPushObject() {
            studentObject = {
                fio: surnameValue.trim() + " " + nameValue.trim() + " " + fatherNameValue.trim(), 
                dateOfBirth: birthDayValue,
                receipt: receiptValue,
                receiptOut: education,
                faculty: facultyValue.trim(),
                age: listYearAge,
                courseNumber: course.trim(),
            };
            postData();
            studentStorage.push(studentObject);
            createListStudent(studentStorage);
            studentStorage = [];
            createPanel.inputSurname.value = '';
            createPanel.inputName.value = '';
            createPanel.fatherName.value = '';
            createPanel.dateOfBirth.value = '';
            createPanel.receiptDate.value = '';
            createPanel.faculty.value = '';
        }

        addStudent();

        function createListStudent(array) {
            for (let i of array) {
                const fio = document.createElement('div');
                    facultyList = document.createElement('div');
                    dateOfTheBirthList = document.createElement('div');
                    yearStartFinishList = document.createElement('div');
                    listStudent = document.createElement('div');
                    deleteStudentList = document.createElement('button');
                    containerListStudent = document.querySelector('.container-list');
                listStudent.classList.add('item-student');
                deleteStudentList.classList.add('delete-study-button');
                containerListStudent.append(listStudent);
                listStudent.append(fio);
                listStudent.append(facultyList);
                listStudent.append(dateOfTheBirthList);
                listStudent.append(yearStartFinishList);
                listStudent.append(deleteStudentList);
                fio.textContent = i.fio;
                facultyList.textContent = i.faculty;
                dateOfTheBirthList.textContent = i.dateOfBirth + " " + "("+i.age + " " + "лет" + ")";
                yearStartFinishList.textContent = i.receipt + " " + "-" + " " + i.receiptOut + " " + "(" + i.courseNumber + ")";
                deleteStudentList.dataset.id = i.id;
            };
        }

        async function deleteStudent() {
            let deleteButton = document.querySelectorAll('.delete-study-button');
                deleteButton.forEach((e) => {
                    e.addEventListener('click', () => {
                        getStudyID = e.getAttribute("data-id");
                        searchData(getStudyID);
                    });
                });
        }

    })
})();