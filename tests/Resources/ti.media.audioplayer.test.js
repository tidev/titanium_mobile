/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-Present by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
/* eslint-env mocha */
/* global Ti */
/* eslint no-unused-expressions: "off" */
'use strict';
var should = require('./utilities/assertions');

describe('Titanium.Media', function () {
	it('#createAudioPlayer()', function () {
		should(Ti.Media.createAudioPlayer).be.a.Function;
	});
});

describe('Titanium.Media.AudioPlayer', function () {
	it('apiName', function () {
		var player = Ti.Media.createAudioPlayer();
		should(player).have.a.readOnlyProperty('apiName').which.is.a.String;
		should(player.apiName).be.eql('Ti.Media.AudioPlayer');
		// FIXME This only works on an instance of a proxy now on Android
		// should(Ti.Media.AudioPlayer).have.readOnlyProperty('apiName').which.is.a.String;
		// should(Ti.Media.AudioPlayer.apiName).be.eql('Ti.Media.AudioPlayer');
	});

	// constants
	// Trying to loop over an array of constants makes the tests mysteriously fail
	it('STATE_BUFFERING', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_BUFFERING').which.is.a.Number;
	});

	it('STATE_INITIALIZED', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_INITIALIZED').which.is.a.Number;
	});

	it('STATE_PAUSED', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_PAUSED').which.is.a.Number;
	});

	it('STATE_PLAYING', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_PLAYING').which.is.a.Number;
	});

	it('STATE_STARTING', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_STARTING').which.is.a.Number;
	});

	it('STATE_STOPPED', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_STOPPED').which.is.a.Number;
	});

	it('STATE_STOPPING', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_STOPPING').which.is.a.Number;
	});

	it('STATE_WAITING_FOR_DATA', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_WAITING_FOR_DATA').which.is.a.Number;
	});

	it('STATE_WAITING_FOR_QUEUE', function () {
		should(Ti.Media.AudioPlayer).have.constant('STATE_WAITING_FOR_QUEUE').which.is.a.Number;
	});

	// TODO Add tests for non-constant properties
	// TODO Add tests for methods
});
