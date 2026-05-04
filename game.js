const GAME_BGM_KEY = 'bgm';
const GOOD_END_BGM_KEY = 'goodEndBgm';
const BGM_TARGET_VOLUME = 0.05;
const EASTER_LOGO_KEY = 'Logo1';
const LOGO_HOVER_SCALE = 1.04;

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('preload');
    }

    preload() {
        this.load.audio(GAME_BGM_KEY, 'assets/audios/近藤佑輔 - 交々のいと (-溺-).mp3');
        this.load.audio(GOOD_END_BGM_KEY, 'assets/audios/GoodEnding_近藤佑輔 - ボクとワタシの.mp3');
        this.load.image('badEnd1', 'assets/images/BadEnd/BE_1.png');
        this.load.image('badEnd2', 'assets/images/BadEnd/BE_2.png');
        this.load.image('logo', 'assets/images/UI/Logo_Escape The Witch Prison.png');
        this.load.image('Button', 'assets/images/UI/Button.png');
        this.load.image('MessageBox', 'assets/images/UI/MessageBox.png');
        this.load.image('messageBox', 'assets/images/UI/MessageBox.png');
        this.load.image('Backpack', 'assets/images/UI/Backpack.png');
        this.load.image('inventoryBg', 'assets/images/UI/Backpack.png');
        this.load.image('Logo1', 'assets/images/UI/MGWT.png');
        this.load.image('bag', 'assets/images/items/bag.png');
        this.load.image('hammer', 'assets/images/items/hammer.png');
        this.load.image('doorlock', 'assets/images/items/doorlock.png');
        this.load.image('brokenlock', 'assets/images/items/brokenlock.png');
        this.load.image('brokenLock', 'assets/images/items/brokenlock.png');
        this.load.image('handcuffs', 'assets/images/items/handcuffs.png');
        this.load.image('iron_nails', 'assets/images/items/iron_nail.png');
        this.load.image('shortsword', 'assets/images/items/shortsword.png');
        this.load.image('keytothedoor', 'assets/images/items/keytothedoor.png');
        this.load.image('LeiaSimpleSpear', 'assets/images/items/LeiaSimpleSpear.png');
        this.load.image('Sherry_thinking', 'assets/images/Characters/Sherry_thinking.png');
        this.load.image('sherryThinking', 'assets/images/Characters/Sherry_thinking.png');
        this.load.image('PixelSherry', 'assets/images/Characters/PixelSherry.png');
        this.load.image('PickedSherry', 'assets/images/Characters/PickedSherry.png');
        this.load.image('Sherry_smile', 'assets/images/Characters/Sherry_smile.png');
        this.load.image('scene0Bg', 'assets/images/background/witchprison.png');
        this.load.image('scene1Bg1', 'assets/images/background/Jail.png');
        this.load.image('scene1Bg2', 'assets/images/background/JailandJailer1.png');
        this.load.image('scene1Art1', 'assets/images/insertpictures/art_hand_apple.png');
        this.load.image('scene1Art2', 'assets/images/insertpictures/art_crush_apple.png');
        this.load.image('scene2Bg1', 'assets/images/background/prisoncorridor.png');
        this.load.image('scene3Bg1', 'assets/images/background/Jail_1.png');
        this.load.image('scene3Bg2', 'assets/images/background/Jail_1andJailer.png');
        this.load.image('scene4Bg1', 'assets/images/background/corridor.png');
        this.load.image('hannaProfile', 'assets/images/profiles/Profile_Hanna.png');
        this.load.image('leiaProfile', 'assets/images/profiles/Profile_Leia.png');
        this.load.image('meruruProfile', 'assets/images/profiles/Profile_Meruru.png');
        this.load.image('nanokaProfile', 'assets/images/profiles/Profile_Nanoka.png');
        this.load.image('Hanna', 'assets/images/profiles/Profile_Hanna.png');
        this.load.image('Leia', 'assets/images/profiles/Profile_Leia.png');
        this.load.image('Meruru', 'assets/images/profiles/Profile_Meruru.png');
        this.load.image('Nanoka', 'assets/images/profiles/Profile_Nanoka.png');
    }

    create() {
        this.scene.start('scene0');
    }
}

let gameBgm = null;
let goodEndBgm = null;

const SCENE4 = {
    walkDuration: 10000,
    disappearInterval: 2500,
    zoomScale: 2.55,
    zoomTarget: { x: 980, y: 535 },
    shadeAlpha: 0.12,
    portal: { x: 980, y: 535, w: 230, h: 285 },
    recordBox: { x: 0.5, y: 0.55, w: 0.52, h: 0.42, titleY: -0.16, subY: -0.105, imgX: -0.14, imgY: 0.045, imgSize: 0.16, nameX: 0.09, nameY: -0.005, descX: 0.09, descY: 0.065, closeX: 0.23, closeY: -0.17 },
    puzzleTime: 15,
    puzzleGoal: 32,
    boardSize: 3,
    puzzleUi: { x: 0.73, y: 0.5, w: 0.35, h: 0.66, titleY: 0.22, timerY: 0.285, boardY: 0.47, hintY: 0.79, tile: 0.055, gap: 0.008, sherryX: 0.15, sherryY: 0.96, sherryH: 0.36 }
};

const PAINTINGS = [
    { id: 'hanna', x: 1440, y: 320, w: 95, h: 165, name: 'Hanna', img: 'hannaProfile', descCN: '一辈子的好朋友' },
    { id: 'leia', x: 1370, y: 365, w: 78, h: 140, name: 'Leia', img: 'leiaProfile', descCN: '简易长矛制作人' },
    { id: 'meruru', x: 1245, y: 425, w: 54, h: 86, name: 'Meruru', img: 'meruruProfile', descCN: '超级拼装' },
    { id: 'nanoka', x: 1190, y: 430, w: 44, h: 76, name: 'Nanoka', img: 'nanokaProfile', descCN: '只打手枪局' }
];

function playGameBgm(scene) {
    if (goodEndBgm) {
        fadeOutGoodEndBgm(scene, 800, () => playGameBgm(scene));
        return;
    }
    if (!scene.sound || !scene.cache.audio.exists(GAME_BGM_KEY)) {
        return;
    }
    if (gameBgm && gameBgm.isPlaying) {
        return;
    }
    if (gameBgm) {
        gameBgm.destroy();
    }
    gameBgm = scene.sound.add(GAME_BGM_KEY, { loop: true, volume: 0 });
    gameBgm.play();
    scene.tweens.add({ targets: gameBgm, volume: BGM_TARGET_VOLUME, duration: 1600, ease: 'Sine.out' });
}

function fadeOutGameBgm(scene, duration = 1200, onComplete) {
    if (!gameBgm) {
        if (onComplete) {
            onComplete();
        }
        return;
    }
    scene.tweens.add({
        targets: gameBgm,
        volume: 0,
        duration,
        ease: 'Sine.inOut',
        onComplete: () => {
            gameBgm.stop();
            gameBgm.destroy();
            gameBgm = null;
            if (onComplete) {
                onComplete();
            }
        }
    });
}

function playGoodEndBgm(scene) {
    if (gameBgm) {
        fadeOutGameBgm(scene, 800, () => playGoodEndBgm(scene));
        return;
    }
    if (!scene.sound || !scene.cache.audio.exists(GOOD_END_BGM_KEY)) {
        return;
    }
    if (goodEndBgm && goodEndBgm.isPlaying) {
        return;
    }
    if (goodEndBgm) {
        goodEndBgm.destroy();
    }
    goodEndBgm = scene.sound.add(GOOD_END_BGM_KEY, { loop: true, volume: 0 });
    goodEndBgm.play();
    scene.tweens.add({ targets: goodEndBgm, volume: BGM_TARGET_VOLUME, duration: 1600, ease: 'Sine.out' });
}

function fadeOutGoodEndBgm(scene, duration = 1200, onComplete) {
    if (!goodEndBgm) {
        if (onComplete) {
            onComplete();
        }
        return;
    }
    scene.tweens.add({
        targets: goodEndBgm,
        volume: 0,
        duration,
        ease: 'Sine.inOut',
        onComplete: () => {
            goodEndBgm.stop();
            goodEndBgm.destroy();
            goodEndBgm = null;
            if (onComplete) {
                onComplete();
            }
        }
    });
}

function playBgmOnce(scene) {
    playGameBgm(scene);
}

function fadeOutBgm(scene, duration = 1200, onComplete) {
    fadeOutGameBgm(scene, duration, onComplete);
}

function createPulseHotspot(scene, x, y, w, h, callback) {
    const spot = scene.add.rectangle(x, y, w, h, 0xffffff, 0.22)
        .setStrokeStyle(2, 0xd7b5ff, 0.3)
        .setInteractive({ useHandCursor: true });
    scene.tweens.add({
        targets: spot,
        alpha: { from: 0.15, to: 0.35 },
        duration: 900,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.inOut'
    });
    spot.on('pointerdown', callback);
    return spot;
}

