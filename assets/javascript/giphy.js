$(document).ready(function() {
	$("#buttons").on("click", function(ev) {
        var sport = ($(ev.target).html());
		var results = queryURL + sport
		$.ajax({
			url: results,
			method: "GET"})
			
		.then(function(response, status){
				console.log(response["data"][0]["url"])
				createImage(response["data"][0].images.fixed_height.url)
			
			
			})
		
		})
    
	
	var topics = ["basketball", "soccer", "football", "baseball","hockey","nascar","college football"]

	var h = $("#buttons")
	
	function makeaButton(sport){
		//var li = $("<li></li>")
		var button = $("<li>" + sport + "</li>")
		h.append(button)
		
	}
	for(let i = 0; i < topics.length; i++){
		makeaButton(topics[i])
		
	}
	
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wdR6jLKCQeLCM7NcD12mNNhQ6mj1zWhZ&limit=10&q="
	
	function createImage(url){
		var newImage = $("<img>")
		newImage.attr("src", url)
		$("section").append(newImage)
		
		
		
	}
	
	
		
	
	
	 
	
	
		
	
});
	 
	
	