
var roomClaim = {

    run: function (creep) {

        

        var anotherRoomName = 'E5S28';
        console.log(creep.pos);
        if (creep.room.name != anotherRoomName) {
            const exitDir = Game.map.findExit(creep.room, anotherRoomName);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { reusePath: 50 });
            //creep.moveTo(new RoomPosition(48, 30, anotherRoomName), { reusePath: 50 });

        }
        else {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
                }
            
        }
    }
};

module.exports = roomClaim;