/**
 * A tiny framework dedicated to tiny adventure games.
 *
 * `AdventureScene` is a Phaser scene that provides:
 *   - an inventory of named string items carried between scenes,
 *   - a transient message box for flavor text,
 *   - faded transitions between scenes,
 *   - a consistent UI layout with fullscreen support.
 *
 * Subclass it and implement {@link AdventureScene#onEnter} to build one
 * location of your adventure. Call the helper methods ({@link AdventureScene#showMessage},
 * {@link AdventureScene#gainItem}, {@link AdventureScene#gotoScene}, etc.) from
 * your interactive objects.
 *
 * @extends {Phaser.Scene}
 */
class AdventureScene extends Phaser.Scene {

    /**
     * Phaser lifecycle: receives data passed by `scene.start(key, data)`.
     * We use this to thread the inventory through scene transitions.
     *
     * @param {{inventory?: string[]}} data
     */
    init(data = {}) {
        this.inventory = data.inventory || [];
    }

    /**
     * @param {string} key  A unique Phaser scene key (e.g. `"tunnel"`).
     * @param {string} name A human-readable name shown in the UI (e.g. `"The Tunnel"`).
     */
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    /**
     * Phaser lifecycle: called once when the scene starts.
     * Lays out the UI, then invokes {@link AdventureScene#onEnter}.
     * Subclasses should override `onEnter`, not `create`.
     */
    create() {
        /** @type {number} Duration in ms of scene fade-in / fade-out. */
        this.transitionDuration = 1000;

        /** @type {number} Game width in scaled pixels (nominally 1920). */
        this.w = this.game.config.width;
        /** @type {number} Game height in scaled pixels (nominally 1080). */
        this.h = this.game.config.height;
        /** @type {number} UI spacing unit in scaled pixels (1% of width). Use multiples of `this.s` for text sizes, margins, etc. */
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        if (typeof playGameBgm === 'function') {
            playGameBgm(this);
        }

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.3)
            .setStyle({ fontSize: `${1.45 * this.s}px`, color: '#eea', lineSpacing: 6 })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3.4*this.s, this.h-3*this.s, "FS")
            .setStyle({ fontSize: `${1.6 * this.s}px`, color: '#ffffff' })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Toggle fullscreen.'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    /**
     * Briefly flash a message in the UI message box. The message fades out
     * over a few seconds.
     *
     * @param {string} message The text to show.
     */
    showMessage(message) {
        this.tweens.killTweensOf(this.messageBox);
        this.messageBox.setText(message);
        this.messageBox.setAlpha(1);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            delay: 5000,
            duration: 4 * this.transitionDuration
        });
    }

    /**
     * Add a full-screen background image for the left-side game stage.
     * Use this for scene artwork backgrounds and placeholders.
     *
     * @param {string} key The Phaser image key loaded by preload.
     * @returns {Phaser.GameObjects.Image}
     */
    addBackground(key) {
        const bg = this.add.image(0, 0, key).setOrigin(0, 0);
        bg.setDisplaySize(this.w * 0.75, this.h);
        return bg;
    }

    /**
     * Create the shared inventory panel background used by inventory overlays.
     *
     * @param {number} width Display width.
     * @param {number} height Display height.
     * @returns {Phaser.GameObjects.Image|Phaser.GameObjects.Rectangle}
     */
    createInventoryBackground(width, height) {
        if (this.textures.exists('inventoryBg')) {
            return this.add.image(0, 0, 'inventoryBg')
                .setDisplaySize(width, height)
                .setDepth(0);
        }
        return this.add.rectangle(0, 0, width, height, 0x080808, 0.84)
            .setStrokeStyle(3, 0xe6cf98, 0.9)
            .setDepth(0);
    }

    /**
     * Re-render the inventory panel. Called automatically by
     * {@link AdventureScene#gainItem} and {@link AdventureScene#loseItem};
     * you generally do not need to call this yourself.
     */
    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    /**
     * Test whether the player is currently carrying an item.
     *
     * @param {string} item Item name.
     * @returns {boolean}
     */
    hasItem(item) {
        return this.inventory.includes(item);
    }

    /**
     * Add an item to the player's inventory (no-op with a console warning
     * if the item is already held). The inventory panel animates the new entry in.
     *
     * @param {string} item Item name. Short and consistent works best (e.g. `"key"`, not `"a shiny key"`).
     */
    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    /**
     * Remove an item from the player's inventory (no-op with a console warning
     * if the item is not held). The inventory panel animates the entry out.
     *
     * @param {string} item Item name. Must match the name passed to {@link AdventureScene#gainItem}.
     */
    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }

    /**
     * Fade out the camera and transition to another scene by key, carrying
     * the current inventory with us.
     *
     * @param {string} key The Phaser scene key of the destination scene.
     * @param {object} data Extra scene data to pass through the transition.
     */
    gotoScene(key, data = {}) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory, ...data });
        });
    }

    /**
     * Subclass hook: called at the end of {@link AdventureScene#create}, after
     * the message box and inventory panel exist. Override this in your scene
     * to add your location's interactive objects.
     *
     * @example
     * onEnter() {
     *     this.add.text(100, 100, "a rock")
     *         .setInteractive()
     *         .on('pointerover', () => this.showMessage("It's a rock."))
     *         .on('pointerdown', () => this.gotoScene('next_room'));
     * }
     */
    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}

