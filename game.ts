type GameState = "Startup" | "Menu" | "Aim";

const MenuOptions = ["New Game", "Continue"] as const;
type MenuOption = typeof MenuOptions[number];

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}

type Level = (0 | 1)[][];
// 12x8
const levels : [Level] = [
  [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0]
  ]
]

class Game {
  private canvasContext: CanvasRenderingContext2D;
  private gameState: GameState = "Startup";
  private nextState: GameState = "Startup";
  private lastTimeStep = 0;
  private width: number;
  private height: number;
  private background: ImageData;

  private menuState: MenuOption = "New Game";
  private oldMenuState: MenuOption = "New Game";

  private currentLevel: number = -1;
  private nextLevel: number = -1;

  private currentX : number = 4;
  private currentY : number = 63;
  private aimAngle : number = 0;

  constructor(canvasContext: CanvasRenderingContext2D, width: number, height: number) {
    this.canvasContext = canvasContext;
    this.width = width;
    this.height = height;
    this.background = new ImageData(width, height);
  }

  public DrawMenu(): void {
    this.canvasContext.font = "8px 'Press Start 2P'";
    this.canvasContext.fillText("MORTLE", 24, 12);

    this.canvasContext.fillText("New Game", 4, 24);
    this.canvasContext.fillText("Continue", 4, 32);
  }

  public DrawLevel(): void {
    const level = levels[this.currentLevel];
    for (let y in level) {
      for (let x in level[y]) {
        if (level[y][x]) {
          this.canvasContext.fillRect(Number(x)*8,Number(y)*8,8,8);
        }
      }
    }
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
            this.nextLevel = 0;
            break;
        }
        break;
    }
  }

  private HandleKeyUp(ev: KeyboardEvent): void {
  }

  public Start(): void {
    document.addEventListener("keydown", this.HandleKeyDown.bind(this));
    document.addEventListener("keyup", this.HandleKeyUp.bind(this));
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
    }
  }

  private Line(x0 : number, y0 : number, x1 : number, y1 : number) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.canvasContext.fillRect(x0, y0, 1, 1);

      if ((x0 === x1) && (y0 === y1)) break;
      var e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }

  private Draw(): void {
    if (this.gameState !== this.nextState) {
      switch (this.nextState) {
        case "Menu":
          this.canvasContext.clearRect(0, 0, this.width, this.height);
          this.DrawMenu();
          this.background = this.canvasContext.getImageData(0, 0, this.width, this.height);
          break;
        case "Aim":
          if (this.currentLevel !== this.nextLevel) {
            this.currentLevel = this.nextLevel;
            this.canvasContext.clearRect(0, 0, this.width, this.height);
            this.DrawLevel();
            this.background = this.canvasContext.getImageData(0, 0, this.width, this.height);
          }
          this.canvasContext.fillRect(this.currentX-1, this.currentY-1, 3, 3);
          this.Line(this.currentX, this.currentY, this.currentX, this.currentY - 6);
          //this.canvasContext.moveTo(this.currentX + .5, this.currentY + .5);
          //this.canvasContext.lineTo(this.currentX + .5 + 6 * Math.sin(this.aimAngle), this.currentY + .5 - 6 * Math.cos(this.aimAngle));
          this.canvasContext.stroke();
          break;
      }
      this.gameState = this.nextState;
    }

    switch (this.gameState) {
      case "Menu":
        const xCoordinate = 72;
        if (this.oldMenuState !== this.menuState) {
          const yCoordinateOld = this.GetYCoordinateFromMenuState(this.oldMenuState);
          this.canvasContext.fillStyle = "white";
          this.canvasContext.fillText("<", xCoordinate, yCoordinateOld);
          this.canvasContext.fillStyle = "black";
          this.oldMenuState = this.menuState;
        }
        const yCoordinate = this.GetYCoordinateFromMenuState(this.menuState);
        this.canvasContext.fillText("<", xCoordinate, yCoordinate);
        break;
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
        let game = new Game(contextNotNull, canvas.width, canvas.height);
        game.Start();
      }
    })
  }
}