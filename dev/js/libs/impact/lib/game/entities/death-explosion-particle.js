ig.module(
        'game.entities.death-explosion-particle'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityDeathExplosionParticle = ig.Entity.extend({
            _wmInEditor: false,
            size: {x: 32, y: 32},
            maxVel: {x: 160, y: 200},
            lifetime: 1.0,
            fadeTime: 0.5,
            bounciness: 0.6,
            vel: null,
            colorOffset: 0,
            idleTimer: null,
            gravityFactor: 0,
            animSheet: new ig.AnimationSheet('media/blood.png', 32, 32),
            init: function (x, y, settings) {
                this.addAnim('idle', 0.3, [0]);
                this.vel = { x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 100, y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 100 };
                this.idleTimer = new ig.Timer();
                this.parent(x, y, settings);
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