function createImageButton(scene, x, y, label, options = {}) {
    const width = options.width || scene.game.config.width * 0.25;
    const height = options.height || scene.game.config.height * 0.09;
    const fontSize = options.fontSize || '34px';

    const image = scene.add.image(0, 0, 'Button')
        .setDisplaySize(width, height);
    const text = scene.add.text(0, 0, label, {
        fontFamily: 'Arial, sans-serif',
        fontSize,
        color: options.color || '#111111',
        align: 'center',
        wordWrap: { width: width * 0.78 },
        shadow: { offsetX: 0, offsetY: 2, color: '#ffffff', blur: 4, fill: true }
    }).setOrigin(0.5);

    const button = scene.add.container(x, y, [image, text])
        .setSize(width, height)
        .setInteractive(
            new Phaser.Geom.Rectangle(0, 0, width, height),
            Phaser.Geom.Rectangle.Contains
        );

    button.input.cursor = 'pointer';
    button.buttonImage = image;
    button.buttonText = text;
    button.buttonWidth = width;
    button.buttonHeight = height;
    return button;
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super('scene0');
    }

    init(data) {
        this.goodEndingUnlocked = !!(data && data.goodEndingUnlocked);
        this.chapterSelectPanel = null;
    }

    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        if (gameBgm) {
            gameBgm.stop();
            gameBgm.destroy();
            gameBgm = null;
        }

        this.add.image(0, 0, 'scene0Bg').setOrigin(0).setDisplaySize(this.w, this.h);

        this.add.rectangle(0, 0, this.w, this.h, 0x050205, 0.32).setOrigin(0);

        const logo = this.add.image(this.w * 0.5, this.h * 0.24, 'logo')
            .setOrigin(0.5)
            .setDisplaySize(this.w * 0.42, this.w * 0.28)
            .setAlpha(0);

        this.tweens.add({
            targets: logo,
            alpha: 1,
            y: { from: this.h * 0.2, to: this.h * 0.24 },
            ease: 'Sine.out',
            duration: 900
        });
        let logoEasterEggShown = false;
        const logoWidth = logo.displayWidth;
        const logoHeight = logo.displayHeight;
        const logoBaseScaleX = logo.scaleX;
        const logoBaseScaleY = logo.scaleY;
        const addLogoHover = (target) => {
            target.setInteractive({ useHandCursor: true });
            target.on('pointerover', () => {
                this.tweens.killTweensOf(target);
                this.tweens.add({
                    targets: target,
                    scaleX: logoBaseScaleX * LOGO_HOVER_SCALE,
                    scaleY: logoBaseScaleY * LOGO_HOVER_SCALE,
                    alpha: 1,
                    duration: 160,
                    ease: 'Sine.out'
                });
            });
            target.on('pointerout', () => {
                this.tweens.killTweensOf(target);
                this.tweens.add({
                    targets: target,
                    scaleX: logoBaseScaleX,
                    scaleY: logoBaseScaleY,
                    alpha: 1,
                    duration: 160,
                    ease: 'Sine.out'
                });
            });
        };

        logo.setInteractive({ useHandCursor: true });
        logo.on('pointerover', () => {
            if (logoEasterEggShown) {
                return;
            }
            this.tweens.killTweensOf(logo);
            this.tweens.add({
                targets: logo,
                scaleX: logoBaseScaleX * LOGO_HOVER_SCALE,
                scaleY: logoBaseScaleY * LOGO_HOVER_SCALE,
                alpha: 1,
                duration: 160,
                ease: 'Sine.out'
            });
        });
        logo.on('pointerout', () => {
            if (logoEasterEggShown) {
                return;
            }
            this.tweens.killTweensOf(logo);
            this.tweens.add({
                targets: logo,
                scaleX: logoBaseScaleX,
                scaleY: logoBaseScaleY,
                alpha: 1,
                duration: 160,
                ease: 'Sine.out'
            });
        });
        logo.on('pointerdown', () => {
            if (logoEasterEggShown) {
                return;
            }
            logoEasterEggShown = true;
            logo.disableInteractive();
            this.tweens.killTweensOf(logo);
            this.tweens.add({
                targets: logo,
                alpha: 0,
                scale: 0.96,
                duration: 220,
                ease: 'Sine.inOut',
                onComplete: () => {
                    logo.setTexture(EASTER_LOGO_KEY)
                        .setDisplaySize(logoWidth, logoHeight)
                        .setAlpha(0);
                    logo.setScale(logoBaseScaleX, logoBaseScaleY);
                    const caption = this.add.text(logo.x, logo.y + logoHeight / 2 + 18, 'Magical Girls Witch Trials', {
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '20px',
                        color: '#fff4d8',
                        align: 'center',
                        shadow: { offsetX: 0, offsetY: 3, color: '#000000', blur: 7, fill: true }
                    }).setOrigin(0.5).setAlpha(0);
                    addLogoHover(logo);
                    this.tweens.add({ targets: [logo, caption], alpha: 1, duration: 320, ease: 'Sine.out' });
                }
            });
        });

        const start = createImageButton(this, this.w * 0.5, this.h * 0.6, TEXT.scene0.title, {
            width: this.w * 0.27,
            height: this.h * 0.11,
            fontSize: '64px',
            color: '#111111'
        });
        start.disableInteractive();

        const startHitArea = this.add.zone(start.x, start.y, start.buttonWidth, start.buttonHeight)
            .setInteractive({ useHandCursor: true })
            .setDepth(start.depth + 1);
        let startHovered = false;

        startHitArea.on('pointerover', () => {
            if (startHovered) {
                return;
            }
            startHovered = true;
            start.buttonText.setColor('#000000');
            start.buttonText.setShadow(0, 0, '#ffffff', 8, true, true);
            this.tweens.killTweensOf(start);
            this.tweens.add({
                targets: start,
                y: this.h * 0.57,
                scale: 1.08,
                ease: 'Sine.out',
                duration: 180
            });
        });

        startHitArea.on('pointerout', () => {
            startHovered = false;
            start.buttonText.setColor('#111111');
            start.buttonText.setShadow(0, 2, '#ffffff', 4, true, true);
            this.tweens.killTweensOf(start);
            this.tweens.add({
                targets: start,
                y: this.h * 0.6,
                scale: 1,
                ease: 'Sine.out',
                duration: 180
            });
        });

        startHitArea.on('pointerdown', () => {
            this.cameras.main.fade(800, 0, 0, 0);
            if (goodEndBgm) {
                fadeOutGoodEndBgm(this, 800, () => this.scene.start('scene1'));
            } else {
                this.time.delayedCall(800, () => this.scene.start('scene1'));
            }
        });

        this.add.text(this.w * 0.5, this.h * 0.7,
            TEXT.scene0.subtitle,
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '34px',
                color: '#f5f0dc',
                align: 'center',
                lineSpacing: 8,
                wordWrap: { width: this.w * 0.52 },
                shadow: { offsetX: 0, offsetY: 3, color: '#000000', blur: 8, fill: true }
            }
        ).setOrigin(0.5, 0);

        if (this.goodEndingUnlocked) {
            const chapterSelect = createImageButton(this, this.w * 0.5, this.h * 0.82, TEXT.scene0.chapterSelect, {
                width: this.w * 0.22,
                height: this.h * 0.075,
                fontSize: '30px',
                color: '#111111'
            });
            chapterSelect.on('pointerover', () => {
                this.tweens.killTweensOf(chapterSelect);
                this.tweens.add({ targets: chapterSelect, scale: 1.05, duration: 120, ease: 'Sine.out' });
            });
            chapterSelect.on('pointerout', () => {
                this.tweens.killTweensOf(chapterSelect);
                this.tweens.add({ targets: chapterSelect, scale: 1, duration: 120, ease: 'Sine.out' });
            });
            chapterSelect.on('pointerdown', () => this.showChapterSelect());
        }
    }

    showChapterSelect() {
        if (this.chapterSelectPanel) {
            this.chapterSelectPanel.destroy();
        }
        this.chapterSelectPanel = createChapterSelectPanel(this, [
            { title: TEXT.scene0.chapters.scene1, sceneKey: 'scene1', thumbnailKey: 'scene1Bg1' },
            { title: TEXT.scene0.chapters.scene2, sceneKey: 'scene2', thumbnailKey: 'scene2Bg1' },
            { title: TEXT.scene0.chapters.scene3, sceneKey: 'scene3', thumbnailKey: 'scene3Bg1' },
            { title: TEXT.scene0.chapters.scene4, sceneKey: 'scene4', thumbnailKey: 'scene0Bg' }
        ], () => {
            this.chapterSelectPanel = null;
        });
    }
}

class CellScene extends AdventureScene {
    constructor() {
        super('scene1', 'Prison Cell');
    }