function createChapterSelectPanel(scene, chapters, onClose) {
    const w = scene.game.config.width;
    const h = scene.game.config.height;
    const panel = scene.add.container(0, 0).setDepth(80);
    const overlay = scene.add.rectangle(0, 0, w, h, 0x000000, 0.68)
        .setOrigin(0)
        .setInteractive();
    const frame = scene.add.rectangle(w * 0.5, h * 0.52, w * 0.82, h * 0.58, 0x11100e, 0.94)
        .setStrokeStyle(3, 0xd6b675, 0.9);
    const title = scene.add.text(w * 0.5, h * 0.25, TEXT.scene0.chapterSelectTitle, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '44px',
        color: '#fff4d8',
        stroke: '#000000',
        strokeThickness: 5
    }).setOrigin(0.5);
    const close = scene.add.text(w * 0.88, h * 0.25, 'X', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '34px',
        color: '#fff4d8',
        stroke: '#000000',
        strokeThickness: 4
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    close.on('pointerdown', () => {
        panel.destroy();
        if (onClose) {
            onClose();
        }
    });
    panel.add([overlay, frame, title, close]);

    const cardWidth = w * 0.17;
    const cardHeight = h * 0.28;
    const gap = w * 0.025;
    const startX = w * 0.5 - ((cardWidth + gap) * (chapters.length - 1)) / 2;
    const y = h * 0.55;

    chapters.forEach((chapter, index) => {
        const x = startX + index * (cardWidth + gap);
        const card = scene.add.container(x, y)
            .setSize(cardWidth, cardHeight)
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, cardWidth, cardHeight), Phaser.Geom.Rectangle.Contains);
        card.input.cursor = 'pointer';

        const cardBg = scene.add.rectangle(0, 0, cardWidth, cardHeight, 0x1f1a14, 0.96)
            .setStrokeStyle(2, 0x8b7144, 0.85);
        const thumb = scene.add.image(0, -cardHeight * 0.12, chapter.thumbnailKey)
            .setDisplaySize(cardWidth * 0.88, cardHeight * 0.56);
        const label = scene.add.text(0, cardHeight * 0.28, chapter.title, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '22px',
            color: '#f8e9c5',
            align: 'center',
            wordWrap: { width: cardWidth * 0.82 }
        }).setOrigin(0.5);

        card.add([cardBg, thumb, label]);
        card.on('pointerover', () => {
            scene.tweens.killTweensOf(card);
            scene.tweens.add({ targets: card, scale: 1.04, duration: 120, ease: 'Sine.out' });
        });
        card.on('pointerout', () => {
            scene.tweens.killTweensOf(card);
            scene.tweens.add({ targets: card, scale: 1, duration: 120, ease: 'Sine.out' });
        });
        card.on('pointerdown', () => {
            if (typeof fadeOutGoodEndBgm === 'function') {
                fadeOutGoodEndBgm(scene, 800, () => scene.scene.start(chapter.sceneKey));
            } else {
                scene.scene.start(chapter.sceneKey);
            }
        });

        panel.add(card);
    });

    return panel;
}
