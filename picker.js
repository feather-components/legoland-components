;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['jquery', 'datepicker', 'timepicker', 'datetimepicker', 'citypicker'], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    factory(
        require('jquery'),
        require('datepicker'),
        require('timepicker'),
        require('datetimepicker'),
        require('citypicker')
    );
}else{
    factory(window.jQuery);
}
})(function($){

$(document)
    .on('click.lg.picker', 'input[lg-picker]', function(){
        var $this = $(this);
        var picker = $this.attr('lg-picker') + 'picker';

        if(picker in $.fn){
            $this[picker]('open');
        }else{
            throw new Error('Picker [' + picker + '] not found!');
        }

        if(picker == 'datepicker'){
            $this.datepicker().off('clearable:clear').on('clearable:clear', function(){
                $this.datepicker('backToday');
                setTimeout(function(){
                    $this.datepicker('open');
                }, 0);
            });
        }
    });
});