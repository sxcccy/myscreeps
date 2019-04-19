var subCreateCreeps = require('sub_createcreep');

var replaceCreeps = {
    
    run: function () {

        var Num_Harvester = 2; var Num_Upgrader = 3; var Num_Builder = 1; var Num_Repairer = 1;

        subCreateCreeps.run(Num_Upgrader, 'upgrader', 'upgrader' + Game.time);
        subCreateCreeps.run(Num_Builder, 'builder', 'builder' + Game.time);
        subCreateCreeps.run(Num_Repairer, 'repairer', 'repairer' + Game.time);
        var targets = Game.spawns['Main_Base'].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }
        });

        for (name in targets) {
                subCreateCreeps.run(targets.length, 'harvesterToContainer', targets[name].id);
        }
        var num_harvesterBIG = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterBIG');
        var num_harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var num_harvesterToContainer = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterToContainer');
        if (num_harvesterBIG.length + num_harvester.length <= Num_Harvester) {
            if (num_harvesterBIG.length < 3 && num_harvester.length < 3 && num_harvesterToContainer.length == 0 ||
                num_harvesterBIG.length == 0 && num_harvester.length == 0) {
                subCreateCreeps.run(Num_Harvester, 'harvester', 'harvester' + Game.time);
                //console.log(num_harvesterBIG.length, num_harvester.length, num_harvesterToContainer.length);
            }
            else {
                subCreateCreeps.run(Num_Harvester, 'harvesterBIG', 'harvesterBIG' + Game.time);
            }
        }

            

   


        
  
    }
};

module.exports = replaceCreeps;