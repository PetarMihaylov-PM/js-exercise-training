You have initial health 100 and initial coins 0. You will be given a string, representing the dungeon's rooms. Each room is separated with '|' (vertical bar): "room1|room2|room3…"
Each room contains - an item or a monster; and a number. They are separated by a single space.
 ("item/monster number").
•	If the first part is "potion": 
o	You are healed with the number in the second part. However, your health cannot exceed your initial health (100). 
o	Print: `You healed for {healing-number} hp.`
o	After that, print your current health: `Current health: {number} hp.`
•	If the first part is "chest": 
o	You have found some coins, the number in the second part. 
o	Print: `You found {coins} coins.`
•	In any other case, you are facing a monster, you are going to fight. 
The second part of the room contains the attack of the monster, and the first the monster's name. You should remove the monster's attack from your health. 
o	If you are not dead (health > 0) you have slain the monster, and you should print: 
                                   `You slayed {monster-name}.`
o	If you have died, print: `You died! Killed by {monster-name}.` and your quest is over. 
Print the best room you`ve to manage to reach: `Best room: {room}`.
•	If you managed to go through all the rooms in the dungeon, print on the next three lines: 
"You've made it!"
 "Coins: {coins}"
 "Health: {health}"
Input
You receive one element- string, representing the dungeon's rooms, separated with '|' (vertical bar): "room1|room2|room3…".
Output
Print the corresponding messages, described above.
