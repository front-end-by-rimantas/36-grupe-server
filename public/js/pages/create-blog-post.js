import { IsValid } from '../components/is-valid/IsValid.js';

const formDOM = document.querySelector('.form');
const errorsDOM = formDOM.querySelector('.form-errors');
const allInputsDOM = formDOM.querySelectorAll('input, textarea');
const submitDOM = formDOM.querySelector('button');

submitDOM.addEventListener('click', (e) => {
    e.preventDefault();

    const errors = [];
    const formData = {};
    for (const inputDOM of allInputsDOM) {
        const { id, value, dataset } = inputDOM;
        const validationRule = IsValid[dataset.validation];
        console.log(validationRule);
        const [err, status] = validationRule(value);
        if (err) {
            errors.push(status);
        }
        formData[id] = value;
    }

    errorsDOM.innerText = errors.join('\r\n');

    if (errors.length === 0) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);

                if (data.status === 'Success') {
                    if (data.action.type === 'redirect') {
                        location.href = data.action.href;
                    }
                }

                if (data.status === 'Error') {
                    errorsDOM.innerText = data.msg;
                }
            }
        };
        xhttp.open("POST", formDOM.action, true);
        xhttp.send(JSON.stringify(formData));
    }
})