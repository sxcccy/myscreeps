var rechargeEnergy = require('recharge.energy');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //creep.pos.createConstructionSite(STRUCTURE_ROAD);

        if (creep.carry.energy == 0) { creep.memory.working = false; }
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.working) {
            rechargeEnergy.run(creep);
        }
        else {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                creep.memory.working = true;
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                }
            }
            else {
                creep.memory.working = true; 
                var storage = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_STORAGE; } });
                if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                }              
            }
        }
    }
};

module.exports = roleHarvester;