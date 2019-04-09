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
                return (structure.structureType == STRUCTURE_RAMPART)
            }
        });

        if (targets.length) {
            var num_hits = 0;
            for (var name in targets) { num_hits += targets[name].hits; }
            var avg_hits = Math.ceil(num_hits / targets.length);
            //console.log(avg_hits / targets[0].hitsMax);
            if (avg_hits / targets[0].hitsMax < 0.9) {
                subRepair.run(creep, STRUCTURE_RAMPART);
            }
            else {
                var container = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if (container.length) {
                    var c_hits = 0;
                    for (var name in container) { c_hits += container[name].hits; }
                    var a_hits = Math.ceil(c_hits / container.length);

                    if (a_hits / container[0].hitsMax < 0.9) {
                        subRepair.run(creep, STRUCTURE_CONTAINER);
                    }
                    else {
                        var road = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_ROAD)
                            }
                        });
                        if (road.length) {
                            var rc_hits = 0;
                            for (var name in container) { rc_hits += road[name].hits; }
                            var ra_hits = Math.ceil(rc_hits / road.length);

                            if (ra_hits / road[0].hitsMax < 0.9) {
                                subRepair.run(creep, STRUCTURE_ROAD);
                            }
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
                }

            }
        }
        
    }
};

module.exports = roleRepair;