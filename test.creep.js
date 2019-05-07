var testCreep = {

    /** @param {Creep} creep **/
    run: function (creep) {
        console.log(creep.room.name,creep.pos.x, creep.pos.y);
        if (creep.room.name == 'E6S29') {
            if (creep.carry.energy < creep.carryCapacity) {
                var storage = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_STORAGE; } });
                if (storage.length && storage[0].store[RESOURCE_ENERGY] >= 150) {
                    if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                    }
                }
            }
            else {
                const exitDir = Game.map.findExit(creep.room, 'E5S29');
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
            }
        }       
        else {
            var storage = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_STORAGE; } });
            if (storage.length && creep.carry.energy == creep.carryCapacity) {
                if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                }
            }
            else {
                const exitDir = Game.map.findExit(creep.room, 'E6S29');
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
            }
        }
        




    }
};

module.exports = testCreep;