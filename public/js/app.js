(function() {
    var sammyApp = Sammy('#content', function() {	

    	this.get('#/', function() {
    		this.redirect('#/home');
    	});    	

        this.get('#/home', homeController.load);

        this.get('#/login', accountController.load);

        this.get('#/posts', postsController.loadAll);   

        this.get('#/posts/:size/:page', postsController.loadAll);

        this.get('#/postform', postsController.loadPostForm);

    });

    $(function() {
        sammyApp.run('#/');

	    // add the event for the logout
	    $('#btn-main-logout').on('click', function() {
	        data.users.logout()
	          .then(function() {
	          	toastr.success('You have logged out! See you soon!');

	            location = '#/';
	            document.location.reload(true);
	        });
	    });
    });
}());