/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var link = {

    run: function () {
        'use strict';
        linkTolink('E6S29', 19, 17, 42, 24);
        linkTolink('E6S29', 24, 34, 42, 24);
        linkTolink('E5S29', 20, 16, 41, 31);


    }


};

function linkTolink(roomName, fx, fy, tx, ty) {
    'use strict';
    const linkFrom = Game.rooms[roomName].lookForAt('structure', fx, fy)[0];
    const linkTo = Game.rooms[roomName].lookForAt('structure', tx, ty)[0];
    linkFrom.transferEnergy(linkTo);
}

module.exports = link;