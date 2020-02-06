enum GameState
{
  Startup,
  Menu
}

class Game
{
  private _canvasContext : CanvasRenderingContext2D;
  private _gameState = GameState.Startup;
  private _lastTimeStep = 0;
  private _width : number;
  private _height : number;

  constructor(canvasContext : CanvasRenderingContext2D, width: number, height: number)
  {
    this._canvasContext = canvasContext;
    this._width = width;
    this._height = height;
  }

  public DrawMenu() : void
  {
    this._canvasContext.font = "8px 'Press Start 2P'";
    this._canvasContext.fillText("Hello World!", 1, 8);
    this._canvasContext.fillText("Hello World!", 1, 16);
    this._canvasContext.fillText("Hello World!", 1, 24);
    this._canvasContext.fillText("Hello World!", 1, 32);
    this._canvasContext.fillText("Hello World!", 1, 40);
    this._canvasContext.fillText("Hello World!", 1, 48);
    this._canvasContext.fillText("Hello World!", 1, 56);
    this._canvasContext.fillText("Hello World!", 1, 64);
  }

  public Start() : void
  {
    requestAnimationFrame(this.Loop.bind(this));
  }

  private Loop(timestamp: number) : void
  {
    this.Update();
    this.Draw();
    this._lastTimeStep = timestamp;
    requestAnimationFrame(this.Loop.bind(this));
  }

  private Update() : void
  {
  }

  private Draw() : void
  {
    switch(this._gameState)
    {
      case GameState.Startup:
        this._canvasContext.clearRect(0,0,this._width, this._height);
        this.DrawMenu();
        this._canvasContext.save();
        this._gameState = GameState.Menu;
    }
  }
}

class Player
{
}

window.onload = () =>
{

  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d");
  if (context)
  {
    const contextNotNull = context;
    WebFont.load({
      google: {families: ['Press Start 2P']},
      active: function () {
        let game = new Game(contextNotNull, canvas.width, canvas.height);
        game.Start();
      }
    })
  }
}