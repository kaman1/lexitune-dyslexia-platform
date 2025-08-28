#!/usr/bin/env node

/**
 * This script creates a reference to DOM types in the project
 * to fix TypeScript compilation errors with HTML elements.
 */

const fs = require('fs');
const path = require('path');

// Ensure types directory exists
const typesDir = path.join(process.cwd(), 'types');
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
  console.log('Created types directory');
}

// Create reference file if it doesn't exist
const dtsFile = path.join(typesDir, 'dom-fix.d.ts');
if (!fs.existsSync(dtsFile)) {
  const content = `/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// This file exists to explicitly reference DOM types that might not be properly detected
// by the TypeScript compiler during the build process.
`;

  fs.writeFileSync(dtsFile, content, 'utf8');
  console.log('Created DOM types reference file');
}

console.log('Type fixes completed successfully'); 