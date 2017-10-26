import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Paper, Researcher } from 'yoastseo';
import { zipObject, debounce, omit } from "lodash-es";
import Results from "./Results";

class App extends Component {
	constructor() {
		super();

		let paper = new Paper( 'There’s a lot of discussion in the WordPress world right now about a new editing experience that’s in the making. It’s called Gutenberg. While some of that discussion is technical, every user that uses WordPress regularly should be aware of what’s coming. At Yoast, we are quite excited about the concept of Gutenberg. We think it could be a great improvement. At the same time, we have our worries about the speed in which the project is being pushed forward. And, we’re not excited about all the changes.\n' +
			'\n' +
			'In this post I’ll first try to explain what Gutenberg is. Subsequently, I will tell you about the things that are problematic to us. Finally, I will tell and show you what we think should be done about the problems.\n' +
			'<h2>What is Gutenberg?</h2>\n' +
			'Gutenberg is a new approach to how we edit posts in WordPress. It’s basically a new editor. It tries to remove a lot of the fluff that we built up over the years. The intent is to make the new experience lighter and more modern. The end-goal is to make WordPress easier to use. That’s something we really appreciate at Yoast.\n' +
			'\n' +
			'Gutenberg introduces the concept of “blocks“. The new editor will be a block-editor: paragraphs, headings, images and YouTube video embeds will all be blocks. Blocks will make it easier to learn how to work with WordPress. People starting out with WordPress, only have to learn the concept of blocks, instead of 3 or 4 different concepts. When we make WordPress easier to use, we make it more accessible to a larger group of people. Making editing easier was the goal from the outset, as Matt Mullenweg is quoted on the <a href=\'https://github.com/WordPress/gutenberg\'>Gutenberg Github page</a>:\n' +
			'<blockquote>The editor will endeavour to create a new page and post building experience that makes writing rich posts effortless, and has “blocks” to make it easy what today might take shortcodes, custom HTML, or “mystery meat” embed discovery. — Matt Mullenweg</blockquote>\n' +
			'As well as introducing blocks, Gutenberg also introduces a new look and feel for the editor. For me, the look and feel is mostly a copy of the Medium editor, an editor that got a lot of praise in certain online circles. Gutenberg appears a bit more modern, more contemporary.\n' +
			'<h2>New technology in Gutenberg</h2>\n' +
			'Besides introducing a new look and feel and the concept of editing blocks, Gutenberg also introduces an entirely new technology to WordPress. Gutenberg will use a lot of JavaScript, particularly React. While this change in itself is not interesting to the average user, it does impact how WordPress is built.\n' +
			'\n' +
			'Here at Yoast, we are worried about the use of new technology combined with the introduction of big new concepts. This is bound to make for a rocky experience. We know from our own experience releasing Yoast SEO 3.0 (we’d rather not talk about that anymore). Even when releases are very well prepared, a lot can go wrong and you’ll be busy fixing it for a long time. We feel worried about the combination of new technology, completely renewed functionality, and the extremely ambitious time plan.\n' +
			'<h2>Plugins in Gutenberg</h2>\n' +
			'The concept of blocks brings some very powerful new tools to plugin authors. At Yoast, we have lots of ideas on how to make our content analysis better, faster, and more user-friendly with the Gutenberg editor. However, Gutenberg does currently not have the technical necessities in place to allow us to actually build that integration. Yoast SEO can’t integrate with the new editor (yet). Of course, we are actively involved in the technical discussions around this. We are currently heavily discussing how to make it possible for plugins to integrate.\n' +
			'\n' +
			'Fact remains that, if you test Gutenberg right now, you’ll see that Yoast SEO is not on the page, anywhere. Nor, for that matter, are all the other plugins you might use like Advanced Custom Fields or CMB2. All of these plugins use so-called meta boxes, the boxes below and to the side of the current editor.\n' +
			'\n' +
			'The fact that the Gutenberg team is considering changing meta boxes is, in our eyes, a big mistake. This would mean that many, many plugins would not work anymore the minute Gutenberg comes out. Lots and lots of custom built integrations would stop working. Hundreds of thousands of hours of development time would have to be, at least partly, redone. All of this while, for most sites, the current editor works just fine.\n' +
			'<h2>Accessibility issues</h2>\n' +
			'The current version of Gutenberg has major accessibility issues both in its frontend output and in the backend editor. This ranges from <a href=\'https://github.com/WordPress/gutenberg/issues/2862\'>inline styles</a> in the output to <a href=\'https://gist.github.com/samikeijonen/5bacbe9bf87b5ddbb4acc9b581828c77\'>many other things</a>.\n' +
			'\n' +
			'We feel very strongly about accessibility. Not without reasons. The law in many European countries requires government institutions to have properly accessible websites. If Gutenberg breaks their accessibility, they will have to disable it, or face lawsuits. The Gutenberg team needs to realize that accessibility requirements are simply that: requirements.\n' +
			'\n' +
			'To conclude: we are very enthusiastic about the idea of blocks, but have strong concerns about some of the technical choices and the speed of the implementation process. We are also worried about the lack of priority given to accessibility issues in the project. But most importantly, we are very much concerned about the fact that plugins are not able to integrate with the new editor.\n' +
			'<h3>When is Gutenberg coming?</h3>\n' +
			'In a <a href=\'https://ma.tt/2017/09/on-react-and-wordpress/\'>recent post</a> about the JavaScript library of choice for the WordPress ecosystem, WordPress’ project lead Matt Mullenweg said:\n' +
			'<blockquote>It will likely delay Gutenberg at least a few weeks, and may push the release into next year.</blockquote>\n' +
			'At Yoast, we were pretty shocked about these words. In its current form, Gutenberg is not ready -at all- for mainstream usage. In fact, we do not see it as being ready to be released anywhere in the first half of 2018. In our view, ready to be released also means that the community has had ample time to fix all of their integrations. In this point of time, it’s not possible for plugins at all to integrate with Gutenberg. How on earth should plugin authors be able to build their integrations within a few months? That’s not possible. At least not without breaking things.\n' +
			'<h2>So what should be done?</h2>\n' +
			'We think that taking the following three steps would bring Gutenberg much closer to release:\n' +
			'<ul>\n' +
			' \t<li>First of all, we should keep the blocks idea, as it’s a good one. And then we should start iterating, slowly. If you want the admin to get a modern “makeover” for 5.0: that’s doable. We don’t need to change how meta boxes are rendered for that to happen.</li>\n' +
			' \t<li>There\'s also no need to move the toolbar (with bold, italics etc buttons) away from where it is (this has been <a href=\'https://github.com/WordPress/gutenberg/pull/2148\'>discussed before</a>). <a href=\'https://medium.com\'>Medium</a> does that, but that doesn\'t mean it\'s a good thing and it means more re-training than the team building Gutenberg seems to realize.</li>\n' +
			' \t<li>We should focus on making sure both the backend editor <em>and</em> the frontend output of Gutenberg meet basic accessibility requirements.</li>\n' +
			'</ul>\n' +
			'Once we\'ve decided on the above, we should start educating plugin & theme developers on what will and what will <em>not</em> work in the new environment.\n' +
			'<h2>What should this look like?</h2>\n' +
			'We\'ve made some mockups of what we think this could look like (click for larger versions):\n' +
			'\n' +
			'<div id=\'attachment_1180024\' class=\'wp-caption alignleft\'><a href=\'https://yoast.com/app/uploads/2017/10/Gutenberg-2.1-doc-level.jpg\' target=\'_blank\' rel=\'noopener\'><img class=\'wp-image-1180024 size-medium\' src=\'https://yoast.com/app/uploads/2017/10/Gutenberg-2.1-doc-level-250x250.jpg\' alt=\'\' width=\'250\' height=\'250\'></img></a><p class=\'wp-caption-text\'>Document level</p></div>\n' +
			'\n' +
			'<div id=\'attachment_1180026\' class=\'wp-caption alignleft\'><a href=\'https://yoast.com/app/uploads/2017/10/Gutenberg-2.2-block-level.jpg\' target=\'_blank\' rel=\'noopener\'><img class=\'wp-image-1180026 size-medium\' src=\'https://yoast.com/app/uploads/2017/10/Gutenberg-2.2-block-level-250x250.jpg\' alt=\'Gutenberg editor mockup - block level\' width=\'250\' height=\'250\'></img></a><p class=\'wp-caption-text\'>Block level</p></div>\n' +
			'\n' +
			'<div id=\'attachment_1180028\' class=\'wp-caption alignleft\'><a href=\'https://yoast.com/app/uploads/2017/10/Gutenberg-2.3-distraction-free.jpg\' target=\'_blank\' rel=\'noopener\'><img class=\'size-medium wp-image-1180028\' src=\'https://yoast.com/app/uploads/2017/10/Gutenberg-2.3-distraction-free-250x250.jpg\' alt=\'Gutenberg mockup - distraction free mode\' width=\'250\' height=\'250\'></img></a><p class=\'wp-caption-text\'>Distraction free mode</p></div>\n' +
			'\n' +
			'<div class=\'clear\'></div>\n' +
			'Note that we have disabled the background color and text color controls in the block level mockup. These should be off by default in our opinion, and possibly only allow a subset of colors, chosen by the theme author, when enabled.\n' +
			'\n' +
			'I\'d love to discuss with you, in the comments here, on Github, on Slack: everywhere!<img width=\'266\' height=\'266\' src=\'https://cdn.yoast.com/app/uploads/2017/10/Gutenberg_FI-300x300.png\' class=\'attachment-266x266 size-266x266\' alt=\'\' srcset=\'https://cdn.yoast.com/app/uploads/2017/10/Gutenberg_FI-300x300.png 300w, https://cdn.yoast.com/app/uploads/2017/10/Gutenberg_FI-180x180.png 180w, https://cdn.yoast.com/app/uploads/2017/10/Gutenberg_FI-600x600.png 600w\' sizes=\'(max-width: 266px) 100vw, 266px\'></img>', {
			keyword: 'gutenberg',
			permalink: 'https://yoast.com/gutenberg-gutenberg-gutenberg',
		} );

		this._researcher = new Researcher( paper );

		this.state = {
			paper,
			results: this.getResults( paper ),
			isUpdating: false,
		};

		this.changeText = this.changeText.bind( this );
		this.changeKeyword = this.changeKeyword.bind( this );
		this.changeUrl = this.changeUrl.bind( this );
		this.changeDescription = this.changeDescription.bind( this );
		this.debouncedAnalysis = debounce( this.analyze, 500 );
	}

