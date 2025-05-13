let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];


const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterNameText");
const monsterHealthText = document.getElementById("monsterHealthText");

const weapons = [
     {
          name: "Stick",
          power: 2
     },
     {
          name: "Dagger",
          power: 25
     },
     {
          name: "Steel Mace",
          power: 50
     },
     {
          name: "Excaliburnz",
          power: 150
     }
];

const minions = [
     {
          name: "Imps",
          level: 5,
          health: 50
     },
     {
          name: "Cultist",
          level: 15,
          health: 300
     },
     {
          name: "Ignil the tyrant",
          level: 30,
          health: 300
     }
];



const locations = [
     {
          name: "town square",
          "button text": ["STORE", "Ignil's Cave", "Fight Dragon"],
          "button functions": [goStore, goCave, fightDragon],
          text: "You have arrived in the town square! "
     },
     {
          name: "STORE",
          "button text": ["Buy 10 health (5 Gold)", "Open weapon crate (25 gold)", "Exit to town..."],
          "button functions": [buyHealth, buyWeapon, goTown],
          text: "You enter the store... "
     },
     {
          name: "Cave",
          "button text": ["Fight Imps", "Fight Cultist", "Exit to Town"],
          "button functions": [fightImps, fightCultist, goTown ],
          text: "You have entered the cave! You are interrupted by Ignil's minions... "
     },
     {
          name: "Fight",
          "button text": ["Attack", "Defend", "Escape"],
          "button functions": [attack, defend, goTown],
          text: "You have engaged in combat with a monster! "
     },
     {
          name: "kill monster",
          "button text": ["Go to Town", "Go to Town", "Go to Town"],
          "button functions": [goTown, goTown, goTown],
          text: "You have slain one of Ignil's minions! "
     },
     {
          name: "lose",
          "button text": ["REVIVE?", "REVIVE?", "REVIVE?"],
          "button functions": [restart, restart, restart],
          text: "YOU DIED... "
     },
     {
          name: "win",
          "button text": ["RERUN?", "RERUN?", "RERUN?"],
          "button functions": [restart, restart, restart],
          text: "YOU HAVE SLAIN IGNIL THE TYRANT! "

     }
];


button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
     monsterStats.style.display = "none";
     button1.innerText = location["button text"][0];
     button2.innerText = location["button text"][1];
     button3.innerText = location["button text"][2];
     button1.onclick = location["button functions"][0];
     button2.onclick = location["button functions"][1];
     button3.onclick = location["button functions"][2];
     text.innerText = location.text;
}

function goTown () {
     update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
     update(locations[2]);
}

function buyHealth () {
     if (gold >= 5) {
          gold -= 5;
          health += 10;
          goldText.innerText = gold;
          healthText.innerText = health;
     } else {
     text.innerText = "You do not have enough gold to buy a health potion! ";
     }
}

function buyWeapon () {
     if (currentWeapon < weapons.length - 1) {
          if (gold >= 25) {
               gold -= 25;
               currentWeapon++;
               goldText.innerText = gold;
               
               let newWeapon = weapons[currentWeapon].name;
               text.innerText = "You now have a " + newWeapon + ".";
               inventory.push(newWeapon);
               text.innerText = "Your inventory currently contains: " + inventory;
          } else {
               text.innerText = "You do not have enough gold to buy a weapon... ";
          }
     } else {
          text.innerText = "You already have a stronger weapon... ";
          button2.innerText = "Sell weapon for 15 gold";
          button2.onclick = sellWeapon;
     }
}

function sellWeapon() {
     if (inventory.length > 1) {
          gold += 15;
          goldText.innerText = gold;
          let currentWeapon = inventory.shift();
          text.innerText = "You sold a " + currentWeapon + ".";
          text.innerText += "You currently have: " + inventory;
     } else {
          text.innerText = "This is the only weapon you have left! ";
     }
}

function fightImps() {
     fighting = 0;
     goFight();
}

function fightCultist() {
     fighting = 1;
     goFight();
}

function fightDragon() {
     fighting = 2;
     goFight();
}

function goFight() {
     update(locations[3]);
     monsterHealth = minions[fighting].health;
     monsterStats.style.display = "block";
     monsterNameText.innerText = minions[fighting].name;
     monsterHealthText.innerText = monsterHealth;
     console.log(fighting);
}


function attack() {
     text.innerText = "The " + minions[fighting].name + " attacks.";
     text.innerText += " You used your " + weapons[currentWeapon].name + " to deal damage! ";
     health -= minions[fighting].level;
     monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
     healthText.innerText = health;
     monsterHealthText.innerText = monsterHealth;
 
     if (health <= 0) {
         lose();
     } else if (monsterHealth <= 0) {
         if (fighting === 2) {
             win();
         } else {
             defeatMonster();
         }
     }
 }
 

function defend() {
     text.innerText = "You blocked the attack from " + minions[fighting].name + ".";
}

function lose() {
     update(locations[5]);
}

function win() {
     update(locations[6]);    
}

function defeatMonster() {
     gold += Math.floor(minions[fighting].level * 6.7);
     xp += minions[fighting].level;
     goldText.innerText = gold;
     xpText.innerText = xp;
     update(locations[4]);
}


function restart() {
      xp = 0;
      health = 100;
      gold = 50;
      currentWeapon = 0;
      inventory = ["stick"];
      goldText.innerText = gold;
      healthText.innerText = health;
      xpText.innerText= xp;
      goTown();
}
