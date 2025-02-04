import Game from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(6); // 6 essais
    game.init();
    window.game = game; // Expose game pour le debugging
});
