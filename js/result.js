$(document).ready(function () {
  // -------------------------------------------------- //
  // ------------------ NEW CODE ---------------------- //
  // -------------------------------------------------- //

  // Show result function
  const showResult = (retreivedObject) => {
    const resultsNumber = window.localStorage.length;

    const {
      first_name,
      last_name,
      description,
      address,
      email,
      phone_numbers,
    } = retreivedObject;

    $("#result-count").text(
      `${resultsNumber} ${resultsNumber <= 1 ? `Result` : `Results`}`
    );
    $("#result-subtext").html(
      "Look at the result below to see the details of the person you’re searched for."
    );
    $(".name").append(first_name + " " + last_name);
    $(".user-description").append(description);
    $("#address").append("<p>" + address + "</p>");
    $(".res-email").append("<p>" + email + "</p>");

    for (const phone_number in phone_numbers) {
      phone = retreivedObject.phone_numbers[phone_number];
      formatted_phone =
        "(" +
        phone.substring(0, 3) +
        ") " +
        phone.substring(3, 6) +
        "-" +
        phone.substring(6, 10);

      $(".phone-num").append(
        "<a href=" +
          `tel:${phone}` +
          " style='display: block;color: #004A80;'>" +
          `${formatted_phone}` +
          "</a>"
      );
    }

    for (const relative in retreivedObject.relatives) {
      $(".relatives").append(
        "<p style='margin-bottom: 0'>" +
          `${retreivedObject.relatives[relative]}` +
          "</p>"
      );
    }

    //If we have data to show
    $(".result-wrap").show();
  };

  // Parce data from local storage and make main condition rendering
  const setResultData = () => {
    const retreivedObject = JSON.parse(localStorage.getItem("userObject"));

    retreivedObject.length !== 0
      ? showResult(retreivedObject)
      : ($("#result-count").text("0 Results"),
        $(".result-desc").text("Try starting a new search below"));
  };

  // If we have local storage and data we call 'setResult' func
  window.localStorage && localStorage.userObject ? setResultData() : null;
});
