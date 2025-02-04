class Answer {
    constructor(index, isActive, submitCallback) {
        this.index = index;
        this.isActive = isActive;
        this.submitCallback = submitCallback;
        this.element = this.createAnswerElement();
    }

    createAnswerElement() {
        const form = document.createElement('form');
        form.classList.add('answer-form');
        if (!this.isActive) form.setAttribute('inert', ''); // Désactive les tentatives non actives

        this.inputs = [];
        for (let i = 0; i < 5; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.disabled = !this.isActive;
            input.classList.add('letter'); // Ajouter la classe "letter"
            input.addEventListener('input', (e) => this.handleInput(e, i));
            this.inputs.push(input);
            form.appendChild(input);
        }

        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Envoyer';
        submitButton.disabled = !this.isActive;
        form.appendChild(submitButton);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const guess = this.inputs.map(input => input.value.toUpperCase()).join('');
            if (guess.length === 5) {
                this.submitCallback(guess, this.index);
            } else {
                alert("Veuillez entrer un mot de 5 lettres.");
            }
        });

        return form;
    }

    handleInput(event, index) {
        event.target.value = event.target.value.toUpperCase().replace(/[^A-Z]/g, '');
        if (event.target.value && index < 4) {
            this.inputs[index + 1].focus();
        }
    }

    getElement() {
        return this.element;
    }

    activate() {
        this.isActive = true;
        this.element.removeAttribute('inert'); // Enlève l'attribut inert pour activer le formulaire
        this.inputs.forEach(input => input.disabled = false);
    }

    disable() {
        this.inputs.forEach(input => input.disabled = true);
    }

    applyFeedback(feedback) {
        feedback.forEach((item, index) => {
            const input = this.inputs[index];
            input.classList.remove('absent', 'present', 'correct'); // Retirer les anciennes classes
            if (item.status === 'correct') {
                input.classList.add('correct'); // Ajoute la classe correct
            } else if (item.status === 'misplaced') {
                input.classList.add('present'); // Ajoute la classe present pour "misplaced"
            } else {
                input.classList.add('absent'); // Ajoute la classe absent pour "incorrect"
            }
        });
    }
}

export default Answer;
