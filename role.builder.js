/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var subRepair = require('sub_repair');
var rechargeEnergy = require('recharge.energy');
var roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep) {
        'use strict';
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
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        },
                        reusePath: 50
                    });
                }
            }
            //空闲时修理
            //else {
            //    var targets = creep.room.find(FIND_STRUCTURES, {
            //        filter: (structure) => {
            //            return (structure.structureType === STRUCTURE_WALL)
            //        }
            //    });
            //    if (targets.length) {
            //        var num_hits = 0;
            //        for (var name in targets) { num_hits += targets[name].hits; }
            //        var avg_hits = Math.ceil(num_hits / targets.length);
            //        //console.log(avg_hits / targets[0].hitsMax);
            //        if (avg_hits / targets[0].hitsMax < 1) {
            //            subRepair.run(creep, STRUCTURE_WALL);
            //        }
            //    }
            //}
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
            rechargeEnergy.run(creep);
        }
    }
};

module.exports = roleBuilder;