    onEnter() {
        this.sceneObjects = [];
        this.appleMemoryActive = false;
        this.appleMemoryFinished = false;
        this.appleMemoryTweens = [];
        this.appleMemoryAdvanceTimer = null;
        this.appleMemorySkipZone = null;
        this.appleMemoryArt = [];
        this.showCellIntro();
    }

    showCellIntro() {
        this.clearSceneObjects();

        const bg = this.add.image(0, 0, 'scene1Bg1')
            .setOrigin(0)
            .setDisplaySize(this.w, this.h)
            .setDepth(-10);
        const shade = this.add.rectangle(0, 0, this.w, this.h, 0x030303, 0.28)
            .setOrigin(0)
            .setDepth(-9);

        this.showMessage(TEXT.scene1.intro);

        const plate = this.createChoice(this.w * 0.38, this.h * 0.76, TEXT.scene1.plateChoice, '#4b2b18');
        plate.setAlpha(0);
        plate.on('pointerdown', () => this.playAppleMemory(plate));

        this.tweens.add({ targets: plate, alpha: 1, duration: 600, delay: 700, ease: 'Sine.out' });

        this.sceneObjects.push(bg, shade, plate);

        this.plateChoice = plate;
        this.guardTimer = this.time.delayedCall(10000, () => this.advanceToJailerScene());
    }

    playTwoStepFade(firstImage, secondImage, onComplete) {
        const tweens = [];
        tweens.push(this.tweens.add({
            targets: firstImage,
            alpha: 1,
            duration: 650,
            ease: 'Sine.out'
        }));
        tweens.push(this.tweens.add({
            targets: firstImage,
            alpha: 0,
            duration: 500,
            delay: 3000,
            ease: 'Sine.inOut'
        }));
        tweens.push(this.tweens.add({
            targets: secondImage,
            alpha: 1,
            duration: 650,
            delay: 1500,
            ease: 'Sine.out'
        }));
        tweens.push(this.tweens.add({
            targets: secondImage,
            alpha: 0,
            duration: 500,
            delay: 6000,
            ease: 'Sine.inOut',
            onComplete
        }));
        return tweens;
    }

    playAppleMemory(plate) {
        if (this.appleMemoryActive) {
            this.finishAppleMemory(true);
            return;
        }
        plate.disableInteractive();
        if (this.guardTimer) {
            this.guardTimer.remove(false);
            this.guardTimer = null;
        }
        this.appleMemoryActive = true;
        this.appleMemoryFinished = false;

        const artWidth = this.w * 0.47;
        const artHeight = artWidth / 1.5;

        const art1 = this.add.image(this.w * 0.2, this.h * 0.72, 'scene1Art1')
            .setOrigin(0.5)
            .setDisplaySize(artWidth, artHeight)
            .setAlpha(0);
        const art2 = this.add.image(this.w * 0.2, this.h * 0.72, 'scene1Art2')
            .setOrigin(0.5)
            .setDisplaySize(artWidth, artHeight)
            .setAlpha(0);
        this.showMessage(TEXT.scene1.plateMemory);

        this.sceneObjects.push(art1, art2);
        this.appleMemoryArt = [art1, art2];
        this.appleMemorySkipZone = this.add.zone(0, 0, this.w, this.h)
            .setOrigin(0)
            .setInteractive({ useHandCursor: true })
            .setDepth(50);
        this.appleMemorySkipZone.on('pointerdown', () => this.finishAppleMemory(true));
        this.sceneObjects.push(this.appleMemorySkipZone);

        this.appleMemoryTweens = this.playTwoStepFade(art1, art2, () => this.finishAppleMemory(false));
    }

    finishAppleMemory(skipped) {
        if (!this.appleMemoryActive || this.appleMemoryFinished) {
            return;
        }
        this.appleMemoryActive = false;
        this.appleMemoryFinished = true;

        (this.appleMemoryTweens || []).forEach((tween) => tween.remove());
        this.appleMemoryTweens = [];

        if (this.appleMemoryAdvanceTimer) {
            this.appleMemoryAdvanceTimer.remove(false);
            this.appleMemoryAdvanceTimer = null;
        }
        if (this.appleMemorySkipZone) {
            this.appleMemorySkipZone.destroy();
            this.appleMemorySkipZone = null;
        }
        if (skipped) {
            this.appleMemoryArt.forEach((art) => {
                if (art && art.active) {
                    art.destroy();
                }
            });
        }

        const delay = skipped ? 0 : 500;
        this.appleMemoryAdvanceTimer = this.time.delayedCall(delay, () => {
            this.appleMemoryAdvanceTimer = null;
            this.advanceToJailerScene();
        });
    }

    advanceToJailerScene() {
        const targets = [this.plateChoice].filter((target) => target && target.active);
        if (targets.length === 0) {
            this.showJailerArrival();
            return;
        }
        this.tweens.add({
            targets,
            alpha: 0,
            duration: 900,
            ease: 'Sine.inOut',
            onComplete: () => this.showJailerArrival()
        });
    }

    showJailerArrival() {
        this.clearSceneObjects();

        const bg = this.add.image(0, 0, 'scene1Bg2')
            .setOrigin(0)
            .setDisplaySize(this.w, this.h)
            .setDepth(-10);
        const shade = this.add.rectangle(0, 0, this.w, this.h, 0x020204, 0.24)
            .setOrigin(0)
            .setDepth(-9);

        this.showMessage(TEXT.scene1.jailerDialogue);

        const sherry = this.add.image(this.w * 0.38, this.h * 1.1, 'Sherry_thinking')
            .setOrigin(0.5, 1)
            .setDisplaySize(this.h * 0.65 / 1.5, this.h * 0.65)
            .setAlpha(0);

        const power = this.createChoice(this.w * 0.24, this.h * 0.76, TEXT.scene1.powerChoice, '#541818');
        const obey = this.createChoice(this.w * 0.52, this.h * 0.76, TEXT.scene1.obeyChoice, '#173d28');
        power.setAlpha(0);
        obey.setAlpha(0);

        power.on('pointerdown', () => {
            this.gotoScene('badEnd', { reason: 'magic' });
        });
        obey.on('pointerdown', () => {
            this.showMessage(TEXT.scene1.obeyResult);
            this.tweens.add({
                targets: obey,
                scale: 1.05,
                yoyo: true,
                duration: 160,
                ease: 'Sine.inOut'
            });
            this.time.delayedCall(1000, () => this.gotoScene('scene2'));
        });

        this.tweens.add({ targets: sherry, alpha: 1, duration: 700, delay: 250, ease: 'Sine.out' });
        this.tweens.add({ targets: [power, obey], alpha: 1, duration: 600, delay: 500, ease: 'Sine.out' });
        this.sceneObjects.push(bg, shade, sherry, power, obey);
    }

    createChoice(x, y, label, color) {
        const buttonWidth = this.w * 0.25;
        const buttonHeight = this.h * 0.085;
        const choice = createImageButton(this, x, y, label, {
            width: buttonWidth,
            height: buttonHeight,
            fontSize: '32px'
        });

        choice.on('pointerover', () => {
            this.tweens.add({ targets: choice, scale: 1.05, duration: 120, ease: 'Sine.out' });
        });
        choice.on('pointerout', () => {
            this.tweens.add({ targets: choice, scale: 1, duration: 120, ease: 'Sine.out' });
        });
        return choice;
    }

    clearSceneObjects() {
        if (!this.sceneObjects) {
            this.sceneObjects = [];
            return;
        }
        this.sceneObjects.forEach((object) => object.destroy());
        this.sceneObjects = [];
    }
}

class CorridorScene extends AdventureScene {
    constructor() {
        super('scene2', 'Prison Corridor');
    }

    onEnter() {
        this.sceneObjects = [];

        const bg = this.add.image(0, 0, 'scene2Bg1')
            .setOrigin(0)
            .setDisplaySize(this.w, this.h)
            .setDepth(-10);
        const shade = this.add.rectangle(0, 0, this.w, this.h, 0x020204, 0.2)
            .setOrigin(0)
            .setDepth(-9);

        this.showMessage(TEXT.scene2.intro);

        this.spear = this.add.image(this.w * 0.1, this.h * 0.8, 'LeiaSimpleSpear')
            .setOrigin(0.5)
            .setDisplaySize(this.w * 0.1, this.w * 0.1)
            .setInteractive({ useHandCursor: true });
        this.spear.setAngle(-18);

        this.spear.on('pointerover', () => {
            this.showMessage(TEXT.scene2.spearHint);
            this.tweens.add({ targets: this.spear, scale: 0.3, duration: 140, ease: 'Sine.out' });
        });
        this.spear.on('pointerout', () => {
            this.tweens.add({ targets: this.spear, scale: 0.2, duration: 140, ease: 'Sine.out' });
        });
        this.spear.on('pointerdown', () => this.showSpearChoices());

        this.sceneObjects.push(bg, shade, this.spear);
    }

