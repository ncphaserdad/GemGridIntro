import "./styles.css";
import Phaser from "phaser";

const gameState = {
  onColor: 0xaaffaa,
  offColor: 0xffaaaa,
  rect: []
};

const stones = ['amber', 'amethyst', 'aquamarine', 'citrine', 'crystal' , 'pyramid'];

const NUM_X_CELLS = 10;
const NUM_Y_CELLS = 10;
const SCREEN_HEIGHT = 1000;
const SCREEN_WIDTH = 1000;
const GEM_SIZE = SCREEN_WIDTH / NUM_X_CELLS;

var container;
var rnd = new Phaser.Math.RandomDataGenerator();

function preload ()
{
    //this.load.image('lemming', 'src/amber.png', 32, 32);
    this.load.image('amber', 'src/gems/amber.png');
    this.load.image('amethyst', 'src/gems/amethyst.png');
    this.load.image('aquamarine', 'src/gems/aquamarine.png');
    this.load.image('citrine', 'src/gems/citrine.png');
    this.load.image('crystal', 'src/gems/crystal.png');
    this.load.image('pyramid', 'src/gems/pyramid.png');
    this.load.image('pyramid', 'src/gems/pyramid.png');

    container = this.add.container(0,0);
 
}


function generateGem(scene, x,y)
{
  var gem = scene.add.sprite(x * GEM_SIZE,y * GEM_SIZE, 'amber')
      gem.setDisplaySize(GEM_SIZE,GEM_SIZE);
      gem.setInteractive();
      gem.on("pointerup", function() {
        var rnd = new Phaser.Math.RandomDataGenerator();

        //Let's get a random number from the stones array in the range starting at 1 to the last element in the array
        var stone = rnd.integerInRange(1, stones.length-1);
        console.log(stone);
          this.setTexture(stones[stone]);
      });
    return gem;

}

function create()
{
  
  var allGems = [];
  
  
  for (var x = 1; x < NUM_X_CELLS; x++) {
    
    //Max Y size
    for (var y = 1; y < NUM_Y_CELLS; y++) {
      //Log x and y to the console
      console.log("x=" + x + ", y=" + y);
      
      var newGem = generateGem(this,x,y);

      allGems.push(newGem);
    }
  }

  container.add(allGems);

}


function create2() {
  //Max X size
  for (var x = 1; x < NUM_X_CELLS; x++) {
    gameState.rect.push([]);
    gameState.rect[x] = new Array();
    //Max Y size
    for (var y = 1; y < NUM_Y_CELLS; y++) {
      //Log x and y to the console
      console.log("x=" + x + ", y=" + y);

      //create a rectangle at the given x and y with width of 50 and height of 50
      //draw it to the screen
      //store the created rectangle state in a 2 dimensional array at position x, y

      gameState.rect[x][y] = this.add.rectangle(
        x * 50,
        y * 50,
        50,
        50,
        gameState.onColor
      );

      //set the outline of the rectangle to a green color
      gameState.rect[x][y].setStrokeStyle(2, 0x1a65ac);

      // set gameState.rect2 as interactive here so we can listen for mouse clicks
      gameState.rect[x][y].setInteractive();

      //When the mouse pointer is released up change the color of the rectangle that is clicked
      //on to the opposite color
      //of the one it is currently set to.

      gameState.rect[x][y].on("pointerup", function() {
        if (this.fillColor === gameState.onColor)
          this.fillColor = gameState.offColor;
        else this.fillColor = gameState.onColor;
      });
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  backgroundColor: 0x333333,
  scene: {
    preload: preload,
    create: create
}
};

var game = new Phaser.Game(config);
