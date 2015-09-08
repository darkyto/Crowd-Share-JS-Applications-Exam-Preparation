var homeController = (function() {

    function load(context) {
        templates.get('home')
            .then(function(template) {
                $('#content').html(template());         
            });
    }

    return {
        load: load
    };
}());