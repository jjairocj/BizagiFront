export interface IContent {
  getContent(url, callback, param?): void;
}

export class Content implements IContent {
  constructor() {}

  getContent(url, callback, param?) {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "text",
      success: function(response) {
        $("#viewContent").html(response);
        if (param) {
          callback(param);
        } else {
          callback();
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
}
