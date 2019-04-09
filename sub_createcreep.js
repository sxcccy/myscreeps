var subCreateCreeps = {
    
    run: function (num, branchOfWork,name) {

        //确认能量剩余值
        var sum_energy = Game.rooms.E6S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E6S29.energyCapacityAvailable;
        console.log('current energy:', sum_energy + '//' + sum_energyCapacity);

        //判断能量剩余值是否大于等于550，然后决定孵化大小蠕虫
        if(sum_energy < 550){
            var num_branchOfWork = _.filter(Game.creeps, (creep) => creep.memory.role == branchOfWork);
            console.log(branchOfWork + '='+ num_branchOfWork.length);
            if (num_branchOfWork.length < num) {
                console.log('Spawning new ' + branchOfWork,name);
                Game.spawns['Main_Base'].spawnCreep([WORK, CARRY, MOVE], name,
                    { memory: { role: branchOfWork } });
            }
        }
		//孵化大蠕虫
        else {
            var num_branchOfWork = _.filter(Game.creeps, (creep) => creep.memory.role == branchOfWork);
            console.log(branchOfWork + '='+ num_branchOfWork.length);
            if (num_branchOfWork.length < num) {
                console.log('Spawning new ' + branchOfWork,name);
                Game.spawns['Main_Base'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], name,
                    { memory: { role: branchOfWork } });
            }
		}  
    }
};

module.exports = subCreateCreeps;