ig.module(
        'game.entities.biscuit'
    )
    .requires(
        'impact.entity',
        'game.abstract.collectible',
        'game.models.sprites-data',
        'impact.sound'
    )
    .defines(function () {
        EntityBiscuit = EntityCollectible.extend({
            sound: new ig.Sound('media/sounds/sfx.*'),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [SpritesData.DOGGY_BISCUIT]);
            },
            check: function (other) {
                if (typeof other.hit != 'undefined' && !this.tweenOut) {
                    this.sound.play();
                    ig.game.model.setScore(ig.game.model.score + 500);
                    this.tweenOut = true;
                    ig.game.model.biscuits.amount += 1;
                    this.checkAgainst = ig.Entity.TYPE.NONE;
                }
            }
        })
    });
