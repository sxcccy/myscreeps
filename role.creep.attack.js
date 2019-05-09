/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var roleCreepAttack = {

    run: function (creep) {
        'use strict';
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //console.log('attack')
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

    }
};

module.exports = roleCreepAttack;