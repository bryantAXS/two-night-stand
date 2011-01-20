/*
* Author:      phpdude (http://codecanyon.net/user/phpdude/portfolio)
* Plugin name: twitter_reactions
* Description: This plugin allows the user to display Twitter reactions for a given URL.
*/
(function($){
    $.fn.twitter_reactions = function(url,opts) {
        var options = $.extend({
            results:10,
            showUsername:false
        },opts);
        options.results = (options.results > 50) ? 50 : options.results;
        var obj = $(this);
        $.getJSON('http://otter.topsy.com/trackbacks.js?url=' + escape(url) + '&amp;perpage=' + options.results + '&amp;callback=?', function(data) {
            var actualResults = (options.results > data.response.total) ? data.response.total : options.results;
            obj.html('<li id="reactions_header"><em>Showing ' + actualResults + ' most recent</em>' + data.response.total + ' Twitter Reactions</li>');
            $.each(data.response.list, function(i,item) {
                var content = item.content.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
                    return '<a href="'+url+'" target="_blank">'+url+'</a>';
                }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
                    return  '@<a href="http://twitter.com/'+reply.substring(1)+'" target="_blank">'+reply.substring(1)+'</a>';
                });
                var author = (options.showUsername) ? '<strong>' + item.author.name + '</strong>: ' : '';
                obj.html(obj.html() + '<li><a href="' + item.author.url + '" target="_blank"><img src="' + item.author.photo_url + '" alt="' + item.author.name + '" /></a>' + author + content + '<br class="clear" /><small><a href="' + item.permalink_url+ '">' + $(this).relTime(item.date) + '</a></small></li>');
            });
        });
    };
    $.fn.twitter_search = function(search,opts) {
        var options = $.extend({
            results:10,
            showUsername:false
        },opts);
        options.results = (options.results > 100) ? 100 : options.results;
        var obj = $(this);
        $.ajax({
          url: 'http://search.twitter.com/search.json?q=' + escape(search) + '&rpp=' + options.results,
		  type: 'GET',
          dataType: 'jsonp',
          success: function(data) {
              obj.html('<li id="reactions_header"><em>&nbsp;</em>Showing ' + options.results + ' Most Recent Tweets</li>');
                $.each(data.results, function(i,item) {
                    var content = item.text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
                        return '<a href="'+url+'" target="_blank">'+url+'</a>';
                    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
                        return  '@<a href="http://twitter.com/'+reply.substring(1)+'" target="_blank">'+reply.substring(1)+'</a>';
                    });
                    var author = (options.showUsername) ? '<strong>' + item.from_user + '</strong>: ' : '';
                    obj.html(obj.html() + '<li><a href="http://www.twitter.com/' + item.from_user + '" target="_blank"><img src="' + item.profile_image_url + '" alt="' + item.from_user + '" /></a>' + author + content + '<br class="clear" /><small><a href="http://www.twitter.com/' + item.from_user + '/status/' + item.id+ '">' + $(this).relTime($(this).parseDate(item.created_at)) + '</a></small></li>');
                });
            }
        });
    };
    $.fn.parseDate = function(date) {
        var datum = new Date(date);
        return (datum.getTime()/1000.0);
    };
    $.fn.relTime = function(time) {
        var time_ago = parseInt(new Date().getTime()/1000) - parseInt(time);
        if(time_ago<60) {
            return 'less than a minute ago';
        } else if(time_ago<120) {
            return 'about a minute ago';
        } else if(time_ago<(60*60)) {
            return (parseInt(time_ago/60)).toString() + ' minutes ago';
        } else if(time_ago<(120*60)) {
            return 'about an hour ago';
        } else if(time_ago<(24*60*60)) {
            return 'about ' + (parseInt(time_ago/3600)).toString() + ' hours ago';
        } else if(time_ago<(48*60*60)) {
            return '1 day ago';
        } else if(time_ago<(10*24*60*60)) {
            return 'about ' + (parseInt(time_ago/86400)).toString() + ' days ago';
        } else {
            var ago = new Date();
            ago.setTime(time*1000);
            var m_names = new Array("Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sept","Oct", "Nov", "Dec");
            return ago.getDate() + '-' + m_names[ago.getMonth()] + '-' + ago.getFullYear() + ' ' + ((ago.getHours() < 10) ? '0' + ago.getHours() : ago.getHours()) + ':' + ((ago.getMinutes() < 10) ? '0' + ago.getMinutes() : ago.getMinutes());
        }
    };
})(jQuery);