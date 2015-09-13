var ref = new Firebase("https://dareacttv.firebaseio.com/");

var showId = ref.child("showId");

var showRef = showId.push();
var showIdValue = showRef.key();

var eventId = showRef.child("eventId");
var eventIdValue = eventId.key();


var img1 = eventId.push();
var img1Id = img1.key();

var img2 = eventId.push();
var img2Id = img2.key();

var img3 = eventId.push();
var img3Id = img3.key();

var images = {};
images[img1Id] = "img1";
images[img2Id] = "img2";
images[img3Id] = "img3";

eventId.push({
	delay: 5,
	eventTime: 5,
	maxAmount: 20,
	showPeriod:5,
    images: images
})