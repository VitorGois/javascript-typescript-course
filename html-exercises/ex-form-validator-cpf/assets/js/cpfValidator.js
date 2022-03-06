class CpfValidator {
    constructor(cpf) {
        Object.defineProperty(this, 'cleanCpf', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpf.replace(/\D+/g, '')
        });
    }

    validate() {
        if (!this.cleanCpf) return false;
        if (typeof this.cleanCpf !== 'string') return false;
        if (this.cleanCpf.length !== 11) return false;
        if (this.isSequential()) return false;
        
        this.generateValidatedCpf();
        return this.validatedCpf === this.cleanCpf;        
    }

    isSequential() {
        return this.cleanCpf
            .split('')
            .every(char => char === this.cleanCpf[0]);
    }

    generateValidatedCpf() {
        const cpfWithoutDigits = this.cleanCpf.slice(0, -2);
        const firstDigit = this.generateDigit(cpfWithoutDigits);
        const secondDigit = this.generateDigit(cpfWithoutDigits + firstDigit);
        this.validatedCpf = cpfWithoutDigits + firstDigit + secondDigit;
    }

    generateDigit(cpfWithoutDigits) {
        let total = 0;
        let cpfReverse = cpfWithoutDigits.length + 1;

        for (let numericString of cpfWithoutDigits) {
            total += cpfReverse * Number(numericString);
            cpfReverse--;
        }

        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
    }
}