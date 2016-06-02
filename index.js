var cpu = require('./cpuusage.js')

var SerialPort = require("serialport").SerialPort
var port = new SerialPort("COM5", {
  baudrate: 9600
});


port.on('open', function () {
  setInterval(function(){
    cpu.measure(render)

  }, 25)
});

port.on('data', function (data) {
  console.log('Data: ' + data);
});
/*setInterval(function(){
  console.log(typeof cpu())
  var buf = new Buffer(cpu())
  console.log(buf.toString())

}, 100)*/

function render(currentCPU){

  var fullylit = parseInt(8*currentCPU/100)
  var nextlight = (8*currentCPU/100 - fullylit)*100
var list = []
var i = 0
for(var i = 0; i<fullylit; i++){
list.push(100)
}
if(currentCPU!=100){
list.push(parseInt(nextlight))
}
while(list.length<8){
  list.push(0)
}

port.write(list);
}
