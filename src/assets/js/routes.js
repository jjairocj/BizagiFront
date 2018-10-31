var routes = [{
        "path": "/",
        "component": "list.html",
        "controller": function() {
            $.getJSON('./data/books.json').done(
                response => {
                    let items = response.items;
                    console.log(items);
                    var ract = new Ractive({
                        target: "#books",
                        template: "#templateCards",
                        data: {
                            items: items
                        }
                    });
                }
            );
        }
    },
    {
        "path": "/detail/:id",
        "component": "detail.html",
        "controller": function(id) {
            $.getJSON('./data/books.json').done(
                response => {
                    let items = response.items;
                    let item = items.find(
                        elem => {
                            return elem.id === id;
                        }
                    );
                    if (item) {
                        var ract = new Ractive({
                            target: "#book",
                            template: "#templateBook",
                            data: item.volumeInfo

                        });
                    }
                }
            );
        }
    }
];

function getContent(url, callBack, param) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        success: function(response) {
            $("#viewContent").html(response);
            if (param) {
                callBack(param);
            } else {
                callBack();
            }
        },
        error: function(error) {
            console.log(error);
        }

    });
}

function router(location) {
    routes.map(
        data => {
            let url = location.hash.slice('1') || '/';
            let parts, param;

            parts = url.substr(1).split('/');
            if (data.path === '/' && url == '/') {
                getContent(`./components/${data.component}`, data.controller);
            } else if (data.path.match(/:id/g)) {

                let mod = data.path.split('/:id')[0].slice(1);

                while (parts.length) {
                    if (parts.shift() == mod) {
                        param = parts.shift();
                        getContent(`./components/${data.component}`, data.controller, param);
                    } else {
                        parts.shift();
                    }
                }
            } else {
                let mod = data.path.slice(1);
                while (parts.length) {
                    if (parts.shift() == mod) {
                        getContent(`./components/${data.component}`, data.controller);
                    } else {
                        parts.shift();
                    }
                }
            }
        }
    );
}

$().ready(function() {
    $(window).on('load', function(e) {
        let event = e.originalEvent;
        router(event.target['location']);
    });
    $(window).on('hashchange', function(e) {
        let event = e.originalEvent;
        router(event.target['location']);
    });
});