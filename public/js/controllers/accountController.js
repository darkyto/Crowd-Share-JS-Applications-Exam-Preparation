var accountController = (function() {

    function load(context) {
        templates.get('login')
            .then(function(template) {
                $('#content').html(template());

                $('#btn-log').on('click', function() {
		   	    	var user = {
		   	    		username: $('#tb-user').val(),
		   	    		password: $('#tb-pass').val()
		   	    	};

		   	    	$('#btn-main-login').addClass('hidden');
		   	    	$('#btn-main-logout').removeClass('hidden');
		   	    	$('#logged-user-info-box')
		   	    		.removeClass('hidden')
		   	    		.html('<ul class="breadcrumb"><li class="active">Welcome '+ user.username +'!</li></ul>' );
 
		   	    	data.users.login(user)
			   	       .then(function(user) {
				   	       	context.redirect('#/');    	
			   	       });
		   	    });

		   	    $('#btn-reg').on('click', function() {
		   	    	var user = {
		   	    		username: $('#tb-user').val(),
		   	    		password: $('#tb-pass').val()
		   	    	};

		   	    	// validate username (and pass) lenght
		   	    	var len = user.username.length;
		   	    	if (6 > len || len > 40) {
		   	    		toastr.warning('Username must be within 6 and 40 symbols');
		   	    	} else {
		   	    		
		   	    		// hide/show login/signout
		   	    		$('#btn-main-login').addClass('hidden');
		   	    		$('#btn-main-logout').removeClass('hidden');

			   	    	data.users.register(user)
				   	       .then(function(user) {
					   	       	context.redirect('#/');
					   	       	
				   	    });
		   	    	}
 	
		   	    });
            });
    }

    return {
        load : load
    };
}());