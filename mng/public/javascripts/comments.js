$(document).ready(function(){
	$("#send").click(function(){
        	var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        	jobj = JSON.stringify(myobj);
        	$("#json").text(jobj);
		$.ajax({
			url: '/comments/',
			method: 'POST',
			dataType: 'json',
			data: myobj,
		});
	});
	
	$('#getThem').click(function() {
		$.ajax({
			url: '/comments/',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				jobj = JSON.stringify(data);
				console.log(jobj);
			},
		});
	});
});
