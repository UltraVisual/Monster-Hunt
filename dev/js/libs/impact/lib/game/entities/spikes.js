ig.module(
        'game.entities.spikes'
    )
    .requires(
        'impact.entity',
        'game.models.sprites-data'
    )
    .defines(function () {
        EntitySpikes = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/sprites.png', 32, 32),
            size: {x: 32, y: 32},
            checkAgainst: ig.Entity.TYPE.BOTH,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [SpritesData.SPIKES]);
            },
            check:function(other){
                if (typeof other.hit != 'undefined'){
                    other.hit(5);
                }
            }
        })
    });
