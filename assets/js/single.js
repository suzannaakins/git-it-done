var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

getRepoIssues("suzannaakins/work-scheduler");

var displayIssues = function (issues) {
    //tell user when they search a repo with no open issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues.";
        return;
    }
    for (var i = 0; i < issues.length; i++) {

        //create link element to take users to issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flew-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue TITLE
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a TYPE element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};