# ✨ Memory Match - Web Application Development Project

A premium, interactive Memory Card Matching Game built with **Vanilla JavaScript (ES Modules)**, **HTML5**, **CSS3**, and **Supabase (PostgreSQL)**.

**🔴 Live Demo:** [Play Memory Match Here!](https://minnulekha.github.io/memory-game/)

## 🎮 Game Features

* **Interactive Gameplay:** 4x4 grid with 8 pairs of hidden cards to memorize and match.

* **Challenging Mechanics:** Players start with 3 lives. Incorrect matches cost a life!

* **Live Statistics:** Real-time tracking of Moves and Elapsed Time.

* **Pause & Resume:** A frosted-glass overlay pauses the game and timer to prevent cheating while taking a break.

* **Global Leaderboard:** Backed by a Supabase PostgreSQL database, the game saves winning times and dynamically fetches the Top 10 fastest players.

* **Premium UI:** Designed with modern glassmorphism, pastel gradients, and 3D card-flip animations.

## 🏗️ Architecture & Folder Structure

This project was developed using a strict **Modular ES6 Architecture** to allow parallel team development without merge conflicts.

```
memory-game/
├── index.html             # Main HTML structure and semantic layout
├── css/
│   └── style.css          # Premium pastel theme, CSS Grid, and 3D animations
├── images/                # Card face images (1.jpeg to 8.jpeg)
├── js/
│   ├── main.js            # Controller: Wires DOM events to game logic & DB
│   ├── game.js            # Core Engine: Pure logic, state, and match validation
│   ├── ui.js              # View: DOM manipulation and HTML injection
│   ├── db.js              # Model: Supabase fetch and insert queries
│   └── supabase-client.js # Database initialization
└── README.md

```

## 👥 Team Work & Contributions

This project was built collaboratively by a team of 5 members from **LBS Institute of Technology for Women (S5 IT)**. We utilized the **Fork and Pull-Request Workflow** on GitHub to integrate our individual modules.

* **Minnu Lekha V G (Project Lead & Integration)**

  * Established the repository architecture and DOM Contracts.

  * Wrote the semantic `index.html` structure.

  * Developed `main.js`, acting as the central controller to wire event listeners, manage the game loop/timer, and resolve integration issues (Merged all Pull Requests).

* **Muthulekshmi S (UI & Styling)**

  * Authored `css/style.css` (Pull Request #2).

  * Designed the premium glassmorphism landing page and modals.

  * Implemented the responsive CSS Grid and hardware-accelerated 3D transform animations for the card flips.

* **Liyana Shirin A A (Game Engine & State Management)**

  * Authored `js/game.js` (Pull Request #3).

  * Wrote pure, DOM-independent JavaScript functions to handle the Fisher-Yates card shuffle, matching evaluation, life deduction, and win/loss conditions.

* **Lakshmi Sankar M P (Database Integration)**

  * Authored `js/db.js` and `js/supabase-client.js` (Pull Request #4).

  * Set up the Supabase PostgreSQL table (`leaderboard`) and configured Row Level Security (RLS) policies.

  * Wrote asynchronous JavaScript functions to submit winning scores and fetch the top 10 fastest players.

* **Naina Mariam Prajeesh (DOM Manipulation)**

  * Authored `js/ui.js` (Pull Request #1).

  * Handled dynamic HTML generation, mapping the game state array to DOM nodes using `document.createElement`.

  * Wrote functions to toggle the pause screen, flip CSS classes, and render the leaderboard lists.

## 🚀 How to Run Locally

Because this project uses ES6 Modules (`type="module"`), it must be served over an HTTP server. It will not work by simply double-clicking the `index.html` file.

1. **Clone the repository:**

   ```
   git clone https://github.com/minnulekha/memory-game.git
   
   ```

2. **Open in VS Code:**

   ```
   cd memory-game
   code .
   
   ```

3. **Start a Local Server:**

   * Install the **Live Server** extension in VS Code.

   * Click the **"Go Live"** button in the bottom right corner of the editor.

   * The game will open in your browser at `http://127.0.0.1:5500`.

*Developed for the Web Application Development Academic Project (2026-27).*
