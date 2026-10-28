/** ==========================================================================
 * OWNER: Member 5 (DOM Manipulation & UI Rendering)
 * 
 * AI PROMPT / INSTRUCTIONS FOR GENERATION:
 * You are writing the UI layer for a vanilla JS Memory Match game.
 * STRICT RULE: Do not keep game state here (no lives/moves variables). 
 * This file only reads data passed to it and updates the HTML.
 * 
 * REQUIRED EXPORTS:
 * 1. `export function renderBoard(cardsArray)`: 
 *    - Clears the `<main id="game-board"></main>` element.
 *    - Loops through cardsArray. For each card, create this exact HTML string/node:
 *      <div class="card" data-index="[INDEX]">
 *        <div class="card-inner">
 *          <div class="card-front"><img src="assets/[pairId].png" alt="card"></div>
 *          <div class="card-back"></div>
 *        </div>
 *      </div>
 *    - Append them to #game-board.
 * 2. `export function updateStats(moves, time, lives)`: Updates the textContent of `#moves-count`, `#timer-count`, and `#lives-count`.
 * 3. `export function flipCardElement(index, isFlipped, isMatched)`: 
 *    - Finds the card div by `data-index`.
 *    - Toggles the class `flipped` on the card based on the `isFlipped` boolean.
 *    - If `isMatched` is true, perhaps add a `matched` class or hide it, based on preference.
 * 4. `export function showModal(modalId, title = '', message = '')`: Removes `.hidden` and adds `.active` to the modal. If it's the result modal, updates `#result-title` and `#result-message`.
 * 5. `export function hideModal(modalId)`: Removes `.active` and adds `.hidden`.
 * 6. `export function renderLeaderboard(scoresArray)`: Clears `#leaderboard-list`. Loops through scoresArray and creates `<li>Nickname - Moves: X - Time: Ys</li>` elements.
 * ========================================================================== */


/**
 * Member 5: DOM Manipulation & UI Rendering
 * This file only updates the UI. It does not store game state.
 */

// 1. Render the game board

/**
 * 1. Render the game board
 */
export function renderBoard(cardsArray) {
  const board = document.getElementById("game-board");

  if (!board) return;

  // Clear the board before rendering
  board.replaceChildren();

  cardsArray.forEach((cardData, index) => {
    // Create the card
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;

    // Create the inner container
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    // Create the card front
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const image = document.createElement("img");
    image.src = `images/${cardData.pairId}.jpeg`;
    image.alt = "card";

    cardFront.appendChild(image);

    // Create the card back
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    // Assemble the card
    cardInner.append(cardFront, cardBack);
    card.appendChild(cardInner);

    // Add the card to the board
    board.appendChild(card);
  });
}


/**
 * 2. Update game statistics
 */
export function updateStats(moves, time, lives) {
  const movesCount = document.getElementById("moves-count");
  const timerCount = document.getElementById("timer-count");
  const livesCount = document.getElementById("lives-count");

  if (movesCount) {
    movesCount.textContent = moves;
  }

  if (timerCount) {
    timerCount.textContent = time;
  }

  if (livesCount) {
    livesCount.textContent = lives;
  }
}


/**
 * 3. Flip a card and mark matched cards
 */
export function flipCardElement(index, isFlipped, isMatched) {
  const card = document.querySelector(
    `.card[data-index="${index}"]`
  );

  if (!card) return;

  card.classList.toggle("flipped", isFlipped);
  card.classList.toggle("matched", isMatched);
}


/**
 * 4. Show a modal
 */
export function showModal(modalId, title = "", message = "") {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("active");

  // Update title and message for the result modal
  if (modalId === "result-modal") {
    const resultTitle = document.getElementById("result-title");
    const resultMessage = document.getElementById("result-message");

    if (resultTitle) {
      resultTitle.textContent = title;
    }

    if (resultMessage) {
      resultMessage.textContent = message;
    }
  }
}


/**
 * 5. Hide a modal
 */
export function hideModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.classList.remove("active");
  modal.classList.add("hidden");
}


/**
 * 6. Render the leaderboard
 */
/**
 * 6. Render the leaderboard (Updated to accept a custom list ID)
 */
export function renderLeaderboard(scoresArray, listId = "leaderboard-list") {
  const leaderboard = document.getElementById(listId);

  if (!leaderboard) return;

  // Clear the old leaderboard
  leaderboard.replaceChildren();

  scoresArray.forEach((score) => {
    const listItem = document.createElement("li");

    // Using time_seconds to fix the "undefined" issue from earlier
    listItem.textContent =
      `${score.nickname} - Moves: ${score.moves} - Time: ${score.time_seconds}s`;

    leaderboard.appendChild(listItem);
  });
}

/**
 * 7. Toggle Pause Screen Overlay
 */
export function showPauseScreen(isPaused) {
    const overlay = document.getElementById('pause-overlay');
    const pauseBtn = document.getElementById('pause-btn');

    if (!overlay || !pauseBtn) return;

    if (isPaused) {
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
        pauseBtn.textContent = '▶ Resume';
    } else {
        overlay.classList.remove('active');
        overlay.classList.add('hidden');
        pauseBtn.textContent = '⏸ Pause';
    }
}

