class FormValidator {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.isValidFields();
        const validPwdFields = this.isValidPwd();

        if (validFields && validPwdFields) {
            alert('Posted form');
            this.form.submit();
        }
    }

    isValidFields() {
        let valid = true;

        this.clearErrorMsgs();

        for (let field of this.form.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText; 
            if (!field.value) {
                this.createError(field, `<strong>${label}</strong> should not be empty.`);
                valid = false;
            }
            if (field.classList.contains('cpf')) {
                if (!this.validateCPF(field)) valid = false;
            }
            if (field.classList.contains('username')) {
                if (!this.validateUsername(field)) valid = false;
            }
        }

        return valid;
    }

    isValidPwd() {
        let valid = true;

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeatPassword');

        if (password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, 'Password and Repeat Password field must be equals')
            this.createError(repeatPassword, 'Password and Repeat Password field must be equals')
        }
        if (password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Password must be between 6 and 12 chars ')
        }

        return valid;
    }

    clearErrorMsgs() {
        for (let errorMsg of this.form.querySelectorAll('.error-msg')) {
            errorMsg.remove();
        }
    }

    createError(field, msg) {
        const divError = document.createElement('div');
        divError.innerHTML = msg;
        divError.classList.add('error-msg');

        field.insertAdjacentElement('afterend', divError);
    }

    validateCPF(field) {
        const cpf = new CpfValidator(field.value);

        if (!cpf.validate()) {
            this.createError(field, 'CPF invalid');
            return false;
        }

        return true;
    }

    validateUsername(field) {
        const user = field.value;
        let valid = true;

        if (user.length < 3 || user.length > 12) {
            this.createError(field, 'Username must be between 3 and 12 chars')
            valid = false;
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Username must contain only letters and/or numbers')
            valid = false;
        }

        return valid;
    }
}

const validator = new FormValidator();