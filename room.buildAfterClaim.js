var rechargeEnergy = require('recharge.energy');
var roomBuildAfterClaim = {

    run: function (creep) {

        

        var anotherRoomName = 'E5S28';
        //console.log(creep.room.name != anotherRoomName);
        if (creep.room.name != anotherRoomName) {
            const exitDir = Game.map.findExit(creep.room, anotherRoomName);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { reusePath: 50 });
            //creep.moveTo(new RoomPosition(48, 30, anotherRoomName), { reusePath: 50 });

        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (!creep.memory.building) {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    creep.memory.building = true;
                }
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
            //console.log('build');
            if (creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                const ClosestT = creep.pos.findClosestByRange(targets);
                if (targets.length) {
                    if (creep.build(ClosestT) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ClosestT, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }
                }
                else {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }
                }
            }
            else {
                rechargeEnergy.run(creep);
            }
        }
    }
};

module.exports = roomBuildAfterClaim;