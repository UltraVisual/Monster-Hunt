ig.module(
        'game.entities.end-point'
    )
    .requires(
        'impact.entity',
        'game.entities.spot'
    )
    .defines(function () {
        EntityEndPoint = ig.Entity.extend({
            size: {x: 64, y: 256},
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255, 0, 0, 0.2)',
            checkAgainst: ig.Entity.TYPE.BOTH,
            update: function () {

            },
            check: function (other) {
                if (typeof other.triggerCollision != 'undefined') {
                    var spot = ig.game.spot;
                    if(spot && !spot.removeMe) {
                        spot.removeMe = true;
                        ig.game.model.setScore(ig.game.model.score + 1000);
                        ig.game.levelComplete();
                    }
                }
            }
        })
    });
