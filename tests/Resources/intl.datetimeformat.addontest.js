/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018-Present by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
/* eslint-env mocha */

/* eslint no-unused-expressions: "off" */
'use strict';
var should = require('./utilities/assertions'); // eslint-disable-line no-unused-vars

describe('Intl.DateTimeFormat', function () {
	it('#constructor()', () => {
		should(Intl).not.be.undefined();
		should(Intl.DateTimeFormat).not.be.undefined();
		should(Intl.DateTimeFormat).be.a.Function();
		should(new Intl.DateTimeFormat()).be.an.Object();
		should(new Intl.DateTimeFormat('en-US')).be.an.Object();
		should(new Intl.DateTimeFormat([ 'en-US' ])).be.an.Object();
		should(new Intl.DateTimeFormat([ 'en-US', 'de-DE' ])).be.an.Object();
		should(new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).be.an.Object();
		should(new Intl.DateTimeFormat([ 'en-US' ], { dateStyle: 'full' })).be.an.Object();
		should(new Intl.DateTimeFormat([ 'en-US', 'de-DE' ], { dateStyle: 'full' })).be.an.Object();
		should(new Intl.DateTimeFormat({ dateStyle: 'full' })).be.an.Object();
	});

	describe('#format()', () => {
		it('validate function', () => {
			const formatter = Intl.DateTimeFormat();
			should(formatter.format).not.be.undefined();
			should(formatter.format).be.a.Function();
			should(formatter.format(new Date())).be.a.String();
		});

		it('numeric date', () => {
			// 2020-March-1st
			const date = new Date(Date.UTC(2020, 2, 1));
			const options = {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				timeZone: 'UTC'
			};
			let formatter = new Intl.DateTimeFormat('en-US', options);
			should(formatter.format(date)).be.eql('3/1/2020');
			formatter = new Intl.DateTimeFormat('de-DE', options);
			should(formatter.format(date)).be.eql('1.3.2020');
			formatter = new Intl.DateTimeFormat('ja-JP', options);
			should(formatter.format(date)).be.eql('2020/3/1');
		});

		it('2-digit date', () => {
			// 2020-March-1st
			const date = new Date(Date.UTC(2020, 2, 1));
			const options = {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
				timeZone: 'UTC'
			};
			let formatter = new Intl.DateTimeFormat('en-US', options);
			should(formatter.format(date)).be.eql('03/01/20');
			formatter = new Intl.DateTimeFormat('de-DE', options);
			should(formatter.format(date)).be.eql('01.03.20');
			formatter = new Intl.DateTimeFormat('ja-JP', options);
			should(formatter.format(date)).be.eql('20/03/01');
		});

		it('12 hour time', () => {
			// 2020-Jan-1st 08:02:05 PM
			const date = new Date(Date.UTC(2020, 0, 1, 20, 2, 5));
			const options = {
				hour: 'numeric',
				minute: '2-digit',
				second: '2-digit',
				hour12: true,
				dayPeriod: 'narrow',
				timeZone: 'UTC'
			};
			let formatter = new Intl.DateTimeFormat('en-US', options);
			should(formatter.format(date)).be.eql('8:02:05 PM');
			formatter = new Intl.DateTimeFormat('de-DE', options);
			should(formatter.format(date)).be.equalOneOf([ '8:02:05 PM', '8:02:05 nachm.' ]);
		});

		it('24 hour time', () => {
			// 2020-Jan-1st 08:02:05 PM
			const date = new Date(Date.UTC(2020, 0, 1, 20, 2, 5));
			const options = {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
				timeZone: 'UTC'
			};
			let formatter = new Intl.DateTimeFormat('en-US', options);
			should(formatter.format(date)).be.eql('20:02:05');
			formatter = new Intl.DateTimeFormat('de-DE', options);
			should(formatter.format(date)).be.eql('20:02:05');
			formatter = new Intl.DateTimeFormat('ja-JP', options);
			should(formatter.format(date)).be.eql('20:02:05');
		});

		it('month name', () => {
			// 2020-October-1st
			const date = new Date(Date.UTC(2020, 9, 1));
			let formatter = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('october');
			formatter = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('oct');
			formatter = new Intl.DateTimeFormat('de-DE', { month: 'long', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('oktober');
			formatter = new Intl.DateTimeFormat('de-DE', { month: 'short', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('okt');
		});

		it('weekday name', () => {
			// 2020-Jan-1st = Wednesday
			const date = new Date(Date.UTC(2020, 0, 1));
			let formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('wednesday');
			formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('wed');
			formatter = new Intl.DateTimeFormat('de-DE', { weekday: 'long', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('mittwoch');
			formatter = new Intl.DateTimeFormat('de-DE', { weekday: 'short', timeZone: 'UTC' });
			should(formatter.format(date).toLowerCase()).be.eql('mi');
		});

		it.android('fractionalSecondDigits', () => {
			// 2020-Jan-1st 12:00:00.456
			const date = new Date(Date.UTC(2020, 0, 1, 12, 0, 0, 456));
			let formatter = new Intl.DateTimeFormat('en-US', { fractionalSecondDigits: 3, timeZone: 'UTC' });
			should(formatter.format(date)).be.eql('456');
			formatter = new Intl.DateTimeFormat('en-US', { fractionalSecondDigits: 2, timeZone: 'UTC' });
			should(formatter.format(date)).be.eql('45');
			formatter = new Intl.DateTimeFormat('en-US', { fractionalSecondDigits: 1, timeZone: 'UTC' });
			should(formatter.format(date)).be.eql('4');
		});
	});

	describe.android('#formatToParts()', () => {
		it('validate function', () => {
			const formatter = new Intl.DateTimeFormat();
			should(formatter.formatToParts).not.be.undefined();
			should(formatter.formatToParts).be.a.Function();
			should(formatter.formatToParts(new Date())).be.an.Array();
		});

		it('yyyy/MM/dd h:mm:ss.SSS aa', () => {
			// 2020-March-31 08:15:30.123 PM
			const date = new Date(Date.UTC(2020, 2, 31, 20, 15, 30, 123));
			const formatter = new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: 'numeric',
				minute: '2-digit',
				second: '2-digit',
				fractionalSecondDigits: 3,
				hour12: true,
				timeZone: 'UTC'
			});
			const partsArray = formatter.formatToParts(date);
			should(partsArray).be.an.Array();
			should(partsArray).be.eql([
				{ type: 'month', value: '03' },
				{ type: 'literal', value: '/' },
				{ type: 'day', value: '31' },
				{ type: 'literal', value: '/' },
				{ type: 'year', value: '2020' },
				{ type: 'literal', value: ', ' },
				{ type: 'hour', value: '8' },
				{ type: 'literal', value: ':' },
				{ type: 'minute', value: '15' },
				{ type: 'literal', value: ':' },
				{ type: 'second', value: '30' },
				{ type: 'literal', value: '.' },
				{ type: 'fractionalSecond', value: '123' },
				{ type: 'literal', value: ' ' },
				{ type: 'dayPeriod', value: 'PM' }
			]);
		});
	});

	it('#resolvedOptions()', () => {
		const formatter = new Intl.DateTimeFormat();
		should(formatter.resolvedOptions).not.be.undefined();
		should(formatter.resolvedOptions).be.a.Function();
		should(formatter.resolvedOptions()).be.an.Object();
	});

	it('#supportedLocalesOf()', () => {
		should(Intl.DateTimeFormat.supportedLocalesOf).not.be.undefined();
		should(Intl.DateTimeFormat.supportedLocalesOf).be.a.Function();

		let locales = Intl.DateTimeFormat.supportedLocalesOf([]);
		should(locales).be.an.Array();
		should(locales.length).be.eql(0);

		locales = Intl.DateTimeFormat.supportedLocalesOf([ 'en-US' ]);
		should(locales).be.an.Array();
		should(locales.length).be.eql(1);
		should(locales[0]).be.eql('en-US');

		locales = Intl.DateTimeFormat.supportedLocalesOf([ 'en-US', 'de-DE' ]);
		should(locales).be.an.Array();
		should(locales.length).be.eql(2);
		should(locales[0]).be.eql('en-US');
		should(locales[1]).be.eql('de-DE');

		locales = Intl.DateTimeFormat.supportedLocalesOf([ 'uh-oh', 'en-US' ]);
		should(locales).be.an.Array();
		should(locales.length).be.eql(1);
		should(locales[0]).be.eql('en-US');
	});
});
