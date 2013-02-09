ig.module(
        'game.entities.checkpoint'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityCheckpoint = ig.Entity.extend({
            size: {x: 32, y: 64},
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0, 255, 0, 0.2)',
            checkAgainst: ig.Entity.TYPE.BOTH,
            update: function () {

            },
            check: function (other) {
                if (typeof other.triggerCollision != 'undefined') {
                    console.log('yeah hit a check point!!', other.startPosition)
                    other.startPosition = other.pos;
                    console.log('position has been reset', other.startPosition)

                }
            }
        })
    });
