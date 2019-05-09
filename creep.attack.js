/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var creepAttack = {

    run: function (creep) {
        'use strict';


        var anotherRoomName = 'E6S29';
        //console.log(creep.room.name !== anotherRoomName);
        if (creep.room.name !== anotherRoomName) {
            const exitDir = Game.map.findExit(creep.room, anotherRoomName);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, {
                visualizePathStyle: {
                    stroke: '#ffffff'
                },
                reusePath: 50
            });

            //creep.moveTo(new RoomPosition(46, 30, anotherRoomName), { reusePath: 50 });

        } else {
            //console.log('attack');

            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if (closestHostile) {
                creep.attack(closestHostile);
                const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                if (targets.length > 0) {
                    creep.rangedAttack(targets[0]);
                } else {
                    creep.moveTo(closestHostile, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        },
                        reusePath: 50
                    });
                }

                if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        },
                        reusePath: 50
                    });
                    creep.attack(closestHostile);
                    const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                    if (targets.length > 0) {
                        creep.rangedAttack(targets[0]);
                    }
                }

            }
            //creep.moveTo(new RoomPosition(12, 23, anotherRoomName), { reusePath: 50 });
        }
    }
};

module.exports = creepAttack;