/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var rechargeEnergy = require('recharge.energy');
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        'use strict';
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
            if (creep.carry.energy < creep.carryCapacity && !creep.memory.working) {
                rechargeEnergy.run(creep);
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity * 0.5;
                    }
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
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                        }
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
};

module.exports = roleHarvester;