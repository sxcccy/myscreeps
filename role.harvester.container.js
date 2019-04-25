var roleHarvesterToContainer = {

    run: function (creep) {
        //console.log(creep.name);
        creep.moveTo(Game.getObjectById(creep.name).pos, { visualizePathStyle: { stroke: '#ffaa00' } }, { reusePath: 50 });
       
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            for (i in sources) { creep.harvest(sources[i]); }
        }
        else {
            creep.transfer(Game.getObjectById(creep.name), RESOURCE_ENERGY);
        }

    }
};

module.exports = roleHarvesterToContainer;    