ig.module(
        'game.entities.spot'
    )
    .requires(
        'impact.entity',
        'game.abstract.collectible',
        'game.models.sprites-data'
    )
    .defines(function () {
        EntitySpot = ig.Entity.extend({
            sound: new ig.Sound('media/sounds/sfx.*'),
            removeMe: false,
            isBeingRemoved: false,
            animSheet: new ig.AnimationSheet('media/spot.png', 120, 106),
            size: {x: 120, y: 106},
            checkAgainst: ig.Entity.TYPE.BOTH,
            tweenOut: false,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                ig.game.spot = this;
                this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
                this.addAnim('kidnap', 0.1, [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
            },
            check: function (other) {
                if (typeof other.hit != 'undefined' && !this.tweenOut) {
                    this.sound.play();
                    this.tweenOut = true;
                }
            },
            update: function () {
                if (this.removeMe && !this.isBeingRemoved) {
                    this.isBeingRemoved = true;
                    this.tweenMeOut()
                }
                if (this.currentAnim == this.anims['kidnap'] && this.currentAnim.frame >= 13) {
                    this.currentAnim.alpha = 0;
                    this.kill();
                }
                this.parent();
            },
            tweenMeOut: function () {
                this.currentAnim = this.anims['kidnap'];
            }
        })
    });