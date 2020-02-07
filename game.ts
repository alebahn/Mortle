type GameState = "Startup" | "Menu";

const MenuOptions = ["New Game", "Continue"] as const;
type MenuOption = typeof MenuOptions[number];

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}

class Game {
  private canvasContext: CanvasRenderingContext2D;
  private gameState : GameState = "Startup";
  private nextState : GameState = "Startup";
  private lastTimeStep = 0;
  private width: number;
  private height: number;
  private background: ImageData;

  private menuState : MenuOption = "New Game";
  private oldMenuState : MenuOption = "New Game";

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

  private HandleKeyDown(ev: KeyboardEvent): void {
    switch (this.gameState) {
      case "Menu":
        switch (ev.keyCode)
        {
          case 38: // Up
            this.menuState = "New Game";
            break;
          case 40: // Down
            this.menuState = "Continue";
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

  private Draw(): void {
    if (this.gameState !== this.nextState) {
      switch (this.nextState) {
        case "Menu":
          this.canvasContext.clearRect(0, 0, this.width, this.height);
          this.DrawMenu();
          this.background = this.canvasContext.getImageData(0, 0, this.width, this.height);
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

class Player {
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