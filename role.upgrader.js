var rechargeEnergy = require('recharge.energy');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        //creep.pos.createConstructionSite(STRUCTURE_ROAD);
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_STORAGE; } });
            if (targets) {
                if (targets[0].store[RESOURCE_ENERGY] >= 150) {
                    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } }, { reusePath: 50 });
                    }
                }
                else { rechargeEnergy.run(creep);}
            }

            else {
                rechargeEnergy.run(creep);
            }
        }
    }
};

module.exports = roleUpgrader;