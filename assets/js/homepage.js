var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

//function to capture form input
var formSubmitHandler = function (event) {
    //prevent browser from sending form's input data to a URL
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();
    //send username to get repos function
    if (username) {
        getUserRepos(username);
        //clear the form
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
}

//function to display the repos
var displayRepos = function (repos, searchTerm) {
    //check if API returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    //clear old content
    repoContainerEl.textContent = "";
    //update search term with new username search
    repoSearchTerm.textContent = searchTerm;
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        //append to container
        repoEl.appendChild(titleEl);

        //create a STATUS element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center"
        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append to container
        repoEl.appendChild(statusEl);
        //append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);