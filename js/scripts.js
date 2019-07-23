let personnelCards = [];
  let gallery = $("#gallery");
  let activeIndex = 0;
//generate 12 random cards using an api
  $.ajax({
      url: 'https://randomuser.me/api/?results=12&nat=us,dk,fr,au,ie,gb',
      dataType: 'json',
      success: function (data) {

          personnelCards = data.results;

          searchBox();

          employeeCard();

          showModal();

          // show modal on click and set the index
          $(".card").on("click", function () {

              
              let employeeIndex = $(this).attr("index");

              
              activeIndex = employeeIndex;

              createPopup(activeIndex);

              
              $(".modal-container").show();
          });

          //hide modal once closed
          $("#modal-close-btn").on("click", function () {

              
              $(".modal-container").hide();
          });

          //search through index from input value on click
          $("#search-submit").on("click", function () {

              let searchQuery = $("#search-input").val().toLowerCase();

              $(".card").hide();

              for (let k = 0; k < $(".card").length; k++) {
                  if ($("#name" + k)[0].innerText.toLowerCase().indexOf(searchQuery) != -1)
                     $(".card")[k].style.display = "block";
              }
             
          });

          // when you click the previous button you will go to the previous card
          $("#modal-prev").on("click", function () {
            activeIndex -=1;

              if (activeIndex < 0)
                  activeIndex = 0;

              createPopup(activeIndex);

          });

           // when you click the next button you will go to the next card
          $("#modal-next").on("click", function () {
             activeIndex += 1; 

              if (activeIndex > 0)
                  activeIndex = +1;
              
              createPopup(activeIndex);
          });
      }
  });

  // generate data for the modal popup 
  function createPopup(index) {

    $(".modal-img")[0].src = personnelCards[index].picture.medium;

    $("#name").text(personnelCards[index].name.first + " " + personnelCards[index].name.last);

    $(".modal-text")[0].innerText = personnelCards[index].email;

    $(".modal-text")[1].innerText = personnelCards[index].location.city;

    $(".modal-text")[2].innerText = personnelCards[index].cell;

    $(".modal-text")[3].innerText = personnelCards[index].location.street + ", " +
        personnelCards[index].location.city + ", " +
        personnelCards[index].location.state + " " +
        personnelCards[index].location.postcode;
    
    let DOB = personnelCards[index].dob.date.split("T");
    let DOBArr = DOB[0].split("-");
    let year = DOBArr[0];
    let month = DOBArr[1];
    let day = DOBArr[2];
    $(".modal-text")[4].innerText = "Birthday: " + month + "/" + day + "/" + year;
}

  //loop to generate random users that should work every time the page is refreshed. 
  function employeeCard() {
      for (let i = 0; i < personnelCards.length; i++) {
          let card =
              `<div class="card" index="${i}">
                 <div class="card-img-container">
                    <img class="card-img" src="${personnelCards[i].picture.medium}" alt="profile picture">
                 </div>
                 <div class="card-info-container">
                    <h3 id="name${i}" class="card-name cap">${personnelCards[i].name.first} ${personnelCards[i].name.last}</h3>
                    <p class="card-text">${personnelCards[i].email}</p>
                    <p class="card-text cap">${personnelCards[i].location.city}, ${personnelCards[i].location.state}</p>
                 </div>
              </div>`;

          gallery.append(card);

      }
  } 
  
  //this functions contains a variable that stores the placeholder data for the modal popup
  //Additionally, this functions also contains the elements needed for the prev and nex buttons
  function showModal() {
      let modalPopup = 
           `<div class="modal-container">
              <div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                      <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                          <h3 id="name" class="modal-name cap">name</h3>
                          <p class="modal-text">email</p>
                          <p class="modal-text cap">city</p>
                          <hr>
                              <p class="modal-text">(555) 555-5555</p>
                              <p class="modal-text cap">123 Portland Ave., Portland, OR 97204</p>
                              <p class="modal-text">Birthday: 10/21/2015</p>
                  </div>
              </div>
              // IMPORTANT: Below is only for exceeds tasks 
              <div class="modal-btn-container">
                  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                  <button type="button" id="modal-next" class="modal-next btn">Next</button>
              </div>
             </div>`;

      // 
      gallery.after(modalPopup);

      // keep modal hidden
      $(".modal-container").hide();
  }

  // extra credit
  function searchBox() {
      let search =
          `<form action="#" method="get">
              <input type="search" id="search-input" class="search-input" placeholder="Search...">
              <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
           </form>`;

      
      $(".search-container").append(search);

  }
