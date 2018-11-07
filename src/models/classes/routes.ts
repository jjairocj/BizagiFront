import { IRoute } from "../interfaces/route";

export let routes: IRoute[] = [
  {
    path: "/",
    component: "list.html",
    controller: function() {
      $.getJSON("./data/books.json").done(response => {
        let items = response.items;
        var ract = new Ractive({
          el: "#books",
          template: "#templateCards",
          data: {
            items: items
          }
        });
      });
    }
  },
  {
    path: "/detail/:id",
    component: "detail.html",
    controller: function(id) {
      $.getJSON("./data/books.json").done(response => {
        let items = response.items;

        let item = items.find(elem => {
          return elem.id == id;
        });

        if (item) {
          var ract = new Ractive({
            el: "#book",
            template: "#templateBook",
            data: item.volumeInfo
          });
        }
      });
    }
  }
];
