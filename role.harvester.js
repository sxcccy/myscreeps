var rechargeEnergy = require('recharge.energy');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //creep.pos.createConstructionSite(STRUCTURE_ROAD);

        if (creep.carry.energy == 0) { creep.memory.working = false; }
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.working) {

            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_STORAGE; } });
            if (targets) {
                if (targets[0].store[RESOURCE_ENERGY] >= 150) {
                    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } }, { reusePath: 50 });
                    }
                }
                else {
                    rechargeEnergy.run(creep);
                }
            }
            else {
                rechargeEnergy.run(creep);
            }
        }
        else {

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity * 0.5;
                }
            });
            if (targets.length) {
                creep.memory.working = true;
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
                });
                if (targets.length) {
                    creep.memory.working = true;
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                    }
                }
                else {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;