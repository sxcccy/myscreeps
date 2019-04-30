var roleHarvesterToContainer = {

    run: function (creep) {
        //console.log(creep.name);
        creep.moveTo(Game.getObjectById(creep.name).pos, { visualizePathStyle: { stroke: '#ffaa00' } }, { reusePath: 50 });
        var links = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, { filter: { structureType: STRUCTURE_LINK } });
        if (creep.pos.x == Game.getObjectById(creep.name).pos.x && creep.pos.y == Game.getObjectById(creep.name).pos.y) {
            if (links.length) {

                if (creep.carry.energy < creep.carryCapacity) {
                    if (Game.getObjectById(creep.name).store[RESOURCE_ENERGY] >= 100) {
                        creep.withdraw(Game.getObjectById(creep.name), RESOURCE_ENERGY);
                    }
                    else {
                        var sources = creep.pos.findInRange(FIND_SOURCES, 1);
                        creep.harvest(sources[0]);

                    }
                }
                else {
                    creep.transfer(links[0], RESOURCE_ENERGY);
                }
            }
            else {
                if (creep.carry.energy < creep.carryCapacity) {
                    var sources = creep.pos.findInRange(FIND_SOURCES, 1);
                    creep.harvest(sources[0]);
                }
                else {
                    creep.transfer(Game.getObjectById(creep.name), RESOURCE_ENERGY);
                }
            }
        }
    }
};

module.exports = roleHarvesterToContainer;    