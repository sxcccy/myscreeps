var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
var replaceCreeps = require('replace.creeps');
var roadBuild = require('road.build');
var Test = require('test');
var TestCreep = require('test.creep');

module.exports.loop = function ()
{

    for (var name in Memory.creeps)
    {
        if (!Game.creeps[name])
        {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (Game.spawns['Main_Base'].spawning)
    {
        var spawningCreep = Game.creeps[Game.spawns['Main_Base'].spawning.name];
        Game.spawns['Main_Base'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Main_Base'].pos.x + 1,
            Game.spawns['Main_Base'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    replaceCreeps.run();
    //roadBuild.run();
    //Test.run() 

    for (var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (!creep.memory.role) {
            roleBuilder.run(creep);
        }
        //TestCreep.run(creep);
        
        
    }
    
}