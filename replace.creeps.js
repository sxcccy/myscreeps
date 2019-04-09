var replaceCreeps = {
    
    run: function (creep) {

        var Num_Harvester = 4; var Num_Upgrader = 3; var Num_Builder = 8;  var Num_Repairer = 2;

        //确认能量剩余值
        var sum_energy = Game.rooms.E6S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E6S29.energyCapacityAvailable;
        console.log('current energy:', sum_energy + '//' + sum_energyCapacity);

        //判断能量剩余值是否大于等于550，然后决定孵化大小蠕虫
        if(sum_energy < 550){
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            console.log('Harvesters: ' + harvesters.length);
            if (harvesters.length < Num_Harvester) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'harvester' } });
            }

            var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            console.log('upgrader: ' + upgrader.length);
            if (upgrader.length < Num_Upgrader) {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } });
            }

            var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            console.log('builder: ' + builder.length);
            if (builder.length < Num_Builder) {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'builder' } });
            }
            var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            console.log('repairer: ' + repairer.length);
            if (repairer.length < Num_Repairer) {
                var newName = 'Repairer' + Game.time;
                console.log('Spawning new repairer: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'repairer' } });
            }
        }
		//孵化大蠕虫
        else {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            console.log('Harvesters: ' + harvesters.length);
            if (harvesters.length < Num_Harvester) {
                var newName = 'Harvester_Big' + Game.time;
                console.log('Spawning new harvester_Big: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'harvester' } });
            }

            var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            console.log('upgrader: ' + upgrader.length);
            if (upgrader.length < Num_Upgrader) {
                var newName = 'Upgrader_Big' + Game.time;
                console.log('Spawning new upgrader_Big: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader' } });
            }

            var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            console.log('builder: ' + builder.length);
            if (builder.length < Num_Builder) {
                var newName = 'Builder_Big' + Game.time;
                console.log('Spawning new builde_Bigr: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'builder' } });
            }
            var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            console.log('repairer: ' + repairer.length);
            if (repairer.length < Num_Repairer) {
                var newName = 'Repairer_big' + Game.time;
                console.log('Spawning new repairer: ' + newName);
                Game.spawns['Main_Base'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'repairer' } });
            }
		}

        
    }
};

module.exports = replaceCreeps;