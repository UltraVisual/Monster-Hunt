ig.module(
        'game.abstract.collectible'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityCollectible = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/sprites.png', 100, 100),
            size: {x: 100, y: 100},
            checkAgainst: ig.Entity.TYPE.BOTH,
            tweenOut: false,
            update: function () {
                this.parent();
                if (this.tweenOut) {
                    this.pos.y -= 2;
                    this.currentAnim.alpha -= 0.05;
                    if(this.currentAnim.alpha <= 0){
                        ig.game.removeEntity(this);
                    }
                }
            }
        })
    });
