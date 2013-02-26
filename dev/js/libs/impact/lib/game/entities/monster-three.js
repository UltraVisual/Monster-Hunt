ig.module(
        'game.entities.monster-three'
    )
    .requires(
        'impact.entity',
        'game.entities.monster-one'
    )
    .defines(function () {
        EntityMonsterThree = EntityMonsterOne.extend({
            size:{x:120, y:97},
            animSheet: new ig.AnimationSheet('media/monster-three.png', 120, 97),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },
            update: function () {
                this.parent();
            }
        })
    });