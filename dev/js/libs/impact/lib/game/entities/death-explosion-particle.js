ig.module(
        'game.entities.death-explosion-particle'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityDeathExplosionParticle = ig.Entity.extend({
            _wmInEditor: false,
            size: {x: 4, y: 4},
            maxVel: {x: 160, y: 200},
            lifetime: 2,
            fadeTime: 5,
            bounciness: 1,
            vel: {x: 100, y: 30},
            collides: ig.Entity.COLLIDES.LITE,
            colorOffset: 0,
            totalColors: 4,
            idleTimer: null,
            animSheet: new ig.AnimationSheet('media/blood.png', 8, 8),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                var frameID = Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
                this.addAnim('idle', 0.2, [frameID]);
                this.vel.x = (Math.random() * 2 - 1 ) * this.vel.x;
                this.vel.y = (Math.random() * 2 - 1 ) * this.vel.y;
                this.idleTimer = new ig.Timer();
            },
            update: function () {
                if (this.idleTimer && (this.idleTimer.delta() > this.lifetime)) {
                    this.kill();
                    return;
                }
                this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadeTime, this.lifetime, 1, 0);
                this.parent()
            }
        })
    });
