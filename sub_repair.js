var rechargeEnergy = require('recharge.energy');
var subRepair = {

    run: function (creep, structureName) {

        if (creep.memory.canRepair || creep.memory.building) {
            if (!creep.memory.repairing) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == structureName)
                    }
                });
                if (targets.length) {
                    var num_hits = 0;
                    for (var name in targets) { num_hits += targets[name].hits; }
                    var avg_hits = Math.ceil(num_hits / targets.length);
                    //console.log(num_hits, targets.length, avg_hits);
                    var lowhits_targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == structureName && structure.hits <= avg_hits && structure.hits < structure.hitsMax)
                        }
                    });
                    if (targets.length) {
                        creep.memory.repairId = lowhits_targets[0].id;
                        creep.memory.repairing = true;
                    }
                    //空闲UPgrade
                    else {
                        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }

                }

            }
            else {
                if (creep.memory.repairId) {
                    var repaire_targets = Game.getObjectById(creep.memory.repairId);
                    if (repaire_targets.hits < repaire_targets.hitsMax) {
                        if (creep.repair(repaire_targets) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(repaire_targets, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                    else { creep.memory.repairing = false; }

                }
                else {
                    creep.memory.repairing = false;
                }

            }
        }

        else {
            creep.memory.repairing = false;
            rechargeEnergy.run(creep)
        }
    }
};

module.exports = subRepair;