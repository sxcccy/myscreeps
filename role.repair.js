var roleRepair = {

    /** @param {Creep} creep **/
    run: function (creep) {
        creep.pos.createConstructionSite(STRUCTURE_ROAD);
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.canRepair = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.canRepair = true;
            creep.say('🔨 repairing');
        }

        if (creep.memory.canRepair) {
            if (!creep.memory.repairing) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL)
                    }
                });
                if (targets.length) {
                    var num_hits = 0;
                    for (var name in targets) { num_hits += targets[name].hits; }
                    var avg_hits = Math.ceil(num_hits / targets.length);
                    //console.log(num_hits, targets.length, avg_hits);
                    var lowhits_targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_WALL && structure.hits <= avg_hits && structure.hits < structure.hitsMax)
                        }
                    });
                    creep.memory.repairId = lowhits_targets[0].id;
                    creep.memory.repairing = true;

                }

            }
            else {
                if (creep.memory.repairId) {
                    var repaire_targets = Game.getObjectById(creep.memory.repairId);
                    if (creep.repair(repaire_targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repaire_targets, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                else {
                    creep.memory.repairing = false;
                }

            }
        }
            
        else {
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.repairing = false;
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleRepair;