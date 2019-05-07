var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
var replaceCreeps = require('replace.creeps');
var roleHarvesterToContainer = require('role.harvester.container');
var monitor = require('monitor');
var defense = require('defense');
var roomClaim = require('room.claim');
var roomBuildAfterClaim=require('room.buildAfterClaim')
var roleCreepAttack = require('role.creep.attack');
var creepRepair = require('creep.repair');
var TestCreep = require('test.creep');


var roomE5S28 = {

    run: function () {

        if (Game.spawns['E5S28_Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['E5S28_Spawn1'].spawning.name];
            Game.spawns['E5S28_Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['E5S28_Spawn1'].pos.x + 1,
                Game.spawns['E5S28_Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 });
        }

        var sum_energy = Game.rooms.E5S28.energyAvailable;
        var sum_energyCapacity = Game.rooms.E5S28.energyCapacityAvailable;
        
       
        var TH = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S28harvester');
        var THB = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S28harvesterBIG');
        var TU = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S28upgrader');
        var TB = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S28builder');
        var TR = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S28repairer');
        var THT = _.filter(Game.creeps, (creep) => creep.memory.role == 'E5S28harvesterToContainer');
        console.log('E5S28:', sum_energy+'/'+sum_energyCapacity,
            'H' + TH.length,
            'HB' + THB.length,
            'HT' + THT.length,
            'B' + TB.length,
            'R' + TR.length,
            'U' + TU.length)
        var Num_Harvester = 3; var Num_HarvesterBIG = 2; var Num_Upgrader = 1; var Num_Builder = 2; var Num_Repairer = 1; Num_HT = 1;
        if (sum_energy < 500) {

            //if (TW.length < Num_Warior) {
            //    Game.spawns['E5S28_Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE], 'E5S28warior' + Game.time, { memory: { role: 'E5S28warior' } });
            //    console.log('Spawning new -----');
            //}
            //if (TB.length < Num_Builder) {
            //    Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S28builder' + Game.time, { memory: { role: 'E5S28builder' } });
            //    console.log('Spawning new -----');
            //}
            //if (TR.length < Num_Repairer) {
            //    Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S28repairer' + Game.time, { memory: { role: 'E5S28repairer' } });
            //    console.log('Spawning new -----');
            //}
            //if (TU.length < Num_Upgrader) {
            //    Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S28upgrader' + Game.time, { memory: { role: 'E5S28upgrader' } });
            //    console.log('Spawning new -----');
            //}
            if (TH.length < Num_Harvester && THB.length == 0) {
                Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'E5S28harvester' + Game.time, { memory: { role: 'E5S28harvester' } });
                console.log('Spawning new -----');
            }
        }
        else {

            if (TB.length < Num_Builder) {
                Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S28builder' + Game.time, { memory: { role: 'E5S28builder' } });
                console.log('Spawning new -----');
            }
            if (TR.length < Num_Repairer) {
                Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S28repairer' + Game.time, { memory: { role: 'E5S28repairer' } });
                console.log('Spawning new -----');
            }
            if (THB.length < Num_HarvesterBIG) {
                Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S28harvesterBIG' + Game.time, { memory: { role: 'E5S28harvesterBIG' } });
                console.log('Spawning new -----');
            }
            if (TU.length < Num_Upgrader) {
                Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'E5S28upgrader' + Game.time, { memory: { role: 'E5S28upgrader' } });
                console.log('Spawning new -----');
            }
            if (THT.length < Num_HT) {
                var container = Game.spawns['E5S28_Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if (container.length) {
                    for (var name in container) {
                        aaa = Game.spawns['E5S28_Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], container[name].id, { memory: { role: 'E5S28harvesterToContainer' } });
                        console.log(aaa, container[name].id, 'Spawning new harvesterToContainer');
                    }
                }

            }
        }

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'E5S28harvester' || creep.memory.role == 'E5S28harvesterBIG') {
                //creep.pos.createConstructionSite(STRUCTURE_ROAD);
                var storage = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE)
                    }
                });
                var links = storage[0].pos.findInRange(FIND_MY_STRUCTURES, 2, { filter: { structureType: STRUCTURE_LINK } });
                if (storage.length && links.length && links[0].energy > 400) {
                    if (creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(links[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }
                    if (creep.carry.energy == creep.carryCapacity) {
                        if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                        }
                    }
                }
                else {
                    if (creep.carry.energy == 0) {
                        creep.memory.working = false;
                    }
                    if (creep.carry.energy < creep.carryCapacity && creep.memory.working == false) {
                        rechargeenergy(creep);
                    }
                    else {

                        var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_TOWER) &&
                                    structure.energy < structure.energyCapacity * 0.7;
                            }
                        });
                        if (targets.length) {
                            creep.memory.working = true;
                            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                            }
                        }
                        else {
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                                }
                            });
                            if (targets.length) {
                                creep.memory.working = true;
                                const ClosestT = creep.pos.findClosestByRange(targets);
                                if (creep.transfer(ClosestT, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(ClosestT, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                                }
                            }
                            else {
                                creep.memory.working = true;
                                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                                }
                            }
                        }
                    }
                }
                
                
                    
                
            }   
            if (creep.memory.role == 'E5S28upgrader') {
                //creep.pos.createConstructionSite(STRUCTURE_ROAD);
                var storage = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE)
                    }
                });
                var links = storage[0].pos.findInRange(FIND_MY_STRUCTURES, 2, { filter: { structureType: STRUCTURE_LINK } });
                if (storage.length && links.length && links[0].energy > 400 ) {
                    if (creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(links[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }
                    if (creep.carry.energy == creep.carryCapacity) {
                        if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                        }
                    }                   
                }
                else {
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
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                        }
                    }
                    else {
                        rechargeenergy(creep);
                    }                           
                }
            }
            if (creep.memory.role == 'E5S28builder') {
                if (!creep.memory.building) {
                    rechargeenergy(creep);
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

                    const ClosestT = creep.pos.findClosestByRange(targets);
                    if (targets.length) {
                        if (creep.build(ClosestT) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(ClosestT, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                        }
                    }
                    else {
                        if (creep.carry.energy > 0) {
                            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
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
            if (creep.memory.role == 'E5S28repairer') {

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
                        var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.hits < structure.hitsMax*0.7) } });
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
                                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                            }
                        }


                    }
                    else {
                        if (creep.memory.repairId) {

                            var repaire_targets = Game.getObjectById(creep.memory.repairId);

                            if (repaire_targets.hits < repaire_targets.hitsMax) {

                                if (creep.repair(repaire_targets) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(repaire_targets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
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
            if (creep.memory.role == 'E5S28harvesterToContainer') {
                roleHarvesterToContainer.run(creep);
            }
            if (creep.memory.role == 'claimer') {
                //roomClaim.run(creep);
                roomBuildAfterClaim.run(creep);
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
    if (container.length && container[0].store[RESOURCE_ENERGY] >= 100) {
        if (creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
        }
    }
}
module.exports = roomE5S28;

