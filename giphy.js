$(document).ready(function() {
  var animalButtons = ["dog", "lion", "penguin", "zebra", "bird"];

  function buttonCreator() {
    $("#animalButtons").html("");
    for (i = 0; i < animalButtons.length; i++) {
      $("#animalButtons").append(
        "<button data-animal=" +
          animalButtons[i] +
          ">" +
          animalButtons[i] +
          "</button>"
      );
    }
  }
  buttonCreator();

  function giphy() {
    $("button").on("click", function() {
      $("#animalImages").html("");
      var animal = $(this).attr("data-animal");
      var queryURL =
        "https://api.giphy.com/v1/stickers/search?api_key=K5IwAzIwlSRRx3BmUgWly5ASmvIIOBGQ&q=" +
        animal +
        "&limit=10&rating=G&lang=en";
      console.log(animal);
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div class='card' style='width:18rem;'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            console.log(results[i].images.fixed_height.url);
            // onclick for images to start and stop
            animalImage.attr("class", "gif");
            animalImage.attr("data-state", "animate");
            animalImage.attr(
              "data-still",
              results[i].images.fixed_height_still.url
            );
            animalImage.attr(
              "data-animate",
              results[i].images.fixed_height.url
            );

            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#animalImages").prepend(animalDiv);
            $(".gif").on("click", function() {
              var state = $(this).attr("data-state");
              console.log(state);
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              }
              if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  giphy();

  $("#search").on("click", function() {
    console.log($("#animal").val());
    if (!animalButtons.includes($("#animal").val())) {
      animalButtons.push($("#animal").val());
      $("#animal").val("");
      buttonCreator();
      giphy();
    }
  });
});
