ig.module(
        'game.entities.bullet'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityBullet = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/bullet.png', 16, 16),
            size: {x: 2, y: 1},
            callback: null,
            resetCallback: null,
            timer: null,
            life: 2,
            maxVel: {x: 200, y: 0},
            checkAgainst: ig.Entity.TYPE.BOTH,
            type: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE,
            tweenOut: false,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.addAnim('idle', 0.2, [0]);
                this.timer = new ig.Timer();
            },
            update: function () {
                this.parent();
                if (this.timer !== null && this.timer.delta() > this.life) {
                    this.timer = null;
                    if (this.callback) this.callback();
                }
                if (this.timer !== null && this.timer.delta() > 0.2) {
                    if (this.resetCallback) this.resetCallback();
                }
            },
            handleMovementTrace: function (res) {
                this.parent(res);
                if (res.collision) {
                    if (res.collision.x || res.collision.y) {
                        this.kill();
                    }
                }
            },
            check: function (other) {
                if (typeof other.hit != 'undefined' && other.toString() !== 'Archie') {
                    other.hit();
                    this.kill();
                }
            },
            kill: function () {
                this.parent();
                if (this.callback) this.callback();
            }
        })
    });