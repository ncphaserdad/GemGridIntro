
/*
Jewel images are not public domain and cannot be copied or used.
*/

import "./styles.css";
import Phaser from "phaser";



const stones = ['amber', 'amethyst', 'aquamarine', 'citrine', 'crystal' , 'pyramid'];

const TOP_STONE = 'amber';
const HIDDEN_STONES = ['citrine', 'crystal', 'gem'];

//GEM_SIZE = SCREEN_WIDTH / NUM_X_CELLS;

const NUM_X_CELLS = 5;
const NUM_Y_CELLS = 5;
const SCREEN_HEIGHT = 500;
const SCREEN_WIDTH = 500;
const GEM_SIZE = (SCREEN_WIDTH-100) / NUM_X_CELLS;

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
  //Let's get a random number index to pick a stone name from the HIDDEN_STONES array
  var stoneIndex = rnd.integerInRange(0, HIDDEN_STONES.length-1);
  console.log("stone index is " + stoneIndex);
  console.log("stone is " + HIDDEN_STONES[stoneIndex]);

  //Let's get a random number index for an X value
  var xIndex = rnd.integerInRange(1, NUM_X_CELLS);
  console.log("xIndex is " + xIndex);
  //Let's get a random number index for an Y value
  var yIndex = rnd.integerInRange(1, NUM_Y_CELLS);
  console.log("yIndex is " + yIndex);

  //Retrieve the gemState and set it to the new name!
  var retrieveGem = gemStates.get(xIndex + ":" + yIndex);
  retrieveGem.gem = HIDDEN_STONES[stoneIndex];

}


function generateGem(scene, x,y)
{
      var gem = scene.add.sprite(x * GEM_SIZE,  y * GEM_SIZE, TOP_STONE)
      gem.setDisplaySize(GEM_SIZE,GEM_SIZE);
      gem.setInteractive();
      gem.on("pointerup", function() 
      {
        var clickedGem = gemStates.get(x+":"+y);
      
        console.log("clickedGem:"+x+":"+y+":"+clickedGem.gem);
          
          this.setTexture(clickedGem.gem);
      });
    return gem;

}

function create()
{
  
  var allGems = [];
  
  for (var x = 1; x <= NUM_X_CELLS; x++) {
    
    //Max Y size
    for (var y = 1; y <= NUM_Y_CELLS; y++) {
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
