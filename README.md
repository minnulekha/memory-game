# ✨ Memory Match - Web Application Development Project

A premium, interactive Memory Card Matching Game built with **Vanilla JavaScript (ES Modules)**, **HTML5**, **CSS3**, and **MongoDB Atlas** via **Vercel Serverless Functions**.

**🔴 Live Demo:** [Play Memory Match Here!]((https://memory-game-flax-alpha.vercel.app/)) 

## 🎮 Game Features

- **Interactive Gameplay:** 4x4 grid with 8 pairs of hidden cards to memorize and match.
- **Challenging Mechanics:** Players start with 3 lives. Incorrect matches cost a life!
- **Live Statistics:** Real-time tracking of Moves and Elapsed Time.
- **Pause & Resume:** A frosted-glass overlay pauses the game and timer to prevent cheating while taking a break.
- **Global Leaderboard:** Backed by a **MongoDB Atlas** database, the game securely saves winning times and dynamically fetches the Top 10 fastest players using a custom serverless API.
- **Premium UI:** Designed with modern glassmorphism, pastel gradients, and 3D card-flip animations.

## 🏗️ Architecture & Folder Structure

This project was developed using a strict **Modular ES6 Architecture** for the frontend, coupled with a **Node.js Serverless Backend** to securely manage database credentials.

```text
memory-game/
├── api/
│   └── scores.js          # Serverless Backend: Handles secure MongoDB connections
├── index.html             # Main HTML structure and semantic layout
├── css/
│   └── style.css          # Premium pastel theme, CSS Grid, and 3D animations
├── images/                # Card face images (1.jpeg to 8.jpeg)
├── js/
│   ├── main.js            # Controller: Wires DOM events to game logic & DB
│   ├── game.js            # Core Engine: Pure logic, state, and match validation
│   ├── ui.js              # View: DOM manipulation and HTML injection
│   └── db.js              # Model: API calls to the serverless backend
├── package.json           # Node.js dependencies (MongoDB driver)
└── README.md

```

## 👥 Team Work & Contributions

This project was built collaboratively by a team of 5 members from **LBS Institute of Technology for Women (S5 IT)**. We utilized the **Fork and Pull-Request Workflow** on GitHub to integrate our individual modules.

* **Minnu Lekha V G (Project Lead & Integration)**
* Established the repository architecture, DOM Contracts, and Vercel deployment pipeline.
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
* Authored `js/db.js`, `api/scores.js`, and `package.json` (Pull Request #4).
* Set up the MongoDB Atlas cluster, Database (`memory_game`), and Collection (`leaderboard`).
* Wrote the Node.js serverless backend function to securely connect to MongoDB and process GET/POST requests.
* Wrote asynchronous frontend functions to submit winning scores and fetch the top 10 fastest players via the new API.


* **Naina Mariam Prajeesh (DOM Manipulation)**
* Authored `js/ui.js` (Pull Request #1).
* Handled dynamic HTML generation, mapping the game state array to DOM nodes using `document.createElement`.
* Wrote functions to toggle the pause screen, flip CSS classes, and render the leaderboard lists.



## 🚀 How to Run Locally

Because this project utilizes both ES6 Modules (`type="module"`) and a Serverless API, it requires a local development server.

1. **Clone the repository:**
```bash
git clone [https://github.com/minnulekha/memory-game.git](https://github.com/minnulekha/memory-game.git)

```


2. **Open in VS Code:**
```bash
cd memory-game
code .

```


3. **Install Dependencies (For the Backend):**
```bash
npm install

```


4. **Start the Local Environment:**
* **Option A (Frontend Only):** Install the **Live Server** extension in VS Code and click **"Go Live"**. The game mechanics will work perfectly at `http://127.0.0.1:5500`, but the leaderboard API will be mocked/unavailable.
* **Option B (Full-Stack via Vercel CLI):** To test the MongoDB backend locally, install the Vercel CLI (`npm i -g vercel`), link your project, pull your environment variables, and run `vercel dev`.



*Developed for the Web Application Development Academic Project (2026-27).*

```

```
