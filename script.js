let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterhealth;
let inventory = ["stick"];
console.log("Hello world");
/* retrieving a value from html element */
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xptext = document.querySelector("#xpText");
const healthtext = document.querySelector("#healthText");
const goldtext = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "you enter the town square. You see a sign that says \"Store.\""
  },
  {
    name: "store",
    "button text": ["Buy 10 health(10 gold)", "Buy weapon (30 gold)", "Go to town square"],
  "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
  "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
  name: "fight",
  "button text" : ["Attack","Dodge","Run"],
  "button functions": [attack, dodge, goTown],
    text: "You are fighting the monster"
  },

  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster dies! 'YAYYYY!' You gain XP and golds."
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. "
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the dragon! YOU WON!!! "
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You have found a secret game. Pick a number above. If the number chosen matches the random number, you win!"
  }
  
]


//initialise buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function buyHealth(){
  if (gold >=10){
  gold -= 10;
  health += 10;
  goldtext.innerText = gold;
  healthtext.innerText = health;
  } else {
    text.innerText = "You don't have enough gold "
  }
}

function buyWeapon(){
  if (currentWeapon < weapons.length -1){
  if (gold >= 30){
    gold -= 30;
    goldtext.innerText = gold;
    currentWeapon++;
    let newWeapon =      weapons[currentWeapon].name;
    text.innerText = "You now have a new weapon, " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += "In your inventory you have: " + inventory;
  }
else {
    text.innerText = "You don't have enough gold to buy a weapon.";
}
  }
  else{
    text.innerText = "You already have the most powerful weapon.";
    button2.innerText="sell weapon for 15 golds";
    button2.onclick = sellweapon;
  }}

function sellweapon(){
  if(inventory.length > 1){
    gold += 15;
    goldtext.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += "In your inventory you have: " + inventory;
  }
  else{
    text.innerText = "You can't sell your own weapon!";
  }
}

function goTown() {
    update(locations[0]);
}

function fightSlime(){
  fighting=0;
  goFight()
}
function fightBeast(){
  fighting=1;
  goFight();
}

function fightDragon(){
  fighting=2;
  goFight();
  }

function goFight(){
  update(locations[3])
  monsterHealth=monsters[fighting].health;
monsterStats.style.display="block";
monsterNameText.innerText=monsters[fighting].name;
monsterHealthText.innerText = monsterHealth;
}

function attack(){
  text.innerText = "The" + monsters[fighting].name + "attacks ";
  text.innerText += "You attack it with your" + weapons[currentWeapon].name + ".";
  
  if(isMonsterHit()){
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += "You miss.";
  }
  
  health -= getMonsterAttackValue(monsters[fighting].level);
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;;

  healthtext.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <=0){
    lose()
  } else if (monsterHealth <=0){
    fighting === 2 ? winGame() : defeatMonster();
    }

  if (Math.random() <= .1 && inventory.length != 1){
    text.innerText += "Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
  }

  function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
  }

  function isMonsterHit(){
    return Math.random() > .2 || health < 20;
  }

  function dodge(){
    text.innerText = "You dodge from the attack of " + monsters[fighting].name + " . ";  
  }

  function lose(){
    update(locations[5]);
  }

  function winGame(){
    update(locations[6]);
  }

  function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldtext.innerText = gold;
    xptext.innerText = xp;
    update(locations[4]);
  }

  function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    goldText.innerText = gold;
    healthtext.innerText = health;
    goTown();
  }

  function easterEgg(){
    update(locations[7]);
  }

  function pickTwo() {
    pick(2)
  }

  function pickEight(){
    pick(8)
  }

  function pick(guess){
    let numbers = [];
    while (numbers.length < 10){
    numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for(let i=0; i<10; i++){
      text.innerText += numbers[i] + "\n";
    }

    if(numbers.indexOf(guess) !== -1){
      text.innerText += "Right! You win 20 golds!";
      gold += 20;
      goldtext.innerText = gold;
    }
    else{
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthtext.innerText = health;
      if(health <= 0){
        lose();
      }
    }
  }