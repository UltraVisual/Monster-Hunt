ig.module(
        'game.models.player-model'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        PlayerModel = function () {
        };
        PlayerModel.prototype = {
            health: 10,
            pos: {x: 35, y: 35},
            score: 0,
            lives:3,
            coins:{total:0, amount:0},
            hasGun:false,
            setHealth: function (val) {
                this.health = val;
            },
            setScore:function(val){
               this.score = val;
            },
            setLives:function(val){
               this.lives = val;
            },
            setCoins:function(val){
               this.coins.amount = val;
            }
        };
    });
