var metalsmith		= require('metalsmith');
var define			= require('metalsmith-define');
var layout			= require('metalsmith-layouts');
var collections		= require('metalsmith-collections');
var pagination		= require('metalsmith-pagination');
var markdown		= require('metalsmith-markdown');
var permalinks		= require('metalsmith-permalinks');
var autoprefixer	= require('metalsmith-autoprefixer');
var sass			= require('metalsmith-sass');
var uglify			= require('metalsmith-uglify');
var concat			= require('metalsmith-concat');
var updated			= require('metalsmith-updated');
var asset			= require('metalsmith-static');
var serve			= require('metalsmith-serve');
var watch			= require('metalsmith-watch');

metalsmith(__dirname)
	.source('src')
	.use(define({
		blog: {
			uri: 'http://shrine.edwardessing.com',
			title: 'Shrine',
			description: 'Shrine'
		},
		owner: {
			uri: 'http://edwardessing.com',
			name: 'Edward Essing'
		},
		moment: require('moment')
	}))
	.use(collections({
		pages: {
			pattern: '*.md'
		},
		posts: {
			pattern: 'posts/**/*.md',
			sortBy: 'number',
			reverse: true
		}
	}))
	.use(asset({
		src: 'assets', // relative to the working directory
		dest: 'assets' // relative to the build directory
	}))
	.use(pagination({
		'collections.posts': {
			perPage: 6,
			first: 'posts/index.html',
			layout: 'posts.jade',
			path: 'posts/:num/index.html',
			pageMetadata: {
				'title': 'Archive'
			}
		}
	}))
	.use(markdown({
		'gfm': true,
		'tables': true
	}))
	.use(permalinks({
		pattern: './:collection/post-:title',
		relative: false
	}))
	.use(autoprefixer())
	.use(sass({
		outputDir: function(originalPath) {
			return originalPath.replace('scss', 'css');
		}
	}))
	.use(uglify({
		order: ['js/jquery.min.js', 'js/*.js'],
		concat: 'js/script.min.js',
		removeOriginal: true
	}))
	.use(layout({
		engine: 'jade',
		directory: 'layouts',
		partials: 'partials',
		default: 'post.jade',
		pattern: '**/*.html'
	}))
	.use(updated({
		filePatterns: ['posts/*']
	}))
	.destination("build")
	.build(function(err) {
		if (err) {
			throw err
		}
	});