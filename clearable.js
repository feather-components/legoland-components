;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['jquery', 'class'], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    factory(
        require('jquery'),
        require('class')
    );
}else{
    factory(window.jQuery, window.jQuery.klass);
}
})(function($, Class){

var ClearAble = Class.$factory('clearable', {
    initialize: function(options){
        var self = this;

        options = self.options = $.extend({
            dom: null
        }, options || {});
        
        self.$dom = $(options.dom);
        self.$icon = $('<i class="iconfont icon-close">').css({
            position: 'absolute',
            cursor: 'pointer',
            fontSize: 14
        });

        self.initEvent();
    },

    initEvent: function(){
        var self = this, $dom = self.$dom;

        self.o2s($dom, 'focus', function(){
            $.trim(this.value) && !self.$icon.is(':visible') && self.open();
        });

        self.o2s($dom, 'keyup', function(){
            if($.trim(this.value)){
                !self.$icon.is(':visible') && self.open();
            }else{
                self.close();
            }
        });

        self.$icon.click(function(){
            $dom.val('').focus();
            self.trigger('clear');
            self.close();
        });

        self.o2s(document, 'click', function(e){
            if(e.target !== $dom.get(0) && e.target !== self.$icon.get(0)){
                self.trigger('leave');
            }
        });
    },

    open: function(){
        var self = this, $dom = self.$dom;
        var offset = $dom.offset(), width = $dom.outerWidth(), height = $dom.outerHeight();

        self.$icon.appendTo(document.body).css({
            left: offset.left + width - 18,
            top: offset.top + 7
        });
        self.trigger('open');
    },

    close: function(){
        var self = this;

        self.$icon.detach();
        self.trigger('close');
    },

    destroy: function(){
        var self = this;

        self.ofs(self.$dom, 'focus keyup');
        self.ofs(document, 'click');
        self.$icon.remove();
        self.$icon = null;
    }
});


$(document).on('focus.lg.helper', 'input[lg-clearable]', function(){
    $(this).clearable().off('clearable:leave').on('clearable:leave', function(){
        $(this).clearable('destroy');
    });
});

return ClearAble;

});
