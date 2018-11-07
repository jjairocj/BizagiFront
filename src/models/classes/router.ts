import { IContent } from "./content";
import { IRoute } from "../interfaces/route";

export interface IRouter {
  router(location): void;
}

export class Router implements IRouter {
  _IContent: IContent;
  _IRoute: IRoute[];

  constructor(iContent: IContent, routes: IRoute[]) {
    this._IContent = iContent;
    this._IRoute = routes;
  }

  router(location): void {
    this._IRoute.map(data => {
      let url = location.hash.slice("1") || "/";
      let parts, param;

      parts = url.substr(1).split("/");
      if (data.path === "/" && url == "/") {
        this._IContent.getContent(
          `./components/${data.component}`,
          data.controller
        );
      } else if (data.path.match(/:id/g)) {
        let mod = data.path.split("/:id")[0].slice(1);

        while (parts.length) {
          if (parts.shift() == mod) {
            param = parts.shift();
            this._IContent.getContent(
              `./components/${data.component}`,
              data.controller,
              param
            );
          } else {
            parts.shift();
          }
        }
      } else {
        let mod = data.path.slice(1);
        while (parts.length) {
          if (parts.shift() == mod) {
            this._IContent.getContent(
              `./components/${data.component}`,
              data.controller
            );
          } else {
            parts.shift();
          }
        }
      }
    });
  }
}
