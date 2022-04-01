const { API_KEY } = require("./api-key");
const { Game, convertCoordsToBBoxes, Ready, GAME_STATE_PLAYER_DISCONNECT_SYMBOL } = require("@gathertown/gather-game-client");
const { setgroups, connected } = require("process");
global.WebSocket = require("isomorphic-ws");
//const SPACE_ID ="RB0G1NQQiIUCbMbX\\TinyDarkRawrficce"; // using a test space for now
//const SPACE_ID ="uIvp1FNSW9zq38BX\\AprilFools"; // using a test space for now
const SPACE_ID ="h1T9tnQFkQaXNYiM\\LeaveRoomForShenanigans"; // using a test space for now

//const MAP_ID = "office-tiny-dark" ;
//const MAP_ID = "custom-entrance" ;
const MAP_ID = "space-station-medium" ;

const { moveSyntheticComments } = require("typescript");
const game = new Game(SPACE_ID , () => Promise.resolve({apiKey: API_KEY}));
game.connect(); 
game.subscribeToConnection((connected) => console.log("connected?", connected));
//const buzzer = "https://cf-media.sndcdn.com/FEscXqeFFFgY.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vRkVzY1hxZUZGRmdZLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjQ4ODQ1ODg5fX19XX0_&Signature=EYxhVZo8Xyxyj56Lw8e6q8GBXvPWJNd9U-jfEHMufpUC1LwGLiW2ou4tXh0S9DYmK5L~hpCYv-foNwj9V5MtNrQnaaGbTtVnH93fIUVP15zflHKO6kwe3lmRyA1a6Fgiddr6BneBTJaW9fz6kEKxPnsjU~oJ5sjYy1Pg0jEUI1e9WQnQ5iJJ5jbAKmSGhAKp-M3axhOpQjjlqMtIKFshJz2epg1o9ZWt-a61u3ODg2Y6xhQ1HABQ1tjMXGPDZEb8J~s2yTyMVKcQfqVCtYCmBUSHdH99bUrIrFKF3zAI5tDMfiZURfJWhIrvW8L5y7nSJrG~l~Vy2s4NgIeVDBCJyQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ";
const changeSound ="https://firebasestorage.googleapis.com/v0/b/gather-town-dev.appspot.com/o/sounds%2Fwand.mp3.mp3?alt=media&token=96d63648-0e31-4dc0-aa8b-ffee0a216ffa";

game.subscribeToEvent("playerEntersWhisper", (data, context) => { //watch for bubble
    let playerOneId = context.playerId;
    let playerTwoId = context.player.whisperRecipient;
    let playerTwoClothes =game.getPlayer(playerTwoId).outfitString;
    let playerOneClothes = context.player.outfitString;
    let playerOneAffiliation = game.getPlayer(playerOneId).affiliation; 
    let playerTwoAffiliation = game.getPlayer(playerTwoId).affiliation;
    let playerOneName = game.getPlayer(playerOneId).name; 
    let playerTwoName = game.getPlayer(playerTwoId).name; 

    //check affiliations for if players can swap
    //if no, nothing, or error sound?
    if(playerOneId == playerTwoAffiliation || playerTwoId == playerOneAffiliation){
        return;
    }

    //if yes, swap clothes & animal crossing sound
    //p2 clothes and affiliation = p1 (string and uid)
    game.setOutfitString(playerTwoClothes, playerOneId);
    game.setAffiliation(playerTwoId, playerOneId);
    game.playSound(changeSound, 1, playerOneId);
    game.setName(playerTwoName, playerOneId);
    //p1 clothes and affiliation = p2
    game.setOutfitString(playerOneClothes, playerTwoId);
    game.setAffiliation(playerOneId, playerTwoId);
    game.playSound(changeSound, 1, playerTwoId);
    game.setName(playerOneName, playerTwoId);
  });