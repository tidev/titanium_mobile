#!/usr/bin/env node
/**
 * This is a simple script to iterate over the package-lock.json file and
 * flag if the resolved url doesn't appear to match up with the
 * given version. This is extremely rare, but could occur if a developer
 * tried to manually update the lockfile (or a bad merge occurred)
 */

import fs from 'node:fs';

const lockfile = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));

let foundError = false;

checkDependencies(lockfile.dependencies);

function checkDependencies(deps) {
	const packageNames = Object.keys(deps);
	for (const packageName of packageNames) {
		const whatever = deps[packageName];
		const version = whatever.version;
		if (version.startsWith('npm:')) {
			continue;
		}
		const resolved = whatever.resolved;
		if (resolved && !resolved.endsWith(`${version}.tgz`)) {
			console.error(`There may be a mismatched url (${resolved}) for the given version (${version}) of dependency ${packageName}`);
			foundError = true;
		}
		if (whatever.dependencies) {
			checkDependencies(whatever.dependencies);
		}
	}
}

if (foundError) {
	process.exit(1);
}
