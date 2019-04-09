var rechargeEnergy = require('recharge.energy');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.pos.createConstructionSite(STRUCTURE_ROAD);
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            rechargeEnergy.run(creep);
            
        }
    }
};

module.exports = roleUpgrader;