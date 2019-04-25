var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
var replaceCreeps = require('replace.creeps');
var roleHarvesterToContainer = require('role.harvester.container');
var monitor = require('monitor');
var defense = require('defense');
var roomClaim = require('room.claim');
var roleCreepAttack = require('role.creep.attack');
var creepRepair = require('creep.repair');



var roomE5S39 = {

    run: function () {

        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 });
        }

        var sum_energy = Game.rooms.E5S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E5S29.energyCapacityAvailable;
        
       
        var TH = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S29harvester');
        var TU = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S29upgrader');
        var TB = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S29builder');
        var TR = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S29repairer');
        var TW = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S29harvesterToContainer');
        console.log('E5S29:', sum_energy, '/', sum_energyCapacity, 'H' + TH.length, 'U' + TU.length, 'B' + TB.length, 'R' + TR.length, 'W' + TW.length)
        var Num_Harvester = 3; var Num_Upgrader = 1; var Num_Builder = 3; var Num_Repairer = 1; Num_W = 1;
        if (sum_energy < 500) {

            //if (TW.length < Num_Warior) {
            //    Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE], 'E5S29warior' + Game.time, { memory: { role: 'E5S29warior' } });
            //    console.log('Spawning new -----');
            //}
            //if (TB.length < Num_Builder) {
            //    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S29builder' + Game.time, { memory: { role: 'E5S29builder' } });
            //    console.log('Spawning new -----');
            //}
            //if (TR.length < Num_Repairer) {
            //    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S29repairer' + Game.time, { memory: { role: 'E5S29repairer' } });
            //    console.log('Spawning new -----');
            //}
            //if (TU.length < Num_Upgrader) {
            //    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S29upgrader' + Game.time, { memory: { role: 'E5S29upgrader' } });
            //    console.log('Spawning new -----');
            //}
            if (TH.length < Num_Harvester) {
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S29harvester' + Game.time, { memory: { role: 'E5S29harvester' } });
                console.log('Spawning new -----');
            }
        }
        else {

            if (TB.length < Num_Builder) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S29builder' + Game.time, { memory: { role: 'E5S29builder' } });
                console.log('Spawning new -----');
            }
            if (TR.length < Num_Repairer) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S29repairer' + Game.time, { memory: { role: 'E5S29repairer' } });
                console.log('Spawning new -----');
            }
            if (TU.length < Num_Upgrader) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S29upgrader' + Game.time, { memory: { role: 'E5S29upgrader' } });
                console.log('Spawning new -----');
            }
            if (TH.length < Num_Harvester) {
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'E5S29harvester' + Game.time, { memory: { role: 'E5S29harvester' } });
                console.log('Spawning new -----');
            }
            if (TW.length < Num_W) {
                var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if (targets.length) {
                    for (name in targets) {
                        aaa = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], targets[name].id, { memory: { role: 'E5S29harvesterToContainer' } });
                        console.log(aaa, targets[name].id, 'Spawning new harvesterToContainer');
                    }
                }

            }
        }

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.room.name == 'E5S29') {
                
                if (creep.memory.role == 'E5S29harvester') {
                    creep.pos.createConstructionSite(STRUCTURE_ROAD);
                    if (creep.carry.energy < creep.carryCapacity) {
                        rechargeenergy(creep);
                    }
                    else {

                        var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER) &&
                                    structure.energy < structure.energyCapacity;
                            }
                        });
                        if (targets.length > 0) {
                            creep.memory.working = true;
                            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                            }
                        }
                    }
                }
                if (creep.memory.role == 'E5S29upgrader') {
                    //creep.pos.createConstructionSite(STRUCTURE_ROAD);
                    if (creep.memory.upgrading && creep.carry.energy == 0) {
                        creep.memory.upgrading = false;
                        creep.say('🔄 harvest');
                    }
                    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                        creep.memory.upgrading = true;
                        creep.say('⚡ upgrade');
                    }

                    if (creep.memory.upgrading) {
                        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                        }
                    }
                    else {
                        rechargeenergy(creep);
                    }

                }
                if (creep.memory.role == 'E5S29builder') {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (!creep.memory.building) {
                        rechargeenergy(creep);
                        creep.memory.building = true;

                    }
                    if (creep.memory.building && creep.carry.energy == 0) {
                        creep.memory.building = false;
                        creep.memory.repairing = false;
                        creep.say('🔄 harvest');
                    }
                    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                        creep.memory.building = true;
                        creep.say('🚧 build');
                    }

                    if (creep.memory.building) {
                        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                        if (targets.length) {
                            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                            }
                        }
                        else {
                            if (creep.carry.energy > 0) {
                                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                                }
                            }
                            //if (creep.carry.energy >0) {
                            //    var rt = Game.getObjectById('5cb7326f694fe620687c6e4b');
                            //    if (rt.hits < rt.hitsMax) {

                            //        if (creep.repair(rt) == ERR_NOT_IN_RANGE) {
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
                if (creep.memory.role == 'E5S29repairer') {
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
                            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.hits < structure.hitsMax) } });
                            if (targets.length) {
                                daixiu = new Array();
                                for (var name in targets) {
                                    daixiu[name] = new Object;
                                    daixiu[name].id = targets[name].id; daixiu[name].hits = targets[name].hits;
                                }
                                sortObj(daixiu, 'hits');
                                creep.memory.repairId = daixiu[0].id;
                                console.log('*-*-*-*:', daixiu[0].id, daixiu[0].hits)
                                creep.memory.repairing = true;
                            }

                            //空闲UPgrade
                            else {
                                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } }, { reusePath: 50 });
                                }
                            }


                        }
                        else {
                            if (creep.memory.repairId) {

                                var repaire_targets = Game.getObjectById(creep.memory.repairId);

                                if (repaire_targets.hits < repaire_targets.hitsMax) {

                                    if (creep.repair(repaire_targets) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(repaire_targets, { visualizePathStyle: { stroke: '#DC143C' } }, { reusePath: 50 });
                                    }
                                }
                                else { creep.memory.repairing = false; }
                            }
                            else { creep.memory.repairing = false; }
                        }
                    }
                    else {
                        creep.memory.repairing = false;
                        rechargeenergy(creep);
                    }


                }
                if (creep.memory.role == 'harvesterToContainer' || creep.memory.role == 'E5S29harvesterToContainer') {
                    roleHarvesterToContainer.run(creep);
                }
                if (creep.memory.role == 'claimer') {
                    //roomClaim.run(creep);
                    //creepAttack.run(creep);
                }
                //TestCreep.run(creep);
            }
        }
     }
 
};
function sortObj(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x - y;
        //或者 return x > y ? 1 : (x < y ? -1 : 0);
    });
}
function rechargeenergy(creep) {
    
    var container = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)
        }
    });
    if (container.length) {

        if (container[0].store[RESOURCE_ENERGY] >= 100) {
            if (creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container[0], { visualizePathStyle: { stroke: '#ffaa00' } }, { reusePath: 50 });
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } }, { reusePath: 50 });
            }
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } }, { reusePath: 50 });
        }
    }
}
module.exports = roomE5S39;

