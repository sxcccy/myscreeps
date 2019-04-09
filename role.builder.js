var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
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
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL)
                    }
                });
                if (targets.length) {
                    var num_hits = 0;
                    for (var name in targets) { num_hits += targets[name].hits; }
                    var avg_hits = Math.ceil(num_hits / targets.length);
                    console.log(num_hits, targets.length, avg_hits);
                    var lowhits_targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_WALL && structure.hits <= avg_hits+50000)
                        }
                    });
                    if (creep.repair(lowhits_targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(lowhits_targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                else {
                    creep.moveTo(7, 7); 
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;