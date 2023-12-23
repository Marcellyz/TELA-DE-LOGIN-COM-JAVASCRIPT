class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-only-letters',
            'data-max-length',
            'data-email-validate',
            'data-equal',
            'data-password-validate'

        ]
    }

    validate(form) {

        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }
        // pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //transformo uma HTMLColllection -> arrays
        let inputsArray = [...inputs];

        //loop nos inputs e validações mediante ao que for encontrado
        inputsArray.forEach(function (input) {

            //loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {

                    //data-min-length -> minlength
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method](input, value);

                }
            }
        }, this);


    }
    //verifica se um input tem um número minimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }
    //verifica se um input passou no limite de caracteres
    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${maxValue} caracteres`;

        if (inputLength < maxValue) {
            this.printMessage(input, errorMessage);
        }
    }
    //verifica se dois campos são iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = "a senhas não confere"

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida o campo de senha


    // explodir string em array
    passwordvalidate(input) {
        let charArr = input.value.split("");

        let uppercases = 0;
        let numebers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numebers++;
            }
        }

        if (uppercases === 0 || numebers === 0) {
            let errorMessage = `A senha precisa de um caractere maiúsculo e um número`;
            this.printMessage(input, errorMessage);

        }
    }
    //valida e-mails no formulario

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um E-mail válido`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }
    //valida se o campo tem apenas letras
    onlyletters(input) {

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números, nem caracteres especiais`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage)
        }
    }
    //metodo para imprimir mensagens de erro na tela
    printMessage(input, msg) {
        //quantidade de erros
        let errorQty = input.parentNode.querySelector('.error-validation')
        if (errorQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }


    //verifica se o input é requerido
    required(input) {
        let inputValue = input.value;
        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatorio`;
            this.printMessage(input, errorMessage)
        }
    }


    //limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento para disparar as validações.

submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);

})