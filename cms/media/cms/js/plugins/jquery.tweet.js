/**
 * jquery.twitter.js
 * @author: Angelo Dini
 * @copyright http://www.divio.ch under the BSD Licence
 * @version: 0.2.0
 */
(function($) {
	// tweet meme plugin
	$.fn.tweetme = function(options) {
		return this.each(function () {
			// save options
			var options = $.extend({
				url: $(this).text(),
				source: 'username',
				style: 'normal',
				service: 'retwt.me',
				width: 50,
				height: 61
			}, options);
			// create start url
			var url = 'http://api.tweetmeme.com/button.js?';
			// serialize options
			$.each(options, function (key, value) {
				url += key + '=' + value + '&';
			});
			// save iframe
			var iframe = '<iframe src="' + url + '" width="' + options.width + '" height="' + options.height + '" scrolling="no" frameborder="0"></iframe>';
			// add iframe
			$(this).html(iframe);
		});
	};
	
	// official twitter button
	$.fn.twitter = function (options) {
		return this.each(function () {
			// save options
			var options = $.extend({
				url: $(this).text(),
				dataCount: 'none', /* none | horizontal | vertical */
				dataUrl: '',
				dataText: '',
				dataLang: ''
			}, options);
			// save link
			var iframe = '<a href="' + options.url + '" class="twitter-share-button" data-count="' + options.dataCount + '" data-url="' + options.dataUrl + '" data-text="' + options.dataText + '" data-lang="' + options.dataLang + '">Tweet</a>';
				iframe += '<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
			// add iframe
			$(this).html(iframe);
		});
	};
})(jQuery);
/**
 * jquery.tweet.js
 * @author: http://github.com/seaofclouds/tweet
 * @version: 0.2 -  (02.02.2011)
 * Licensed under the MIT http://www.opensource.org/licenses/mit-license.php
 */
