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

function preload ()
{
    //this.load.image('lemming', 'src/amber.png', 32, 32);
    this.load.image('amber', 'src/gems/amber.png', 32, 32);
    this.load.image('amethyst', 'src/gems/amethyst.png', 32, 32);
    this.load.image('aquamarine', 'src/gems/aquamarine.png', 32, 32);
    this.load.image('citrine', 'src/gems/citrine.png', 32, 32);
    this.load.image('crystal', 'src/gems/crystal.png', 32, 32);
    this.load.image('pyramid', 'src/gems/pyramid.png', 32, 32);
    this.load.image('pyramid', 'src/gems/pyramid.png', 32, 32);
 
}

function create1()
{
    //  Our container
    var container = this.add.container(400, 300);

    //  Add some sprites - positions are relative to the Container x/y
    var sprite0 = this.add.sprite(0, 0, 'lemming');
    var sprite1 = this.add.sprite(-100, -100, 'lemming');
    var sprite2 = this.add.sprite(100, -100, 'lemming');
    var sprite3 = this.add.sprite(100, 100, 'lemming');
    var sprite4 = this.add.sprite(-100, 100, 'lemming');

    container.add(sprite0);
    container.add(sprite1);
    container.add(sprite2);
    container.add(sprite3);
    container.add(sprite4);

    //  You could also pass them in as an array, to save doing them one by one

    this.tweens.add({
        targets: container,
        angle: 360,
        duration: 6000,
        yoyo: true,
        repeat: -1
    });
}

function resizeChildren(children, width, height)
{

  for (var i=0; i< children.length; i++)
  {
    children[i].setDisplaySize(width, height);
    //children[i].height = 30;
  }

}

function create6(){


  var blocks = this.add.group({ key: 'lemming' , repeat: 15});

  resizeChildren(blocks.getChildren(), 50,50);


  Phaser.Actions.GridAlign(blocks.getChildren(), {
      width: 4,
      height: 4,
      cellWidth: 60,
      cellHeight: 60,
      x: 100,
      y: 100
  });

  //console.log(blocks.getChildren());

}

function create8 ()
{
    //  Our container
    var container = this.add.container(400, 300);

    //  Create some sprites - positions are relative to the Container x/y
    var sprite0 = this.add.sprite(-400, 0, 'lemming');
    var sprite1 = this.add.sprite(0, 0, 'lemming');
    var sprite2 = this.add.sprite(400, 0, 'lemming');
    var sprite3 = this.add.sprite(-200, -200, 'lemming');
    var sprite4 = this.add.sprite(200, -200, 'lemming');
    var sprite5 = this.add.sprite(200, 200, 'lemming');
    var sprite6 = this.add.sprite(-200, 200, 'lemming');

    container.add([ sprite0, sprite1, sprite2, sprite3, sprite4, sprite5, sprite6 ]);

   /* this.tweens.add({
        targets: container,
        angle: { value: 360, duration: 6000 },
        scaleX: { value: 0.5, duration: 3000, yoyo: true, ease: 'Quad.easeInOut' },
        scaleY: { value: 0.5, duration: 3000, yoyo: true, ease: 'Quad.easeInOut' },
        repeat: -1
    });*/
}

function create()
{
  var container = this.add.container(0,0);
  var allGems = [];
  for (var x = 1; x < NUM_X_CELLS; x++) {
    
    //Max Y size
    for (var y = 1; y < NUM_Y_CELLS; y++) {
      //Log x and y to the console
      console.log("x=" + x + ", y=" + y);
      var gem = this.add.sprite(x * 50,y * 50, 'amber')
      gem.setDisplaySize(50,50);
      gem.setInteractive();
      gem.on("pointerup", function() {
        var rnd = new Phaser.Math.RandomDataGenerator();
        var stone = rnd.integerInRange(0, stones.length-1);
        console.log(stone);
          this.setTexture(stones[stone]);
      });
      allGems.push(gem);
      //container.add(gem);
    }
  }

  container.add(allGems);
  //container.setActive(true);

  

  /*this.tweens.add({
    targets: container,
    angle: 360,
    duration: 6000,
    yoyo: true,
    repeat: -1  
});*/




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
  width: 500,
  height: 500,
  backgroundColor: 0x333333,
  scene: {
    preload, create
  }
};

const game = new Phaser.Game(config);
