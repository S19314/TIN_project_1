
function validateForm() {

    const modelInput = document.getElementById('valueModel'); // 'model');
    const systemOperacyjnyInput = document.getElementById('systemOperacyjnyInput')
    const typKomputeraInput = document.getElementById('typKomputeraInput');
    const dayStworzeniaInput = document.getElementById('dayStworzeniaInput');
    const monthStworzeniaInput = document.getElementById('monthStworzeniaInput');
    const yearStworzeniaInput = document.getElementById('yearStworzeniaInput');

    const errorModel = document.getElementById('errorModel');
    const errorSystemOperacyjny = document.getElementById('errorSystemOperacyjny');
    const errorTypKomputera = document.getElementById('errorTypKomputera');
    const errorDayStworzenia = document.getElementById('errorDayStworzenia');
    const errorMonthStworzenia = document.getElementById('errorMonthStworzenia');
    const errorYearStworzenia = document.getElementById('errorYearStworzenia');

    const errorSummary = document.getElementById('errorSummary');

    /*
    event.preventDefault(); // Usuń 
    errorSummary.innerText = "ala ma kota 2 ";
    return false;
        errorSummary.innerText = "ala ma kota 2 ";
    return false;

    errorSummary.innerText = "ala ma kota 2 ";
    return false;
        */
    resetErrors(
        [modelInput, systemOperacyjnyInput, typKomputeraInput, dayStworzeniaInput, monthStworzeniaInput, yearStworzeniaInput],
        [errorModel, errorSystemOperacyjny, errorTypKomputera, errorDayStworzenia, errorMonthStworzenia, errorYearStworzenia],
        errorSummary);

    var valid = true;

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelInput.value, 2, 60)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(systemOperacyjnyInput.value)) {
        valid = false;
        systemOperacyjnyInput.classList.add("error-input");
        errorSystemOperacyjny.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(systemOperacyjnyInput.value, 2, 60)) {
        valid = false;
        systemOperacyjnyInput.classList.add("error-input");
        errorSystemOperacyjny.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(typKomputeraInput.value)) {
        valid = false;
        typKomputeraInput.classList.add("error-input");
        errorTypKomputera.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(typKomputeraInput.value, 2, 60)) {
        valid = false;
        typKomputeraInput.classList.add("error-input");
        errorTypKomputera.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }


    // Проверки:
    // 2 число ли
    // 3 Соеденить в дату, и проверить, не выходит ли за закрес. До сегодня и в прошлое. 
    let isValidDateFormat = true;
    let day = 0;
    if (!checkRequired(dayStworzeniaInput.value)) {
        valid = false;
        isValidDateFormat = false;
        dayStworzeniaInput.classList.add("error-input");
        errorDayStworzenia.innerText = "Pole jest wymagane";
    } else if (!checkNumber(dayStworzeniaInput.value)) {
        valid = false;
        isValidDateFormat = false;
        dayStworzeniaInput.classList.add("error-input");
        errorDayStworzenia.innerText = "Pole przyjmuje tylko liczby";
    } else if (!checkNumberRange(dayStworzeniaInput.value, 0, 32)) {
        valid = false;
        isValidDateFormat = false;
        dayStworzeniaInput.classList.add("error-input");
        errorDayStworzenia.innerText = "Liczba musze być większa od zera ale mniejsza od 32";
    } else {
        day = dayStworzeniaInput.value;
    }

    let month = 0;
    if (!checkRequired(monthStworzeniaInput.value)) {
        valid = false;
        isValidDateFormat = false;
        monthStworzeniaInput.classList.add("error-input");
        errorMonthStworzenia.innerText = "Pole jest wymagane";
    } else if (!checkNumber(monthStworzeniaInput.value)) {
        valid = false;
        isValidDateFormat = false;
        monthStworzeniaInput.classList.add("error-input");
        errorMonthStworzenia.innerText = "Pole przyjmuje tylko liczby";
    } else if (!checkNumberRange(monthStworzeniaInput.value, 0, 13)) {
        valid = false;
        isValidDateFormat = false;
        monthStworzeniaInput.classList.add("error-input");
        errorMonthStworzenia.innerText = "Liczba musze być większa od zera ale mniejsza od 13";
    } else {
        month = monthStworzeniaInput.value - 1;
    }

    let year = 0;
    if (!checkRequired(yearStworzeniaInput.value)) {
        valid = false;
        isValidDateFormat = false;
        yearStworzeniaInput.classList.add("error-input");
        errorYearStworzenia.innerText = "Pole jest wymagane";
    } else if (!checkNumber(yearStworzeniaInput.value)) {
        valid = false;
        isValidDateFormat = false;
        yearStworzeniaInput.classList.add("error-input");
        errorYearStworzenia.innerText = "Pole przyjmuje tylko liczby";
    } else if (!checkNumberRange(yearStworzeniaInput.value, 0, Infinity)) {
        valid = false;
        isValidDateFormat = false;
        yearStworzeniaInput.classList.add("error-input");
        errorYearStworzenia.innerText = "Liczba musze być większa od zera ale mniejsza od 13";
    } else {
        year = yearStworzeniaInput.value;
    }


    if (isValidDateFormat) {
        let dataInput = new Date(year, month, day);
        let dataNow = Date.now();
        if (!checkIfDateAfter(dataInput, dataNow)) {
            valid = false;
            dayStworzeniaInput.classList.add("error-input");
            yearStworzeniaInput.classList.add("error-input");
            monthStworzeniaInput.classList.add("error-input");
            let tommorow = new Date(dataNow + 1);

            errorDayStworzenia.innerText = "Data powinna być wcześniejsza niż " + tommorow;
            errorMonthStworzenia.innerText = "Data powinna być wcześniejsza niż " + tommorow;
            errorYearStworzenia.innerText = "Data powinna być wcześniejsza niż " + tommorow;
        }
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}