
/*
Jewels are not public domain and cannot be copied or used.
*/

import "./styles.css";
import Phaser from "phaser";

const gemState = {
  x: -1,
  y: -1,
  gemName: 'amber'
};

const stones = ['amber', 'amethyst', 'aquamarine', 'citrine', 'crystal' , 'pyramid'];

//GEM_SIZE = SCREEN_WIDTH / NUM_X_CELLS;

const NUM_X_CELLS = 11;
const NUM_Y_CELLS = 11;
const SCREEN_HEIGHT = 500;
const SCREEN_WIDTH = 500;
const GEM_SIZE = SCREEN_WIDTH / NUM_X_CELLS;

var gemStates = [];

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
