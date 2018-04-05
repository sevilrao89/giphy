$(document).ready(function() {
	var timeLeft = 30;
	$("#timerem").html(timeLeft)
	$("#startbutton").on("click", function(ev){
		console.log("clickedonbutton")
		showGame()
		
		
		
		var tickerId;
		var answers = {
			"band":"Zayn-Malik", 
			"friends":"10",
			"ironman":"Robert-Downey",
			"movie":"The-Revenant",
			"music":"Taylor-Swift",
		}
		
		function showGame(){
			$("#start").addClass("hidden")
			$("#game").removeClass("hidden")
			tickerId = setInterval(tick, 1000)
				
			
			
			
		}
		function tick(){
			$("#timerem").html(timeLeft)
			timeLeft--
			if (timeLeft < 0){
				console.log("timeOut")
				clearInterval(tickerId)
				showResults()
				
			}
		}
		
		function showResults(){
			$("#game").addClass("hidden")
			$("#end").removeClass("hidden")
			var checked = $("input:checked")
			//console.log("number of answers " + checked.length)
			var right = 0, 
				wrong = 0;
			for (let i = 0; i < checked.length; i++){
				var name = checked[i].name
				//console.log(name)
				if (answers[name] === checked[i].value) 
					right++
				
				else {
					wrong++
					
				}
					
			}
			console.log("right " + right + " wrong " + wrong )
			updateTotal("#correct", right)
			updateTotal("#incorrect", wrong)
			updateTotal("#unanswered", $("p.question").length - (right + wrong))
			
			
		}
		
		function updateTotal(id, value){
			$(id).html(value)
			
		}
		
		
		
		
		
		
     });
	}
);