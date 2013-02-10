ig.module(
        'game.models.sprites-data'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {
        SpritesData = {
            SPIKES:4,
            EGG:3,
            BALL:0,
            DOGGY_BISCUIT:1,
            FIRE_BALL:2
        };
    });
