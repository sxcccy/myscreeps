var defense = {

    run: function () {
        towerDefence('5cb33da9c1d9617d627e440a');
        towerDefence('5cb2b2ccb27105207a9c5770');
        towerDefence('5cb892b3ad71ed4f5cd3945e');
    }

};

function towerDefence(id) {
    var tower = Game.getObjectById(id);
    if (tower) {      
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
        else {
            //var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            //    filter: (structure) => structure.hits < structure.hitsMax
            //});
            //if (closestDamagedStructure) {
            //    tower.repair(closestDamagedStructure);
            //}
        }
    }
}
module.exports = defense;