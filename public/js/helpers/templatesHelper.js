var templates = (function() {
    var handlebars = window.handlebars || window.Handlebars,
        Handlebars = window.handlebars || window.Handlebars;

    function get(name) {
        var promise = new Promise(function(resolve, reject) {
            var url = 'templates/' + name + '.handlebars';
            $.get(url, function(templateHTML) {
                var template = handlebars.compile(templateHTML);
                resolve(template);
            });
        });
        return promise;
    }
    return {
        get: get
    };
}());