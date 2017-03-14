;(function(){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['./picker', './clearable'], {});
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    require('./picker');
    require('./clearable');
}
})();
