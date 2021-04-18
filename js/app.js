$(document).ready(function () {
  // -------------------------------------------------- //
  // ------------------ NEW CODE ---------------------- //
  // -------------------------------------------------- //

  //Get main main elements
  const $searchWithEmailBtn = $("#email");
  const $searchWithPhoneBtn = $("#phone");
  const $placeholder = $(".form-control");
  const $searchInput = $(".input-group");
  const $inputErrorText = $("#errorTxt");
  const $sectionAboveTheFold = $(".above-the-fold");
  const $sectionFeatures = $(".features");
  const $sectionResult = $(".result");
  const $sectionSearchAgain = $(".search-again");
  const $sectionLoadingData = $(".loadingData").hide();

  // Main search parametr - 'email' of 'phone', defaul is 'email'
  let $searchBy = "email";

  //Show loading spinner function
  const showSpinner = () => {
    $sectionAboveTheFold.hide();
    $sectionFeatures.hide();
    $sectionResult.hide();
    $sectionSearchAgain.hide();
    $sectionLoadingData.show();
  };

  // Catch click on 'Email address' or 'Phone number' buttons
  //TODO: I don't like how it's look likes, need to find shorter way for that part
  $("#type-of-search").on("click", "button", function (e) {
    // Set main search parameter same as clicked button - 'email' or 'phone'
    $searchBy = this.id;

    // Remove error class in clicked type of search buttons
    $searchInput.removeClass("error");

    // Change class of buttons and placeholder text depens on clicked button
    if (this.id === "email") {
      // Change input plasholder
      $placeholder.attr("placeholder", "Enter an email address");

      // Change button style
      $searchWithEmailBtn
        .removeClass("btn-search-type")
        .addClass("btn-search-type-active");

      $searchWithPhoneBtn
        .removeClass("btn-search-type-active")
        .addClass("btn-search-type");

      // Set error text
      $inputErrorText.text("Please enter a valid email address");
    } else if (this.id === "phone") {
      // Change input plasholder
      $placeholder.attr("placeholder", "Enter a phone number");

      // Change button style
      $searchWithPhoneBtn
        .removeClass("btn-search-type")
        .addClass("btn-search-type-active");

      $searchWithEmailBtn
        .removeClass("btn-search-type-active")
        .addClass("btn-search-type");

      // Set error text
      $inputErrorText.text("Please enter a valid phone number");
    } else {
      return;
    }
  });

  // Fetch function, get two parameters: searchBy - 'email' or 'phone' and searchInputData - data from input
  const fetchData = async (searchBy = "email", searchInputData) => {
    const request = await fetch(
      `https://ltv-data-api.herokuapp.com/api/v1/records.json?${searchBy}=${searchInputData}`
    );
    const data = request.text();
    return data;
  };

  // Sanitized input data and call fetch function, if erros set error class
  const requestData = () => {
    // Clear local storage before new request
    localStorage.clear();

    // Get text from input
    const $inputText = $('input[type="text"]').val().toLowerCase();

    // regEx for email
    const regExEmail = /\S+@\S+\.\S+/;

    // regEx for phone
    const regExPhone = /\d/g;

    let validationRes = null;

    //Validate input data depends search type - 'email' or 'phone'
    if ($searchBy === "email") {
      validationRes = regExEmail.test($inputText);
    } else if ($searchBy === "phone") {
      validationRes = regExPhone.test($inputText);
    } else {
      return;
    }

    // If validation input text result - false, set input error class, else call fetch func
    !validationRes
      ? $searchInput.addClass("error")
      : (showSpinner(),
        fetchData($searchBy, $inputText)
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.error(e)));
  };

  // Catch click on main seach button 'Go' and call 'requestData' func
  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    requestData();
  });

  // Catch "Enter button" pressed and call 'requestData' func
  $('input[type="text"]').keypress(function (e) {
    e.keyCode === 13 ? (e.preventDefault(), requestData()) : null;
  });
});
