/*
 * Author: jan
 * Date: 19-jul-2013
 * http://stackoverflow.com/questions/8232367/google-custom-search-api-autocomplete
 * http://stackoverflow.com/questions/5182567/what-does-this-javascript-response-function-do
 */
$(function () {
    var $searchInurl = $('input.search.inurl'),
        $searchGoogle = $('input.search.google'),
        $goInurl = $('.go.inurl'),
        $goGoogle = $('.go.google');

    function gotoInUrl() {
        var inurl = '-inurl:(htm|html|php) intitle:"index of" +"last modified" + (jpg|JPG) ',
            val = $searchInurl.val();

        document.location.href = 'http://www.google.com/#q=' + inurl + val;
    }

    function gotoGSearch() {
        var val = $searchGoogle.val();
    }

    $goInurl.click(function () {
        gotoInUrl();
    });

    $goGoogle.click(function () {
        gotoGSearch()();
    });

    $searchInurl
            .focus(function () {
                this.select();
            })
            .mouseup(function (e) {
                e.preventDefault();
            })
            .keydown(function (e) {
                if (e.which === 13) {
                    gotoInUrl();
                    e.preventDefault();
                }
            });
    $searchGoogle
            .focus(function () {
                this.select();
            })
            .mouseup(function (e) {
                e.preventDefault();
            })
    .autocomplete({
      position: {
        my: "left top",
        at: "left bottom",
        offset: "0, 5",
        collision: "none"
      },
      source: function (request, response) {
        $.ajax({
          url: "http://clients1.google.com/complete/search?q=" + request.term + "&hl=en&client=partner&source=gcsc&partnerid={GOOGLESEARCHID}&ds=cse&nocache=" + Math.random().toString(),
          dataType: "jsonp",
          success: function (data) {
            response($.map(data[1], function (item) {
              return {
                label: item[0],
                value: item[0]
              };
            }));
          }
        });
      },
      autoFill: true,
      minChars: 0,
      select: function (event, ui) {
        $(this).closest('input').val(ui.item.value);
        $(this).closest('form').trigger('submit');
      }
  });
});