    showSpearChoices() {
        this.spear.disableInteractive();
        this.showMessage(TEXT.scene2.spearChoicePrompt);

        const pixelSherry = this.add.image(0, 0, 'PixelSherry')
            .setOrigin(0.5)
            .setScale(0.35);
        const thinkingMark = this.add.text(80, -130, '?', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '64px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5).setAlpha(0);
        const thinkingGroup = this.add.container(this.w * 0.5, this.h * 0.7, [pixelSherry, thinkingMark])
            .setSize(pixelSherry.displayWidth, pixelSherry.displayHeight)
            .setAlpha(0)
            .setInteractive(
                new Phaser.Geom.Rectangle(
                    -pixelSherry.displayWidth / 2,
                    -pixelSherry.displayHeight / 2,
                    pixelSherry.displayWidth,
                    pixelSherry.displayHeight
                ),
                Phaser.Geom.Rectangle.Contains
            );
        thinkingGroup.input.cursor = 'grab';
        this.input.setDraggable(thinkingGroup);

        const attack = this.createChoice(this.w * 0.24, this.h * 0.78, TEXT.scene2.attackChoice);
        const ignore = this.createChoice(this.w * 0.52, this.h * 0.78, TEXT.scene2.ignoreChoice);
        attack.setAlpha(0);
        ignore.setAlpha(0);

        this.tweens.add({
            targets: thinkingGroup,
            alpha: 1,
            duration: 400,
            ease: 'Sine.out'
        });
        let idleTween;
        const startIdleTween = () => {
            idleTween = this.tweens.add({
                targets: thinkingGroup,
                y: thinkingGroup.y - 8,
                duration: 900,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inOut'
            });
        };
        startIdleTween();
        this.tweens.add({
            targets: thinkingMark,
            alpha: 1,
            duration: 350,
            delay: 150,
            ease: 'Sine.out'
        });
        this.tweens.add({
            targets: thinkingMark,
            alpha: 0.25,
            y: -142,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });
        this.input.on('dragstart', (pointer, gameObject) => {
            if (gameObject !== thinkingGroup) {
                return;
            }
            thinkingGroup.input.cursor = 'grabbing';
            pixelSherry.setTexture('PickedSherry');
            thinkingMark.setAlpha(0);
            if (idleTween) {
                idleTween.stop();
            }
        });
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject !== thinkingGroup) {
                return;
            }
            gameObject.x = Phaser.Math.Clamp(dragX, pixelSherry.displayWidth / 2, this.w - pixelSherry.displayWidth / 2);
            gameObject.y = Phaser.Math.Clamp(dragY, pixelSherry.displayHeight / 2, this.h - pixelSherry.displayHeight / 2);
        });
        this.input.on('dragend', (pointer, gameObject) => {
            if (gameObject !== thinkingGroup) {
                return;
            }
            thinkingGroup.input.cursor = 'grab';
            pixelSherry.setTexture('PixelSherry');
            thinkingMark.setAlpha(1);
            startIdleTween();
        });

        attack.on('pointerdown', () => {
            this.gotoScene('badEnd', { reason: 'spear' });
        });

        ignore.on('pointerdown', () => {
            this.tweens.add({
                targets: this.spear,
                alpha: 0,
                duration: 350,
                ease: 'Sine.inOut',
                onComplete: () => this.spear.destroy()
            });
            this.tweens.add({
                targets: [attack, ignore, thinkingGroup],
                alpha: 0,
                duration: 250,
                ease: 'Sine.inOut',
                onComplete: () => {
                    attack.destroy();
                    ignore.destroy();
                    thinkingGroup.destroy();
                    this.showMessage(TEXT.scene2.ignoreResult);
                    this.time.delayedCall(1600, () => this.gotoScene('scene3'));
                }
            });
        });

        this.tweens.add({ targets: [attack, ignore], alpha: 1, duration: 500, ease: 'Sine.out' });
        this.sceneObjects.push(thinkingGroup, attack, ignore);
    }

    createChoice(x, y, label) {
        const choice = createImageButton(this, x, y, label, {
            width: this.w * 0.27,
            height: this.h * 0.09,
            fontSize: '28px'
        });

        choice.on('pointerover', () => {
            this.tweens.add({ targets: choice, scale: 1.05, duration: 120, ease: 'Sine.out' });
        });
        choice.on('pointerout', () => {
            this.tweens.add({ targets: choice, scale: 1, duration: 120, ease: 'Sine.out' });
        });
        return choice;
    }
}

class SolitaryRoomScene extends AdventureScene {
    constructor() {
        super('scene3', 'Solitary Room');
    }

