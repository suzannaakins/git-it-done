var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    //make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
    //prevent browser from sending form's input data to a URL
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        //clear the form
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);