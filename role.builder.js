var subRepair = require('sub_repair');
var rechargeEnergy = require('recharge.energy');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            //空闲时修理
            else {
                subRepair.run(creep, STRUCTURE_WALL);
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL)
                    }
                });
                if (targets.length) {
                    var num_hits = 0;
                    for (var name in targets) { num_hits += targets[name].hits; }
                    var avg_hits = Math.ceil(num_hits / targets.length);
                    //console.log(avg_hits / targets[0].hitsMax);
                    if (avg_hits / targets[0].hitsMax < 1) {
                        subRepair.run(creep, STRUCTURE_WALL);
                    }
                }
            }
        }
        else {
            rechargeEnergy.run(creep)
        }
    }
};

module.exports = roleBuilder;