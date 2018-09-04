/* --------------------------------------------------

	2018
	jesse korzan
	
-------------------------------------------------- */
var App = (function ($) {
    var jk = {};
    jk.vars = {
        reorder : false
    }
    jk.init = function () {
        jk.button();
        jk.data.addCards();
		$(window).resize(function() {
    		$("section").html("loading cards...");
            jk.data.addCards();
        });
    };
    jk.button = function () {
        var _button = $("button");
        
        function __init() {
            _button.html("left to right : " + jk.vars.reorder).attr({"class" : jk.vars.reorder});
        }
        
        _button.on("click", function(){
            jk.vars.reorder = !jk.vars.reorder;
            jk.data.addCards();
            __init();
        })
        
        __init();
    }
  	jk.data = {
  		addCards : function () {
	  		$.getJSON( "data.json", function(data) {
                var _items = [];
                $.each(data, function(key, val) {
                    _items.push("<div class='card'><h2>#" + (key + 1) + " &mdash; " + val.title + "</h2><p>" + val.content + "</div>");
                });
 
                var _cards = $( "<section/>", {html: _items.join("")});
                
                $("section").replaceWith(_cards);
                
                if (jk.vars.reorder)
                    jk.masonry.reorder();
                
            });
	  	}
  	};
  	jk.masonry = {
      	reorder : function () {
          	var   _wrapper = $("section"),
          	      _cards = $(".card"),
          	      _cols = Number(_wrapper.css("column-count")),
          	      _out = [],
          	      _col = 0;
            
            while(_col < _cols) {
                for (var i = 0; i < _cards.length; i += _cols) {
                    var _val = _cards[i + _col];
                    if (_val !== undefined)
                        _out.push(_val);
                }
                _col++;
            }
            _wrapper.html(_out);
            _wrapper.addClass("ready");
      	}
  	}
    return jk;
})(jQuery);

$(function () {
	App.init();
});