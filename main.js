var roleHarvester = require('role.harvester');
var replaceCreeps = require('replace.creeps');
var roleHarvesterToContainer = require('role.harvester.container');
var monitor = require('monitor');
var defense = require('defense');
var roomClaim = require('room.claim');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
var creepAttack = require('creep.attack');
var creepRepair = require('creep.repair');
var roadBuild = require('road.build');
var Test = require('test');
var TestCreep = require('test.creep');
var roomE5S29 = require('room.e5s29');
var roomE5S28 = require('room.e5s28');
var Link = require('link');

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

    Link.run();
    defense.run();
    replaceCreeps.run();
    monitor.run();
    roadBuild.run();  
    for (var name in Game.creeps)
    {

        var creep = Game.creeps[name];

        
        if (creep.memory.role == 'harvester' || creep.memory.role == 'harvesterBIG') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            //creepAttack.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            //roomClaim.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            //TestCreep.run(creep);;
            creepRepair.run(creep);
        }
        if (creep.memory.role == 'harvesterToContainer') {
            roleHarvesterToContainer.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            //roomClaim.run(creep);
            //creepAttack.run(creep);
        }
        if (creep.memory.role == null) {
            //roomClaim.run(creep);
            //creepAttack.run(creep);
        }
        

        
        //TestCreep.run(creep);
        
        
    }



    roomE5S29.run();
    roomE5S28.run();

    Test.run();
}