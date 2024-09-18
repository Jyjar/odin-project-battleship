class DOMManager {
    constructor(gameController) {
        this.gameController = gameController;
    }

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

        this.setStartScreenEventListeners();
    }

    setStartScreenEventListeners() {
        let playerVsComputerButton = document.querySelector(
            ".player-vs-computer"
        );
        playerVsComputerButton.addEventListener("click", () => {
            this.gameController.startGame("playerVSComputer");
            this.renderBoard(
                this.gameController.player1.gameBoard,
                this.gameController.player2.gameBoard
            );
            this.setBoardClickListener((x, y) => {
                this.gameController.playTurn([x, y]);
                if (!this.gameController.checkGameOver()) {
                    this.updateBoard(
                        this.gameController.player1.gameBoard,
                        this.gameController.player2.gameBoard
                    );
                } else {
                    this.showGameOver(this.gameController.checkGameOver());
                    console.log("GAME OVER");
                }
            });
        });
        let playerVsPlayerButton = document.querySelector(".player-vs-player");
        playerVsPlayerButton.addEventListener("click", () => {
            this.gameController.startGame("playerVSPlayer");
            this.renderBoard(
                this.gameController.player1.gameBoard,
                this.gameController.player2.gameBoard
            );
            this.setBoardClickListener((x, y) => {
                this.gameController.playTurn([x, y]);
                if (!this.gameController.checkGameOver()) {
                    this.updateBoard(
                        this.gameController.player1.gameBoard,
                        this.gameController.player2.gameBoard
                    );
                    this.switchPlayerScreen();
                } else {
                    this.showGameOver(this.gameController.checkGameOver());
                    console.log("GAME OVER");
                }
            });
        });
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
                    <div class="first-player-grid"></div>
                    <h3>Player 1</h3>
                </div>
                <div class="secound-player">
                    <div class="secound-player-grid"></div>
                    <h3>Player 2</h3>
                </div>
            </div>
        `;
        document.body.appendChild(playerBoardView);

        this.renderGameBoard(
            player1gameBoard,
            document.querySelector(".first-player-grid"),
            this.gameController.currentPlayer === this.gameController.player2
        );

        this.renderGameBoard(
            player2gameBoard,
            document.querySelector(".secound-player-grid"),
            this.gameController.currentPlayer === this.gameController.player1
        );

        this.startMenuButtonEventListener();
        this.resetButtonEventListener();
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
                            boardItem.classList.contains("ship-hidden") ||
                            boardItem.classList.contains("ship")
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
        const resetButton = document.querySelector(".reset-button");
        resetButton.addEventListener("click", () => {
            const gameMode = this.gameController.gameMode;
            this.gameController.startGame(gameMode);
            this.renderBoard(
                this.gameController.player1.gameBoard,
                this.gameController.player2.gameBoard
            );

            if (gameMode === "playerVSComputer") {
                this.setBoardClickListener((x, y) => {
                    this.gameController.playTurn([x, y]);
                    if (!this.gameController.checkGameOver()) {
                        this.updateBoard(
                            this.gameController.player1.gameBoard,
                            this.gameController.player2.gameBoard
                        );
                    } else {
                        this.showGameOver(this.gameController.checkGameOver());
                        console.log("GAME OVER");
                    }
                });
            } else if (gameMode === "playerVSPlayer") {
                this.setBoardClickListener((x, y) => {
                    this.gameController.playTurn([x, y]);
                    if (!this.gameController.checkGameOver()) {
                        this.updateBoard(
                            this.gameController.player1.gameBoard,
                            this.gameController.player2.gameBoard
                        );
                        this.switchPlayerScreen();
                    } else {
                        this.showGameOver(this.gameController.checkGameOver());
                        console.log("GAME OVER");
                    }
                });
            }
        });
    }

    switchPlayerScreen() {
        this.clearScreen();

        const passDeviceView = document.createElement("div");
        passDeviceView.className = "pass-device-view";
        passDeviceView.innerHTML = `   
            <h2>Pass device to ${
                this.gameController.currentPlayer ===
                this.gameController.player1
                    ? "Player 2"
                    : "Player 1"
            }</h2>
            <button class="switch-player">${
                this.gameController.currentPlayer ===
                this.gameController.player1
                    ? "PLAYER 2"
                    : "PLAYER 1"
            } IS HERE</button>
        `;
        document.body.appendChild(passDeviceView);

        let switchButton = document.querySelector(".switch-player");
        switchButton.addEventListener("click", () => {
            this.gameController.switchTurn();
            this.renderBoard(
                this.gameController.player1.gameBoard,
                this.gameController.player2.gameBoard
            );
            this.setBoardClickListener((x, y) => {
                this.gameController.playTurn([x, y]);
                if (!this.gameController.checkGameOver()) {
                    this.updateBoard(
                        this.gameController.player1.gameBoard,
                        this.gameController.player2.gameBoard
                    );
                    this.switchPlayerScreen();
                } else {
                    this.showGameOver(this.gameController.checkGameOver());
                    console.log("GAME OVER");
                }
            });
        });
    }

    startMenuButtonEventListener() {
        const startMenuButton = document.querySelector(".start-menu-button");
        startMenuButton.addEventListener("click", () => {
            this.clearScreen();
            this.renderStartScreen();
            this.setStartScreenEventListeners();
        });
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
}

export { DOMManager };
