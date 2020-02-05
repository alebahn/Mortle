class Game
{
  private _canvasContext : CanvasRenderingContext2D;

  constructor(canvasContext : CanvasRenderingContext2D, width: number, height: number)
  {
    this._canvasContext = canvasContext;
    console.log(width);
    console.log(height);
  }

  public ShowMenu() : void
  {
    this._canvasContext.font = "8px 'Press Start 2P'";
    this._canvasContext.fillText("Hello World!", 10, 10);
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
    let contextNotNull = context;
    WebFont.load({
      google: {families: ['Press Start 2P']},
      active: function () {
        let game = new Game(contextNotNull, canvas.width, canvas.height);
        game.ShowMenu();
      }
    })
  }
}