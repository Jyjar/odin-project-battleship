import { Ship } from "../ship.js";
import { GameBoard } from "../gameBoard.js";
import { Player } from "../player.js";

describe("ship tests", () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(2);
    });

    test("hit method increments timesHit and changes sunken if hit equals length of ship", () => {
        ship.hit();
        ship.hit();
        expect(ship.sunken).toBe(true);
    });

    test("returns false for ship that was not hit", () => {
        expect(ship.sunken).toBe(false);
    });
});

describe("gameBoard tests", () => {
    let gameBoard;
    let ship = new Ship(3);

    beforeEach(() => {
        gameBoard = new GameBoard();
        gameBoard.placeShip(ship, [0, 0], "horizontal");
    });

    describe("placeShip method", () => {
        test("gameBoard places ship horizontaly correct", () => {
            expect(gameBoard.board[0][2]).toBe(ship);
        });

        test("second ship is not placed due to being adjacent to the first ship", () => {
            expect(() => {
                gameBoard.placeShip(ship, [0, 1], "vertical");
            }).toThrow(Error);
        });
    });

    describe("reciveAttack method", () => {
        test("hits the ship and returns true", () => {
            expect(gameBoard.receiveAttack([0, 2])).toBe(true);
        });

        test("fail to hit the ship and returns false", () => {
            expect(gameBoard.receiveAttack([1, 2])).toBe(false);
        });
    });

    describe("allShipsSunk method", () => {
        test("all ships sunken after been hit return true", () => {
            gameBoard.receiveAttack([0, 0]);
            gameBoard.receiveAttack([0, 1]);
            gameBoard.receiveAttack([0, 2]);
            let newShip = new Ship(2);
            gameBoard.placeShip(newShip, [0, 2], "horizontal");
            gameBoard.receiveAttack([2, 0]);
            gameBoard.receiveAttack([2, 1]);
            expect(gameBoard.areAllShipSunk()).toBe(true);
        });
    });
});

describe("player tests", () => {
    let playerOne;
    let playerTwo;
    let ship = new Ship(3);

    beforeEach(() => {
        playerOne = new Player("human", false);
        playerOne.gameBoard.placeShip(ship, [0, 0], "horizontal");
        playerTwo = new Player("computer", true);
        playerTwo.gameBoard.placeShip(ship, [0, 0], "horizontal");
    });

    test("Player can make an attack on the opponent's board", () => {
        playerOne.attack(playerTwo, [0, 0]);
        expect(playerTwo.gameBoard.ships[0].timesHit).toBe(1);
    });

    test("Computer player attacks last possible shoot", () => {
        function fillShotsExpectOne() {
            const result = [];
            for (let i = 0; i <= 9; i++) {
                for (let j = 0; j <= 9; j++) {
                    result.push([i, j]);
                }
            }
            return result;
        }

        function arrayIncludesCoordinate(arr, coord) {
            return arr.some((c) => c[0] === coord[0] && c[1] === coord[1]);
        }

        playerTwo.gameBoard.shots = fillShotsExpectOne();
        playerTwo.gameBoard.shots.pop();
        playerTwo.computerMove(playerOne);
        expect(arrayIncludesCoordinate(playerOne.gameBoard.shots, [9, 9])).toBe(
            true
        );
    });
});
