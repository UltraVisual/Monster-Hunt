ig.module(
        'game.entities.death-explosion'
    )
    .requires(
        'impact.entity',
        'game.entities.death-explosion-particle'
    )
    .defines(function () {
        EntityDeathExplosion = ig.Entity.extend({
            _wmInEditor: false,
            idleTimer: null,
            lifetime: 1,
            callback: null,
            particles: 25,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                for (var i = 0; i < this.particles; i++) {
                    ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                }
                this.idleTimer = new ig.Timer();
            },
            update: function(){
                if(this.idleTimer && (this.idleTimer.delta() > this.lifetime)){
                    this.kill();
                    if(this.callback){
                        this.callback();
                    }
                }
            }
        })
    });
