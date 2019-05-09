/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var defense = {

    run: function () {
        'use strict';
        //room 6e29s
        towerDefence('5cc7362e2063582490f52be6');
        towerDefence('5ccd7b02f629c624a2096da4');
        towerDefence('5cb2b2ccb27105207a9c5770');
        //room 5e29s
        towerDefence('5cb892b3ad71ed4f5cd3945e');

        //room 5e28s
        towerDefence('5ccc2d505bdcc824ce25e46e');


    }

};

function towerDefence(id) {
    'use strict';
    var tower = Game.getObjectById(id);
    var towerpower = tower.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_TOWER;
        }
    }).length * 150;
    var myRangedAttackCreeps = tower.room.find(FIND_MY_CREEPS);
    var Hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
    var enemyHeal = 0;
    var creeppower = 0;
    if (myRangedAttackCreeps.length) {
        for (let name in myRangedAttackCreeps) {
            creeppower += myRangedAttackCreeps[name].getActiveBodyparts(RANGED_ATTACK) * 10;
        }
    }
    if (Hostiles.length) {
        for (let name in Hostiles) {
            enemyHeal += Hostiles[name].getActiveBodyparts(HEAL) * 12;
        }

        if (tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                console.log('e' + enemyHeal, 't' + towerpower, 'c' + creeppower);
                if ((towerpower + creeppower) > enemyHeal * 1.5) {
                    tower.attack(closestHostile);
                } else {
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax * 0.8 ||
                                structure.structureType === STRUCTURE_CONTAINER && structure.hits < structure.hitsMax * 0.8);
                        }
                    });
                    if (closestDamagedStructure) {
                        tower.repair(closestDamagedStructure);
                    }
                }
            }
        }
    } else {
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax * 0.8 ||
                structure.structureType === STRUCTURE_CONTAINER && structure.hits < structure.hitsMax * 0.8)
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }
}
module.exports = defense;