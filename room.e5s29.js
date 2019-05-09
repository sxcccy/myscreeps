/* jshint -W117  *//* jshint -W098  *//* jshint -W083  */
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
var replaceCreeps = require('replace.creeps');
var roleHarvesterToContainer = require('role.harvester.container');
var monitor = require('monitor');
var defense = require('defense');
var roomClaim = require('room.claim');
var roomBuildAfterClaim = require('room.buildAfterClaim');
var roleCreepAttack = require('role.creep.attack');
var creepRepair = require('creep.repair');
var TestCreep = require('test.creep');


var roomE5S29 = {

    run: function () {
        'use strict';
        if (Game.spawns.Spawn1.spawning) {
            var spawningCreep = Game.creeps[Game.spawns.Spawn1.spawning.name];
            Game.spawns.Spawn1.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns.Spawn1.pos.x + 1,
                Game.spawns.Spawn1.pos.y, {
                    align: 'left',
                    opacity: 0.8
                });
        }

        var sum_energy = Game.rooms.E5S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E5S29.energyCapacityAvailable;


        var TH = _.filter(Game.creeps, (creep) => creep.memory.role === 'E5S29harvester');
        var THB = _.filter(Game.creeps, (creep) => creep.memory.role === 'E5S29harvesterBIG');
        var TU = _.filter(Game.creeps, (creep) => creep.memory.role === 'E5S29upgrader');
        var TB = _.filter(Game.creeps, (creep) => creep.memory.role === 'E5S29builder');
        var TR = _.filter(Game.creeps, (creep) => creep.memory.role === 'E5S29repairer');
        var THT = _.filter(Game.creeps, (creep) => creep.memory.role === 'E5S29harvesterToContainer');
        console.log('E5S29:', sum_energy + '/' + sum_energyCapacity,
            'H' + TH.length,
            'HB' + THB.length,
            'HT' + THT.length,
            'B' + TB.length,
            'R' + TR.length,
            'U' + TU.length);
        var Num_Harvester = 4;
        var Num_HarvesterBIG = 1;
        var Num_Upgrader = 0;
        var Num_Builder = 1;
        var Num_Repairer = 1;
        var Num_HT = 1;
        if (sum_energy < 900) {

            //if (TW.length < Num_Warior) {
            //    Game.spawns.Spawn1.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE], 'E5S29warior' + Game.time, { memory: { role: 'E5S29warior' } });
            //    console.log('Spawning new -----');
            //}
            //if (TB.length < Num_Builder) {
            //    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'E5S29builder' + Game.time, { memory: { role: 'E5S29builder' } });
            //    console.log('Spawning new -----');
            //}
            //if (TR.length < Num_Repairer) {
            //    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'E5S29repairer' + Game.time, { memory: { role: 'E5S29repairer' } });
            //    console.log('Spawning new -----');
            //}
            //if (TU.length < Num_Upgrader) {
            //    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'E5S29upgrader' + Game.time, { memory: { role: 'E5S29upgrader' } });
            //    console.log('Spawning new -----');
            //}
            if (TH.length < Num_Harvester && THB.length === 0) {
                Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'E5S29harvester' + Game.time, {
                    memory: {
                        role: 'E5S29harvester'
                    }
                });
                console.log('Spawning new -----');
            }
        } else {

            if (TB.length < Num_Builder) {
                Game.spawns.Spawn1.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'E5S29builder' + Game.time, {
                    memory: {
                        role: 'E5S29builder'
                    }
                });
                console.log('Spawning new -----');
            }
            if (TR.length < Num_Repairer) {
                Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'E5S29repairer' + Game.time, {
                    memory: {
                        role: 'E5S29repairer'
                    }
                });
                console.log('Spawning new -----');
            }
            if (THB.length < Num_HarvesterBIG) {
                Game.spawns.Spawn1.spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'E5S29harvesterBIG' + Game.time, {
                    memory: {
                        role: 'E5S29harvesterBIG'
                    }
                });
                console.log('Spawning new -----');
            }
            if (TU.length < Num_Upgrader) {
                Game.spawns.Spawn1.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S29upgrader' + Game.time, {
                    memory: {
                        role: 'E5S29upgrader'
                    }
                });
                console.log('Spawning new -----');
            }
            if (THT.length < Num_HT) {
                var container = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER)
                });
                if (container.length) {
                    for (var name in container) {
                        aaa = Game.spawns.Spawn1.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], container[name].id, {
                            memory: {
                                role: 'E5S29harvesterToContainer'
                            }
                        });
                        console.log(aaa, container[name].id, 'Spawning new harvesterToContainer');
                    }
                }

            }
        }

        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role === 'E5S29harvester' || creep.memory.role === 'E5S29harvesterBIG') {
                //creep.pos.createConstructionSite(STRUCTURE_ROAD);

                var storage = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType === STRUCTURE_STORAGE)
                });
                var links = storage[0].pos.findInRange(FIND_MY_STRUCTURES, 2, {
                    filter: {
                        structureType: STRUCTURE_LINK
                    }
                });

                if (links.length && links[0].energy > 400) {
                    if (creep.withdraw(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(links[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            },
                            reusePath: 50
                        });
                    }
                    if (creep.carry.energy === creep.carryCapacity) {
                        if (creep.transfer(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage[0], {
                                visualizePathStyle: {
                                    stroke: '#ffffff'
                                },
                                reusePath: 50
                            });
                        }
                    }
                } else {
                    if (creep.carry.energy === 0) {
                        creep.memory.working = false;
                    }
                    if (creep.carry.energy < creep.carryCapacity && creep.memory.working === false) {
                        rechargeenergy(creep);
                    } else {

                        var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => (structure.structureType === STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity * 0.7
                        });
                        if (targets.length) {
                            creep.memory.working = true;
                            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], {
                                    visualizePathStyle: {
                                        stroke: '#ffffff'
                                    },
                                    reusePath: 50
                                });
                            }
                        } else {
                            let targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => (structure.structureType === STRUCTURE_EXTENSION ||
                                    structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity
                            });
                            if (targets.length) {
                                creep.memory.working = true;
                                const ClosestT = creep.pos.findClosestByRange(targets);
                                if (creep.transfer(ClosestT, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(ClosestT, {
                                        visualizePathStyle: {
                                            stroke: '#ffffff'
                                        },
                                        reusePath: 50
                                    });
                                }
                            } else {
                                creep.memory.working = true;
                                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller, {
                                        visualizePathStyle: {
                                            stroke: '#ffffff'
                                        },
                                        reusePath: 50
                                    });
                                }
                            }
                        }
                    }
                }
            }
            if (creep.memory.role === 'E5S29upgrader') {
                //creep.pos.createConstructionSite(STRUCTURE_ROAD);
                let storage = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType === STRUCTURE_STORAGE)
                });
                let links = storage[0].pos.findInRange(FIND_MY_STRUCTURES, 2, {
                    filter: {
                        structureType: STRUCTURE_LINK
                    }
                });
                //console.log(links);
                if (links.length) {
                    if (links[0].energy > 100) {
                        if (creep.withdraw(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(links[0], {
                                visualizePathStyle: {
                                    stroke: '#ffffff'
                                },
                                reusePath: 50
                            });
                        }
                        if (creep.carry.energy === creep.carryCapacity) {
                            if (creep.transfer(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage[0], {
                                    visualizePathStyle: {
                                        stroke: '#ffffff'
                                    },
                                    reusePath: 50
                                });
                            }
                        }
                    }
                    //else {
                    //    if (creep.memory.upgrading && creep.carry.energy === 0) {
                    //        creep.memory.upgrading = false;
                    //        creep.say('🔄 harvest');
                    //    }
                    //    if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                    //        creep.memory.upgrading = true;
                    //        creep.say('⚡ upgrade');
                    //    }
                    //    if (creep.memory.upgrading) {
                    //        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    //            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                    //        }
                    //    }
                    //    else {
                    //        rechargeenergy(creep);
                    //    }                           
                    //}
                }

            }
            if (creep.memory.role === 'E5S29builder') {
                if (!creep.memory.building) {
                    rechargeenergy(creep);
                }
                if (creep.memory.building && creep.carry.energy === 0) {
                    creep.memory.building = false;
                    creep.memory.repairing = false;
                    creep.say('🔄 harvest');
                }
                if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.building = true;
                    creep.say('🚧 build');
                }

                if (creep.memory.building) {
                    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                    if (targets.length) {
                        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {
                                visualizePathStyle: {
                                    stroke: '#ffffff'
                                },
                                reusePath: 50
                            });
                        }
                    } else {
                        if (creep.carry.energy > 0) {
                            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller, {
                                    visualizePathStyle: {
                                        stroke: '#ffffff'
                                    },
                                    reusePath: 50
                                });
                            }
                        }
                        //if (creep.carry.energy >0) {
                        //    var rt = Game.getObjectById('5cb7326f694fe620687c6e4b');
                        //    if (rt.hits < rt.hitsMax) {

                        //        if (creep.repair(rt) === ERR_NOT_IN_RANGE) {
                        //            creep.moveTo(rt, { visualizePathStyle: { stroke: '#DC143C' } }, { reusePath: 50 });
                        //        }
                        //    }
                        //}
                        else {
                            rechargeenergy(creep);
                        }
                    }
                }
            }
            if (creep.memory.role === 'E5S29repairer') {

                if (creep.memory.repairing && creep.carry.energy === 0) {
                    creep.memory.canRepair = false;
                    creep.say('🔄 harvest');
                }
                if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.canRepair = true;
                    creep.say('🔨 repairing');
                }
                if (creep.memory.canRepair) {

                    if (!creep.memory.repairing) {
                        let targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => (structure.hits < structure.hitsMax * 0.7)
                        });
                        if (targets.length) {
                            var daixiu = [];
                            for (let name in targets) {
                                daixiu[name] = {};
                                daixiu[name].id = targets[name].id;
                                daixiu[name].hits = targets[name].hits;
                            }
                            sortObj(daixiu, 'hits');
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
                    rechargeenergy(creep);
                }


            }
            if (creep.memory.role === 'E5S29harvesterToContainer') {
                roleHarvesterToContainer.run(creep);
            }
            if (creep.memory.role === 'claimer') {
                //roomClaim.run(creep);
                roomBuildAfterClaim.run(creep);
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

function rechargeenergy(creep) {
    'use strict';
    var storage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_STORAGE
    });
    if (storage && storage[0].store[RESOURCE_ENERGY] >= 150) {
        if (creep.withdraw(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(storage[0], {
                visualizePathStyle: {
                    stroke: '#ffffff'
                },
                reusePath: 50
            });
        }
    } else {
        var links = storage[0].pos.findInRange(FIND_MY_STRUCTURES, 2, {
            filter: {
                structureType: STRUCTURE_LINK
            }
        });

        if (links.length && links[0].energy > 400) {
            if (creep.withdraw(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(links[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    },
                    reusePath: 50
                });
            }
            if (creep.transfer(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    },
                    reusePath: 50
                });
            }
        } else {
            var container = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER)
            });
            if (container.length && container[0].store[RESOURCE_ENERGY] >= 100) {
                if (creep.withdraw(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        },
                        reusePath: 50
                    });
                }
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        },
                        reusePath: 50
                    });
                }
            }
        }

    }

}
module.exports = roomE5S29;