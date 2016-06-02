var cpu = require('./cpuusage.js')

var SerialPort = require("serialport").SerialPort
var port = new SerialPort("COM5", {
  baudrate: 9600
});


port.on('open', function () {
  setInterval(function(){
    port.write(render(), function(err, bytesWritten) {
      if (err) {
        return console.log('Error: ', err.message);
      }
      console.log(bytesWritten, 'bytes written');
    });
  }, 55)
});

port.on('data', function (data) {
  console.log('Data: ' + data);
});
/*setInterval(function(){
  console.log(typeof cpu())
  var buf = new Buffer(cpu())
  console.log(buf.toString())

}, 100)*/

function render(){
  var currentCPU = cpu()
  console.log(currentCPU)
  var fullylit = parseInt(8*currentCPU/100)
  var nextlight = (8*currentCPU/100 - fullylit)*100
var list = []
var i = 0
for(var i = 0; i<fullylit; i++){
list.push(100)
}
list.push(parseInt(nextlight))
while(list.length<8){
  list.push(0)
}
console.log(list)
//console.log(fullylit)
return(list)
}
render()
