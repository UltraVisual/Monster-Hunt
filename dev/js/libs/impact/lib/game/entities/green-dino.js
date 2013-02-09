ig.module(
        'game.entities.green-dino'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityGreenDino = ig.Entity.extend({
            size: {x: 42, y: 43},
            offset: {x: 4, y: 0},
            animSheet: new ig.AnimationSheet('media/green-dino.png', 42, 43),
            flip: false,
            friction: {x: 150, y: 0},
            speed: 14,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.BOTH,
            hasCollided: false,
            maxVel: {x: 100, y: 100},
            dieSound: new ig.Sound('media/sounds/dino-die.*'),
            justFlipped:false,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [0]);
                this.addAnim('walk', 0.03, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].reverse());
                this.currentAnim = this.anims['walk'];
            },
            update: function () {
                var self = this;
                if (!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? 0 : this.size.x), this.pos.y + this.size.y + 1) || this.hasCollided) {
                    self.hasCollided = false;
                    if (!self.justFlipped) {
                        self.flip = !this.flip;
                        self.justFlipped = true;
                        setTimeout(function(){
                            self.justFlipped = false;
                        }, 1000)
                    }
                }
                var xdir = this.flip ? 2 : -2;
                this.vel.x = this.speed * xdir;
                this.currentAnim.flip.x = this.flip;
                this.parent();
            },
            handleMovementTrace: function (res) {
                this.parent(res);
                if (res.collision.x) {
                    this.flip = !this.flip;
                }
            },
            triggerCollision: function () {
                this.hasCollided = true;
            },
            check: function (other) {
                if (typeof other.hit != 'undefined') {
                    other.hit();
                }
            },
            hit: function () {
                this.kill();
            },
            kill: function () {
                this.parent();
                this.dieSound.play();
                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y);
            }
        })
    });