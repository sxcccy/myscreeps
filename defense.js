var defense = {

    run: function () {
        towerDefence('5cc7362e2063582490f52be6');
        towerDefence('5cb2b2ccb27105207a9c5770');
        towerDefence('5cb892b3ad71ed4f5cd3945e');
    }

};

function towerDefence(id) {
    var tower = Game.getObjectById(id);
    if (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function (object) {
                return (object.getActiveBodyparts(HEAL) > 0 && object.owner.username != 'Invader');
            }
        });       
        if (closestHostile) {
            tower.attack(closestHostile);
        }
        else {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return object.owner.username != 'Invader';
                }
            });
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            else {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax * 0.8 ||
                            structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax * 0.8)
                    }
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }

    }
}
module.exports = defense;