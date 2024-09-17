class DOMManager {
    constructor() {}

    renderStartScreen() {
        const startScreen = document.createElement("div");
        startScreen.className = "start-screen";
        startScreen.innerHTML = `
            <h1>BATTLESHIP</h1>
            <div class="select-gamemode">
                <p>Select GameMode</p>
                <button class="player-vs-computer">Player VS Computer</button>
                <button class="player-vs-player">Player VS Player</button>
            </div>
        `;
        document.body.appendChild(startScreen);
    }

    clearScreen() {
        document.body.firstElementChild.remove();
    }

    renderBoard(player1gameBoard, player2gameBoard) {
        this.clearScreen();

        const playerBoardView = document.createElement("div");
        playerBoardView.className = "player-board-view";
        playerBoardView.innerHTML = `   
        <header>
            <h1>Battleship</h1>
            <div>
                <button class="start-menu-button">GO TO START MENU</button>
                <button class="reset-button">RESET</button>
            </div>
        </header>
        <div class="player-boards">
            <div class="first-player">
                <div class ="first-player-grid">
                    
                </div>
            </div>
            <div class="secound-player">
                <div class="secound-player-grid">

                </div>
            </div>
        </div>
        `;
        document.body.appendChild(playerBoardView);

        this.renderGameBoard(
            player1gameBoard,
            document.querySelector(".first-player-grid"),
            false
        );
        this.renderGameBoard(
            player2gameBoard,
            document.querySelector(".secound-player-grid"),
            true
        );
    }

    renderGameBoard(gameBoard, gridElement, isHidden) {
        gridElement.innerHTML = "";

        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[i].length; j++) {
                const boardItem = document.createElement("div");
                boardItem.classList.add(
                    gameBoard.board[i][j] !== null
                        ? isHidden
                            ? "ship-hidden"
                            : "ship"
                        : "board-item"
                );
                gridElement.appendChild(boardItem);

                for (let y = 0; y < gameBoard.shots.length; y++) {
                    if (
                        gameBoard.shots[y][0] === j &&
                        gameBoard.shots[y][1] === i
                    ) {
                        if (boardItem.classList.contains("board-item")) {
                            const dot = document.createElement("div");
                            dot.classList.add("dot");
                            boardItem.append(dot);
                        } else if (
                            boardItem.classList.contains("ship-hidden") || boardItem.classList.contains("ship")
                        ) {
                            boardItem.classList.add("hit");
                        }
                        boardItem.style.pointerEvents = "none";
                    }
                }

                if (isHidden) {
                    boardItem.addEventListener("click", () => {
                        this.onBoardItemClick(j, i);
                    });
                }
            }
        }
    }

    resetButtonEventListener() {

    }

    setBoardClickListener(callback) {
        this.onBoardItemClick = callback;
    }

    updateBoard(player1gameBoard, player2gameBoard) {
        this.renderBoard(player1gameBoard, player2gameBoard);
    }

    showGameOver(winner) {
        const gameOverScreen = document.createElement("div");
        gameOverScreen.className = "game-over";
        gameOverScreen.innerHTML = `<h2>${winner} wins!</h2>`;
        document.body.appendChild(gameOverScreen);
    }

    getCoordinatesFromClick() {
        // Capture the clicked coordinates from the enemy board.
    }

    setupEventListeners() {
        // Set up event listeners for player interactions (e.g., clicking to attack).
    }
}

export { DOMManager };