    onEnter() {
        this.selectedItems = new Set();
        this.craftingKey = false;
        this.craftProgress = 0;
        this.craftDuration = 8000;
        this.craftedKeyComplete = this.hasItem('craftedKey');
        this.itemSprites = {};
        this.sceneObjects = [];
        this.inventoryPanel = null;
        this.craftProgressBar = null;
        this.craftProgressText = null;
        this.choiceBox = null;
        this.guardWatching = false;
        this.caughtCrafting = false;
        this.patrolCountdown = 10;
        this.patrolCountdownText = null;

        this.roomBg = this.add.image(0, 0, 'scene3Bg1')
            .setOrigin(0)
            .setDisplaySize(this.w, this.h)
            .setDepth(-10);
        const shade = this.add.rectangle(0, 0, this.w, this.h, 0x020204, 0.22)
            .setOrigin(0)
            .setDepth(-9);

        this.sceneObjects.push(this.roomBg, shade);
        this.createScene3Items();
        this.showMessage(TEXT.scene3.intro);
        this.startGuardPatrol();

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            if (this.guardPatrolEvent) {
                this.guardPatrolEvent.remove(false);
            }
            if (this.guardWatchEvent) {
                this.guardWatchEvent.remove(false);
            }
            if (this.craftTimer) {
                this.craftTimer.remove(false);
            }
        });
    }

    createScene3Items() {
        this.addInteractiveItem('backpack', this.w * 0.07, this.h * 0.1, 'bag', TEXT.scene3.hover.backpack, {
            size: this.w * 0.075,
            onClick: () => this.openInventory()
        });
        this.addInteractiveItem('hammer', this.w * 0.05, this.h * 0.6, 'hammer', TEXT.scene3.hover.hammer, {
            size: this.w * 0.105,
            angle: -12
        });
        this.addInteractiveItem('handcuffs', this.w * 0.15, this.h * 0.63, 'handcuffs', TEXT.scene3.hover.handcuffs, {
            size: this.w * 0.095,
            angle: 8
        });
        this.addInteractiveItem('nail', this.w * 0.25, this.h * 0.6, 'iron_nails', TEXT.scene3.hover.nail, {
            size: this.w * 0.075,
            angle: 18
        });
        this.addInteractiveItem('dagger', this.w * 0.35, this.h * 0.58, 'shortsword', TEXT.scene3.hover.dagger, {
            size: this.w * 0.11,
            angle: 45
        });
        this.lock = this.addInteractiveItem('lock', this.w * 0.65, this.h * 0.39, 'doorlock', TEXT.scene3.hover.lock, {
            size: this.w * 0.07
        });
    }

    addInteractiveItem(itemKey, x, y, textureKey, hoverText, options = {}) {
        const sprite = this.add.image(x, y, textureKey)
            .setOrigin(0.5)
            .setDepth(5)
            .setInteractive({ useHandCursor: true });

        const size = options.size || this.w * 0.08;
        sprite.setDisplaySize(size, size);
        sprite.setAngle(options.angle || 0);
        sprite.baseScaleX = sprite.scaleX;
        sprite.baseScaleY = sprite.scaleY;

        sprite.on('pointerover', () => {
            this.showMessage(hoverText);
            this.tweens.add({
                targets: sprite,
                scaleX: sprite.baseScaleX * 1.08,
                scaleY: sprite.baseScaleY * 1.08,
                duration: 140,
                ease: 'Sine.out'
            });
        });
        sprite.on('pointerout', () => {
            this.tweens.add({
                targets: sprite,
                scaleX: sprite.baseScaleX,
                scaleY: sprite.baseScaleY,
                duration: 140,
                ease: 'Sine.out'
            });
            if (this.caughtCrafting || this.craftingKey) {
                return;
            }
            if (this.guardWatching) {
                this.showMessage(TEXT.scene3.guardWatching);
                return;
            }
            if (this.messageBox && this.messageBox.text === hoverText) {
                this.showMessage(TEXT.scene3.intro);
            }
        });
        sprite.on('pointerdown', () => {
            if (options.onClick) {
                options.onClick();
                return;
            }
            this.handleItemInteraction(itemKey);
        });

        this.itemSprites[itemKey] = sprite;
        this.sceneObjects.push(sprite);
        return sprite;
    }

    handleItemInteraction(itemKey) {
        this.closeChoiceBox();

        if (itemKey === 'dagger') {
            this.showChoiceBox(TEXT.scene3.prompts.dagger, [
                { label: TEXT.scene3.choices.daggerAttack, onSelect: () => this.gotoScene('badEnd', { reason: 'shortsword' }) },
                { label: TEXT.scene3.choices.daggerLeave, onSelect: () => this.closeChoiceBox() }
            ]);
            return;
        }

        if (itemKey === 'nail') {
            if (this.hasItem('nail')) {
                this.showMessage(TEXT.scene3.prompts.nail);
                return;
            }
            this.showChoiceBox(TEXT.scene3.prompts.nail, [
                { label: TEXT.scene3.choices.putInBackpack, onSelect: () => this.addToInventory('nail') }
            ]);
            return;
        }

        if (itemKey === 'handcuffs') {
            if (this.hasItem('handcuffs')) {
                this.showMessage(TEXT.scene3.prompts.handcuffs);
                return;
            }
            this.showChoiceBox(TEXT.scene3.prompts.handcuffs, [
                { label: TEXT.scene3.choices.putInBackpack, onSelect: () => this.addToInventory('handcuffs') }
            ]);
            return;
        }

        if (itemKey === 'hammer') {
            const prompt = this.hasItem('hammer') ? TEXT.scene3.prompts.hammerHeld : TEXT.scene3.prompts.hammer;
            const choices = [
                { label: TEXT.scene3.choices.hammerSmash, onSelect: () => this.escapeWithHammer() }
            ];
            if (!this.hasItem('hammer')) {
                choices.push({ label: TEXT.scene3.choices.hammerStore, onSelect: () => this.addToInventory('hammer') });
            }
            this.showChoiceBox(prompt, choices);
            return;
        }

        if (itemKey === 'lock') {
            if (this.hasItem('craftedKey')) {
                this.showChoiceBox(TEXT.scene3.prompts.keyHeld, [
                    { label: TEXT.scene3.choices.unlockWithKey, onSelect: () => this.escapeWithKey() }
                ]);
            } else {
                this.showMessage(TEXT.scene3.prompts.lockNoKey);
            }
            return;
        }

        if (itemKey === 'craftedKey') {
            this.showMessage(TEXT.scene3.prompts.keyHeld);
        }
    }

    showChoiceBox(text, choices) {
        this.closeChoiceBox();

        const panelWidth = this.w * 0.54;
        const panelHeight = this.h * 0.45;
        const panelX = this.w * 0.36;
        const panelY = this.h * 0.77;
        const bg = this.textures.exists('messageBox')
            ? this.add.image(0, 0, 'messageBox').setDisplaySize(panelWidth, panelHeight)
            : this.add.rectangle(0, 0, panelWidth, panelHeight, 0x080706, 0.88).setStrokeStyle(2, 0xd6b675, 0.9);
        const prompt = this.add.text(0, -panelHeight * 0.1, text, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '22px',
            color: '#f7f2d1',
            align: 'center',
            lineSpacing: 5,
            wordWrap: { width: panelWidth * 0.68 },
            fixedWidth: panelWidth * 0.68,
            fixedHeight: panelHeight * 0.3
        }).setOrigin(0.5);

        const children = [bg, prompt];
        const buttonY = choices.length === 1
            ? [panelHeight * 0.11]
            : [panelHeight * 0.04, panelHeight * 0.22];
        choices.forEach((choiceData, index) => {
            const button = createImageButton(this, 0, buttonY[index] || buttonY[buttonY.length - 1], choiceData.label, {
                width: panelWidth * 0.5,
                height: this.h * 0.075,
                fontSize: '22px'
            });
            button.on('pointerover', () => this.tweens.add({ targets: button, scale: 1.03, duration: 100, ease: 'Sine.out' }));
            button.on('pointerout', () => this.tweens.add({ targets: button, scale: 1, duration: 100, ease: 'Sine.out' }));
            button.on('pointerdown', () => choiceData.onSelect());
            children.push(button);
        });

        this.choiceBox = this.add.container(panelX, panelY, children).setDepth(40);
    }

    closeChoiceBox() {
        if (this.choiceBox) {
            this.choiceBox.destroy();
            this.choiceBox = null;
        }
    }

    addToInventory(itemKey) {
        this.closeChoiceBox();
        if (!this.hasItem(itemKey)) {
            this.gainItem(itemKey);
        }
        const sprite = this.itemSprites[itemKey];
        if (sprite && sprite.active) {
            sprite.disableInteractive();
            this.tweens.add({
                targets: sprite,
                alpha: 0,
                scaleX: sprite.baseScaleX * 0.75,
                scaleY: sprite.baseScaleY * 0.75,
                duration: 260,
                ease: 'Sine.inOut'
            });
        }
        if (this.inventoryPanel) {
            this.renderInventory();
        }
    }

    openInventory() {
        if (this.inventoryPanel) {
            this.closeInventory();
            return;
        }
        this.renderInventory();
    }

    closeInventory() {
        this.pauseCrafting();
        this.selectedItems.clear();
        if (this.inventoryPanel) {
            this.inventoryPanel.destroy();
            this.inventoryPanel = null;
            this.inventoryBg = null;
            this.inventoryPanelChildren = null;
            this.craftProgressBar = null;
            this.craftProgressText = null;
        }
    }

    renderInventory() {
        const panelWidth = this.w * 0.56;
        const panelHeight = this.h * 0.58;
        if (!this.inventoryPanel) {
            const panel = this.add.container(this.w * 0.375, this.h * 0.48).setDepth(60);
            this.inventoryPanel = panel;
            this.inventoryBg = this.createInventoryBackground(panelWidth, panelHeight);
            this.inventoryPanel.add(this.inventoryBg);
            this.inventoryPanelChildren = [];
        } else {
            (this.inventoryPanelChildren || []).forEach((child) => child.destroy());
            this.inventoryPanelChildren = [];
        }
        const addPanelObjects = (objects) => {
            this.inventoryPanel.add(objects);
            this.inventoryPanelChildren.push(...objects);
        };

        const title = this.add.text(-panelWidth * 0.44, -panelHeight * 0.42, TEXT.scene3.inventoryTitle, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            color: '#fff2cc'
        }).setOrigin(0, 0.5);
        const close = createImageButton(this, panelWidth * 0.4, -panelHeight * 0.42, TEXT.scene3.closeInventory, {
            width: this.w * 0.08,
            height: this.h * 0.052,
            fontSize: '20px'
        });
        close.on('pointerdown', () => this.closeInventory());

        addPanelObjects([title, close]);

        const items = this.inventory.filter((item) => TEXT.scene3.itemLabels[item]);
        if (items.length === 0) {
            const empty = this.add.text(0, -this.h * 0.05, 'Empty', {
                fontFamily: 'Arial, sans-serif',
                fontSize: '28px',
                color: '#d6c9aa'
            }).setOrigin(0.5);
            addPanelObjects([empty]);
        }

        items.forEach((itemKey, index) => {
            const x = -panelWidth * 0.32 + (index % 4) * this.w * 0.16;
            const y = -panelHeight * 0.18 + Math.floor(index / 4) * this.h * 0.18;
            const slot = this.add.rectangle(x, y, this.w * 0.115, this.h * 0.14, 0x17130f, 0.82)
                .setStrokeStyle(2, this.selectedItems.has(itemKey) ? 0xfff0a6 : 0x8b7144, this.selectedItems.has(itemKey) ? 1 : 0.75);
            const icon = this.add.image(x, y - this.h * 0.018, this.getItemTexture(itemKey))
                .setDisplaySize(this.w * 0.065, this.w * 0.065)
                .setInteractive({ useHandCursor: true });
            const label = this.add.text(x, y + this.h * 0.055, TEXT.scene3.itemLabels[itemKey], {
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                color: '#f8e9c5',
                align: 'center',
                wordWrap: { width: this.w * 0.11 }
            }).setOrigin(0.5);
            const glow = this.add.rectangle(x, y, this.w * 0.12, this.h * 0.145, 0xffe299, this.selectedItems.has(itemKey) ? 0.18 : 0);

            icon.on('pointerover', () => {
                this.showMessage(TEXT.scene3.hover[itemKey] || TEXT.scene3.itemLabels[itemKey]);
            });
            icon.on('pointerdown', () => {
                this.toggleSelectItem(itemKey);
            });

            addPanelObjects([glow, slot, icon, label]);
        });

        this.renderCraftControls(panelWidth, panelHeight);
    }

    getItemTexture(itemKey) {
        const textures = {
            hammer: 'hammer',
            handcuffs: 'handcuffs',
            nail: 'iron_nails',
            craftedKey: 'keytothedoor'
        };
        return textures[itemKey] || 'bag';
    }

    toggleSelectItem(itemKey) {
        if (this.selectedItems.has(itemKey)) {
            this.selectedItems.delete(itemKey);
        } else {
            this.selectedItems.add(itemKey);
        }
        this.renderInventory();
        this.checkCraftAvailability();
    }

    checkCraftAvailability() {
        if (!this.inventoryPanel) {
            return false;
        }
        return ['hammer', 'handcuffs', 'nail'].every((item) => this.selectedItems.has(item) && this.hasItem(item))
            && this.selectedItems.size === 3
            && !this.craftedKeyComplete
            && !this.craftingKey;
    }

    renderCraftControls(panelWidth, panelHeight) {
        if (!this.inventoryPanel) {
            return;
        }

        if (this.craftingKey || this.craftProgress > 0) {
            const barBg = this.add.rectangle(0, panelHeight * 0.34, panelWidth * 0.58, this.h * 0.035, 0x2a251f, 0.95)
                .setStrokeStyle(2, 0xb69a60, 0.8);
            this.craftProgressBar = this.add.rectangle(-panelWidth * 0.29, panelHeight * 0.34, 1, this.h * 0.035, 0xffd56f, 0.95)
                .setOrigin(0, 0.5);
            this.craftProgressText = this.add.text(0, panelHeight * 0.385, '0%', {
                fontFamily: 'Arial, sans-serif',
                fontSize: '22px',
                color: '#fff2cc'
            }).setOrigin(0.5);
            this.inventoryPanel.add([barBg, this.craftProgressBar, this.craftProgressText]);
            this.inventoryPanelChildren.push(barBg, this.craftProgressBar, this.craftProgressText);
            this.refreshCraftProgressBar();
        }

        if (this.checkCraftAvailability()) {
            const craft = createImageButton(this, 0, panelHeight * 0.34, TEXT.scene3.craftButton, {
                width: panelWidth * 0.35,
                height: this.h * 0.085,
                fontSize: '22px'
            });
            craft.on('pointerdown', () => this.startCraftKey());
            this.inventoryPanel.add(craft);
            this.inventoryPanelChildren.push(craft);
        }
    }

    startCraftKey() {
        if (!this.checkCraftAvailability()) {
            return;
        }
        if (this.guardWatching) {
            this.triggerCaughtCrafting();
            return;
        }
        this.craftingKey = true;
        this.showMessage(this.craftProgress > 0 ? TEXT.scene3.craftContinue : TEXT.scene3.craftButton);
        this.renderInventory();

        if (this.craftTimer) {
            this.craftTimer.remove(false);
        }
        this.craftTimer = this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => this.updateCraftProgress()
        });
    }

    updateCraftProgress() {
        if (!this.craftingKey) {
            return;
        }
        if (this.guardWatching) {
            this.triggerCaughtCrafting();
            return;
        }
        this.craftProgress = Phaser.Math.Clamp(this.craftProgress + 100, 0, this.craftDuration);
        this.refreshCraftProgressBar();
        if (this.craftProgress >= this.craftDuration) {
            this.completeCraftKey();
        }
    }

    refreshCraftProgressBar() {
        const percent = Math.floor((this.craftProgress / this.craftDuration) * 100);
        if (this.craftProgressBar) {
            this.craftProgressBar.width = (this.w * 0.56 * 0.58) * (percent / 100);
        }
        if (this.craftProgressText) {
            this.craftProgressText.setText(`${percent}%`);
        }
    }

    pauseCrafting() {
        if (this.craftTimer) {
            this.craftTimer.remove(false);
            this.craftTimer = null;
        }
        if (this.craftingKey) {
            this.craftingKey = false;
            this.showMessage(TEXT.scene3.craftPaused);
        }
    }

    completeCraftKey() {
        if (this.craftedKeyComplete) {
            return;
        }
        const inventoryWasOpen = !!this.inventoryPanel;
        this.craftingKey = false;
        this.craftedKeyComplete = true;
        this.craftProgress = 0;
        if (this.craftTimer) {
            this.craftTimer.remove(false);
            this.craftTimer = null;
        }

        this.inventory = this.inventory.filter((item) => !['hammer', 'handcuffs', 'nail'].includes(item));
        this.selectedItems.clear();
        this.updateInventory();
        this.gainItem('craftedKey');
        this.showMessage(TEXT.scene3.craftComplete);
        if (inventoryWasOpen) {
            this.renderInventory();
        }
    }

    startGuardPatrol() {
        if (this.guardPatrolEvent) {
            this.guardPatrolEvent.remove(false);
        }
        this.guardWatching = false;
        this.patrolCountdown = 10;
        if (!this.patrolCountdownText) {
            this.patrolCountdownText = this.add.text(this.w * 0.75 + this.s, this.h * 0.22, '', {
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                color: '#f0d98a',
                wordWrap: { width: this.w * 0.23 }
            }).setDepth(30);
        }
        this.updatePatrolCountdown();
        this.guardPatrolEvent = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.patrolCountdown -= 1;
                if (this.patrolCountdown <= 0) {
                    this.beginGuardWatch();
                } else {
                    this.updatePatrolCountdown();
                }
            }
        });
    }

    beginGuardWatch() {
        if (this.guardPatrolEvent) {
            this.guardPatrolEvent.remove(false);
            this.guardPatrolEvent = null;
        }
        this.guardWatching = true;
        if (this.roomBg) {
            this.roomBg.setTexture('scene3Bg2').setDisplaySize(this.w, this.h);
        }
        this.updatePatrolCountdown();
        this.showMessage(TEXT.scene3.guardWatching);

        if (this.craftingKey) {
            this.triggerCaughtCrafting();
            return;
        }

        this.guardWatchEvent = this.time.delayedCall(3000, () => this.endGuardWatch());
    }

    endGuardWatch() {
        this.guardWatching = false;
        if (this.roomBg) {
            this.roomBg.setTexture('scene3Bg1').setDisplaySize(this.w, this.h);
        }
        this.showMessage(TEXT.scene3.guardLeft);
        this.startGuardPatrol();
    }

    updatePatrolCountdown() {
        if (!this.patrolCountdownText) {
            return;
        }
        if (this.guardWatching) {
            this.patrolCountdownText.setText('Guard is watching...');
        } else {
            this.patrolCountdownText.setText(`${TEXT.scene3.guardCountdown}: ${this.patrolCountdown}`);
        }
    }

    triggerCaughtCrafting() {
        if (this.caughtCrafting) {
            return;
        }
        this.caughtCrafting = true;
        this.craftingKey = false;
        if (this.craftTimer) {
            this.craftTimer.remove(false);
            this.craftTimer = null;
        }
        this.showMessage(TEXT.scene3.caughtCrafting);
        this.gotoScene('badEnd', { reason: 'craftingCaught' });
    }

    escapeWithHammer() {
        this.closeChoiceBox();
        this.pauseCrafting();
        this.showMessage(TEXT.scene3.hammerStrike);

        const lock = this.lock || this.itemSprites.lock;
        if (lock && lock.active && this.textures.exists('brokenLock')) {
            const lockX = lock.x;
            const lockY = lock.y;
            this.tweens.add({
                targets: lock,
                x: { from: lock.x - 8, to: lock.x + 8 },
                alpha: { from: 1, to: 0.6 },
                yoyo: true,
                repeat: 3,
                duration: 55,
                ease: 'Sine.inOut',
                onComplete: () => {
                    lock.setPosition(lockX, lockY);
                    lock.setTexture('brokenLock').setDisplaySize(this.w * 0.07, this.w * 0.07).setAlpha(1);
                    this.time.delayedCall(800, () => {
                        this.showMessage(TEXT.scene3.hammerNoise);
                        this.time.delayedCall(1200, () => this.gotoScene('badEnd', { reason: 'hammer' }));
                    });
                }
            });
            return;
        }

        this.time.delayedCall(800, () => {
            this.showMessage(TEXT.scene3.hammerNoise);
            this.time.delayedCall(1200, () => this.gotoScene('badEnd', { reason: 'hammer' }));
        });
    }

    escapeWithKey() {
        this.closeChoiceBox();
        this.showMessage(TEXT.scene3.escapeWithKey);
        this.time.delayedCall(1100, () => this.gotoScene('scene4'));
    }
}

