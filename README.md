README 
A simple adventure game by KIRIKOMEOW

based on a simple adventure game engine by Adam Smith

Code requirements
4+ scenes based on AdventureScene
CellScene
CorridorScene
SolitaryRoomScene
EscapeScene

These scenes represent the main playable locations of the game and use the shared systems such as inventory, message box, and scene transitions.

2+ scenes not based on AdventureScene
PreloadScene
MenuScene
BadEndScene

These scenes handle loading assets, displaying the main menu, and showing ending animations.

2+ methods or other enhancement added to the adventure game engine
Enhancement 1: createInventoryBackground(width, height)

This method creates a reusable background for the inventory panel.
It allows all inventory UIs to use a consistent visual style without rewriting layout code in each scene.

Enhancement 2: showChoiceBox(text, choices)

This method simplifies creating dialogue choices.
Instead of manually creating buttons and layouts every time, scenes can call this function to display options with consistent formatting and interaction.

Experience requirements
4+ locations in the game world
Prison Cell (CellScene)
Prison Corridor (CorridorScene)
Solitary Room (SolitaryRoomScene)
Prison Exit (EscapeScene)

Each location represents a different stage of the escape process.

2+ interactive objects in most scenes

Example 1:
In the Solitary Room, the player can interact with:

hammer
handcuffs
nail
dagger
lock

Example 2:
In the Corridor scene, the spear is an interactive object that triggers a decision.

Many objects have pointerover messages

Example 1:
Hovering over the hammer shows a hint about its usefulness.

Example 2:
Hovering over the spear shows a warning message about danger.

These messages help guide the player without forcing decisions.

Many objects have pointerdown effects

Example 1:
Clicking the spear triggers a choice that can lead to a bad ending.

Example 2:
Clicking the hammer allows the player to smash the lock, which triggers animation and a bad ending.

Some objects are themselves animated

Example 1:
The lock shakes and changes texture when hit by the hammer.

Example 2:
The Bad End scene uses fade transitions between two images.

Asset sources
Backgrounds and character concepts are inspired by Magical Girl Witch Trial (魔法少女的魔女审判).
Some backgrounds were recreated or extended using AI tools based on this visual style.
Character sprites (Sherry) and overall setting are adapted from this game’s aesthetic and narrative inspiration.
UI elements and item textures (message box, backpack, buttons, items) were generated using AI image tools and adjusted for game use.
All dialogue and story writing were created by me.

Code sources
adventure.js and index.html were created by Adam Smith and modified by me.
game.js was originally sketched by Adam Smith and significantly rewritten and extended by me.

 
Future Improvements

In the future, this project may be further expanded with additional features:

Audio Integration
Background music and sound effects will be added to enhance immersion, including ambient sounds and feedback for interactions.
Chinese Language Support
A full Chinese version of the game will be implemented, allowing players to switch between English and Chinese for dialogue and UI text.
Further Content Expansion
Additional scenes, interactions, and possible branching endings may be added to deepen the gameplay experience.