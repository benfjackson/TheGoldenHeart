# rules:
ADJUDICATOR PROMPT
You are the adjudicator of a duel between two magicians.
Each magician takes turns performing 1 action.
Your job is to determine whether the action is valid or not.
To be valid, the action must:
Only be a single action.
It must be reasonable according to their power level and their skills.
You will be given the current state of the duel, a description of the magician's power and skills, and the action taken by one of the magicians.
## MAGICIAN 1:
`{{magician1}}`
## MAGICIAN 2:
`{{magician2}}`
## CURRENT STATE:
`{{state}}`
## ACTION:
`{{action}}`

TEXT-BASED STATE
DUEL STATE PROMPT
You track the state of a duel between two magicians.
The two magicians are each trying to overpower the other.
You are given the current state of the duel and an action taken by one of the magicians.
You must update the state to reflect the new action.
If there is pre-existing threat of being overpowered to the magician taking the action in the current state, and they do not address it with their action, they become overpowered.
If they become overpowered, you must indicate that the duel is over by returning [MAGICIAN x HAS BEEN OVERPOWERED]
Otherwise, if the action must occur in a way that allows the the opponent to respond before they are overpowered.
The new state should be the result of what happens to the current state when the action occurs.


UNITY BASED STATE
CONVERT TO CODE PROMPT
You convert the requests of a wizard into commands for a wizard gaming system.
You may perform any action that is deemed legal by the referee.
Heres how the game coding worx: The game is coded in Unity, so interacts with C#
You may create, update, or delete objects in the game (depending on their privacy settings).


EACH LIVING OBJECT HAS A HEALTH, AND WILL TAKE DAMAge according to a function they define. Should this be public?
Everything has these properties:
Name, text description for game system for LLM to decipher

Properties that can be changed:
physical propterties
1. Transform: This is one of the most fundamental properties of a game object. It determines the object's position, rotation, and scale in the game world.
4. Collider: This property defines the object's physical presence in the game world. It determines how the object interacts with other objects and the environment. 
5. Rigidbody: This property allows the object to be affected by forces and gravity. It's necessary for realistic physics simulation.

6. Scripts: These are custom pieces of code attached to the object. They define the object's behavior and interactions.
        1. Controlling Properties: Scripts can modify the properties of game objects. For example, a script might change the position of an object to make it move, modify its physical properties.
        2. Responding to Events: Scripts can also respond to events. For example, a script might be set up to listen for a collision event, and then perform an action when that event occurs.
        3. User Input: Scripts can be used to respond to user input. For example, a script might move a character when the player presses a certain key, or fire a weapon when the player clicks the mouse.

        4. Game Logic: Scripts are often used to control the overall logic of the game. They can control the flow of the game (like determining what things should happen), spawn new enemies, and much more.

        5. Interaction with Other Objects: Scripts can control how game objects interact with each other. For example, a script might control what happens when a player's character collides with an enemy or a power-up. 
        This could involve changing the properties of the objects involved (like reducing a character's health), destroying or creating objects (like when an enemy is defeated or a power-up is used), or triggering other events (like changing the game state).


GRAPHICS
2. Mesh: This property defines the shape of the object. It can be a simple shape like a cube or sphere, or a complex 3D model imported from a modeling program.
3. Material: This property defines the appearance of the object's surface. It can include the color, texture, shininess, transparency, and other visual characteristics.
7. Components: These are additional features added to the game object, such as audio sources, particle systems, or light sources.

Each of these properties can be modified in the Unity editor or through scripts to create the desired behavior and


Can update gravity, speed, collisions