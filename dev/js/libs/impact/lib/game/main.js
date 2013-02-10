ig.module(
        'game.main'
    )
    .requires(
        'impact.game',
        'impact.font',
        'game.models.player-model',
        'game.entities.start-button',
        'game.levels.levelOne'
    )
    .defines(function () {
        MyGame = ig.Game.extend({
            levels: [
                {level: LevelLevelOne, backGround: 'media/sky-one.png', biscuits: 5, title: 'Level One - The Outer Reaches'}
            ],
            model: new PlayerModel(),
            gravity: 300,
            font: new ig.Font('media/04b03.font.png'),
            background: null,
            clearColor: null,
            levelIndex: 0,
            self: null,
            startScore:0,
            skyOne: new ig.Image('media/sky-one.png'),
            instructionsScreen: new ig.Image('media/instructions.png'),
            titleImage: new ig.Image('media/title.png'),
            levelDoneImage: new ig.Image("media/level-complete.png"),
            skyTwo: new ig.Image("media/sky-two.png"),
            skyThree: new ig.Image("media/sky-three.png"),
            skyFour: new ig.Image("media/sky-four.png"),
            skyFive: new ig.Image("media/sky-five.png"),
            successScreen: new ig.Image("media/success.png"),
            failureScreen: new ig.Image("media/game-over.png"),
            hasInstructions: false,
            levelIsComplete: false,
            startData: null,
            init: function () {
                self = this;
//                if(ig.ua.mobile){
//                    ig.Sound.enabled = false;
//                }
//                ig.music.add('media/sounds/Monster-Hunt.*');
//                ig.music.volume = 0.3;
//                ig.music.play();
                this.startPosition = {x: this.screen.x, y: this.screen.y};
                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.R, 'restart');
                ig.input.bind(ig.KEY.UP_ARROW, 'jump');
                ig.input.bind(ig.KEY.SPACE, 'jump');
                ig.input.bind(ig.KEY.X, 'proceed');
                ig.input.bind(ig.KEY.Z, 'shoot');
                ig.input.bind(ig.KEY.MOUSE1, 'mouse-pressed');
                this.showStartScreen();
            },

            getLifeValue: function () {
                return Math.random() * 10;
            },

            restartLevel: function () {
                self.model.setHealth(self.startData.health);
                self.model.setLives(self.startData.lives);
                self.model.setScore(this.startScore);
                self.model.setBiscuits(0);
                self.levelIndex--;
                self.addLevel();
            },

            gameOver: function () {
                this.removeLevel();
                this.background = this.failureScreen;
            },

            showInstructions: function () {
                this.background = this.instructionsScreen;
                this.hasInstructions = true;
            },

            removeLevel: function () {
                this.entities = [];
                this.backgroundMaps = [];
            },

            showFirstLevel: function () {
                this.hasInstructions = false;
                self.addLevel();
            },
            showStartScreen: function () {
                this.background = this.titleImage;
                ig.game.spawnEntity(EntityStartButton, 550, 275)
            },
            showEndOfLevelScreen: function () {
                self.removeLevel();
                self.levelIsComplete = true;
//                self.levelDoneImage = new ig.Image("media/level-complete.png");
            },
            gameComplete: function () {
                self.removeLevel();
                self.background = self.successScreen;
            },
            levelComplete: function () {
                this.startScore = this.model.score;
                if(this.levelIndex < this.levels.length){
                    setTimeout(self.showEndOfLevelScreen, 1000)
                }
                else{
                    setTimeout(self.gameComplete, 1000)
                }
            },

            addLevel: function () {
                this.model.setScore(this.startScore)
                this.startData = {lives: this.model.lives, health: this.model.health};
                var levelData = this.levels[this.levelIndex];
                if (typeof levelData != 'undefined') {
                    this.model.biscuits.total = levelData.biscuits;
                    this.model.biscuits.amount = 0;
                    if (levelData.backGround) {
                        this.background = new ig.Image(levelData.backGround);
                    }
                    this.loadLevelDeferred(levelData.level);
                    this.levelIndex++;
                }
                ig.music.stop();
            },

            update: function () {
                if (ig.input.state('restart')) {
                    this.restartLevel();
                }
                else if(ig.input.state('proceed')){
                    if (this.background == this.instructionsScreen) {
                        this.showFirstLevel();
                    }
                    else if (this.levelIsComplete === true) {
                        this.levelIsComplete = false;
                        self.addLevel();
                    }
                    else if(this.background === this.failureScreen || this.background === this.successScreen){
                        ig.system.setGame(MyGame);
                    }
                }


                this._setCameraPosition();
                this._checkCameraIsInBounds.call(this);
                this.parent();
            },

            draw: function () {
                if (this.levelIsComplete === true) {
                    this.levelDoneImage.draw(0, 0);
                }
                else {
                    this.background.draw(0, 0);
                }
                this.parent();
            },

            resetPlayer: function () {
                this.model.health = 10;
                this.screen.x = this.startPosition.x;
                this.screen.y = this.startPosition.y;
            },

            _setCameraPosition: function () {
                var player = this.getEntitiesByType(EntityPlayer)[0];
                if (player !== undefined) {
                    if (player.hasPassedHalfway) {
                        this.screen.x = player.pos.x - ig.system.width * 0.5;
                    }
                    this.screen.y = player.pos.y - ig.system.height * 0.5;
                }
            },

            _checkCameraIsInBounds: function () {
                if (this.screen.x <= 0) {
                    this.screen.x = 0;
                }
                if (this.screen.y <= 0) {
                    this.screen.y = 0;
                }
                if (this.screen.x >= this.collisionMap.width * this.collisionMap.tilesize - ig.system.width) {
                    this.screen.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
                }

                if (this.screen.y >= this.collisionMap.height * this.collisionMap.tilesize - ig.system.height) {
                    this.screen.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
                }
            }
        });

        ig.main('#canvas', MyGame, 60, 1000, 750, 1);
    })
;
