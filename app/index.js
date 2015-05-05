var generators = require('yeoman-generator');
/*
var githubOptions = {
  version: '3.0.0'
};
var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

var githubUserInfo = function (name, cb, log) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      log.error('Cannot fetch your github profile. Make sure you\'ve typed it correctly.');
      res = emptyGithubRes;
    }

    cb(JSON.parse(JSON.stringify(res)));
  });
};
*/

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
	  
  }/*,
  git: function(){
	   var done = this.async();

      var prompts = [{
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        default: 'someuser'
      }];

      this.prompt(prompts, function (props) {
        this.githubUser = props.githubUser;
        done();
      }.bind(this));

  }
*/

});

	
	