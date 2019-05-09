/* jshint -W117  */ /* jshint -W098  */ /* jshint -W083  */
var monitor = {
    run: function () {
        'use strict';
        var sum_energy = Game.rooms.E6S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E6S29.energyCapacityAvailable;
        var harvester = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        var harvesterBIG = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvesterBIG');
        var harvesterToContainer = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvesterToContainer');
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        var repairer = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        console.log('E6S29:', sum_energy + '/' + sum_energyCapacity,
            'H' + harvester.length,
            'HB' + harvesterBIG.length,
            'HT' + harvesterToContainer.length,
            'B' + builder.length,
            'R' + repairer.length,
            'U' + upgrader.length
        );
    }
};
module.exports = monitor;