## Tabs:
- Main
	- Stats
	- Skills
- Inventory
	- Player
		- Containers
		- Inventory (divided into category of items)
			- This is the items that the player will have "on them"
	- Storage (divided into category of items)
		- This is all of the items that the players owns and has put into storage *somewhere*
	- Transportation
- Combat
	- Easy skill buttons:
		- Melee
		- Accuracy
	- Weapons
	- Sync / Respawns
- Info
	- Account name
	- PFP
	- Group name
	- Aspects
	- Roles
- Spells

======

## Requirements:

Stats:
	- Needs to list all 6 of the primary stats
	- Needs to have a dropdown for to select a die
		- Nice to have: disables dice that have been selected in other stats
	- Needs to have a button to roll the stat (when a die is selected)
	- Foundry v12: ActiveEffect - Die needs to be able to be affected by ActiveEffects

Skills:
	- Each of the 25 skills needs to be grouped under a header of what stat it's
		associated with
	- Each skill must have a dropdown to indicate training level (null, trained,
		expert, locked)
	- Every skill must have a button to roll the dice that is labelled with the
		correct formula for that skill (or "Locked" if the skill is locked)
	- ActiveEffect - Increase Modifier
	- Foundry v12: ActiveEffect - Increase Training Level

Combat:
	- Two weapon slots for the equipped weapon(s)
	- A single armor slot
	- Quick-access to the Melee / Accuracy skills

Inventory:
	- Needs three sub-tabs:
		- Player
		- Storage
		- Transportation
	- Player Subtab:
		- Needs to have a section for container items, and indicating how many slots
			each one has.
		- List all of the items that the player has with the "inventory" location
		- Show the total number of items the player on their character and how many
			total slots are available
		- Needs some way to move items to a different storage area (embedded-only
			item sheet field maybe)
	- Storage Subtab:
		- List all of the items that the player has marked as in-storage
	- Transportation:
		- This is currently just a placeholder tab, no functionality needed other
			than existing

Spells:
	- Lists all spells on a page (sortable by: alphabetical, cost, etc.)

Info:
	- Needs a place to edit the actor's name
	- Needs a place to edit the actor's image
	- Needs a place to edit the group name (if enabled by the GM, or is the GM)
	- Needs a place to see and manage all equipped aspects
	- Needs a place to see and manage all equipped roles