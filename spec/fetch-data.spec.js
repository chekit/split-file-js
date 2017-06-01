const expect = require('chai').expect;

const fectchData = require('./../src/fetch-data');

describe('Fetch data function', function () {
	it('should throw error if a sercond parametre not specified', function () {
		expect(() => fectchData('test')).to.throw(Error);
	})

	it('should return string', function () {
		let issue = 'test';

		expect(fectchData(issue, issue)).to.be.a('string');
	})

	it('should return substring between comment tags', function () {
		const comment = 'body';
		const issue = `<!--{BODY}--><p>Hello, <strong>world</strong></p><!--{/BODY}-->`;

		let actual = '<!--{BODY}--><p>Hello, <strong>world</strong></p>';
		let expected = fectchData(issue, comment);

		expect(expected).to.equal(actual);
	})
})