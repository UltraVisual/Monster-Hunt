ig.module(
        'game.entities.monster-four'
    )
    .requires(
        'impact.entity',
        'game.entities.monster-one'
    )
    .defines(function () {
        EntityMonsterFour = EntityMonsterOne.extend({
            size:{x:120, y:97},
            animSheet: new ig.AnimationSheet('media/monster-four.png', 120, 97),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },
            update: function () {
                this.parent();
            }
        })
    });