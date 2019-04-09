var roadBuild = {

    /** @param {Creep} creep **/
    run: function () {


        var srcpos1 = Game.spawns['Main_Base'].room.find(FIND_SOURCES)[0].pos;
        var srcpos2 = Game.spawns['Main_Base'].room.find(FIND_SOURCES)[1].pos;
        var mainBase = Game.spawns['Main_Base'].pos;
        console.log(srcpos1, srcpos2, mainBase);
        let ret1 = PathFinder.search(mainBase, srcpos1);
        
        let ret2 = PathFinder.search(mainBase, srcpos2);
        //ret1p = Room.serializePath(ret1);
        for (var p in ret1) {
            //var aaa = ret1[p].createConstructionSite(STRUCTURE_ROAD);
            //var aaa = Game.rooms.E6S29.createConstructionSite(pos, STRUCTURE_ROAD);
            //console.log(ret1[p]);
            //console.log(aaa);
        }


    }
};

module.exports = roadBuild;