class EscapeScene extends Phaser.Scene {
    constructor() {
        super('scene4');
    }

    init(data = {}) {
        this.startPuzzle = !!data.startPuzzle;
    }

    create() {
        playGameBgm(this);
        this.w = this.scale.width;
        this.h = this.scale.height;
        this.puzzleOpen = false;
        this.puzzleEnded = false;
        this.modalOpen = false;
        this.approachElapsed = this.startPuzzle ? SCENE4.walkDuration : 0;
        this.approachPaused = !!this.startPuzzle;
        this.paintings = PAINTINGS.map((painting) => ({
            ...painting,
            hidden: false,
            viewed: false,
            hotspot: null
        }));

        this.world = this.add.container(0, 0);
        this.scene4Bg = this.add.image(0, 0, 'scene4Bg1').setOrigin(0).setDisplaySize(this.w, this.h);
        this.world.add(this.scene4Bg);
        this.add.rectangle(0, 0, this.w, this.h, 0x000000, SCENE4.shadeAlpha).setOrigin(0).setDepth(5);

        this.paintings.forEach((painting) => this.createPaintingHotspot(painting));

        this.portalHotspot = createPulseHotspot(
            this,
            SCENE4.portal.x,
            SCENE4.portal.y,
            SCENE4.portal.w,
            SCENE4.portal.h,
            () => this.openPuzzle()
        );
        this.portalHotspot.setFillStyle(0xb55cff, 0.2);
        this.world.add(this.portalHotspot);

        const scale = SCENE4.zoomScale;
        const zoomX = this.w * 0.5 - SCENE4.zoomTarget.x * scale;
        const zoomY = this.h * 0.5 - SCENE4.zoomTarget.y * scale;
        if (this.startPuzzle) {
            this.world.setScale(scale).setPosition(zoomX, zoomY);
            this.checkPaintingDisappear();
            this.time.delayedCall(0, () => this.openPuzzle());
        } else {
            this.zoomTween = this.tweens.add({
                targets: this.world,
                scale,
                x: zoomX,
                y: zoomY,
                duration: SCENE4.walkDuration,
                ease: 'Sine.inOut'
            });
        }
    }

