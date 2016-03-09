$(document).ready(function() {

	$( "#cityfield" ).keyup(function() {

var url = "../getcity?q="+$("#cityfield").val();
$.getJSON(url,function(data) {
    var everything;
    everything = "<ul>";
    $.each(data, function(i,item) {
      everything += "<li> "+data[i].city;
    });
    everything += "</ul>";
    $("#txtHint").html(everything);
  })
		.done(function() { console.log('getJSON request succeeded!'); })
		.fail(function(jqXHR, textStatus, errorThrown) { 
			console.log('getJSON request failed! ' + textStatus); 
			console.log("incoming "+jqXHR.responseText);
		})
		.always(function() { console.log('getJSON request ended!');
		})
		.complete(function() { console.log("complete"); });
	});

	$("#button").click(function(e){
		var value = $("#cityfield").val();
		e.preventDefault();
		$("#dispcity").html(value);
		var myurl= "https://api.wunderground.com/api/80fa712bae969e95/geolookup/conditions/q/UT/";
		myurl += value;
		myurl += ".json";
		console.log(myurl);
		$.ajax({
			url : myurl,
			dataType : "jsonp",
			success : function(parsed_json) {
				var location = parsed_json['location']['city'];
				var temp_string = parsed_json['current_observation']['temperature_string'];
				var current_weather = parsed_json['current_observation']['weather'];
				everything = "<ul>";
				everything += "<li>Location: "+location;
				everything += "<li>Temperature: "+temp_string;
				everything += "<li>Weather: "+current_weather;
				everything += "</ul>";
				$("#weather").html(everything);
			}
		});

	
	});
  
  $("#netflix-button").click(function(e){
		var value = $("#title").val();
		e.preventDefault();
		var myurl= "http://netflixroulette.net/api/api.php?title=";
		myurl += value;
		console.log(myurl);
		$.ajax({
			url : myurl,
			dataType : "json",
			success : function(parsed_json) {
				var title = parsed_json['show_title'];
        var released = parsed_json['release_year'];
        var rating = parsed_json['rating'];
        var category = parsed_json['category'];
        var summary = parsed_json['summary'];
        var poster = parsed_json['poster'];
				everything = "<ul>";
				everything += "<li>Title: "+title;
				everything += "<li>Released: "+released;
				everything += "<li>Rating: "+rating;
        everything += "<li>Category: "+category;
				everything += "<li>Summary: "+summary;
				everything += "<li>Poster: <img src='"+poster+"'>";
				everything += "</ul>";
				$("#dispinfo").html(everything);
			}
		});

	
	});

});