const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
let lastCommandUsed;

let config = {}
try{
  config = JSON.parse(fs.readFileSync('./config.json').toString());
} catch (err){
  console.error("Couldn\'t read config > n <");
  console.error(err);
  process.exit(1);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("cartoons!", {type: "WATCHING"});
});
 
client.on('message', msg => {
  if(msg.author === client.user){
    return;
  }
  if(msg.content.startsWith("!")){
    processCommand(msg);
    //if (msg.content === 'derp') {
      //msg.reply('meow');
   // }
  }
});

function processCommand(msg){
  let fullMessage = msg.content.toLowerCase();
  let bangFullMessage = fullMessage.substring(1);
  let splitMessage = bangFullMessage.split("/\s+/");
  let command = splitMessage[0].toLowerCase();
  let args = splitMessage.slice(1);

  if(lastCommandUsed === command){
    if(command !== "roll20"){
      return;
    }
  } else {
    lastCommandUsed = command;
  }

  if(command === "commands"){
    return msg.reply("All commands start with a bang aka exclamation point (!) --> `help`, my friends names and their nicknames, vegetables and fruits, food items in general, etc~~ :3");
  }

  if(command === "help"){
    return msg.reply("I don't know, I'm a cat. Purrhaps you could try therapy? Oh, were you looking for `!commands` ?");
  }
  
  if(command === "potato"){
    return msg.reply("They're a girl's favorite vegetabubble! And I call all my friends that =^u^=");
  }

  if(command === "niarbad" || command === "niar"){
    return msg.reply("I like this guy, he gives me headpats sometimes =^u^=");
  }

  if(command === "christian" || command === "chris"){
    return msg.reply("I like this guy, he's a cutie patootie =^u^=");
  }

  if(command === "sloa" || command === "jamie"){
    return msg.reply("I like this guy, he's a special potato who needs headpats of his own sometimes =^u^=");
  }

  if(command === "jami"){
    return msg.reply("Sounds like a guy who can't even spell his own name or something, I don't know =^u^=");
  }

  if(command === "cactus"){
    return msg.reply("They're my favorite plants when CactusMan is around =^u^=");
  }

  if(command === "cactusman" || command === "robin"){
   return msg.reply("I like this guy, he's helped me out in many aspects of my life especially with programming, nyan! =^u^=");
  }

  if(command === "jason"){
    return msg.reply("He's a potato :D");
  }
  
  if(command === "roll20"){
    let roll = getRndInteger(1,20);
    return msg.reply("Your roll was " + roll);
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
 
client.login('NjI3MjkzNzExMzY5MzcxNjU4.XY6jaQ.4BK2gxGx1WzcGTNopzn04NT9wnw');