ig.module(
        'game.entities.fire-ball'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityFireBall = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/sprites.png', 32, 32),
            size: {x: 32, y: 32},
            distance: 0,
            animate: false,
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor:0,
            checkAgainst: ig.Entity.TYPE.A,
            life:0,
            timer : null,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.startPosition = {x:x, y:y};
                this.addAnim('idle', 1, [SpritesData.FIRE_BALL]);
                this.timer = new ig.Timer();
            },
            check: function (other) {
                if (typeof other.hit != 'undefined') {
                    other.hit(5);
                }
            },
            update: function () {
                if (!this.animate && this.timer.delta() >= this.life) {
                    this.animate = true;
                    this.currentAnim.alpha = 1;
                }
                else if(!this.animate){
                    this.currentAnim.alpha = 0;
                }
                if (this.animate) {
                    this.pos.y -= 2;
                    var number = this.startPosition.y - (this.distance * 32);
                    if (this.pos.y < number) {
                        this.timer.reset();
                        this.animate = false;
                        this.currentAnim.alpha = 0;
                        this.pos.y = this.startPosition.y;
                    }
                }
            }
        })
    });
