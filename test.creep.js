var testCreep = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🔨 repairing');
        }

        if (creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART)
                }
            });

        }


    }
};

module.exports = testCreep;