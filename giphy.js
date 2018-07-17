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
      }).then(function(response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class='card' style='width:18rem;'>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          animalDiv.append(p);
          animalDiv.append(animalImage);
          $("#animalImages").prepend(animalDiv);
        }
      });
    });
  }

  $("#search").on("click", function() {
    console.log($("#animal").val());
    if (animalButtons.includes($("#animal").val())) {
      $("#animal").val("");
      buttonCreator();
      giphy();
    } else {
      animalButtons.push($("#animal").val());
      $("#animal").val("");
      console.log(animalButtons);
      buttonCreator();
      giphy();
    }
  });
});
