/** ==========================================================================
 * OWNER: Member 3 (Game Engine & State Management)
 * 
 * AI PROMPT / INSTRUCTIONS FOR GENERATION:
 * You are writing the core logic engine for a Memory Match game.
 * STRICT RULE: DO NOT write any DOM manipulation (no document.getElementById, no querySelector). 
 * This file handles pure data, state, and logic. It will be imported by main.js.
 * 
 * STATE REQUIREMENTS:
 * - A 4x4 grid means 16 cards (8 pairs).
 * - Lives start at 3.
 * - Moves start at 0.
 * - Time starts at 0.
 * 
 * REQUIRED EXPORTS:
 * 1. `export function getInitialState()`: Returns an object containing the initial game state, including a randomly shuffled array of 16 card objects. Each card object must look like: { id: 1, pairId: 'A', isFlipped: false, isMatched: false }.
 * 2. `export function handleCardFlip(state, cardIndex)`: Takes the current state and the index of the clicked card. 
 *    - Logic: Mark card as isFlipped = true. If it's the second card flipped in a turn, increment moves.
 *    - Return the updated state.
 * 3. `export function checkMatch(state)`: Evaluates if the two currently flipped (but unmatched) cards have the same pairId.
 *    - If match: set isMatched = true for both.
 *    - If no match: deduct 1 life, set isFlipped = false for both.
 *    - Return the updated state.
 * 4. `export function isGameOver(state)`: Returns an object { isOver: boolean, isWin: boolean }. Win = all matched. Loss = lives hit 0.
 * ========================================================================== */

// Define your 8 pairs (e.g., image names, emojis, or simple strings)
const PAIRS = ['apple', 'banana', 'cherry', 'grape', 'orange', 'pear', 'melon', 'strawberry'];

// Write and export your pure functions below


export function getInitialState() {
    const cards = PAIRS.flatMap((pairId, index) => [
        {
            id: index * 2 + 1,
            pairId,
            isFlipped: false,
            isMatched: false
        },
        {
            id: index * 2 + 2,
            pairId,
            isFlipped: false,
            isMatched: false
        }
    ]);

    // Shuffle cards randomly
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return {
        cards,
        lives: 3,
        moves: 0,
        time: 0
    };
}

export function handleCardFlip(state, cardIndex) {
    if (isGameOver(state).isOver) return state;

    if (
        !Number.isInteger(cardIndex) ||
        cardIndex < 0 ||
        cardIndex >= state.cards.length
    ) {
        return state;
    }

    const card = state.cards[cardIndex];

    if (card.isFlipped || card.isMatched) return state;

    const flippedCards = state.cards.filter(
        card => card.isFlipped && !card.isMatched
    );

    if (flippedCards.length >= 2) return state;

    const cards = state.cards.map((card, index) =>
        index === cardIndex
            ? { ...card, isFlipped: true }
            : card
    );

    return {
        ...state,
        cards,
        moves: flippedCards.length === 1
            ? state.moves + 1
            : state.moves
    };
}

export function checkMatch(state) {
    const flippedCards = state.cards
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => card.isFlipped && !card.isMatched);

    if (flippedCards.length !== 2) return state;

    const [first, second] = flippedCards;

    if (first.card.pairId === second.card.pairId) {
        const cards = state.cards.map((card, index) =>
            index === first.index || index === second.index
                ? { ...card, isMatched: true }
                : card
        );

        return { ...state, cards };
    }

    const cards = state.cards.map((card, index) =>
        index === first.index || index === second.index
            ? { ...card, isFlipped: false }
            : card
    );

    return {
        ...state,
        cards,
        lives: Math.max(0, state.lives - 1)
    };
}

export function isGameOver(state) {
    const isWin =
        state.cards.length === 16 &&
        state.cards.every(card => card.isMatched);

    const isLoss = state.lives <= 0;

    return {
        isOver: isWin || isLoss,
        isWin
    };
}
