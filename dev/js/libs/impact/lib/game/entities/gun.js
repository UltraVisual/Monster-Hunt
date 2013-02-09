ig.module(
        'game.entities.gun'
    )
    .requires(
        'impact.entity',
        'game.abstract.collectible',
        'game.models.sprites-data'

    )
    .defines(function () {
        EntityGun = EntityCollectible.extend({
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [SpritesData.GUN]);
            },
            check: function (other) {
                if (typeof other.hit != 'undefined' && !this.tweenOut) {
                    ig.game.model.setScore(ig.game.model.score + 500);
                    this.tweenOut = true;
                    this.checkAgainst = ig.Entity.TYPE.NONE;
                    other.enableGun();
                }
            }
        })
    });
