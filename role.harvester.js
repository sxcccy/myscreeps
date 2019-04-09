var rechargeEnergy = require('recharge.energy');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //creep.pos.createConstructionSite(STRUCTURE_ROAD);
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.carry.energy < creep.carryCapacity) {
            rechargeEnergy.run(creep)
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            //upgrade
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
                else {
                    creep.moveTo(25, 11, { visualizePathStyle: { stroke: '#ffaaaa' } })
                }
            }
        }
    }
};

module.exports = roleHarvester;