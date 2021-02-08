/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-Present by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */
/* eslint mocha/no-identical-title: "off" */
'use strict';
const should = require('./utilities/assertions'); // eslint-disable-line no-unused-vars
const utilities = require('./utilities/utilities');

const isCI = Ti.App.Properties.getBool('isCI', false);

describe('Titanium.UI.TabGroup', function () {
	this.timeout(5000);

	let tabGroup;
	afterEach(done => { // fires after every test in sub-suites too...
		if (tabGroup && !tabGroup.closed) {
			tabGroup.addEventListener('close', function listener () {
				tabGroup.removeEventListener('close', listener);
				tabGroup = null;
				done();
			});
			tabGroup.close();
		} else {
			tabGroup = null;
			done();
		}
	});

	describe('properties', () => {
		describe('.activeTab', () => {
			it.windowsBroken('assign before open event', finish => {
				const winA = Ti.UI.createWindow(),
					tabA = Ti.UI.createTab({
						title: 'Tab A',
						window: winA
					}),
					winB = Ti.UI.createWindow(),
					tabB = Ti.UI.createTab({
						title: 'Tab B',
						window: winB
					});
				tabGroup = Ti.UI.createTabGroup();
				tabGroup.activeTab = 1;
				// Does windows fire this event?
				// Can we test this without even opening tab group?
				tabGroup.addEventListener('open', () => {
					try {
						should(tabGroup.activeTab.title).be.a.String();
						should(tabGroup.activeTab.title).eql('Tab B');
					} catch (err) {
						return finish(err);
					} finally {
						tabGroup.removeTab(tabA);
						tabGroup.removeTab(tabB);
					}
					finish();
				});

				tabGroup.addTab(tabA);
				tabGroup.addTab(tabB);
				tabGroup.open();
			});

			it.windowsBroken('assign after open event', finish => {
				const winA = Ti.UI.createWindow(),
					tabA = Ti.UI.createTab({
						title: 'Tab A',
						window: winA
					}),
					winB = Ti.UI.createWindow(),
					tabB = Ti.UI.createTab({
						title: 'Tab B',
						window: winB
					});
				tabGroup = Ti.UI.createTabGroup();

				// Does windows fire this event?
				// Can we test this without even opening tab group?
				tabGroup.addEventListener('open', () => {
					try {
						tabGroup.activeTab = tabB;
						should(tabGroup.activeTab.title).be.a.String();
						should(tabGroup.activeTab.title).eql('Tab B');
					} catch (err) {
						return finish(err);
					} finally {
						tabGroup.removeTab(tabA);
						tabGroup.removeTab(tabB);
					}
					finish();
				});

				tabGroup.addTab(tabA);
				tabGroup.addTab(tabB);
				tabGroup.open();
			});

			it.androidBroken('assign in creation dictionary', finish => {
				const winA = Ti.UI.createWindow(),
					tabA = Ti.UI.createTab({
						title: 'Tab A',
						window: winA
					}),
					winB = Ti.UI.createWindow(),
					tabB = Ti.UI.createTab({
						title: 'Tab B',
						window: winB
					});
				tabGroup = Ti.UI.createTabGroup({
					activeTab: 1
				});
				// Does windows fire this event?
				// Can we test this without even opening tab group?
				tabGroup.addEventListener('open', () => {
					try {
						should(tabGroup.activeTab.title).be.a.String(); // undefined on Android!
						should(tabGroup.activeTab.title).eql('Tab B');
					} catch (err) {
						return finish(err);
					} finally {
						tabGroup.removeTab(tabA);
						tabGroup.removeTab(tabB);
					}
					finish();
				});

				tabGroup.addTab(tabA);
				tabGroup.addTab(tabB);
				tabGroup.open();
			});
		});

		describe('.activeTintColor', () => {
			beforeEach(() => {
				tabGroup = Ti.UI.createTabGroup({
					title: 'TabGroup',
					activeTintColor: 'red'
				});
			});

			it('is a String', () => {
				should(tabGroup).have.property('activeTintColor').which.is.a.String();
			});

			it('equals value passed to factory method', () => {
				should(tabGroup.activeTintColor).eql('red');
			});

			it('can be assigned a String value', () => {
				tabGroup.activeTintColor = 'blue';
				should(tabGroup.activeTintColor).eql('blue');
			});

			it.androidBroken('has accessors', () => { // Windows are created during open
				should(tabGroup).have.accessors('activeTintColor');
			});
		});

		describe.ios('.allowUserCustomization', () => {
			beforeEach(() => {
				tabGroup = Ti.UI.createTabGroup();
			});

			it('is a Boolean', () => {
				should(tabGroup.allowUserCustomization).be.a.Boolean();
			});

			it('defaults to true', () => {
				should(tabGroup.allowUserCustomization).be.true();
			});

			it('can be assigned a Boolean value', () => {
				tabGroup.allowUserCustomization = false;
				should(tabGroup.allowUserCustomization).be.false();
			});

			it('has accessors', () => {
				should(tabGroup).have.accessors('allowUserCustomization');
			});
		});

		describe('.barColor', () => {
			beforeEach(() => {
				tabGroup = Ti.UI.createTabGroup({
					title: 'TabGroup',
					barColor: 'red'
				});
			});

			it('is a String', () => {
				should(tabGroup).have.property('barColor').which.is.a.String();
			});

			it('equals value passed to factory method', () => {
				should(tabGroup.barColor).eql('red');
			});

			it('can be assigned a String value', () => {
				tabGroup.barColor = 'blue';
				should(tabGroup.barColor).eql('blue');
			});

			it.androidBroken('has accessors', () => { // Windows are created during open
				should(tabGroup).have.accessors('barColor');
			});
		});

		describe('.tabs', () => {
			beforeEach(() => {
				tabGroup = Ti.UI.createTabGroup();
			});

			it.iosBroken('is an Array', () => { // undfined on iOS?
				should(tabGroup).have.property('tabs').which.is.an.Array();
			});

			it('can be assigned an Array of Ti.UI.Tabs', () => {
				const winA = Ti.UI.createWindow(),
					tabA = Ti.UI.createTab({
						title: 'Tab A',
						window: winA
					}),
					winB = Ti.UI.createWindow(),
					tabB = Ti.UI.createTab({
						title: 'Tab B',
						window: winB
					});

				tabGroup.tabs = [ tabA, tabB ];
				should(tabGroup.tabs).eql([ tabA, tabB ]);
			});

			it.androidBroken('has accessors', () => { // Windows are created during open
				should(tabGroup).have.accessors('barColor');
			});

			it('#addTab() and #removeTab() affect value', () => {
				const win = Ti.UI.createWindow();
				const tab = Ti.UI.createTab({
					title: 'Tab',
					window: win
				});

				tabGroup.addTab(tab);
				should(tabGroup.tabs.length).eql(1);
				tabGroup.removeTab(tab);
				should(tabGroup.tabs.length).eql(0);
			});
		});

		describe.ios('.tabsTranslucent', () => {
			beforeEach(() => {
				tabGroup = Ti.UI.createTabGroup();
			});

			it.iosBroken('is a Boolean', () => { // defaults to undefined!
				should(tabGroup.tabsTranslucent).be.a.Boolean();
			});

			it.iosBroken('defaults to true', () => { // defaults to undefined!
				should(tabGroup.tabsTranslucent).be.true();
			});

			it('can be assigned a Boolean value', () => {
				tabGroup.tabsTranslucent = false;
				should(tabGroup.tabsTranslucent).be.false();
			});

			it('has accessors', () => {
				should(tabGroup).have.accessors('tabsTranslucent');
			});
		});

		describe('.tintColor', () => {
			beforeEach(() => {
				tabGroup = Ti.UI.createTabGroup({
					title: 'TabGroup',
					tintColor: 'red'
				});
			});

			it('is a String', () => {
				should(tabGroup).have.property('tintColor').which.is.a.String();
			});

			it('equals value passed to factory method', () => {
				should(tabGroup.tintColor).eql('red');
			});

			it('can be assigned a String value', () => {
				tabGroup.tintColor = 'blue';
				should(tabGroup.tintColor).eql('blue');
			});

			it.androidBroken('has accessors', () => { // Windows are created during open
				should(tabGroup).have.accessors('tintColor');
			});
		});

		describe('.title', () => {
			it.androidBroken('is a String', () => {
				tabGroup = Ti.UI.createTabGroup({
					title: 'My title'
				});
				should(tabGroup.title).be.a.String(); // null on Android!
			});

			it.androidBroken('equals value passed in to creation dictionary', () => {
				tabGroup = Ti.UI.createTabGroup({
					title: 'My title'
				});
				should(tabGroup.title).eql('My title'); // null on Android!
			});

			it('has accessors', () => {
				tabGroup = Ti.UI.createTabGroup();
				should(tabGroup).have.accessors('title');
			});

			it('assign after drawing the TabGroup', () => {
				const winA = Ti.UI.createWindow(),
					winB = Ti.UI.createWindow(),
					tabA = Ti.UI.createTab({ title: 'titleA', window: winA }),
					tabB = Ti.UI.createTab({ title: 'titleB', window: winB });
				tabGroup = Ti.UI.createTabGroup({ tabs: [ tabA, tabB ] });
				tabGroup.addEventListener('open', () => {
					tabGroup.title = 'newTitle';
					tabGroup.activeTab = tabB;
				});
				tabB.addEventListener('selected', () => {
					should(tabGroup.title).be.a.String();
					should(tabGroup.title).eql('newTitle');
				});
			});
		});
	});

	describe('methods', () => {
		it.android('#disableTabNavigation()', function (finish) {
			const winA = Ti.UI.createWindow(),
				tabA = Ti.UI.createTab({
					title: 'Tab A',
					window: winA
				}),
				winB = Ti.UI.createWindow(),
				tabB = Ti.UI.createTab({
					title: 'Tab B',
					window: winB
				});
			this.timeout(5000);
			tabGroup = Ti.UI.createTabGroup();

			// does windows fire this event?
			tabGroup.addEventListener('open', () => {
				try {
					tabGroup.disableTabNavigation(true);
					tabGroup.activeTab = tabB;
					should(tabGroup.activeTab.title).be.a.String();
					should(tabGroup.activeTab.title).eql('Tab A');
					tabGroup.disableTabNavigation(false);
					tabGroup.activeTab = tabB;
					should(tabGroup.activeTab.title).be.a.String();
					should(tabGroup.activeTab.title).eql('Tab B');
				} catch (err) {
					return finish(err);
				} finally {
					tabGroup.removeTab(tabA);
					tabGroup.removeTab(tabB);
				}
				finish();
			});

			tabGroup.addTab(tabA);
			tabGroup.addTab(tabB);
			tabGroup.open();
		});
	});

	it.windowsBroken('add Map.View to TabGroup', function (finish) {
		if (isCI && utilities.isMacOS()) { // FIXME: On macOS CI (maybe < 10.15.6?), the mapView compelete event never fires! Does app need explicit focus added?
			return finish(); // FIXME: skip when we move to official mocha package
		}

		this.slow(5000);
		this.timeout(15000);

		const map = require('ti.map');
		const mapView = map.createView({ top: 0, height: '80%' });
		mapView.addEventListener('complete', function listener () {
			mapView.removeEventListener('complete', listener);
			finish();
		});

		const win = Ti.UI.createWindow();
		win.add(mapView);

		tabGroup = Ti.UI.createTabGroup();
		const tab = Ti.UI.createTab({
			title: 'Tab',
			window: win
		});

		tabGroup.addTab(tab);
		tabGroup.open();
	});

	describe('events', function () {
		this.timeout(5000);

		// FIXME Windows doesn't fire open/close events
		it.windowsMissing('close', finish => {
			const win = Ti.UI.createWindow();
			tabGroup = Ti.UI.createTabGroup();
			const tab = Ti.UI.createTab({
				title: 'Tab',
				window: win
			});

			function closeTabGroup() {
				setTimeout(() => tabGroup.close(), 1);
			}

			tabGroup.addEventListener('open', closeTabGroup);
			tabGroup.addEventListener('close', function listener () {
				tabGroup.removeEventListener('open', closeTabGroup);
				tabGroup.removeEventListener('close', listener);
				finish();
			});

			tabGroup.addTab(tab);
			tabGroup.open();
		});

		// times out, presumably doesn't fire event?
		// intermittently times out on Android
		it.windowsBroken('focus', finish => {
			const win = Ti.UI.createWindow();
			tabGroup = Ti.UI.createTabGroup();
			const tab = Ti.UI.createTab({
				window: win,
				title: 'Tab'
			});

			tabGroup.addEventListener('focus', function listener () {
				tabGroup.removeEventListener('focus', listener);
				finish();
			});

			tabGroup.addTab(tab);
			tabGroup.open();
		});

		// times out, presumably doesn't fire event?
		it.windowsBroken('blur', finish => {
			const win = Ti.UI.createWindow();
			tabGroup = Ti.UI.createTabGroup();
			const tab = Ti.UI.createTab({
				title: 'Tab',
				window: win
			});

			function closeTabGroup() {
				setTimeout(() => tabGroup.close(), 1);
			}

			function done() {
				tabGroup.removeEventListener('open', closeTabGroup);
				tabGroup.removeEventListener('blur', done);
				finish();
			}

			tabGroup.addEventListener('blur', done);
			tabGroup.addEventListener('open', closeTabGroup);

			tabGroup.addTab(tab);
			tabGroup.open();
		});

		it('blur event on opening new window', finish => {
			const win = Ti.UI.createWindow();
			tabGroup = Ti.UI.createTabGroup();
			const tab = Ti.UI.createTab({
				title: 'Tab',
				window: win
			});

			function openNewWindow() {
				setTimeout(() => {
					tabGroup.addEventListener('blur', done);
					const newWin = Ti.UI.createWindow();
					newWin.open();
				}, 1);
			}

			function done() {
				tabGroup.removeEventListener('open', openNewWindow);
				tabGroup.removeEventListener('blur', done);
				finish();
			}

			tabGroup.addEventListener('focus', openNewWindow);

			tabGroup.addTab(tab);
			tabGroup.open();
		});
	});

	it('icon-only tabs - default style', finish => {
		this.timeout(5000);
		tabGroup = Ti.UI.createTabGroup({
			tabs: [
				Ti.UI.createTab({
					icon: '/SmallLogo.png',
					window: Ti.UI.createWindow({ title: 'Tab 1' })
				}),
				Ti.UI.createTab({
					icon: '/SmallLogo.png',
					window: Ti.UI.createWindow({ title: 'Tab 2' })
				}),
			]
		});
		tabGroup.addEventListener('open', () => finish());
		tabGroup.open();
	});

	it.android('icon-only tabs - android bottom style', finish => {
		this.timeout(5000);
		tabGroup = Ti.UI.createTabGroup({
			style: Ti.UI.Android.TABS_STYLE_BOTTOM_NAVIGATION,
			tabs: [
				Ti.UI.createTab({
					icon: '/SmallLogo.png',
					window: Ti.UI.createWindow({ title: 'Tab 1' })
				}),
				Ti.UI.createTab({
					icon: '/SmallLogo.png',
					window: Ti.UI.createWindow({ title: 'Tab 2' })
				}),
			]
		});
		tabGroup.addEventListener('open', () => finish());
		tabGroup.open();
	});

	describe('closed/focused', () => {
		beforeEach(() => {
			tabGroup = Ti.UI.createTabGroup();
			const tab = Ti.UI.createTab({
				title: 'Tab',
				window: Ti.UI.createWindow()
			});
			tabGroup.addTab(tab);
		});

		it('.closed', done => {
			should(tabGroup.closed).be.true(); // it's not yet opened, so treat as closed
			tabGroup.addEventListener('open', () => {
				try {
					should(tabGroup.closed).be.false(); // we're being notified the window is open, so should report closed as false!
				} catch (err) {
					return done(err);
				}
				done();
			});
			tabGroup.open();
			should(tabGroup.closed).be.false(); // should be open now
		});

		it('fires close event', done => {
			tabGroup.addEventListener('open', () => tabGroup.close());
			tabGroup.addEventListener('close', () => {
				try {
					should(tabGroup.closed).be.true(); // we're being notified the window is open, so should report closed as false!
				} catch (err) {
					return done(err);
				}
				done();
			});
			tabGroup.open();
		});

		it('.focused', done => {
			should(tabGroup.focused).be.false(); // haven't opened it yet, so shouldn't be focused
			// NOTE: I had to modify iOS' TabGroup implementation so that the focus event fired within the same timeline as Window's
			// The previous impl actually fired the focus event while the window was still opening, so a focus event listener
			// would have seen the TabGroup report itself as not opened or focused yet!
			tabGroup.addEventListener('focus', () => {
				try {
					should(tabGroup.focused).be.true();
					tabGroup.close();
				} catch (e) {
					return done(e);
				}
			});
			tabGroup.addEventListener('close', () => {
				try {
					// we've been closed (or are closing?) so hopefully shouldn't say that we're focused
					should(tabGroup.focused).be.false();
				} catch (e) {
					return done(e);
				}
				done();
			});
			tabGroup.open();
		});
	});
});
