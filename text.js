const TEXT = {
    scene0: {
        title: 'START',
        subtitle: 'Click START to begin your story in the Witch Prison'
    },
    scene1: {
        intro: 'Sherry Tachibana waits inside the prison cell.\n\nShe was born with strange strength magic. Earlier today, a plate shattered at dinner, and the jailers blamed her for it.\n\nFootsteps echo in the hallway. Someone is coming.',
        plateChoice: 'Broken Plate',
        plateMemory: 'A memory surfaces: Sherry holding an apple, then crushing it as if it were made of paper.',
        jailerDialogue: 'The jailer stops outside the cell door.\n\n"You broke the dinner plate. The warden ordered me to take you to solitary confinement."',
        powerChoice: 'Use strength magic',
        obeyChoice: 'Obey the jailer',
        obeyResult: 'Sherry lowers her hands and follows the jailer toward solitary confinement.'
    },
    scene2: {
        intro: 'Sherry is escorted out of her cell, walking down a narrow, dim corridor toward solitary confinement.\n\nFootsteps echo through the corridor, each step feeling heavier than the last.',
        spearHint: 'Leia\'s Simple Spear lies carelessly along the side of the corridor.',
        spearChoicePrompt: 'That is when Sherry notices it: a crude spear, carelessly placed along the side of the corridor.\n\n...Why would something like that be here?\n\nIt is within reach. If I act now...',
        attackChoice: 'Pick up the spear and attack the jailer',
        ignoreChoice: 'Ignore the spear and keep walking',
        ignoreResult: '...No. I should not act recklessly.\n\nSherry looks away from the spear and keeps walking. The corridor stretches ahead, leading deeper toward solitary confinement.'
    },
    scene3: {
        intro: 'Sherry is pushed into the solitary room by the guard.\n\nThe heavy iron door shuts behind her, and the lock clicks coldly into place. There are no windows here, only torchlight flickering across the stone walls.\n\nSeveral objects lie scattered across the tables: a hammer, an iron nail, old handcuffs, and a short blade.\n\nThese items might help her escape... or get her killed even faster. The guard patrols past the door every few moments. If Sherry wants to escape, she has to act before she is discovered.',
        patrol: 'The guard\'s footsteps pass outside the door.',
        guardCountdown: 'Guard patrol in',
        guardWatching: 'The guard is watching through the door.',
        guardLeft: 'The footsteps fade away. The guard has left.',
        caughtCrafting: 'The guard catches you making the key.',
        craftPaused: 'You stop working and hide the materials.',
        craftContinue: 'You continue working on the improvised key.',
        craftComplete: 'The improvised key is complete.',
        hammerStrike: 'Sherry swings the hammer at the lock.',
        hammerNoise: 'The broken lock crashes to the floor. The noise echoes through the cell.',
        escapeWithKey: 'The improvised key turns inside the lock. Sherry holds her breath and opens the only way out.',
        inventoryTitle: 'Backpack',
        closeInventory: 'Close',
        craftButton: 'Craft Improvised Key',
        itemLabels: {
            hammer: 'Hammer',
            handcuffs: 'Handcuffs',
            nail: 'Iron Nail',
            dagger: 'Short Blade',
            lock: 'Door Lock',
            backpack: 'Backpack',
            craftedKey: 'Improvised Key'
        },
        hover: {
            dagger: 'A short blade. Dangerous, but tempting.',
            nail: 'A rusty iron nail. It might be useful later.',
            handcuffs: 'An old pair of handcuffs, slightly bent out of shape.',
            hammer: 'A heavy hammer. With Sherry\'s strength, it might break something.',
            lock: 'The lock on the solitary room door. It blocks the only way out.',
            backpack: 'Open the backpack.',
            craftedKey: 'A rough improvised key.'
        },
        prompts: {
            dagger: 'The blade feels light in Sherry\'s hand. If the guard comes close, she could strike.',
            nail: 'This nail does not seem useful on its own. Maybe Sherry should keep it for now.',
            handcuffs: 'The handcuffs are bent, but the metal is still sturdy.',
            hammer: 'The hammer has a useful weight. Sherry could risk smashing the lock, or keep it for later.',
            hammerHeld: 'The hammer is already in the backpack. Sherry can still use it to smash the lock.',
            lockNoKey: 'The lock is sturdy. Sherry cannot open it with her bare hands.',
            keyHeld: 'The improvised key might open the door lock.'
        },
        choices: {
            daggerAttack: 'Use magic and strike the guard.',
            daggerLeave: 'Put the blade down.',
            putInBackpack: 'Put it in the backpack',
            hammerSmash: 'Smash the lock with the hammer.',
            hammerStore: 'Put the hammer in the backpack.',
            unlockWithKey: 'Unlock the door with the key.'
        },
        scene4Title: 'Escape Route',
        scene4Message: 'Sherry escapes the solitary room. The next part of the escape route is waiting to be built.'
    },
    scene4: {
        sequence: [
            'Sherry finally escapes from the prison.',
            'Congratulations. You have escaped the Witch Prison.',
            'But Sherry still cannot return to human society.',
            'Her strange strength magic is too dangerous. Even a small accident could hurt someone.',
            'So for now, she must remain on Witch Island.',
            'To be continued...'
        ],
        title: 'Good Ending',
        returnPrompt: 'Click anywhere to return to the main menu'
    },
    badEndHints: {
        default: 'Sometimes failure is just part of the journey.',
        magic: 'Maybe raw strength isn\'t always the smartest solution.',
        spear: 'You didn\'t really think a simple spear could take down a guard, did you?',
        hammer: 'Brute force won\'t solve everything. Try thinking more carefully.',
        shortsword: 'You seriously thought a short sword would be enough to defeat a guard?',
        craftingCaught: 'Try crafting while avoiding the guard\'s patrol.'
    }
};
