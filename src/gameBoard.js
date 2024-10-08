class GameBoard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
        this.shots = [];
    }

    placeShip(ship, coords, orientation) {
        if (orientation === "horizontal") {
            if (coords[0] + ship.length > 10) {
                throw new Error("Ship goes out of bounds horizontally.");
            }

            for (let i = 0; i < ship.length; i++) {
                if (!this.canPlaceShip(coords[0] + i, coords[1])) {
                    throw new Error(
                        "Cannot place ship here, spot or surrounding area is taken."
                    );
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this.board[coords[1]][coords[0] + i] = ship;
            }
        } else if (orientation === "vertical") {
            if (coords[1] + ship.length > 10) {
                throw new Error("Ship goes out of bounds vertically.");
            }
            for (let i = 0; i < ship.length; i++) {
                if (!this.canPlaceShip(coords[0], coords[1] + i)) {
                    throw new Error(
                        "Cannot place ship here, spot or surrounding area is taken."
                    );
                }
            }

            for (let i = 0; i < ship.length; i++) {
                this.board[coords[1] + i][coords[0]] = ship;
            }
        }

        this.ships.push(ship);
    }

    canPlaceShip(x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + j;
                const newY = y + i;

                if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
                    if (this.board[newY][newX] !== null) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    receiveAttack(coords) {
        let ship = this.board[coords[1]][coords[0]];

        this.shots.push(coords);

        if (ship != null) {
            ship.hit();
            if (ship.timesHit == ship.length) {
                ship.sunken = true;
            }
            return true;
        } else {
            return false;
        }

    }

    areAllShipSunk() {
        return this.ships.every(ship => ship.sunken);
    }
}

export { GameBoard };
