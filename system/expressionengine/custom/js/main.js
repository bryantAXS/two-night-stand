var headerDropDown = function(){}

headerDropDown.prototype.init = function(){
	var self = this;
	
	$('#headerNotification').bind('mouseenter',function(){
		clearTimeout(self.timeout);
		$('#notificationDropDown').animate({'top': '50px'}, 500, '',function(){});
	
	}).bind('mouseleave',function(){
		self.initSlideOut();
	});
	
	$('#notificationDropDown').bind('mouseenter',function(){
		clearTimeout(self.timeout);
	}).bind('mouseleave',function(){
		self.initSlideOut();
	});
	
	//ajax form
	$('#submitNotification').bind('click',function(evt){
		evt.preventDefault();
		
		var email = $('#notificationEmail').val();
		
		$('#notificationEmail').val('Hold on...');
		
		$.ajax({
			
			url:'http://www.thetwonightstand.com/index.php/site/ajax_mailchimp'
			,data: {'notificationEmail': email}
			,dataType:'json'
			,type:'POST'
			,success: function(data){
				if(data.success == '1'){
					$('#notificationEmail').val('Thanks!');
					self.initSlideOut();
				}else{
					$('#notificationEmail').val('Error - Try again.');
				}
			}
		});
		
	});
}
headerDropDown.prototype.initSlideOut = function(){
	
	var self = this;
	
	var cb = function(){
		$('#notificationDropDown').animate({'top': '-70px'}, 500, '',function(){});
	}
	
	self.timeout = setTimeout(cb, 1000);
}

function loadTwitter(){
	$('#twitter_reactions').twitter_search('#2NS', {
        'results':'20',
        'showUsername':true
    });
}

//jQuery Starter
$(document).ready(function() {
	
	$('form input[type=checkbox], form input[type=file], select, textarea, button').uniform();
	
	var offset = $('#headerNotification').offset();
	$('#notificationDropDown').css('left', (offset.left - 60) + 'px');
	
	var dropdown = new headerDropDown();
	dropdown.init();
	
	if($('#twitter_reactions').length){
		loadTwitter();
        setInterval(function(){
        	loadTwitter();
        },30000);
	}
	
});
