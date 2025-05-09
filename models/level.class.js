class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
 * Creates an instance of the Level class, initializing the level with enemies, clouds,
 * background objects, coins, and bottles.
 * 
 * @param {Array} enemies - The enemies present in this level.
 * @param {Array} clouds - The clouds present in this level.
 * @param {Array} backgroundObjects - The background objects in this level.
 * @param {Array} coins - The coins present in this level.
 * @param {Array} bottles - The bottles present in this level.
 */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}

