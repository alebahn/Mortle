class Game
{
  private _canvasContext : CanvasRenderingContext2D;

  constructor(canvasContext : CanvasRenderingContext2D)
  {
    this._canvasContext = canvasContext;
  }

  public ShowMenu() : void
  {
    this._canvasContext.fillStyle = 'rgb(200, 0, 0)';
    this._canvasContext.fillRect(10, 10, 50, 50);

    this._canvasContext.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this._canvasContext.fillRect(30, 30, 50, 50);
  }
}

class Player
{
}

window.onload = () =>
{

  let canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  let context = canvas.getContext("2d");
  if (context)
  {
    let game = new Game(context);
    game.ShowMenu();
  }
}