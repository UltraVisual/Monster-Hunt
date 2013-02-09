ig.module(
        'game.entities.yellow-dino'
    )
    .requires(
        'impact.entity',
        'game.entities.green-dino',
        'game.entities.fire-shot'
    )
    .defines(function () {
        EntityYellowDino = EntityGreenDino.extend({
            size: {x: 42, y: 43},
            animSheet: new ig.AnimationSheet('media/yellow-dino.png', 42, 43),
            timer: null,
            delay: 5,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.timer = new ig.Timer();
            },
            update: function () {
                if (this.timer && this.timer.delta() > this.delay) {
                    this.timer.reset();
                    ig.game.spawnEntity(EntityFireShot, this.pos.x, this.pos.y, {flip: !this.flip});
                }
                this.parent();
            }
        })
    });