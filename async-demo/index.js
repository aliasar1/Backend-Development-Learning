
// callback hell 
console.log("Before");
getUser(1, (user) => {
    //console.log('User: ', user);
    getRepos(user.gitUserName, (repos) => {
        //console.log('Repos: ', repos);
        getCommits(repos, (commits)=>{});
    });
});
console.log("After");

// callback proper nesting strucuture
console.log("Before");
getUser(1, getRepos);
console.log("After");

function getRepos(user){
    getRepos(user.gitUserName, getCommits);
}

function getCommits(repos){
    getCommits(repos, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

function getUser(id, callback){
    setTimeout(() => {
        console.log("Reading data from DB...");
        callback({id: id, gitUserName: 'aliasar'});
    }, 2000);
}

function getRepos(gitUserName, callback){
    setTimeout(() => {
        console.log("Reading repos from GitHub...");
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}