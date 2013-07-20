var util = require('util');

var _level     = 'debug';
  
exports = module.exports = function(level) {

  if (level) _level = level;
 
  var logwrapper =  function() {}
    
  logwrapper.debug      = function() { delegate('debug', arguments); }
  logwrapper.info       = function() { delegate('info', arguments); }
  logwrapper.notice     = function() { delegate('notice', arguments); }
  logwrapper.warning    = function() { delegate('warning', arguments); }
  logwrapper.error      = function() { delegate('error', arguments); }
  logwrapper.critical   = function() { delegate('critical', arguments); }
  logwrapper.alert      = function() { delegate('alert', arguments); }
  logwrapper.emergency  = function() { delegate('emergency', arguments); }
    
  return logwrapper;
}

function delegate(method, _args) {

  var logLevelAllowed = module.parent.exports('util', _level).logLevelAllowed; //function
  
  if (!logLevelAllowed(method, _level)) {
    return;
  }

  var args = Array.prototype.slice.call(_args);

  if (args.length === 1) {
    //log[method](args[0]);
    util.log(method.toUpperCase() + " " + util.inspect(args[0], { showHidden: true, depth: null }));
  }
  
  if (args.length > 1) {
    var caption = args.shift();
    util.log(method.toUpperCase() + " " + caption + " " + util.format.apply(null, args));
  }
  
}