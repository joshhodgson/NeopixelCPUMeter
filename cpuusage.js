//based on https://gist.github.com/bag-man/5570809
var os = require("os");

//Create function to get CPU information
function cpuAverage() {

  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  //Loop through CPU cores
  for(var i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for(type in cpu.times) {
      totalTick += cpu.times[type];
    }

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}


function measure(callback) {
  //Grab first CPU Measure
  var startMeasure = cpuAverage();
  //Define what we'll do to take the final measurement
  setTimeout(function(){
    //Grab second Measure
    var endMeasure = cpuAverage();

    //Calculate the difference in idle and total time between the measures
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;

    //Calculate the average percentage CPU usage
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    //Run the callback
    callback(percentageCPU)
  }, 3000) //NB this 3000ms time gives a SMOOTH effect
}


module.exports.measure = measure
