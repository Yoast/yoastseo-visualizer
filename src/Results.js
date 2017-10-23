import React, { Component } from 'react';
import { isArray, isObject, round } from "lodash-es";
import { Value } from "react-object";

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

class Result extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			hasError: false,
		};
	}

	componentDidCatch( error, info ) {
		this.setState({ hasError: true, error, info });
	}

	transformGetKeywordDensity( value ) {
		value = round( value, 1 );

		return value + '%';
	}

	renderGetLinks( links ) {
		return links.map( link => {
			return <Value value={link} />;
		} );
	}

	render() {
		let { research, value } = this.props;

		if ( this.state.hasError ) {
			return <tr><td>{this.state.error}</td></tr>
		}

		let transform = "transform" + capitalize( research );
		if ( typeof this[ transform ] === "function" ) {
			value = this[ transform ]( value );
		}

		let rendered;
		let func = "render" + capitalize( research );
		if ( typeof this[ func ] === "function" ) {
			rendered = this[ func ]( value );
		} else {
			rendered = <Value value={value} isExpanded={true} />
		}

		return <tr>
			<td>
				{research}
			</td>
			<td>
				{rendered}
			</td>
		</tr>;
	}
}

class Results extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let { results } = this.props;

		let keys = Object.keys( results );

		console.log( results );

		return (
			<div>
				<table>
					<tbody>
						{ keys.map( ( key ) => {
							let value = results[ key ];

							return <Result key={key} research={key} value={value} />;
						} ) }
					</tbody>
				</table>
			</div>
		);
	}
}

export default Results;
