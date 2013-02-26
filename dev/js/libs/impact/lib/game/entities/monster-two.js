ig.module(
        'game.entities.monster-two'
    )
    .requires(
        'impact.entity',
        'game.entities.monster-one'
    )
    .defines(function () {
        EntityMonsterTwo = EntityMonsterOne.extend({
            size:{x:120, y:97},
            animSheet: new ig.AnimationSheet('media/monster-two.png', 120, 97),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },
            update: function () {
                this.parent();
            }
        })
    });