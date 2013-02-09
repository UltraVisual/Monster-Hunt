ig.module(
        'game.entities.start-button'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        EntityStartButton = ig.Entity.extend({
            size: {x: 277, y: 88},
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.NONE,
            gravityFactor: 0,
            animSheet: new ig.AnimationSheet('media/start-button.png', 277, 88),

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                ig.input.initMouse();
                this.addAnim('up', 0.2, [1]);
                this.addAnim('over', 0.2, [0]);
            },

            mouseIsOverOnXAxis: function () {
                return ig.input.mouse.x > this.pos.x && ig.input.mouse.x < this.pos.x + 277;
            },

            mouseIsOverOnYAxis: function () {
                return ig.input.mouse.y > this.pos.y && ig.input.mouse.y < this.pos.y + 88;
            },

            update: function () {
                if (this.mouseIsOverOnXAxis() && this.mouseIsOverOnYAxis()) {
                    this.mouseOver();
                    if(ig.input.state('mouse-pressed')){
                        this.onClick();
                    }
                }
                else {
                    this.mouseOut();
                }
                this.parent();
            },

            mouseOver: function () {
                this.currentAnim = this.anims['over'];
                window.document.body.style.cursor = 'pointer';
            },

            mouseOut: function () {
                this.currentAnim = this.anims['up'];
                window.document.body.style.cursor = 'auto';
            },

            onClick: function () {
                window.document.body.style.cursor = 'auto';
                ig.game.removeEntity(this);
                ig.game.showInstructions();
            }
        })
    });
