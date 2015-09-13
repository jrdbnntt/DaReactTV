(function(){
	
	var initialTime = new Date();
	var showInfo;
	var showRef;

	var events = [];
	var showId = '';

		// EXMPLE DATA
	var reactionEvents = [];


	$.get('http://35.2.93.206:8080/tv/getTuned')
	.then(function(data) {
		// var dfd = $.Deferred();
		showInfo = data;
		showRef = new Firebase("https://dareacttv.firebaseio.com/showId/"+ showInfo.uniqueId +"/eventId");
		
		showRef.on('value', function(snapshot) {
			var eventsRef = snapshot.val();

			for(var eventId in eventsRef) {
				var data = eventsRef[eventId];
				events.push({id: eventId, waitTime:  data.eventTime - showInfo.offset });
				reactionEvents.push({
					start: data.eventTime,
					delay: data.delay,
					showPeriod: data.showPeriod,
					maxAmount: data.maxAmount,
					imageIds: data.images
				});
			}

	 		$.ajax({
	 			method: 'POST',
	 			contentType: 'application/json',
				url: 'http://dareacttv.co/api/setShow',
				data: JSON.stringify({showId: showInfo.uniqueId, events: events })
			});
		});
	})


	
	var cont = $('.thumb-container');
	var tBarWidth = cont.width() * 0.25;
	var tBarHeight = cont.height() * 0.25;
	var placedImages = [];
	var maxCollision = 15;		// only collisions of this amount+ are considered
	var maxPlacementAttempts = 20;
	var maxVariation = 250;	// slight fade difference
	var fadeTime = 250;
	
	
	/*************************************************************************
	 * Utility
	 */
	
	var waitAsync = function(miliseconds) {
		var dfd = $.Deferred();
		
		setTimeout(function(){
			dfd.resolve();
		}, miliseconds);
		
		return dfd.promise();
	};
	
	// Constructs static image location
	var getImageUrl = function(id) {
		return '/img/static/' + id + '.png';
	};
	
	
	/*************************************************************************
	 * Image placment
	 */
	
	// Reduce size if needed
	var fixSize = function(img) {
		var ratio;
		
		ratio = img.width() / img.height();
		
		if(tBarWidth > tBarHeight) {
			if(img.width() > tBarWidth) {
				img.width(tBarWidth);
				img.height(tBarWidth/ratio);
			}
			
			if(img.height() > tBarHeight) {
				img.height(tBarHeight);
				img.width(ratio*tBarHeight);
			}
		} else {
			if(img.height() > tBarHeight) {
				img.height(tBarHeight);
				img.width(ratio*tBarHeight);
			}
			if(img.width() > tBarWidth) {
				img.width(tBarWidth);
				img.height(tBarWidth/ratio);
			}
		}
	};
	
	var hasRectCollision = function(img) {
		if(placedImages.length === 0) {
			return false;
		}
		
		var collision = false;
		var px, py, pw, ph,
			x, y, w, h, offset;
		
		offset = img.offset();
		x = offset.left + maxCollision;
		y = offset.top + maxCollision;
		w = img.width() - maxCollision;
		h = img.height() - maxCollision;
		
		$.each(placedImages, function(i, pImg) {
			offset = pImg.offset();
			px = offset.left;
			py = offset.top;
			pw = pImg.width();
			ph = pImg.height();
			
			if(x < px + pw &&
				x + w > px &&
				y < py + ph && 
				h + y > py) {
				collision = true;
				return false;
			}
		});
		
		return collision;
	};
	
	// Position in bar around center randomly
	var moveToRandom = function(img) {
		var css;
		var i = 0;
		var collision;
		
		do {
			css = {};
			switch(Math.floor(Math.random()*4)) {
				case 0: // top
					css = {
						left: Math.random()*(cont.width() - img.width()),
						top: Math.random()*(tBarHeight - img.width())
					};
					break;
				case 1: // right
					css = {
						left: tBarWidth*3 + Math.random()*(tBarWidth-img.width()),
						top: Math.random()*(cont.height() - img.height())
					};
					break;
				case 2: // bottom
					css = {
						left: Math.random()*(cont.width() - img.width()),
						top: tBarHeight*3 + Math.random()*(tBarHeight-img.height())
					};
					break;
				case 3: // left
					css =  {
						left: Math.random()*(tBarWidth-img.width()),
						top: Math.random()*(cont.height() - img.height())
					};
			}
			img.css(css);
			collision = hasRectCollision(img);
		} while(collision && (i++ < maxPlacementAttempts));
		
		if(collision) {
			img.remove();
		} else {
			placedImages.push(img);
		}
		
	};
	
	
	/*************************************************************************
	 * Event handling
	 */
	
	var dvrPaused, eventTimers;
	
	
	// run single event
	var playEvent = function(reactionEvent) {
		console.log(reactionEvent);
		cont.find('.thumb').remove();
		cont.append(reactionEvent.html);
		
		var bgc = cont.find('.inner').css('background-color');
		cont.find('.inner').css('background-color', 'red');
		setTimeout(function() {
			cont.find('.inner').css('background-color', bgc);
		}, 250);
		
		
		// Set all of the images
		
		var thumbs = $('img.thumb');
		placedImages = [];
		
		$.each(thumbs, function(i, thumb) {
			fixSize($(thumb));
		});
		$.each(thumbs, function(i, thumb) {
			moveToRandom($(thumb));
		});
		
		$.each(thumbs, function(i, thumb) {
			thumb = $(thumb);
			waitAsync(reactionEvent.delay + Math.random()*maxVariation)
			.then(function() {
				thumb.fadeTo(fadeTime, 1, function() {
					waitAsync(reactionEvent.showPeriod + Math.random()*maxVariation)
					.then(function() {
						thumb.fadeTo(fadeTime, 0, function() {
							thumb.remove();
						});
					});
				});
			});
		});
	};
		
	// Load all event data
	$.each(reactionEvents, function(i, ev) {
		// Get images
		ev.html = $('<div></div>');
		
		$.each(ev.imageIds, function(i, imageId) {
			ev.html.append('<img class="thumb" src="'+getImageUrl(imageId)+'">');
		});
		
	});
	
	
	$.each(reactionEvents, function(i, ev) {
		waitAsync(100)
		.then(function(){
			playEvent(ev);
		}, ev.waitTime);
	});
	
	
		
})();