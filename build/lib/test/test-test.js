/*
 * Titanium SDK
 * Copyright TiDev, Inc. 04/07/2022-Present. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

import { handleBuild } from './test.js';
import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('test.handleBuild', function () {
	this.slow(750);

	it('works', async () => {
		// TODO: Can we interleave stderr and stdout on separate files or something?
		const stdout = fs.createReadStream(path.join(__dirname, 'out.txt'));
		const prc = {
			stdout,
			stderr: {
				on: () => {}
			},
			on: () => {},
			kill: () => {}
		};
		const results = await handleBuild(prc, 'emulator', __dirname, []);
		expect(results).to.be.a('object');
		expect(results.date).to.be.a('string'); // ISO date string
		expect(results.results).to.have.lengthOf(5134); // 5134 test results (count of '!TEST_END:')
		expect(results.results.filter(r => r.state === 'failed')).to.have.lengthOf(31); // 31 failed ('"state":"failed"')
	});
});
