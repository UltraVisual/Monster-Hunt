ig.module(
        'game.entities.blocker'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityBlocker = ig.Entity.extend({
            size: {x: 128, y: 128},
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255, 0, 0, 0.2)',
            checkAgainst: ig.Entity.TYPE.BOTH,
            update: function () {

            },
            check: function (other) {
                if (typeof other.triggerCollision != 'undefined') {
                    other.triggerCollision();
                }
            }
        })
    });
