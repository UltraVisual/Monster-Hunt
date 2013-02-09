ig.module(
        'game.entities.platform'
    )
    .requires(
        'impact.entity',
        'game.entities.archie'
    )
    .defines(function () {
        EntityPlatform = ig.Entity.extend({
            size:{x:96, y:32},
            animSheet: new ig.AnimationSheet('media/platform.png', 96, 32),
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
                    this.startPosition = {x: this.pos.x, y: this.pos.y + (this.downDistance * 32)};
                }
                else {
                    this.startPosition = {x: this.pos.x - (this.leftDistance * 32), y: this.pos.y};
                }

            },
            collideWith: function( other, axis ){
                var archie = ig.game.getEntitiesByType( EntityArchie )[0];
                if(archie == other){
                    if(this.direction == 'horizontal') archie.pos.x += this.speed;
                }
            },
            update: function () {
                if (this.direction == 'vertical') {
                    if ((this.pos.y > this.startPosition.y) || this.pos.y < (this.startPosition.y - (this.upDistance + this.downDistance) * 32)) {
                        this.speed *= -1;
                    }
                    this.pos.y += this.speed;
                }
                else if (this.direction == 'horizontal') {
                    var maxRight = (this.leftDistance + this.rightDistance) * 32;
                    if ((this.pos.x < this.startPosition.x) || this.pos.x > (this.startPosition.x + maxRight)) {
                        this.speed *= -1
                    }
                    this.pos.x += this.speed;
                }
                this.parent();
            }
        })
    });
