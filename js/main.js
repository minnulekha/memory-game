import * as Game from './game.js';
import * as UI from './ui.js';
import * as DB from './db.js';

let currentState = null;
let timerInterval = null;
let playerNickname = "Anonymous";
let isProcessing = false; // Prevents clicking while cards are animating

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Setup: Show Nickname Modal
    UI.showModal('nickname-modal');

    // 2. Start Game Event
    document.getElementById('start-btn').addEventListener('click', () => {
        const input = document.getElementById('nickname-input').value.trim();
        if (input) playerNickname = input;
        
        UI.hideModal('nickname-modal');
        startGame();
    });

    // 3. Play Again Event
    document.getElementById('play-again-btn').addEventListener('click', () => {
        UI.hideModal('result-modal');
        startGame();
    });

    // 4. Card Click Event (Event Delegation on the board)
    document.getElementById('game-board').addEventListener('click', handleBoardClick);
});
// 5. Show Standalone Leaderboard Event
    document.getElementById('show-leaderboard-btn').addEventListener('click', async () => {
        UI.showModal('leaderboard-only-modal');
        // Add a temporary loading state
        document.getElementById('leaderboard-only-list').innerHTML = '<li>Loading...</li>';
        
        // Fetch scores and render them into the new list
        const topScores = await DB.fetchTopScores();
        UI.renderLeaderboard(topScores, 'leaderboard-only-list');
    });

    // 6. Close Standalone Leaderboard Event
    document.getElementById('close-leaderboard-btn').addEventListener('click', () => {
        UI.hideModal('leaderboard-only-modal');
    });

    // 7. Landing Page Leaderboard Button
    document.getElementById('landing-leaderboard-btn').addEventListener('click', async () => {
        UI.showModal('leaderboard-only-modal');
        document.getElementById('leaderboard-only-list').innerHTML = '<li>Loading...</li>';
        
        const topScores = await DB.fetchTopScores();
        UI.renderLeaderboard(topScores, 'leaderboard-only-list');
    });
    
function startGame() {
    // Reset state and UI
    currentState = Game.getInitialState();
    UI.renderBoard(currentState.cards);
    UI.updateStats(currentState.moves, currentState.time, currentState.lives);
    
    // Ensure the game container is visible
    document.getElementById('game-container').classList.remove('hidden');

    // PREVIEW: Lock board and flip all cards face-up
    isProcessing = true;
    currentState.cards.forEach((_, index) => UI.flipCardElement(index, true, false));

    // Wait 1 second, then flip them back down and start the game
    setTimeout(() => {
        currentState.cards.forEach((_, index) => UI.flipCardElement(index, false, false));
        isProcessing = false; // Unlock board
        
        // Start Timer
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            currentState.time += 1;
            UI.updateStats(currentState.moves, currentState.time, currentState.lives);
        }, 1000);
    }, 1000); // 1000 milliseconds = 1 second
}

async function handleBoardClick(event) {
    // Ignore clicks if we are processing a match or if the game is over
    if (isProcessing) return;

    // Find the closest card element that was clicked
    const cardElement = event.target.closest('.card');
    if (!cardElement) return;

    const cardIndex = parseInt(cardElement.dataset.index, 10);
    const clickedCard = currentState.cards[cardIndex];

    // Ignore clicks on already flipped or matched cards
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    currentState = Game.handleCardFlip(currentState, cardIndex);
    UI.flipCardElement(cardIndex, true, false);
    
    // Check how many cards are currently flipped but unmatched
    const flippedUnmatched = currentState.cards.filter(c => c.isFlipped && !c.isMatched);

    if (flippedUnmatched.length === 2) {
        isProcessing = true; // Lock the board
        UI.updateStats(currentState.moves, currentState.time, currentState.lives);

        // Pause for 1 second so the user can see the cards
        setTimeout(async () => {
            // Check for match (this deducts a life if incorrect)
            currentState = Game.checkMatch(currentState);
            
            // Update UI for both cards (either leave face up or flip back down)
            flippedUnmatched.forEach(card => {
                // We have to find their index in the original array
                const index = currentState.cards.findIndex(c => c.id === card.id);
                const updatedCard = currentState.cards[index];
                UI.flipCardElement(index, updatedCard.isFlipped, updatedCard.isMatched);
            });

            UI.updateStats(currentState.moves, currentState.time, currentState.lives);
            await checkGameEnd();
            isProcessing = false; // Unlock the board
        }, 1000);
    }
}

async function checkGameEnd() {
    const status = Game.isGameOver(currentState);
    
    if (status.isOver) {
        clearInterval(timerInterval);
        
        if (status.isWin) {
            UI.showModal('result-modal', 'You Win!', `Great job ${playerNickname}! You finished in ${currentState.moves} moves and ${currentState.time} seconds.`);
            
            // Database operations: submit score, then fetch and render leaderboard
            const success = await DB.submitScore(playerNickname, currentState.moves, currentState.time);
            if (success) {
                const topScores = await DB.fetchTopScores();
                UI.renderLeaderboard(topScores);
            }
        } else {
            UI.showModal('result-modal', 'Game Over', `Out of lives! Better luck next time, ${playerNickname}.`);
            // Optionally fetch leaderboard anyway to show them what to beat
            const topScores = await DB.fetchTopScores();
            UI.renderLeaderboard(topScores);
        }
    }
}