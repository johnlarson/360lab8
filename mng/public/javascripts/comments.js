$(document).ready(function(){
	$("#send").click(function() {
        var myobj = {name:$("#Name").val(),comment:$("#Comment").val()};
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
				$('#comments').empty();
				for(var i = 0; i < data.length; i++) {
					var commentLi = $('<li></li>');
					commentLi.text(data[i].name + ': ' + data[i].comment);
					$('#comments').append(commentLi);
				}
			},
		});
	});

	$('#postJson').click(function() {
		$.ajax({
			url: '/obj/',
			method: 'POST',
			dataType: 'json',
			data: JSON.parse($('#jsonText').val()),
		});
	});

	$('#getJson').click(function() {
		$.ajax({
			url: '/obj/',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				$('#currentJson').text(JSON.stringify(data));
			}
		});
	});

});
