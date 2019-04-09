var test = {

    /** @param {Creep} creep **/
    run: function () {

        
        aaa = Game.spawns['Main_Base'].room.find(FIND_SOURCES)[0].pos;
        var bbb = Game.spawns['Main_Base'].pos;
        console.log(aaa, bbb);
        let ret = PathFinder.search(aaa, bbb);
        for (var p in ret) {
            //console.log(ret[p]);
        }


    }
};

module.exports = test;