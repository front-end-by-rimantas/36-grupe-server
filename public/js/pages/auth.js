import { IsValid } from '../components/is-valid/IsValid.js';

/*
1) susirasti forma ir jos VISUS laukus
2) surinkti informacija is formos
3) FE validacija
4a) jei yra klaidu - atvaizduojame
4b) jei nera klaidu - siunciame info objekta i serveri
5) is serverio gauta atsakima interpretuojame ir kazka darome
6a) jei serveris rado klaidu - atvaizduojame
6b) jei serveris ne rado klaidu - END
*/

const formDOM = document.querySelector('.form');
const errorsDOM = formDOM.querySelector('.form-errors');
const allInputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');

submitDOM.addEventListener('click', (e) => {
    e.preventDefault();

    const errors = [];
    const formData = {};
    for (const inputDOM of allInputsDOM) {
        const { id, value, dataset } = inputDOM;
        const validationRule = IsValid[dataset.validation];
        const [err, status] = validationRule(value);
        if (err) {
            errors.push(status);
        }
        formData[id] = value;
    }

    if (formData.password
        && formData.repass
        && formData.password !== formData.repass) {
        errors.push('Nesutampa slaptazodziai');
    }
    errorsDOM.innerText = errors.join('\r\n');

    if (errors.length === 0) {
        delete formData.repass;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                console.log(data);
            }
        };
        xhttp.open("GET", "/api", true);
        xhttp.send();
    }
})