var link = {

    run: function () {
        linkTolink('E6S29', 19, 17, 42, 24);
        linkTolink('E6S29', 24, 34, 42, 24);
        linkTolink('E5S29', 20, 16, 41, 31);


    }


};
function linkTolink(roomName, fx, fy, tx, ty) {
    const linkFrom = Game.rooms[roomName].lookForAt('structure', fx, fy)[0];
    const linkTo = Game.rooms[roomName].lookForAt('structure', tx, ty)[0];
    linkFrom.transferEnergy(linkTo);
}

module.exports = link;