var subRepair = require('sub_repair');

var roleRepair = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //creep.pos.createConstructionSite(STRUCTURE_ROAD);
        
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.canRepair = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.canRepair = true;
            creep.say('🔨 repairing');
        }
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax*0.8)
            }
        });

        if (targets.length) {   
            subRepair.run(creep, STRUCTURE_CONTAINER);
        }
        else {
            var road = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax*0.5)
                }
            });

            if (road.length) {
                subRepair.run(creep, STRUCTURE_ROAD);
            }
            else {
                var rampart = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax)
                    }
                });
                if (rampart.length) {
                        subRepair.run(creep, STRUCTURE_RAMPART);
                }
                else {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }
                }
            }
        }
    }      
};

module.exports = roleRepair;