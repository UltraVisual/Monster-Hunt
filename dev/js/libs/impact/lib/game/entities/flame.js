ig.module(
        'game.entities.flame'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityFlame = ig.Entity.extend({
            size:{x:32, y:32},
            animSheet: new ig.AnimationSheet('media/fire-anim.png', 32, 32),
            checkAgainst: ig.Entity.TYPE.A,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse());
//                this.currentAnim.frame = Math.floor(Math.random() * 15)
            },
            check: function (other) {
                if (typeof other.hit != 'undefined') {
                    other.hit(5);
                }
            }

        })
    });
