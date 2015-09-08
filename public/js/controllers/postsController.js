var postsController = (function() {

    function loadAll(context) {
    	// storage for template
    	var templateHolder;

        templates.get('posts')
            .then(function(template) {
            	templateHolder = template;
        	
        		return data.posts.getAll();
            }).then(function(res) {
            	// use the storage to apply the result data on template
    	    	$('#content').html(templateHolder(res));
    	    });

            function split(a, n) {
                var len = a.length,out = [], i = 0;
                while (i < len) {
                    var size = Math.ceil((len - i) / n--);
                    out.push(a.slice(i, i += size));
                }
                return out;
            }
            function setPagesNav(posts, postsOnPage,  url) {
                $('.pagination').html('');
                var pagesCount = Math.ceil(posts.length / postsOnPage);
                for (var index = 0; index < pagesCount; index += 1) {
                    var pageNavLink = $('<a/>').attr('href', url + (index + 1)).html(index + 1);
                    var pageNavItem = $('<li/>').append(pageNavLink);

                    $('.pagination').append(pageNavItem);
                }
            }
            
    }

    function loadPostForm(context) {
    	templates.get('post-add')
    	    .then(function(template) {

    	    	$('#content').html(template()); 

    	    	$('#btn-post').on('click', function() {
    	    		var post = {
		   	    		title: $('#tb-post-title').val(),
		   	    		body: $('#tb-post-body').val()
		   	    	};
		   	    	console.log(post);
			   	    data.posts.createPost(post)
			   	       .then(function(res) {
                            toastr.success('Post added!');
			   	       		context.redirect('#/posts');
			   	       });
	                });
    	    });
    }

    return {
        loadAll: loadAll,
        loadPostForm: loadPostForm 
    };
}());