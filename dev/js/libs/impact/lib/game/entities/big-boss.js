ig.module(
        'game.entities.big-boss'
    )
    .requires(
        'impact.entity',
        'game.entities.monster-one'
    )
    .defines(function () {
        EntityBigBoss = EntityMonsterOne.extend({
            size:{x:120, y:97},
            animSheet: new ig.AnimationSheet('media/bigBoss.png', 120, 97),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },
            update: function () {
                this.parent();
            }
        })
    });