    update(time, delta) {
        if (this.approachPaused || this.puzzleOpen || this.puzzleEnded) {
            return;
        }
        this.approachElapsed = Math.min(this.approachElapsed + delta, SCENE4.walkDuration);
        this.checkPaintingDisappear();
    }

    createPaintingHotspot(painting) {
        painting.hotspot = createPulseHotspot(this, painting.x, painting.y, painting.w, painting.h, () => this.showRecord(painting));
        painting.hotspot.setFillStyle(0xd7b5ff, 0.22);
        this.world.add(painting.hotspot);
    }

    checkPaintingDisappear() {
        const countToHide = Math.min(Math.floor(this.approachElapsed / SCENE4.disappearInterval), this.paintings.length);
        this.paintings.forEach((painting, index) => {
            if (index < countToHide && !painting.hidden) {
                this.hidePainting(painting);
            }
        });
    }

    hidePainting(painting) {
        if (!painting || painting.hidden || !painting.hotspot) {
            return;
        }
        painting.hidden = true;
        painting.hotspot.disableInteractive();
        this.tweens.killTweensOf(painting.hotspot);
        this.tweens.add({
            targets: painting.hotspot,
            alpha: 0,
            duration: 220,
            ease: 'Sine.inOut',
            onComplete: () => {
                if (painting.hotspot && painting.hotspot.active) {
                    painting.hotspot.setVisible(false);
                }
            }
        });
    }

    showRecord(painting) {
        if (this.modalOpen || painting.hidden) {
            return;
        }
        this.modalOpen = true;
        this.approachPaused = true;
        painting.viewed = true;
        if (this.zoomTween) {
            this.zoomTween.pause();
        }
        this.setPaintingHotspotsEnabled(false);

        const ui = SCENE4.recordBox;
        this.modalOverlay = this.add.rectangle(0, 0, this.w, this.h, 0x000000, 0.45)
            .setOrigin(0)
            .setDepth(89)
            .setInteractive();
        this.recordBox = this.add.container(this.w * ui.x, this.h * ui.y).setDepth(90).setAlpha(0);
        const bg = this.add.rectangle(0, 0, this.w * ui.w, this.h * ui.h, 0x09070b, 0.92)
            .setStrokeStyle(2, 0xd6b675, 0.9);
        const title = this.add.text(0, this.h * ui.titleY, 'Witches who once lived here', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '34px',
            color: '#fff4d8'
        }).setOrigin(0.5);
        const subtitle = this.add.text(0, this.h * ui.subY, 'This corridor remembers those who tried to escape.', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '23px',
            color: '#d8cba4',
            align: 'center'
        }).setOrigin(0.5);
        const profile = this.textures.exists(painting.img)
            ? this.add.image(this.w * ui.imgX, this.h * ui.imgY, painting.img).setDisplaySize(this.w * ui.imgSize, this.w * ui.imgSize)
            : this.add.rectangle(this.w * ui.imgX, this.h * ui.imgY, this.w * ui.imgSize, this.w * ui.imgSize, 0x38202d, 0.95);
        const name = this.add.text(this.w * ui.nameX, this.h * ui.nameY, painting.name, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '38px',
            color: '#fff4d8'
        }).setOrigin(0.5);
        const desc = this.add.text(this.w * ui.descX, this.h * ui.descY, painting.descCN, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            color: '#f7f2d1',
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: this.w * 0.22 }
        }).setOrigin(0.5);
        const close = this.add.text(this.w * ui.closeX, this.h * ui.closeY, 'X', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            color: '#fff4d8'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        close.on('pointerdown', () => this.closeRecordBox());
        this.recordBox.add([bg, title, subtitle, profile, name, desc, close]);
        this.tweens.add({ targets: this.recordBox, alpha: 1, duration: 200, ease: 'Sine.out' });
    }

    closeRecordBox() {
        if (!this.recordBox) {
            return;
        }
        const box = this.recordBox;
        const overlay = this.modalOverlay;
        this.recordBox = null;
        this.modalOverlay = null;
        this.tweens.add({
            targets: box,
            alpha: 0,
            duration: 200,
            ease: 'Sine.inOut',
            onComplete: () => {
                box.destroy();
                if (overlay) {
                    overlay.destroy();
                }
                this.modalOpen = false;
                this.approachPaused = false;
                this.setPaintingHotspotsEnabled(true);
                if (this.zoomTween) {
                    this.zoomTween.resume();
                }
            }
        });
    }

    setPaintingHotspotsEnabled(enabled) {
        this.paintings.forEach((painting) => {
            if (!painting.hotspot || painting.hidden) {
                return;
            }
            if (enabled) {
                painting.hotspot.setInteractive({ useHandCursor: true });
            } else {
                painting.hotspot.disableInteractive();
            }
        });
    }

    openPuzzle() {
        if (this.puzzleOpen || this.modalOpen) {
            return;
        }
        this.puzzleOpen = true;
        this.approachPaused = true;
        this.setPaintingHotspotsEnabled(false);
        if (this.recordBox) {
            this.recordBox.destroy();
            this.recordBox = null;
        }
        this.board = Array.from({ length: SCENE4.boardSize }, () => Array(SCENE4.boardSize).fill(0));
        this.puzzleTimeLeft = SCENE4.puzzleTime;
        this.addTile();
        this.addTile();
        this.createPuzzleUi();
        this.renderPuzzle();
        this.input.keyboard.on('keydown', this.handlePuzzleKey, this);
        this.puzzleTimer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.puzzleTimeLeft -= 1;
                this.timerText.setText(`Time: ${this.puzzleTimeLeft}`);
                if (this.puzzleTimeLeft <= 0) {
                    this.finishPuzzle(false);
                }
            }
        });
    }

    createPuzzleUi() {
        const ui = SCENE4.puzzleUi;
        this.puzzlePanel = this.add.container(0, 0).setDepth(100);
        const panel = this.add.rectangle(this.w * ui.x, this.h * ui.y, this.w * ui.w, this.h * ui.h, 0x080706, 0.9)
            .setStrokeStyle(3, 0xd6b675, 0.9);
        const title = this.add.text(this.w * ui.x, this.h * ui.titleY, 'Portal Lock', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '42px',
            color: '#fff4d8'
        }).setOrigin(0.5);
        this.timerText = this.add.text(this.w * ui.x, this.h * ui.timerY, `Time: ${this.puzzleTimeLeft}`, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '28px',
            color: '#f7f2d1'
        }).setOrigin(0.5);
        const hint = this.add.text(this.w * ui.x, this.h * ui.hintY, 'Reach 32 with Arrow Keys or WASD', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            color: '#d8cba4'
        }).setOrigin(0.5);
        this.puzzlePanel.add([panel, title, this.timerText, hint]);

        if (this.textures.exists('sherryThinking')) {
            const sherry = this.add.image(this.w * ui.sherryX, this.h * ui.sherryY, 'sherryThinking').setOrigin(0.5, 1);
            sherry.setScale(Math.min((this.h * ui.sherryH) / sherry.height, 1));
            this.puzzlePanel.add(sherry);
        } else {
            this.puzzlePanel.add(this.add.rectangle(this.w * ui.sherryX, this.h * (ui.sherryY - ui.sherryH / 2), this.w * 0.12, this.h * ui.sherryH, 0x38202d, 0.9));
        }
        this.tileObjects = [];
    }

    renderPuzzle() {
        const ui = SCENE4.puzzleUi;
        this.tileObjects.forEach((tile) => tile.destroy());
        this.tileObjects = [];
        const size = SCENE4.boardSize;
        const tile = this.w * ui.tile;
        const gap = this.w * ui.gap;
        const startX = this.w * ui.x - ((tile + gap) * (size - 1)) / 2;
        const startY = this.h * ui.boardY - ((tile + gap) * (size - 1)) / 2;

        for (let r = 0; r < size; r += 1) {
            for (let c = 0; c < size; c += 1) {
                const value = this.board[r][c];
                const x = startX + c * (tile + gap);
                const y = startY + r * (tile + gap);
                const bg = this.add.rectangle(x, y, tile, tile, value ? 0xffd56f : 0x2a251f, value ? 0.95 : 0.75)
                    .setStrokeStyle(2, 0xb69a60, 0.9);
                this.tileObjects.push(bg);
                this.puzzlePanel.add(bg);
                if (value) {
                    const label = this.add.text(x, y, String(value), {
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '34px',
                        color: '#21170d'
                    }).setOrigin(0.5);
                    this.tileObjects.push(label);
                    this.puzzlePanel.add(label);
                }
            }
        }
    }

    handlePuzzleKey(event) {
        const directions = {
            ArrowLeft: 'left', KeyA: 'left',
            ArrowRight: 'right', KeyD: 'right',
            ArrowUp: 'up', KeyW: 'up',
            ArrowDown: 'down', KeyS: 'down'
        };
        const direction = directions[event.code];
        if (!direction) {
            return;
        }
        event.preventDefault();
        this.movePuzzle(direction);
    }

    movePuzzle(direction) {
        const before = JSON.stringify(this.board);
        const size = SCENE4.boardSize;
        const getLine = (index) => {
            if (direction === 'left') return this.board[index];
            if (direction === 'right') return [...this.board[index]].reverse();
            if (direction === 'up') return this.board.map((row) => row[index]);
            return this.board.map((row) => row[index]).reverse();
        };
        const setLine = (index, line) => {
            const values = (direction === 'right' || direction === 'down') ? [...line].reverse() : line;
            for (let i = 0; i < size; i += 1) {
                if (direction === 'left' || direction === 'right') {
                    this.board[index][i] = values[i];
                } else {
                    this.board[i][index] = values[i];
                }
            }
        };

        for (let i = 0; i < size; i += 1) {
            setLine(i, this.mergeLine(getLine(i)));
        }
        if (before === JSON.stringify(this.board)) {
            return;
        }
        this.addTile();
        this.renderPuzzle();
        if (this.board.flat().some((value) => value >= SCENE4.puzzleGoal)) {
            this.finishPuzzle(true);
        }
    }

    mergeLine(line) {
        const values = line.filter(Boolean);
        const merged = [];
        for (let i = 0; i < values.length; i += 1) {
            if (values[i] === values[i + 1]) {
                merged.push(values[i] * 2);
                i += 1;
            } else {
                merged.push(values[i]);
            }
        }
        while (merged.length < SCENE4.boardSize) {
            merged.push(0);
        }
        return merged;
    }

    addTile() {
        const empty = [];
        this.board.forEach((row, r) => row.forEach((value, c) => {
            if (!value) {
                empty.push({ r, c });
            }
        }));
        if (!empty.length) {
            return;
        }
        const cell = Phaser.Utils.Array.GetRandom(empty);
        this.board[cell.r][cell.c] = Math.random() < 0.85 ? 2 : 4;
    }

    finishPuzzle(success) {
        if (this.puzzleEnded) {
            return;
        }
        this.puzzleEnded = true;
        this.input.keyboard.off('keydown', this.handlePuzzleKey, this);
        if (this.puzzleTimer) {
            this.puzzleTimer.remove(false);
            this.puzzleTimer = null;
        }
        if (this.puzzlePanel) {
            this.puzzlePanel.destroy();
        }
        this.cameras.main.fade(1200, 0, 0, 0);
        fadeOutGameBgm(this, 1200, () => {
            this.scene.start(success ? 'goodEnd' : 'badEnd', success ? {} : {
                reason: 'scene4Timeout',
                returnScene: 'scene4',
                returnData: { startPuzzle: true },
                returnPrompt: 'Click anywhere to retry the portal puzzle'
            });
        });
    }
}

