import Answer from './Answer.js';

class Game {
    constructor(attempts) {
        this.attempts = attempts;
        this.currentAttempt = 0; // Garde une trace de la tentative en cours
        this.answers = [];
    }

    init() {
        this.createAttempts();
    }

    createAttempts() {
        const board = document.querySelector('.board');
        if (!board) {
            console.error('Element .board introuvable');
            return;
        }

        // Création des tentatives (formulaires)
        for (let i = 0; i < this.attempts; i++) {
            const answer = new Answer(i, i === 0, this.handleSubmit.bind(this));
            this.answers.push(answer);
            board.appendChild(answer.getElement());
        }
    }

    handleSubmit(guess, index) {
        fetch('https://progweb-wwwordle-api.onrender.com/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess })
        })
        .then(response => response.json())
        .then(data => {
            this.answers[index].applyFeedback(data.feedback);

            // Si le mot est trouvé
            if (data.status === 'valid' && data.message.includes('Congratulations')) {
                alert('Bravo ! Vous avez trouvé le mot !');
            } else {
                // Passer à la prochaine tentative (si disponible)
                if (index + 1 < this.attempts) {
                    this.answers[index + 1].activate();
                } else {
                    alert("Vous avez utilisé toutes vos tentatives.");
                }
            }
        })
        .catch(error => console.error('Erreur lors de la soumission :', error));
    }
}

export default Game;
