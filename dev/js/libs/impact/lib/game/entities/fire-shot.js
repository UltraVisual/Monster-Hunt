ig.module(
        'game.entities.fire-shot'
    )
    .requires(
        'impact.entity',
        'game.entities.bullet'
    )
    .defines(function () {
        EntityFireShot = EntityBullet.extend({
            animSheet: new ig.AnimationSheet('media/fire-shot.png', 16, 16),
            init:function(x, y, settings){
                this.parent(x, y, settings);
            },
            update:function(){
                this.parent();
                this.currentAnim.flip.x = this.flip;
            }
        })
    });
