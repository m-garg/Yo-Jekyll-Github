var yeoman = require('yeoman-generator');
var execSync = require('child_process').execSync;
var child_process = require('child_process');
var GitHubApi = require('github');
var chalk = require('chalk');

var githubOptions = {
  version: '3.0.0'
};

var github = new GitHubApi(githubOptions);

var githubAuth = function(username,password){
	github.authenticate({
		type: "basic",
		username: username,
		password: password
});
};
   
module.exports = yeoman.generators.Base.extend({
	
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  projectPrompting: function () {
    var cb = this.async();

    this.log(this.yeoman);
    this.log(chalk.magenta("\nIt\"s time to get Jekyllized!"));
    this.log(chalk.yellow("\nTell me a little about your project »"));

    var prompts = [{
      name: "projectName",
      message: "What is the name of your project?"
    }, {
      name: "projectDescription",
      message: "Describe your project for me:"
    }, {
      name: "projectTagline",
      message: "What is the tagline for your project?"
    },{
		name: "projectKeywords",
		message: "Give the keywords related to your website"
	},{
		name: "cname",
		message : "If you want to use custom domain for this website, enter it " + chalk.yellow("Leave blank if you don't want to use custom domain"),
		default:""
	}];

    this.prompt(prompts, function (props) {
      this.projectName        = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectTagline     = props.projectTagline;
	  this.projectKeywords    = props.projectKeywords;
      this.cname			  = props.cname;

      cb();
    }.bind(this));
  },

  authorPrompting: function () {
    var cb = this.async();

    this.log(chalk.yellow("\nNow it\"s time to tell me about you. »"));

    var prompts = [{
      name: "authorName",
      message: "What is your name?",
    }, {
      name: "authorEmail",
      message: "What is your email?",
    }, {
      name: "authorBio",
      message: "Write a short description of yourself:"
    }, {
      name: "authorTwitter",
      message: "Your Twitter user name:"
    }];

    this.prompt(prompts, function (props) {
      this.authorName      = props.authorName;
      this.authorEmail     = props.authorEmail;
      this.authorBio       = props.authorBio;
      this.authorTwitter   = props.authorTwitter;

      cb();
    }.bind(this));
  },

  jekyllPrompting: function () {
    var cb = this.async();

    this.log(chalk.yellow("\nNow on to set some Jekyll settings: »") +
            chalk.red("\nYou can change all of this later in the _config.yml file"));

    var prompts = [{
      name: "jekyllPermalinks",
      type: "list",
      message: "Permalink style" + (chalk.red(
                     "\n  pretty: /:year/:month/:day/:title/" +
                     "\n  date:   /:year/:month/:day/:title.html" +
                     "\n  none:   /:categories/:title.html")) + "\n",
      choices: ["pretty", "date", "none"]
    }, {
      name: "jekyllPaginate",
      message: "How many posts do you want to show on your front page?" + chalk.red("\nMust be a number or all"),
      default: 10,
      validate: function (input) {
        if (/^[0-9]*$/.test(input)) {
          return true;
        }
        if (/^all*$/i.test(input)) {
          return true;
        }
        return "Must be a number or all";
      }
    }];

    this.prompt(prompts, function (props) {
      this.jekyllPermalinks   = props.jekyllPermalinks;
      this.jekyllPaginate     = props.jekyllPaginate;

      cb();
    }.bind(this));
  },

  githubPrompting: function () {
    var cb = this.async();

    this.log(chalk.yellow("\nNow it\"s time to tell about Github account. »"));

    var prompts = [{
      name: "githubUserName",
      message: "What is your Github username?",
    }, {
      name: "githubPassword",
	  type: 'password',
      message: "What is your password?",
    }, {
      name: "githubRepoName",
      message: "Give the new repository name to create",
	  default: "my-site"
    }];

    this.prompt(prompts, function (props) {
      this.githubUserName      = props.githubUserName;
      this.githubPassword      = props.githubPassword;
      this.githubRepoName      = props.githubRepoName;

      cb();
    }.bind(this));
  },
  
  scaffolding: function () {
   /* this.copy("Gemfile", "Gemfile");
    this.copy("bowerrc", ".bowerrc");
    this.template("_package.json", "package.json");
    this.template("_config.yml", "_config.yml");
    this.template("_config.build.yml", "_config.build.yml");
    this.template("_README.md", "README.md");
    this.template("gulpfile.js", "gulpfile.js");
    this.copy("gitignore", ".gitignore");
    this.copy("gitattributes", ".gitattributes");
    this.copy("jshintrc", ".jshintrc");
    this.copy("editorconfig", ".editorconfig");
    this.directory("app", "src");*/
	this.template("_includes/aside.html", "_includes/aside.html");
	this.template("_includes/blog.html", "_includes/blog.html");
	this.template("_includes/contact.html", "_includes/contact.html");
	this.template("_includes/developers.html", "_includes/developers.html");
	this.template("_includes/footer.html", "_includes/footer.html");
	this.template("_includes/head.html", "_includes/head.html");
	this.template("_includes/intro.html", "_includes/intro.html");
	this.template("_includes/js.html", "_includes/js.html");
	this.template("_includes/overview.html", "_includes/overview.html");
	this.template("_includes/started.html", "_includes/started.html");
	this.template("_includes/why.html", "_includes/why.html");
	this.template("_layouts/default.html", "_layouts/default.html");
	this.template("_layouts/page.html", "_layouts/page.html");
	this.template("_layouts/default.html", "_layouts/why.html");
	this.directory('_posts', '_posts');
	this.directory('_sass', '_sass');
	this.directory('css', 'css');
	this.directory('fonts', 'fonts');
	this.directory('images', 'images');
	this.directory('js', 'js');
	this.template("cname", "cname");
	this.copy('_config.yml','_config.yml');
	this.copy('case-studies.html','case-studies.html');
	this.copy('faq.html','faq.html');
	this.copy('index.html','index.html');
	this.copy('README.md','README.md');

   /* if (this.amazonCloudfrontS3) {
      this.template("conditionals/_aws-credentials.json", "aws-credentials.json");
    }
    else if (this.rsync) {
      this.template("conditionals/_rsync-credentials.json", "rsync-credentials.json");
    }*/
  },

  conflicts: function () {
	  	githubAuth(this.githubUserName,this.githubPassword);
		var githubRepoName=this.githubRepoName;
		var githubUserName=this.githubUserName;
	 github.repos.create({
    name: githubRepoName
},function(err,res){
	if (err){
		console.log(chalk.red("\nError creating new repository : "+err));
	}
	else{
		console.log(chalk.green("\nNew repository created: "+githubRepoName));
	}
	child_process.execSync('git init'); 
    child_process.execSync('git add .');
    child_process.execSync('git commit -m "Initial_commit"');
    child_process.execSync('git remote add origin https://github.com/'+githubUserName+'/'+githubRepoName+'.git');
	child_process.execSync('git branch gh-pages');
	child_process.execSync('git push origin gh-pages');
});
  },
  
  install: function() {

  }
});
