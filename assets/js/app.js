;(function($) {
  var app = $.sammy(function() { with(this) {
    element_selector = '#content';
    
		var context = this;
    var loaded = false;
		// helpers
	  var error = function(text) {context.trigger('error', {message: text});}
		var notice = function(text) {context.trigger('notice', {message: text});}
    
    // display tasks
    get('#/', function() { with (this) {
			get_page("/control/status", {
				success: function(data) {partial('/assets/templates/node_status.html', $(data.status)[0]);},
				error: function() {error("Unable to load vhost information");}
			});
    }});

    get('#/vhosts', function() { with (this) {			
			get_page("/vhosts", {
				success: function(data) {partial('/assets/templates/vhosts.html', data);},
				error: function() {error("Unable to load vhosts");}
			});
    }});

    get('#/users', function() { with (this) {			
			get_page("/users", {
				success: function(data) {partial('/assets/templates/users.html', data);},
				error: function() {error("Unable to load users");}
			});
    }});

    get('#/connections', function() { with (this) {			
			get_page("/conn/address/port/peer_address/peer_port/state/channels/user/vhost/timeout/frame_max/recv_oct/recv_cnt/send_oct/send_cnt/send_pend", {
				success: function(data) {partial('/assets/templates/connections.html', {conns: $(data.conn)})},
				error: function() {error("Unable to load connections");}
			});
    }});

    get('#/queues', function() { with (this) {
			var vhost;
			if (params["name"]) {vhost = params["name"];} else {vhost = "root"};
	get_page("/queues/"+vhost+"/name/durable/auto_delete/arguments/messages_ready/messages_unacknowledged/messages_uncommitted/messages/acks_uncommitted/consumers/transactions/memory", {
				success: function(data) {console.log(data);partial('/assets/templates/queues.html', data)},
				error: function() {error("Unable to load queues");}
			});
    }});

    get('#/rabbit_status', function() { with (this) {
			redirect("#/");
			return false;
    }});
    
    bind('loaded', function() { with(this) { redirect('#/'); }});
    
    bind('error', function(e, data) { with(this) {show_div(data, "#error");}});
		bind('notice', function(e, data) { with(this) {show_div(data, "#notice");}});
    
    
  }});
  
  $(function() {
    app.run('#/');
  })
})(jQuery);