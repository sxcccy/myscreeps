var subCreateCreeps = {
    
    run: function (num, branchOfWork,name) {

        //ȷ������ʣ��ֵ
        var sum_energy = Game.rooms.E6S29.energyAvailable;
        var sum_energyCapacity = Game.rooms.E6S29.energyCapacityAvailable;
        console.log('current energy:', sum_energy + '//' + sum_energyCapacity);

        //�ж�����ʣ��ֵ�Ƿ���ڵ���550��Ȼ�����������С���
        if(sum_energy < 550){
            var num_branchOfWork = _.filter(Game.creeps, (creep) => creep.memory.role == branchOfWork);
            console.log(branchOfWork + '='+ num_branchOfWork.length);
            if (num_branchOfWork.length < num) {
                console.log('Spawning new ' + branchOfWork,name);
                Game.spawns['Main_Base'].spawnCreep([WORK, CARRY, MOVE], name,
                    { memory: { role: branchOfWork } });
            }
        }
		//���������
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