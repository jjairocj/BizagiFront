import "../css/style.css";
import { Router, IRouter } from "../../models/classes/router";
import { IContent, Content } from "../../models/classes/content";
import { routes } from "../../models/classes/routes";

let content: IContent = new Content();
let router: IRouter = new Router(content, routes);

$(window).on("load hashchange", function(e) {
  let event = e.originalEvent;
  router.router(event.target["location"]);
});