	changePaper( newValues ) {
		const oldPaper = this.state.paper;

		const values = Object.assign( {}, {
			text: oldPaper.getText(),
			keyword: oldPaper.getKeyword(),
			description: oldPaper.getDescription(),
			title: oldPaper.getTitle(),
			titleWidth: oldPaper.getTitleWidth(),
			url: oldPaper.getUrl(),
			locale: oldPaper.getLocale(),
			permalink: oldPaper.getPermalink(),
		}, newValues );

		const paper = new Paper( values.text, omit( values, 'text' ) );

		this.setState( { paper } );

		this.debouncedAnalysis();
	}

	changeText( event ) {
		this.changePaper( {
			text: event.target.value,
		} );
	}

	changeKeyword( event ) {
		this.changePaper( {
			keyword: event.target.value,
		} );
	}

	changeUrl( event ) {
		this.changePaper( {
			url: event.target.value,
		} );
	}

	changeDescription( event ) {
		this.changePaper( {
			description: event.target.value,
		} );
	}

	analyze() {
		this.setState( {
			isUpdating: true,
		} );

		setTimeout( () => {
			let results = this.getResults( this.state.paper );

			this.setState( {
				results: results,
				isUpdating: false,
			} );
		}, 50 );
	}

	getResults( paper ) {
		this._researcher.setPaper( paper );

		let keys = Object.keys( this._researcher.getAvailableResearches() );

		let results = keys.map( ( research ) => {
			return this._researcher.getResearch( research );
		} );

		return zipObject( keys, results );
	}

	render() {
		let resultStyles = {};
		let updating = null;
		if ( this.state.isUpdating ) {
			updating = "Updating results";
			resultStyles.display = "none";
		}

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Welcome to the YoastSEO.js visualizer</h1>
				</header>
				<p className="App-intro">
					To get started, put in your text and see the results.
				</p>
				<div className="App-body">
					<p>
						Content: <textarea onChange={this.changeText} value={this.state.paper.getText()} />
						Keyword: <input type="text" onChange={this.changeKeyword} value={this.state.paper.getKeyword()} />
						Url: <input type="text" onChange={this.changeUrl} value={this.state.paper.getUrl()} />
						Description: <textarea onChange={this.changeDescription} value={this.state.paper.getDescription()} />
					</p>
					<h2>Results</h2>
					{updating}
					<Results results={this.state.results} style={resultStyles} />
				</div>
			</div>
		);
	}
}

export default App;
