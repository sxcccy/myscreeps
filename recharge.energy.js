var rechargeEnergy = {

    run: function (creep) {

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
            }
        });
        
        if (targets.length ) {
            
            //console.log(i)
            if (creep.memory.role == 'harvester' && targets[0].store[RESOURCE_ENERGY] > 50 ||
                creep.memory.role == 'upgrader' && targets[0].store[RESOURCE_ENERGY] > 50) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.memory.role == 'harvester' || creep.memory.role == 'upgrader') {
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
            if (creep.memory.role == 'builder' && targets[1].store[RESOURCE_ENERGY] > 50 ||
                creep.memory.role == 'repairer' && targets[1].store[RESOURCE_ENERGY] > 50) {
                if (creep.withdraw(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.memory.role == 'builder' || creep.memory.role == 'repairer') {
                    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
            
                
           
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.memory.role == 'harvester' || creep.memory.role == 'upgrader') {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            if (creep.memory.role == 'builder' || creep.memory.role == 'repairer') {
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }

        }
        
    }

};

module.exports = rechargeEnergy;