class GoodEndingScene extends Phaser.Scene {
    constructor() {
        super('goodEnd');
    }

    create() {
        this.cameras.main.fadeIn(1600, 0, 0, 0);
        playGoodEndBgm(this);
        this.w = this.scale.width;
        this.h = this.scale.height;

        this.add.image(0, 0, 'scene0Bg')
            .setOrigin(0)
            .setDisplaySize(this.w, this.h)
            .setDepth(-10);
        this.add.rectangle(0, 0, this.w, this.h, 0x000000, 0.28)
            .setOrigin(0)
            .setDepth(-9);

        if (this.textures.exists('Sherry_smile')) {
            const sherry = this.add.image(this.w * 0.78, this.h * 0.98, 'Sherry_smile')
                .setOrigin(0.5, 1)
                .setAlpha(0);
            sherry.setScale((this.h * 0.72) / sherry.height);
            this.tweens.add({
                targets: sherry,
                alpha: 1,
                y: this.h * 0.95,
                duration: 1200,
                ease: 'Sine.out'
            });
        }

        this.endingText = this.add.text(this.w * 0.34, this.h * 0.48, '', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '48px',
            color: '#fff4d8',
            align: 'center',
            lineSpacing: 12,
            stroke: '#000000',
            strokeThickness: 7,
            wordWrap: { width: this.w * 0.52 }
        })
            .setOrigin(0.5)
            .setAlpha(0);

        this.showEndingTextSequence(TEXT.scene4.sequence, 0);
    }

    showEndingTextSequence(lines, index) {
        if (index >= lines.length) {
            this.showGoodEnding();
            return;
        }

        this.endingText.setText(lines[index]);
        this.tweens.add({
            targets: this.endingText,
            alpha: 1,
            duration: 800,
            ease: 'Sine.out',
            onComplete: () => {
                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: this.endingText,
                        alpha: 0,
                        duration: 700,
                        ease: 'Sine.inOut',
                        onComplete: () => this.showEndingTextSequence(lines, index + 1)
                    });
                });
            }
        });
    }

    showGoodEnding() {
        const title = this.add.text(this.w * 0.34, this.h * 0.42, TEXT.scene4.title, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '92px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 9
        }).setOrigin(0.5).setAlpha(0);
        const prompt = this.add.text(this.w * 0.34, this.h * 0.58, TEXT.scene4.returnPrompt, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            color: '#fff4d8',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({ targets: title, alpha: 1, y: this.h * 0.39, duration: 900, ease: 'Back.out' });
        this.tweens.add({ targets: prompt, alpha: 1, duration: 700, delay: 550, ease: 'Sine.out' });
        this.input.once('pointerdown', () => this.scene.start('scene0', { goodEndingUnlocked: true }));
    }
}

class BadEndScene extends Phaser.Scene {
    constructor() {
        super('badEnd');
    }

    init(data = {}) {
        this.reason = data && data.reason ? data.reason : 'default';
        this.returnScene = data.returnScene || 'scene0';
        this.returnData = data.returnData || {};
        this.returnPrompt = data.returnPrompt || 'Click anywhere to return to the main menu';
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;
        const hints = TEXT.badEndHints || {};
        const hint = hints[this.reason] || hints.default || 'Sometimes failure is just part of the journey.';

        this.add.rectangle(0, 0, w, h, 0x000000).setOrigin(0);

        const art1 = this.add.image(w / 2, h / 2, 'badEnd1')
            .setOrigin(0.5)
            .setAlpha(0)
            .setDisplaySize(w, h);

        const art2 = this.add.image(w / 2, h / 2, 'badEnd2')
            .setOrigin(0.5)
            .setAlpha(0)
            .setDisplaySize(w, h);

        const badText = this.add.text(w / 2, h / 2 + 40, 'Bad End', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '110px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        })
            .setOrigin(0.5)
            .setAlpha(0);

        const returnText = this.add.text(w / 2, h * 0.9, `${this.returnPrompt}\n\nHint: ${hint}`, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '26px',
            color: '#f0f0f0',
            stroke: '#000000',
            strokeThickness: 4
        })
            .setOrigin(0.5)
            .setAlpha(0);

        this.tweens.add({
            targets: art1,
            alpha: 1,
            duration: 1000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.tweens.add({
                    targets: art2,
                    alpha: 1,
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        art1.destroy();

                        this.tweens.add({
                            targets: art2,
                            alpha: 0,
                            duration: 1200,
                            delay: 500,
                            ease: 'Sine.easeInOut'
                        });

                        this.tweens.add({
                            targets: badText,
                            y: h / 2,
                            alpha: 1,
                            duration: 1200,
                            delay: 900,
                            ease: 'Back.easeOut'
                        });

                        this.tweens.add({
                            targets: returnText,
                            alpha: 1,
                            duration: 800,
                            delay: 1800
                        });
                    }
                });
            }
        });

        this.input.once('pointerdown', () => {
            this.scene.start(this.returnScene, this.returnData);
        });
    }
}

const game = new Phaser.Game({
    parent: 'root',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [PreloadScene, MenuScene, CellScene, CorridorScene, SolitaryRoomScene, EscapeScene, GoodEndingScene, BadEndScene],
    title: 'Adventure Game'
});
