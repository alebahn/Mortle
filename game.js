"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MenuOptions = ["New Game", "Continue"];
var UnreachableCaseError = /** @class */ (function (_super) {
    __extends(UnreachableCaseError, _super);
    function UnreachableCaseError(val) {
        return _super.call(this, "Unreachable case: " + val) || this;
    }
    return UnreachableCaseError;
}(Error));
// 19x12
var levels = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
        [0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    ],
    [
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    ],
    [
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    ],
];
var Game = /** @class */ (function () {
    function Game(canvas, canvasContext) {
        this.gameState = "Startup";
        this.nextState = "Startup";
        this.lastTimeStep = 0;
        // Menu Variables
        this.menuState = "New Game";
        // Level Variables
        this.levelCookie = "CurrentLevel";
        this.currentLevel = -1;
        this.nextLevel = -1;
        // Aim Variables
        this.AimLength = 6;
        this.AngleDelta = Math.PI / 32;
        this.aimAngle = 0;
        // Aim/Launch Variables
        this.currentX = 2;
        this.currentY = 58;
        // Launch Variables
        this.Gravity = 0.025;
        this.AirResistance = .9756;
        this.velocityX = 0;
        this.velocityY = 0;
        // Options
        this.showPath = false;
        this.invertBarrel = true;
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    Game.prototype.Start = function () {
        document.addEventListener("keydown", this.HandleKeyDown.bind(this));
        requestAnimationFrame(this.Loop.bind(this));
    };
    Game.prototype.Loop = function (timestamp) {
        this.Update();
        this.Draw();
        this.lastTimeStep = timestamp;
        requestAnimationFrame(this.Loop.bind(this));
    };
    Game.prototype.Update = function () {
        switch (this.gameState) {
            case "Startup":
                this.nextState = "Menu";
                break;
            case "Launch":
                // If you are in the bottom-right corner, advance the level
                if (this.currentX >= 90 && this.currentY >= 55) {
                    this.AdvanceToNextLevel();
                    break;
                }
                // Ceiling collisions stop movement
                if (this.CheckCollision(this.currentX, this.currentY - 1) && this.velocityY < 0) {
                    this.velocityX = 0;
                    this.velocityY = 0;
                }
                // Floor collisions go back to aiming
                else if (this.CheckCollision(this.currentX, this.currentY + 1)) {
                    this.currentX = Math.round(this.currentX);
                    this.currentY = Math.round(this.currentY) - 1;
                    this.nextState = "Aim";
                    break;
                }
                // Horizontal collisions bounce horizontally
                else if (this.CheckCollision(this.currentX - 1, this.currentY) && this.velocityX < 0 ||
                    this.CheckCollision(this.currentX + 1, this.currentY) && this.velocityX > 0) {
                    this.velocityX *= -1;
                }
                this.currentX += this.velocityX;
                this.currentY += this.velocityY;
                this.velocityY += this.Gravity;
                this.velocityY *= this.AirResistance;
                break;
        }
    };
    Game.prototype.Draw = function () {
        if (this.gameState !== this.nextState) {
            switch (this.nextState) {
                case "Menu":
                    this.ClearScreen();
                    this.DrawMenu();
                    this.SaveToBackground();
                    break;
                case "Aim":
                    if (this.currentLevel !== this.nextLevel) {
                        this.currentLevel = this.nextLevel;
                        this.ClearScreen();
                        this.DrawLevel();
                        this.SaveToBackground();
                    }
                    break;
                case "Launch":
                    this.ClearScreen();
                    break;
                case "Win":
                    this.ClearScreen();
                    this.DrawWin();
                    this.SaveToBackground();
            }
            this.gameState = this.nextState;
        }
        switch (this.gameState) {
            case "Menu":
                var xCoordinate = 72;
                this.ClearScreen();
                var yCoordinate = this.GetYCoordinateFromMenuState(this.menuState);
                this.canvasContext.fillText("<", xCoordinate, yCoordinate);
                break;
            case "Aim":
                this.ClearScreen();
                this.canvasContext.fillRect(this.currentX - 1, this.currentY - 1, 3, 3);
                var endX = Math.round(this.currentX + this.AimLength * Math.sin(this.aimAngle));
                var endY = Math.round(this.currentY - this.AimLength * Math.cos(this.aimAngle));
                this.DrawLine(this.currentX, this.currentY, endX, endY);
                break;
            case "Launch":
                if (!this.showPath) {
                    this.ClearScreen();
                }
                this.canvasContext.fillRect(Math.round(this.currentX), Math.round(this.currentY), 1, 1);
                break;
        }
    };
    Game.prototype.DrawMenu = function () {
        this.canvasContext.font = "8px 'Press Start 2P'";
        this.canvasContext.fillText("MORTLE", 24, 12);
        this.canvasContext.fillText("New Game", 4, 24);
        this.canvasContext.fillText("Continue", 4, 32);
    };
    Game.prototype.DrawWin = function () {
        this.canvasContext.font = "8px 'Press Start 2P'";
        this.canvasContext.fillText("You Win!", 16, 12);
        this.canvasContext.fillText("Press any", 4, 24);
        this.canvasContext.fillText("key to", 4, 32);
        this.canvasContext.fillText("return to", 4, 40);
        this.canvasContext.fillText("menu", 4, 48);
    };
    Game.prototype.DrawLevel = function () {
        var level = levels[this.currentLevel];
        for (var y in level) {
            for (var x in level[y]) {
                if (level[y][x]) {
                    this.canvasContext.fillRect(Number(x) * 5, Number(y) * 5, 5, 5);
                }
            }
        }
        this.DrawDoor();
    };
    Game.prototype.DrawDoor = function () {
        this.canvasContext.strokeRect(90.5, 55.5, 4, 4);
        this.canvasContext.fillRect(93, 57, 1, 1);
    };
    Game.prototype.ClearScreen = function () {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
    };
    Game.prototype.SaveToBackground = function () {
        this.canvas.style.background = "url(" + this.canvas.toDataURL() + ")";
    };
    Game.prototype.GetLevelFromCookie = function () {
        var currentLevel = Cookies.get(this.levelCookie);
        if (currentLevel) {
            var numberLevel = Number(currentLevel);
            if (numberLevel > 0 && numberLevel < levels.length) {
                return numberLevel;
            }
        }
        return 0;
    };
    Game.prototype.HandleKeyDown = function (ev) {
        switch (this.gameState) {
            case "Menu":
                switch (ev.keyCode) {
                    case 38: // Up
                        this.menuState = "New Game";
                        break;
                    case 40: // Down
                        this.menuState = "Continue";
                        break;
                    case 39: // Right
                    case 32: // Space
                    case 13: // Enter
                        this.nextState = "Aim";
                        if (this.menuState == "New Game") {
                            this.nextLevel = 0;
                        }
                        else {
                            this.nextLevel = this.GetLevelFromCookie();
                        }
                        break;
                }
                break;
            case "Aim":
                switch (ev.keyCode) {
                    case 37: // Left
                        this.aimAngle -= this.AngleDelta;
                        break;
                    case 39: // Right
                        this.aimAngle += this.AngleDelta;
                        break;
                    case 38: // Up
                    case 32: // Space
                    case 13: // Enter
                        this.nextState = "Launch";
                        this.velocityX = Math.sin(this.aimAngle);
                        this.velocityY = -Math.cos(this.aimAngle);
                        break;
                }
                break;
            case "Win":
                this.nextState = "Menu";
                break;
        }
    };
    Game.prototype.CheckCollision = function (x, y) {
        x = Math.round(x);
        y = Math.round(y);
        if (x < 0) {
            return true;
        }
        if (x >= 95) {
            return true;
        }
        if (y < 0) {
            return true;
        }
        if (y >= 60) {
            return true;
        }
        var level = levels[this.currentLevel];
        return level[Math.floor(y / 5)][Math.floor(x / 5)] == 1;
    };
    Game.prototype.AdvanceToNextLevel = function () {
        this.nextState = "Aim";
        this.nextLevel = this.currentLevel + 1;
        this.aimAngle = 0;
        this.currentX = 2;
        this.currentY = 58;
        if (this.nextLevel >= levels.length) {
            this.nextState = "Win";
            return;
        }
        Cookies.set(this.levelCookie, String(this.nextLevel), { expires: 99999 });
    };
    Game.prototype.InvertPixel = function (x, y) {
        if (this.invertBarrel && this.CheckCollision(x, y)) {
            this.canvasContext.fillStyle = "white";
            this.canvasContext.fillRect(x, y, 1, 1);
            this.canvasContext.fillStyle = "black";
        }
        else {
            this.canvasContext.fillStyle = "black";
            this.canvasContext.fillRect(x, y, 1, 1);
        }
    };
    Game.prototype.DrawLine = function (x0, y0, x1, y1) {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;
        while (true) {
            this.InvertPixel(x0, y0);
            if ((x0 === x1) && (y0 === y1))
                break;
            var e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    };
    Game.prototype.GetYCoordinateFromMenuState = function (menuState) {
        switch (menuState) {
            case "New Game":
                return 24;
            case "Continue":
                return 32;
        }
    };
    return Game;
}());
window.onload = function () {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
    if (context) {
        var contextNotNull_1 = context;
        WebFont.load({
            google: { families: ['Press Start 2P'] },
            active: function () {
                var game = new Game(canvas, contextNotNull_1);
                game.Start();
            }
        });
    }
};
//# sourceMappingURL=game.js.map