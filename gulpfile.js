/**
 * File: gulpfile.js
 *
 * @author Cesar Urdaneta
 * 
 * 
 */

// grab our gulp packages
var gulp             = require('gulp'),
	gutil            = require('gulp-util'),
    fs               = require('fs'),
    path             = require('path'),
    recursive        = require('recursive-readdir'),
    wpPot            = require('gulp-wp-pot'),
    gettext          = require('gulp-angular-gettext'),
	i18Parser        = require('i18next-scanner').Parser, 
	sort             = require('gulp-sort'),
	pojson           = require('gulp-po-json'),
	pathExists       = require('path-exists'),
	mkdirp           = require('mkdirp'),
	fileExists       = require('file-exists'),
	eol              = require('gulp-eol'),
	argv             = require('yargs').argv;

gulp.task('default', function() {

	return gutil.log('Use "gulp translate-all" for translating WP Theme or Plugins!');

});



/***************** BEGIN: Custom functions **********************/


function createPotFile(domain, src){

	var wildcard   = '*.*';
	var basePath   = 'wp-content/' + src + '/' + domain;
	var langFolder = basePath  + '/languages';			
	var potFile = langFolder + "/" + domain +'.pot"';

	// Create 'languages' folder if not exists.
	pathExists(basePath).then(existsBase => {
		
		if(existsBase) {

			pathExists(langFolder).then(exists => {
				// Create 'languages' folder if not exists.
				if(!exists) {
					mkdirp(langFolder);
				}		
			});

		} 
	});

	gutil.log('Creating file "' + potFile);
	// Fetch base path recursively for getting translation 
	recursive(basePath, function (err, files) {

		// warning whether folder plugin/theme doesn't exists.
		if(files === undefined) {
			return gutil.log("Folder '" + basePath + "' does not exist");
		}

		// Files is an array of filename 
		files.forEach(function(f, i) {
	  		files[i] = f.replace(/\\/g, '/').replace(/[^\/]*$/, wildcard);
		});

		//Delete duplicates
		files = files.filter(function(item, pos) {
			return files.indexOf(item) == pos;
		});

		return gulp.src(files)
			.pipe(sort())
			.pipe(wpPot( {
			    domain: domain,
			    package: domain,
			    lastTranslator: 'Cesar Urdaneta <cesar.urdaneta@betadevconsult.com.br>'
			}))
			.pipe(eol('\n', false))
			.pipe(gulp.dest(langFolder));
	

	});

}

/***************** END: Custom functions **********************/

// create a default task and just log a message

gulp.task('translate-all', function() {
  
	gutil.log('Iniciando criação de arquivos POT de tema atual e plugins da ativo!');

	var translates = [
		{ src: "themes",   domain: "my_theme_folder_1" },
		{ src: "themes",   domain: "my_theme_name_2" },
		{ src: "plugins",  domain: "my_plugin_name_1" },
		{ src: "plugins",  domain: "my_plugin_name_2" }		
  	];

	translates.forEach( function(element, index) {
  	
		return createPotFile(element.domain, element.src);

	});

});


/**
 * create a default task and just log a message
 * 
 */
gulp.task('translate', function() {
  
	//var output = gutil.log('Gulp is translating!') + '\n';
  
	if(argv.domain !== undefined && (argv.src.toLowerCase() === 'plugins'  || argv.src.toLowerCase() === 'themes' ) ) {
		
		gutil.log('Creating POT files creation for installed WP Themes and plugins!');

		return createPotFile(argv.domain, argv.src);
		

	} else {

		return gutil.log(' \n ***************************************************************************************** \n' +
						 ' ** Command use:                                                                        ** \n' +
					     ' **     gulp translate --domain=[translation domain] --scr=[path_type_name]             ** \n' +
					     ' **                                                                                     ** \n' +
					     ' ** Parâmetros:                                                                         ** \n' +
					     ' ** [translation domain] : Project / domain translation name for WP theme or plugin     ** \n' +
					     ' **                                                                                     ** \n' +
					     ' ** [path_type_name]     : Set whether a translation is applied to WP "themes" or       ** \n' +
					     ' **                        "plugins" from WordPress path (wp-content/[path_type_name]/) ** \n' +
					     ' **                                                                                     ** \n' +
					     ' ***************************************************************************************** \n'
					 );

	}

});

// gulp.task('pot', function () {
//     return gulp.src(['src/partials/**/*.html', 'src/scripts/**/*.js'])
//         .pipe(gettext.extract('template.pot', {
//             // options to pass to angular-gettext-tools... 
//         }))
//         .pipe(gulp.dest('po/'));
// });
