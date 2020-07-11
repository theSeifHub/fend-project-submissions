# Classic Arcade Game

**Third project submission in FEND**

## Table of Contents

- [Project Overview](#project-overview)
- [Udacity Instructions](#udacity-instructions)
- [Running the Game](#running-the-game)
- [How to Play](#game-functionality-how-to-play)

## Project Overview

Provided are visual assets and a game loop engine; using these tools you must add a number of entities to the game including the player characters and enemies to recreate the classic arcade game Frogger.

## Udacity Instructions

Make sure the functions you write are **object-oriented** - either class functions (like `Player` and `Enemy`) or class prototype functions such as `Enemy.prototype.checkCollisions`. Also make sure that the keyword `this` is used appropriately within your class and class prototype functions to refer to the object the function is called upon.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## Running the Game

- To run the game, open index.html in your browser.
- To reset the game, press F5.

## Game Functionality: How to Play

In this game you have a Player and Enemies (bugs). The goal of the player is to reach the water, eventually to move all the characters across the stone blocks to the water stream, without colliding into any one of the enemies.

- Use the arrow keys to move the player left, right, up and down
- Avoid the enemy bugs moving at varying speeds on the paved block portion of the game board
- Once a character collides with an enemy bug, the character moves back to the starting square
- You win when the princess (i.e. the last character) reaches the water side

  **Get starter code from [this repo](https://github.com/udacity/frontend-nanodegree-arcade-game).**
