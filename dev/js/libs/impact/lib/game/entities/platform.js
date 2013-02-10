ig.module(
        'game.entities.platform'
    )
    .requires(
        'impact.entity',
        'game.entities.player'
    )
    .defines(function () {
        EntityPlatform = ig.Entity.extend({
            size:{x:262, y:64},
            animSheet: new ig.AnimationSheet('media/platform.png', 262, 64),
            collides: ig.Entity.COLLIDES.FIXED,
            checkAgainst: ig.Entity.TYPE.NONE,
            gravityFactor: 0,
            direction: 'up',
            downDistance: 0,
            upDistance: 0,
            leftDistance: 0,
            rightDistance: 0,
            speed: 1,
            startPosition: 0,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idol', 1, [0]);
                if (this.direction == 'vertical') {
                    this.startPosition = {x: this.pos.x, y: this.pos.y + (this.downDistance * this.size.y)};
                }
                else {
                    this.startPosition = {x: this.pos.x - (this.leftDistance * this.size.y), y: this.pos.y};
                }

            },
            collideWith: function( other, axis ){
                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if(player == other){
                    if(this.direction == 'horizontal') player.pos.x += this.speed;
                }
            },
            update: function () {
                if (this.direction == 'vertical') {
                    if ((this.pos.y > this.startPosition.y) || this.pos.y < (this.startPosition.y - (this.upDistance + this.downDistance) * this.size.y)) {
                        this.speed *= -1;
                    }
                    this.pos.y += this.speed;
                }
                else if (this.direction == 'horizontal') {
                    var maxRight = (this.leftDistance + this.rightDistance) * this.size.y;
                    if ((this.pos.x < this.startPosition.x) || this.pos.x > (this.startPosition.x + maxRight)) {
                        this.speed *= -1
                    }
                    this.pos.x += this.speed;
                }
                this.parent();
            }
        })
    });
