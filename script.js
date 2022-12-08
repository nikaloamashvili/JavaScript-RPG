let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "go to cave", "flght dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "you are in town squre , you see sign that says 'store'"
  },
  {
    name: "store",
    "button text": [" buy 10 health (10 gold)", "buy weapon (30 gold)", "Go to town squre"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "you enter the store"
  },
  {
    name: "cave",
    "button text": ["flight slime", "flight beast", "Go to town squre"],
    "button functions": [flightSlime, flightBeast, goTown],
    text: "you enter the cave. you see some monsters!"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "you are fighting a monsters!"
  }, {
    name: "kill monster",
    "button text": ["go town", "go town!", "go town!!"],
    "button functions": [goTown, goTown, goTown],
    text: "you are awsome you killed the monster and get xppp!"
  }, {
    name: "lose",
    "button text": ["replay", "replay!", "replay!!"],
    "button functions": [restart, restart, restart],
    text: "you lose): you fucking looserr!"
  }, {
    name: "win",
    "button text": ["replay", "replay!", "replay!!"],
    "button functions": [restart, restart, restart],
    text: "you winn): you fucking winnerrr!"
  }]

const weapons = [
  {
    name: "stick",
    power: 5
  }, {
    name: "dagger",
    power: 30
  }, {
    name: "claw hammer",
    power: 50
  }, {
    name: "sword",
    power: 100
  },
]

let monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged best",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]



// initialze buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations) {
  monsterStats.style.display = "none";
  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button3.innerText = locations["button text"][2];
  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  button3.onclick = locations["button functions"][2];
  text.innerText = locations.text
}


function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
  console.log("going to Cave.")

}



function buyHealth() {
  if (gold > 9) {
    gold = gold - 10;
    health = health + 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    alert("you dont have the mount of gold")
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      goldText.innerText = gold;
      currentWeapon++;
      inventory.push(weapons[currentWeapon]);
      text.innerText = "you get a " + weapons[currentWeapon].name + ".";
      text.innerText += "in your inventory you have " + inventory;
    } else {
      alert("you dont have the mount of gold")
    }
  } else {
    alert("you mother fucker is reach you cant buy more")
    button2.innerText = "sell weopon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); // ze pnimi bilvad biglal shze let
    text.innerText = " you sold a " + currentWeapon + ".";

  } else {
    alert("dont sell lest weeopon")
  }

}

function flightSlime() {
  fighting = 0;
  goFight();

}
function flightBeast() {
  fighting = 1;
  goFight();


}

function fightDragon() {
  fighting = 2;
  goFight();

}
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;



}
function attack() {
  text.innerText = "the " + monsters[fighting].name + " attacs";
  text.innerText += "you attack with " + weapons[currentWeapon].name + " .";
  health -= getMonsterAttackValue(monsters[fighting].level);
  healthText.innerText = health;
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {

    lose();
  } else if (monsterHealth <= 0) {


    if (fighting == 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

}

function dodge() {
  text.innerText = "you dodge the attack of " +
    monsters[fighting].name + ".";

}
function lose() {

  update(locations[5]);
}

function winGame() {
  update(locations[6]);

}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  fighting;
  monsterHealth;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();

}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;

}




