var subCreateCreeps = require('sub_createcreep');

var replaceCreeps = {
    
    run: function () {

        var Num_Harvester = 4; var Num_Upgrader = 4; var Num_Builder = 8;  var Num_Repairer = 2;

        subCreateCreeps.run(Num_Harvester, 'harvester', 'harvester'+ Game.time);
        subCreateCreeps.run(Num_Upgrader, 'upgrader', 'upgrader' + Game.time);
        subCreateCreeps.run(Num_Builder, 'builder', 'builder' + Game.time);
        subCreateCreeps.run(Num_Repairer, 'repairer', 'repairer' + Game.time);

        var targets = Game.spawns['Main_Base'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
            }
        });
        for (name in targets) {
            subCreateCreeps.run(targets.length, 'harvesterToContainer',targets[name].id);
        }
        
  
    }
};

module.exports = replaceCreeps;