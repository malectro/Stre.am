Stream = new (function() {
	var me = this,
	
		STREAM_TIME = 120000,
	
		_composing = 0,
		_timeout = null,
		_block = false;

	this.init = function() {
		$("#stream-input").
			focus(_start).
			keydown(_keyDown).
			keyup(_keyUp);
			
		$("#stream-post").click(_post);
			//keypress(_key);
	};
	
	function _start() {
		if(_composing)
			return;
			
		_composing = 1;
		
		$("#stream-timer").timer(STREAM_TIME, _post);
	};
	
	function _keyDown(event) {
		//console.log(event.which, event.keyCode);
		
		if(_block)
			event.preventDefault();
	
		if(event.which == 224)
			_block = true;
	}
	
	function _keyUp(event) {
		if(event.which == 224)
			_block = false;
	}
	
	function _post() {
		var text = $("#stream-input").removeAttr('contenteditable').addClass('off').html();
		
		_composing = 0;
		
		$.post('streams/post', {text: text});
		
		$(
			"<div />"
		).prependTo("#stream-recent");
	}
})();

Ajax = new (function() {
	this.get = function(func, params, callback) {
		$.getJSON('/ajax/'+func, params, callback);
	};
	this.post = function(func, params, callback) {
		$.ajax({
			type: 'POST',
			url: '/ajax/'+func, 
			data: params,
			dataType: 'json',
			success: callback
		});
	};
})();

$(function() {
	Stream.init();
});

/**
 * jQuery plugins
 */
(function($) {
	$.Time = new (function() {
		var me = this,
			_els = [],
			_timeout = null,
			_date = new Date();
			
		this.add = function(el, life, callback) {
			_els.push([el, _date.getTime()+life, callback]);
			if(!_timeout)
				me.step();
		};
		
		this.step = function() {
			var time = new Date().getTime(),
				timer, diff, next = [];
			
			for(var i in _els) {
				timer = _els[i];
				diff = timer[1]-time;
				
				if(diff > 0) {
					next.push(timer);
					_els[i][0].html(parseInt(diff/1000));
				}
				else if(timer[2])
					timer[2](timer[0]);
			}
			
			_els = next;
			
			if(_els.length > 0)
				_timeout = setTimeout(me.step, 500);
		};
	})();
	
	$.fn.timer = function(life, callback) {
		$.Time.add(this, life, callback)
	};
})(jQuery);

/**
 * Templates
 */
Templates = {};
Template = function(html) {
	this.html = html || '';
	
	this.render = function(context) {
		return this.html.replace(/\{\{ ([^}]+) \}\}/g, function(tag) {
			return (context[tag]) ? context[tag] ? '';
		});
	};
};

Templates.stream = new Template('<div class="stream"> 		<div class="time">{{ stream.published }}</div>
		<div class="text">{{ stream.text }}</div>
	</div>'
);
