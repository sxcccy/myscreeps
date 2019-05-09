/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var rechargeEnergy = require('recharge.energy');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        'use strict';
        var storage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType === STRUCTURE_STORAGE)
        });
        var links = storage[0].pos.findInRange(FIND_MY_STRUCTURES, 2, { filter: { structureType: STRUCTURE_LINK } });
        //console.log(links);
        if (links.length) {
            if (links[0].energy > 400) {
                if (creep.withdraw(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                }
                if (creep.carry.energy === creep.carryCapacity) {
                    if (creep.transfer(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }
                }
            }
            else {
                if (creep.memory.upgrading && creep.carry.energy === 0) {
                    creep.memory.upgrading = false;
                    creep.say('🔄 harvest');
                }
                if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.upgrading = true;
                    creep.say('⚡ upgrade');
                }

                if (creep.memory.upgrading) {


                    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }


                }
                else {
                    rechargeEnergy.run(creep);
                }
            }
        }
        //creep.pos.createConstructionSite(STRUCTURE_ROAD);
        
    }
};

module.exports = roleUpgrader;