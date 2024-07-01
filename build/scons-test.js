#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs-extra';
import { Builder } from './lib/builder.js';

const { version } = fs.readJsonSync('package.json');

program
	.option('-C, --device-id [id]', 'Titanium device id to run the unit tests on. Only valid when there is a target provided')
	.option('-T, --target [target]', 'Titanium platform target to run the unit tests on. Only valid when there is a single platform provided')
	.option('-v, --sdk-version [version]', 'Override the SDK version we report', process.env.PRODUCT_VERSION || version)
	.option('-D, --deploy-type <type>', 'Override the deploy type used to build the project', /^(development|test)$/)
	.option('-F, --device-family <value>', 'Override the device family used to build the project', /^(iphone|ipad)$/)
	.option('-J --junit-prefix <value>', 'A prefix to add to junit tests to help distinguish them. Useful if targeting same platform and target', '')
	.option('-O --only-failed', 'Show only failed tests', '')
	.parse(process.argv);

async function main(program) {
	return new Builder(program.opts(), program.args).test();
}

main(program)
	.then(() => process.exit(0))
	.catch(err => {
		console.error(err.toString());
		process.exit(1);
	});
