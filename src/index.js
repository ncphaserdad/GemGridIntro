
/*
Jewel images are not public domain and cannot be copied or used.
*/

import "./styles.css";
import Phaser from "phaser";



const stones = ['amber', 'amethyst', 'aquamarine', 'citrine', 'crystal' , 'pyramid'];

const TOP_STONE = 'amber';
const HIDDEN_STONES = ['citrine', 'crystal', 'gem'];

//GEM_SIZE = SCREEN_WIDTH / NUM_X_CELLS;

const NUM_X_CELLS = 10;
const NUM_Y_CELLS = 10;
const SCREEN_HEIGHT = 500;
const SCREEN_WIDTH = 500;
const GEM_SIZE = SCREEN_WIDTH / NUM_X_CELLS;

let gemStates = new Map();

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
    this.load.image('zircon', 'src/gems/zircon.png');
    this.load.image('gem', 'src/gems/gem.png');

    container = this.add.container(0,0);
 
}

function hideJewels()
{
  var rnd = new Phaser.Math.RandomDataGenerator();

  //Let's get a random number from the stones array in the range starting at 1 to the last element in the array
  var stoneIndex = rnd.integerInRange(0, HIDDEN_STONES.length-1);
  console.log("stone index is " + stoneIndex);

  var xIndex = rnd.integerInRange(1, NUM_X_CELLS);
  var yIndex = rnd.integerInRange(1, NUM_Y_CELLS);

  var retrieveGem = gemStates.get(xIndex + ":" + yIndex);
  retrieveGem.gem = stones[stoneIndex];

}


function generateGem(scene, x,y)
{
      var gem = scene.add.sprite(x * GEM_SIZE,  y * GEM_SIZE, TOP_STONE)
      gem.setDisplaySize(GEM_SIZE,GEM_SIZE);
      gem.setInteractive();
      gem.on("pointerup", function() 
      {
        var clickedGem = gemStates.get(x+":"+y);
        console.log("clickedGem:"+clickedGem.gem);
          
          this.setTexture(clickedGem.gem);
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

      var currentState = {};
      currentState.x = x;
      currentState.y = y;
      currentState.gem = 'pyramid';
      gemStates.set(x+":"+y, currentState )

      allGems.push(newGem);
    }
  }

  console.log(gemStates);

  container.add(allGems);

  hideJewels();

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
