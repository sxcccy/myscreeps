/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var roadBuild = {

    /** @param {Creep} creep **/
    run: function () {
        'use strict';






    }
};

function roadsite(aaa, bbb) {
    'use strict';
    var ret = PathFinder.search(aaa, bbb);
    for (var p in ret.path) {
        ret.path[p].createConstructionSite(STRUCTURE_ROAD);
    }

}
module.exports = roadBuild;
/*
roadsite(Game.spawns['Main_Base'].room.find(FIND_SOURCES)[0].pos,
    Game.spawns['Main_Base'].pos)
roadsite(Game.spawns['Main_Base'].room.find(FIND_SOURCES)[1].pos,
    Game.spawns['Main_Base'].pos)
roadsite(Game.spawns['Main_Base'].room.controller.pos,
    Game.spawns['Main_Base'].pos)


roadsite(Game.spawns['Main_Base'].room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_RAMPART) } })[0].pos,
    Game.spawns['Main_Base'].pos)
roadsite(Game.spawns['Main_Base'].room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_RAMPART) } })[1].pos,
    Game.spawns['Main_Base'].pos)


roadsite(Game.rooms.E5S29.find(FIND_SOURCES)[0].pos,
    Game.rooms.E5S29.controller.pos)
roadsite(Game.rooms.E5S29.find(FIND_SOURCES)[0].pos,
    Game.spawns['Spawn1'].pos)

        targets = Game.spawns['E5S28_Spawn1'].room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_EXTENSION}});
        for (var name in targets) {
            roadsite(targets[name].pos, Game.spawns['E5S28_Spawn1'].pos);
        }
*/