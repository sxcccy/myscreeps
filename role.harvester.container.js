var roleHarvesterToContainer = {

    run: function (creep) {

        creep.moveTo(Game.getObjectById(creep.name).pos, { visualizePathStyle: { stroke: '#ffaa00' } });
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            for (i in sources) { creep.harvest(sources[i]) }
        }
        else {
            aaa = creep.transfer(Game.getObjectById(creep.name), RESOURCE_ENERGY);
            console.log(aaa);
        }
        
    }
};

module.exports = roleHarvesterToContainer;