
var monitor = {

    /** @param {Creep} creep **/
    run: function () {

        var sum_energy = Game.rooms.E6S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E6S29.energyCapacityAvailable;
 
        var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var harvesterBIG = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterBIG');
        var harvesterToContainer = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterToContainer');
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        console.log('current energy:', sum_energy + '/' + sum_energyCapacity,
            ' harvester:', harvester.length,
            ' harvesterBIG:', harvesterBIG.length,
            ' harvesterToContainer:', harvesterToContainer.length,
            ' builder:', builder.length,
            ' repairer:', repairer.length,
            ' upgrader:', upgrader.length,

        );



    }
};

module.exports = monitor;