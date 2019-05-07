var subCreateCreeps = {

    run: function (num, branchOfWork, name) {


        //judge energy
        var sum_energy = Game.rooms.E6S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E6S29.energyCapacityAvailable;
        var num_branchOfWork = _.filter(Game.creeps, (creep) => creep.memory.role == branchOfWork);
        //console.log('current energy:', sum_energy + '/' + sum_energyCapacity);
        //console.log(branchOfWork + '=' + num_branchOfWork.length + '/' + num);
        var fenshuling=1100
        if (sum_energy < fenshuling && branchOfWork == 'harvester') {
            if (num_branchOfWork.length < num) {
                console.log('Spawning new ' + branchOfWork, name);
                Game.spawns['Main_Base'].spawnCreep([WORK, CARRY, MOVE], name,
                    { memory: { role: branchOfWork } });
            }
        }
        if (sum_energy >= fenshuling) {
            var STD_harvesterBIG = [WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            var STD_builder = [WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE];
            //var STD_upgrader = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE];
            var STD_upgrader = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE];
            var STD_repairer = [WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            var STD_harvesterToContainer = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];

            //
            if (branchOfWork == 'harvesterBIG') { var STD = STD_harvesterBIG; }
            if (branchOfWork == 'builder') { var STD = STD_builder; }
            if (branchOfWork == 'upgrader') { var STD = STD_upgrader; }
            if (branchOfWork == 'repairer') { var STD = STD_repairer; }
            if (branchOfWork == 'harvesterToContainer') { var STD = STD_harvesterToContainer; }
            
            if (num_branchOfWork.length < num) {
                Game.spawns['Main_Base'].spawnCreep(STD, name, { memory: { role: branchOfWork } });
                console.log('Spawning new -----' + branchOfWork, '-----' + name, '------' + STD);
            }
        }
    }
};

module.exports = subCreateCreeps;