(function($){$.fn.tweet=function(o){var s={username:["seaofclouds"],list:null,avatar_size:null,count:3,intro_text:null,outro_text:null,join_text:null,auto_join_text_default:"i said,",auto_join_text_ed:"i",auto_join_text_ing:"i am",auto_join_text_reply:"i replied to",auto_join_text_url:"i was looking at",loading_text:null,query:null,refresh_interval:null,twitter_url:"twitter.com",twitter_api_url:"api.twitter.com",twitter_search_url:"search.twitter.com"};if(o)$.extend(s,o);$.fn.extend({linkUrl:function(){var returning=[];var regexp=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;this.each(function(){returning.push(this.replace(regexp,function(match){var url=(/^[a-z]+:/i).test(match)?match:"http://"+match;return"<a href=\""+url+"\">"+match+"</a>";}));});return $(returning);},linkUser:function(){var returning=[];var regexp=/[\@]+([A-Za-z0-9-_]+)/gi;this.each(function(){returning.push(this.replace(regexp,"<a href=\"http://"+s.twitter_url+"/$1\">@$1</a>"));});return $(returning);},linkHash:function(){var returning=[];var regexp=/(?:^| )[\#]+([A-Za-z0-9-_]+)/gi;this.each(function(){returning.push(this.replace(regexp,' <a href="http://'+s.twitter_search_url+'/search?q=&tag=$1&lang=all&from='+s.username.join("%2BOR%2B")+'">#$1</a>'));});return $(returning);},capAwesome:function(){var returning=[];this.each(function(){returning.push(this.replace(/\b(awesome)\b/gi,'<span class="awesome">$1</span>'));});return $(returning);},capEpic:function(){var returning=[];this.each(function(){returning.push(this.replace(/\b(epic)\b/gi,'<span class="epic">$1</span>'));});return $(returning);},makeHeart:function(){var returning=[];this.each(function(){returning.push(this.replace(/(&lt;)+[3]/gi,"<tt class='heart'>&#x2665;</tt>"));});return $(returning);}});function parse_date(date_str){return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,'$1,$2$4$3'));}function relative_time(time_value){var parsed_date=parse_date(time_value);var relative_to=(arguments.length>1)?arguments[1]:new Date();var delta=parseInt((relative_to.getTime()-parsed_date)/1000);var r='';if(delta<60){r=delta+' seconds ago';}else if(delta<120){r='a minute ago';}else if(delta<(45*60)){r=(parseInt(delta/60,10)).toString()+' minutes ago';}else if(delta<(2*60*60)){r='an hour ago';}else if(delta<(24*60*60)){r=''+(parseInt(delta/3600,10)).toString()+' hours ago';}else if(delta<(48*60*60)){r='a day ago';}else{r=(parseInt(delta/86400,10)).toString()+' days ago';}return'about '+r;}function build_url(){var proto=('https:'==document.location.protocol?'https:':'http:');if(s.list){return proto+"//"+s.twitter_api_url+"/1/"+s.username[0]+"/lists/"+s.list+"/statuses.json?per_page="+s.count+"&callback=?";}else if(s.query==null&&s.username.length==1){return proto+'//'+s.twitter_api_url+'/1/statuses/user_timeline.json?screen_name='+s.username[0]+'&count='+s.count+'&include_rts=1&callback=?';}else{var query=(s.query||'from:'+s.username.join(' OR from:'));return proto+'//'+s.twitter_search_url+'/search.json?&q='+encodeURIComponent(query)+'&rpp='+s.count+'&callback=?';}}return this.each(function(i,widget){var list=$('<ul class="tweet_list">').appendTo(widget);var intro='<p class="tweet_intro">'+s.intro_text+'</p>';var outro='<p class="tweet_outro">'+s.outro_text+'</p>';var loading=$('<p class="loading">'+s.loading_text+'</p>');if(typeof(s.username)=="string"){s.username=[s.username];}if(s.loading_text)$(widget).append(loading);$(widget).bind("load",function(){$.getJSON(build_url(),function(data){if(s.loading_text)loading.remove();if(s.intro_text)list.before(intro);list.empty();var tweets=(data.results||data);$.each(tweets,function(i,item){if(s.join_text=="auto"){if(item.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)){var join_text=s.auto_join_text_reply;}else if(item.text.match(/(^\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+) .*/i)){var join_text=s.auto_join_text_url;}else if(item.text.match(/^((\w+ed)|just) .*/im)){var join_text=s.auto_join_text_ed;}else if(item.text.match(/^(\w*ing) .*/i)){var join_text=s.auto_join_text_ing;}else{var join_text=s.auto_join_text_default;}}else{var join_text=s.join_text;};var from_user=item.from_user||item.user.screen_name;var profile_image_url=item.profile_image_url||item.user.profile_image_url;var join_template='<span class="tweet_join"> '+join_text+' </span>';var join=((s.join_text)?join_template:' ');var avatar_template='<a class="tweet_avatar" href="http://'+s.twitter_url+'/'+from_user+'"><img src="'+profile_image_url+'" height="'+s.avatar_size+'" width="'+s.avatar_size+'" alt="'+from_user+'\'s avatar" title="'+from_user+'\'s avatar" border="0"/></a>';var avatar=(s.avatar_size?avatar_template:'');var date='<span class="tweet_time"><a href="http://'+s.twitter_url+'/'+from_user+'/statuses/'+item.id_str+'" title="view tweet on twitter">'+relative_time(item.created_at)+'</a></span>';var text='<span class="tweet_text">'+$([item.text]).linkUrl().linkUser().linkHash().makeHeart().capAwesome().capEpic()[0]+'</span>';list.append('<li>'+avatar+date+join+text+'</li>');list.children('li:first').addClass('tweet_first');list.children('li:odd').addClass('tweet_even');list.children('li:even').addClass('tweet_odd');});if(s.outro_text)list.after(outro);$(widget).trigger("loaded").trigger((tweets.length==0?"empty":"full"));if(s.refresh_interval){window.setTimeout(function(){$(widget).trigger("load");},1000*s.refresh_interval);};});}).trigger("load");});};})(jQuery);