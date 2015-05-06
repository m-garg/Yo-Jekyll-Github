var generators = require('yeoman-generator');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var child_process = require('child_process');
var async = require('async');
var githubOptions = {
  version: '3.0.0'
};
var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);
var githubAuth = function(username,password){
	console.log("called");
	  github.authenticate({
    type: "basic",
    username: username,
    password: password
});
//githubUserInfo(username);
};
  
  
  var createRepo = function(repoName){
	console.log("repo name called");
	  github.repos.create({
    name: repoName
},function(err,res){
	console.log("error: "+err+" response of create repo: "+res);
});
};
  
  var createContent= function(userName,repoName){
	   github.repos.createContent({
    user : userName,
	repo : repoName,
	content : "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=",
	message  : "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5"
},function(err,res){
	console.log("error: "+err+" response of update repo: "+res);
});
  };

var githubUserInfo = function (name) {
	console.log(name);
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      console.log('Cannot fetch your github profile. Make sure you\'ve typed it correctly.'+err);
    }
	else{
		      console.log('response: '+JSON.stringify(res));
	}

  });
};
var gitinit = function(){
	
var git1 = child_process.execSync('git init', { encoding: 'utf8' });
process.stdout.write(git1);
var gitadd = child_process.execSync('git add .', { encoding: 'utf8' });
process.stdout.write(gitadd);
//var gitcommit = child_process.execSync('git commit -m "Initial_commit"', { encoding: 'utf8' });
//process.stdout.write(gitcommit);
var gitstatus = child_process.execSync('git status', { encoding: 'utf8' });
process.stdout.write(gitstatus);
	//execSync("git init");
//	execSync("git add .");
	//execSync("git commit -m 'Initial_commit'");
	//execSync("git status");
};


module.exports = generators.Base.extend({
	
  method1: function () {
    this.log('method 1 just ran');
  },
  method2: function () {
  
        var done = this.async();

    console.log('method 2 just ran');
	 var date = new Date();
  var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  // Scaffold Jekyll dirs
  //this.mkdir('app/_layouts');
 // this.mkdir('app/_posts');
//  this.mkdir('app/_includes');
 // this.mkdir('app/_plugins');
  var prompts = [{
        name: 'cname',
        message: 'Would you like to use custom domain ?',
        default: ''
      }];
	this.prompt(prompts, function (props) {
        this.cname = props.cname;
        done();
      }.bind(this));
	  
	  

  },
  
  method3: function () {
    console.log('method 3 just ran');
	var context = { 
    cname: this.cname 
    };
    this.template('_cname', 'cname',context);
  },
  
  copydirs : function(){

	        console.log('method 4 just ran');

	   this.directory('_includes', '_includes');
      this.directory('_layouts', '_layouts');
      this.directory('_posts', '_posts');
      this.directory('_sass', '_sass');
      this.directory('css', 'css');
      this.directory('fonts', 'fonts');
      this.directory('images', 'images');
      this.directory('js', 'js');
	  this.copy('_config.yml','_config.yml');
	  this.copy('case-studies.html','case-studies.html');
	  this.copy('faq.html','faq.html');
	  this.copy('index.html','index.html');
	  this.copy('LICENSE','LICENSE');
	  this.copy('online-linter.html','online-linter.html');
	  this.copy('README.md','README.md');
  },
  
 
  git: function(){
	   var done = this.async();

      var prompts = [{
        name: 'githubUser',
        message: 'What is your GitHub username?'
      },
	  {
		  name: 'githubPassword',
		  message : 'What is your GitHub username?'
	  },
	  {
		name:'gitRepo',
message: 'ggive the repo name',
default: 'abc123'		
	  }];

      this.prompt(prompts, function (props) {
        this.githubUser = props.githubUser;
        this.githubPassword = props.githubPassword;
		this.gitRepo = props.gitRepo;
        done();
      }.bind(this));

	
},
gitAuth:function(){
	githubAuth(this.githubUser,this.githubPassword);

},
/*
method7: function(){
	
	exec("git init & timeout 3 & git add * & timeout 3 & git commit -m 'Initial commit' & timeout 3 & git status", function (error, stdout, stderr) {
   console.log(stdout);
});
*/

method8: function(){
	
	createRepo(this.gitRepo);
},

method9: function(){
	createContent(this.githubUser,this.gitRepo);
	
}

});

	
	