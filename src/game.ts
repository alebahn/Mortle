type GameState = "Startup" | "Menu" | "Aim" | "Launch" | "Win";

const MenuOptions = ["New Game", "Continue"] as const;
type MenuOption = typeof MenuOptions[number];

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}

type Level = (0 | 1)[][];
// 19x12
const levels: Level[] = [
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]
  ],
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]
  ],
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
  ],
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
    [0,0,0,1,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,0,0,0],
    [0,1,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]
  ],
  [
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,1,1,0,0,0,0,0,0,1,0,1,1,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0],
    [0,1,1,0,0,1,1,1,1,1,1,0,1,1,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0,1,0,1,0,1,1,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0],
    [0,0,0,0,1,0,1,1,1,0,1,1,1,1,0,1,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1],
    [0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0]
  ],
  [
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,1,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]
  ],
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,0,0],
    [1,1,1,1,1,1,0,0,1,0,1,1,1,1,0,1,0,0,0],
    [0,0,0,0,0,1,1,0,1,0,0,1,0,0,0,1,0,0,0],
    [0,0,0,0,0,1,0,0,1,0,0,1,0,1,1,1,0,0,0],
    [0,0,1,1,0,1,0,1,1,0,0,1,0,0,0,1,0,0,0],
    [1,0,1,0,0,0,0,0,1,1,0,1,1,1,0,1,0,0,0],
    [0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0]
  ],
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0],
    [0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,0,1,1,0],
    [0,1,0,1,0,1,1,0,1,1,1,1,0,1,0,0,0,1,0],
    [0,0,0,1,0,1,0,0,1,0,0,0,0,1,1,0,0,1,0],
    [0,1,1,1,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0],
    [0,0,0,1,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]
  ],
  [
    [1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1],
    [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    [1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0],
    [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    [0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1],
    [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    [1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0],
    [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    [0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]
  ],
  [
    [1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
    [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0],
    [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0],
    [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
    [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0],
    [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
    [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
    [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
  ],
]

class Game {
  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private gameState: GameState = "Startup";
  private nextState: GameState = "Startup";
  private lastTimeStep = 0;
  private width: number;
  private height: number;

  // Menu Variables
  private menuState: MenuOption = "New Game";

  // Level Variables
  private readonly levelCookie = "CurrentLevel";
  private currentLevel: number = -1;
  private nextLevel: number = -1;

  // Aim Variables
  private readonly AimLength = 6;
  private readonly AngleDelta = Math.PI / 32;
  private aimAngle: number = 0;

  // Aim/Launch Variables
  private currentX: number = 2;
  private currentY: number = 58;

  // Launch Variables
  private readonly Gravity = 0.025;
  private readonly AirResistance = .9756;
  private velocityX: number = 0;
  private velocityY: number = 0;

  // Options
  private showPath = false;
  private invertBarrel = true;

  constructor(canvas: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  public Start(): void {
    document.addEventListener("keydown", this.HandleKeyDown.bind(this));
    requestAnimationFrame(this.Loop.bind(this));
  }

  private Loop(timestamp: number): void {
    this.Update();
    this.Draw();
    this.lastTimeStep = timestamp;
    requestAnimationFrame(this.Loop.bind(this));
  }

  private Update(): void {
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
          this.currentY = Math.round(this.currentY)-1;
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
  }

  private Draw(): void {
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
        const xCoordinate = 72;
        this.ClearScreen();
        const yCoordinate = this.GetYCoordinateFromMenuState(this.menuState);
        this.canvasContext.fillText("<", xCoordinate, yCoordinate);
        break;
      case "Aim":
        this.ClearScreen();
        this.canvasContext.fillRect(this.currentX - 1, this.currentY - 1, 3, 3);
        const endX = Math.round(this.currentX + this.AimLength * Math.sin(this.aimAngle));
        const endY = Math.round(this.currentY - this.AimLength * Math.cos(this.aimAngle));
        this.DrawLine(this.currentX, this.currentY, endX, endY);
        break;
      case "Launch":
        if (!this.showPath) {
          this.ClearScreen();
        }
        this.canvasContext.fillRect(Math.round(this.currentX), Math.round(this.currentY), 1, 1);
        break;
    }
  }

  private DrawMenu(): void {
    this.canvasContext.font = "8px 'Press Start 2P'";
    this.canvasContext.fillText("MORTLE", 24, 12);

    this.canvasContext.fillText("New Game", 4, 24);
    this.canvasContext.fillText("Continue", 4, 32);
  }

  private DrawWin(): void {
    this.canvasContext.font = "8px 'Press Start 2P'";
    this.canvasContext.fillText("You Win!", 16, 12);
    this.canvasContext.fillText("Press any", 4, 24);
    this.canvasContext.fillText("key to", 4, 32);
    this.canvasContext.fillText("return to", 4, 40)
    this.canvasContext.fillText("menu", 4, 48);
  }

  private DrawLevel(): void {
    const level = levels[this.currentLevel];
    for (let y in level) {
      for (let x in level[y]) {
        if (level[y][x]) {
          this.canvasContext.fillRect(Number(x) * 5, Number(y) * 5, 5, 5);
        }
      }
    }
    this.DrawDoor();
  }

  private DrawDoor(): void {
    this.canvasContext.strokeRect(90.5, 55.5, 4, 4);
    this.canvasContext.fillRect(93, 57, 1, 1);
  }

  private ClearScreen(): void {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
  }

  private SaveToBackground(): void {
    this.canvas.style.background = "url(" + this.canvas.toDataURL() + ")";
  }

  private GetLevelFromCookie(): number {
    const currentLevel = Cookies.get(this.levelCookie);
    if (currentLevel) {
      const numberLevel = Number(currentLevel);
      if (numberLevel > 0 && numberLevel < levels.length) {
        return numberLevel;
      }
    }
    return 0;
  }

  private HandleKeyDown(ev: KeyboardEvent): void {
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
            this.nextState = "Aim"
            if (this.menuState == "New Game") {
              this.nextLevel = 0;
            } else {
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
  }

  private CheckCollision(x: number, y: number): boolean {
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
    const level = levels[this.currentLevel];
    return level[Math.floor(y / 5)][Math.floor(x / 5)] == 1;
  }

  private AdvanceToNextLevel(): void {
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
  }

  private InvertPixel(x: number, y: number): void {
    if (this.invertBarrel && this.CheckCollision(x, y)) {
      this.canvasContext.fillStyle = "white";
      this.canvasContext.fillRect(x, y, 1, 1);
      this.canvasContext.fillStyle = "black";
    } else {
      this.canvasContext.fillStyle = "black";
      this.canvasContext.fillRect(x, y, 1, 1);
    }
  }

  private DrawLine(x0: number, y0: number, x1: number, y1: number): void {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.InvertPixel(x0, y0);

      if ((x0 === x1) && (y0 === y1)) break;
      var e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }

  private GetYCoordinateFromMenuState(menuState: MenuOption): number {
    switch (menuState) {
      case "New Game":
        return 24;
      case "Continue":
        return 32;
    }
  }
}

window.onload = () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d");
  if (context) {
    const contextNotNull = context;
    WebFont.load({
      google: { families: ['Press Start 2P'] },
      active: function () {
        let game = new Game(canvas, contextNotNull);
        game.Start();
      }
    });
  }
}