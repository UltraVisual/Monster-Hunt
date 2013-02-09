ig.module(
        'game.models.sprites-data'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        SpritesData = {
            SPIKES:0,
            EGG:3,
            GUN:1,
            COIN:4,
            FIRE_BALL:2
        };

    });
