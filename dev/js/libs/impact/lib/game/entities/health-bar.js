ig.module(
        'game.entities.health-bar'
    )
    .requires(
        'impact.entity',
        'game.models.player-model'
    )
    .defines(function () {
        EntityHealthBar = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/healthbar.png', 150, 21),
            size: {x: 150, y: 21},
            states: {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10'},
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.NONE,
            gravityFactor: 0,
            font: new ig.Font('media/04b03.font.png'),
            checkAgainst: ig.Entity.TYPE.NONE,
            currentHealth: 10,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.zIndex = 100;
                this.addAnim('10', 1, [10]);
                this.addAnim('9', 1, [9]);
                this.addAnim('8', 1, [8]);
                this.addAnim('7', 1, [7]);
                this.addAnim('6', 1, [6]);
                this.addAnim('5', 1, [5]);
                this.addAnim('4', 1, [4]);
                this.addAnim('3', 1, [3]);
                this.addAnim('2', 1, [2]);
                this.addAnim('1', 1, [1]);
                this.addAnim('0', 1, [0]);
            },
            update: function () {
                var healthModel = ig.game.model || new PlayerModel();
                this.pos.x = ig.game.screen.x + healthModel.pos.x;
                this.pos.y = ig.game.screen.y + healthModel.pos.y;
                this.currentHealth = healthModel.health;
                this.currentAnim = this.anims[this.states[this.currentHealth]];
                this.parent();
            },
            draw: function () {
                this.parent();
                this.font.draw((this.currentHealth * 10).toString() + '%', (this.pos.x - ig.game.screen.x) + 170, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.LEFT);
                this.font.draw("Lives:" + (ig.game.model ? ig.game.model.lives + "/3" : "0/0"), (this.pos.x - ig.game.screen.x) + 350, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.LEFT);
                this.font.draw("Coins:" + (ig.game.model ? ig.game.model.coins.amount + "/" + ig.game.model.coins.total : "0/0"), (this.pos.x - ig.game.screen.x) + 550, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.LEFT);
                this.font.draw("Score:" + (ig.game.model ? ig.game.model.score : 0).toString(), (this.pos.x - ig.game.screen.x) + 850, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.LEFT);
            }
        })
    });
