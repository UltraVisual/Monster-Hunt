ig.module(
        'game.entities.egg'
    )
    .requires(
        'impact.entity',
        'game.abstract.collectible',
        'game.models.sprites-data'
    )
    .defines(function () {
        EntityEgg = EntityCollectible.extend({
            sound: new ig.Sound('media/sounds/egg.*'),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [SpritesData.EGG]);
            },
            check: function (other) {
                if (typeof other.hit != 'undefined' && !this.tweenOut && this.currentAnim.alpha > 0) {
                    this.sound.play();
                    ig.game.model.setScore(ig.game.model.score + 1000);
                    this.tweenOut = true;
                    this.checkAgainst = ig.Entity.TYPE.NONE;
                    ig.game.levelComplete();
                }
            },
            update: function () {
                if (!this.tweenOut) {
                    if (ig.game.model.coins.amount == ig.game.model.coins.total) {
                        this.currentAnim.alpha = 1;
                    }
                    else {
                        this.currentAnim.alpha = 0;
                    }
                }
                this.parent();
            }
        })
    });