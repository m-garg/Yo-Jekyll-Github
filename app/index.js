var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var child_process = require('child_process');
var async = require('async');
var util = require('util');

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
};




var Generator = module.exports = function Generator(args, options) {
  
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForUser = function askForUser() {
	var done = this.async();

    console.log('method 2 just ran');
	var date = new Date();
	  var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
	  var prompts = [{
			name: 'cname',
			message: 'Would you like to use custom domain ?',
			default: ''
		  }];
	this.prompt(prompts, function (props) {
        this.cname = props.cname;
        done();
      }.bind(this));
};

Generator.prototype.askForUser2 =  function () {
    console.log('method 3 just ran');
	var context = { 
    cname: this.cname 
    };
    this.template('_cname', 'cname',context);
  };
  
  Generator.prototype.askForUser3 =  function(){

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
  };
  
 
  Generator.prototype.askForUser4 =  function(){
	   var done = this.async();

      var prompts = [{
        name: 'githubUser',
        message: 'What is your GitHub username?'
      },
	  {
		  name: 'githubPassword',
		  message : 'What is your GitHub password?'
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
	
};
Generator.prototype.askForUser5 = function(){
	githubAuth(this.githubUser,this.githubPassword);

};

Generator.prototype.conflicts  = function(){
	gitRepo=this.gitRepo;
	githubUser=this.githubUser;
	//createRepo(this.gitRepo);
	 github.repos.create({
    name: this.gitRepo
},function(err,res){
	console.log("error: "+err+" response of create repo: "+res);
	child_process.execSync('git init'); 
    child_process.execSync('git add .');
    child_process.execSync('git commit -m "Initial_commit"');
    child_process.execSync('git remote add origin https://github.com/'+githubUser+'/'+gitRepo+'.git');
	child_process.execSync('git branch gh-pages');
	child_process.execSync('git push origin gh-pages');
});
};

Generator.prototype.install =  function(){
	/*async.series([
    function(){ child_process.execSync('git init'); },
    function(){ child_process.execSync('git add \.'); },
    function(){ child_process.execSync('git commit -m "Initial_commit"'); },
    function(){ child_process.execSync('git status'); }	
]);*/
   /* child_process.execSync('git init'); 
    child_process.execSync('git add .');
    child_process.execSync('git commit -m "Initial_commit"');
    child_process.execSync('git remote add origin https://github.com/'+this.githubUser+'/'+this.gitRepo+'.git');
	child_process.execSync('git branch gh-pages');
	child_process.execSync('git push origin gh-pages');*/
};