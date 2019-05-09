/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var subRepair = require('sub_repair');
var rechargeEnergy = require('recharge.energy');
var creepRepair = {

    run: function (creep) {

        'use strict';

        var anotherRoomName = 'E6S29';
        //console.log(creep.room.name !== anotherRoomName);
        if (creep.room.name !== anotherRoomName) {
            const exitDir = Game.map.findExit(creep.room, anotherRoomName);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, {
                visualizePathStyle: {
                    stroke: '#ffffff'
                },
                reusePath: 50
            });



        } else {
            //creep.moveTo(new RoomPosition(8, 29, anotherRoomName), { reusePath: 50 });

            if (creep.memory.repairing && creep.carry.energy === 0) {
                creep.memory.canRepair = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
                creep.memory.canRepair = true;
                creep.say('🔨 repairing');
            }

            if (creep.memory.canRepair || creep.memory.building) {

                if (!creep.memory.repairing) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_WALL);
                        }
                    });
                    if (targets.length) {
                        let daixiu = [];
                        for (var name in targets) {
                            daixiu[name] = {};
                            daixiu[name].id = targets[name].id;
                            daixiu[name].hits = targets[name].hits;
                        }
                        sortObj(daixiu, 'hits');
                        //for (var name in daixiu) {console.log(daixiu[name].id, daixiu[name].hits);}
                        creep.memory.repairId = daixiu[0].id;
                        console.log('*-*-*-*:', daixiu[0].id, daixiu[0].hits);
                        creep.memory.repairing = true;
                    }
                    //空闲UPgrade
                    else {
                        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {
                                visualizePathStyle: {
                                    stroke: '#ffffff'
                                },
                                reusePath: 50
                            });

                        }

                    }

                } else {
                    if (creep.memory.repairId) {
                        var repaire_targets = Game.getObjectById(creep.memory.repairId);

                        if (repaire_targets.hits < repaire_targets.hitsMax) {
                            if (creep.repair(repaire_targets) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(repaire_targets, {
                                    visualizePathStyle: {
                                        stroke: '#ffffff'
                                    },
                                    reusePath: 50
                                });
                            }
                        } else {
                            creep.memory.repairing = false;
                        }

                    } else {
                        creep.memory.repairing = false;
                    }

                }
            } else {
                creep.memory.repairing = false;
                rechargeEnergy.run(creep);

            }
        }
    }
};

function sortObj(array, key) {
    'use strict';
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x - y;
        //或者 return x > y ? 1 : (x < y ? -1 : 0);
    });
}

module.exports = creepRepair;