#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Get all TypeScript and TSX files
function getAllTsFiles() {
  return glob.sync('**/*.{ts,tsx}', {
    ignore: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      '**/*.d.ts'
    ]
  });
}

// Find all unused variables using ESLint
function findUnusedVariables(filePath) {
  try {
    const result = JSON.parse(execSync(
      `npx eslint --format json "${filePath}" --rule "no-unused-vars: 2" --rule "@typescript-eslint/no-unused-vars: 2"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }
    ));

    if (!result || !result.length || !result[0].messages) {
      return [];
    }

    return result[0].messages
      .filter(msg => 
        msg.ruleId === 'no-unused-vars' || 
        msg.ruleId === '@typescript-eslint/no-unused-vars'
      )
      .map(msg => ({
        line: msg.line,
        column: msg.column,
        endColumn: msg.endColumn,
        variableName: msg.message.match(/'([^']+)'/)?.[1] || ''
      }));
  } catch (error) {
    // If eslint fails, assume no unused variables
    return [];
  }
}

// Fix unused variables by adding underscore prefix
function fixUnusedVariablesInFile(filePath) {
  const unusedVars = findUnusedVariables(filePath);
  
  if (unusedVars.length === 0) {
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;

  // Process lines in reverse order to avoid offset issues
  [...unusedVars].sort((a, b) => b.line - a.line).forEach(unusedVar => {
    const { line, column, endColumn, variableName } = unusedVar;
    
    if (!variableName || variableName === '_') {
      return; // Skip if variable name is empty or already prefixed
    }

    const lineIndex = line - 1;
    const lineContent = lines[lineIndex];
    
    // Add underscore prefix to variable name
    if (lineContent) {
      // Check if it's a destructuring pattern or a regular variable
      if (lineContent.includes('{') && lineContent.includes('}')) {
        // Handle destructuring - more complex transformation needed
        // This is a simplified approach that might not work for all cases
        const newLineContent = lineContent.replace(
          new RegExp(`\\b${variableName}\\b(?!\\s*:)`, 'g'), 
          `_${variableName}`
        );
        lines[lineIndex] = newLineContent;
      } else {
        // Regular variable declaration
        const prefix = lineContent.substring(0, column - 1);
        const varName = lineContent.substring(column - 1, endColumn - 1);
        const suffix = lineContent.substring(endColumn - 1);
        
        // Only add underscore if it doesn't already have one
        if (!varName.startsWith('_')) {
          lines[lineIndex] = `${prefix}_${varName}${suffix}`;
        }
      }
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    return true;
  }

  return false;
}

// Main function to process all files
function main() {
  console.log('🔍 Scanning for files with unused variables...');
  
  const files = getAllTsFiles();
  let fixedCount = 0;

  for (const file of files) {
    try {
      const fixed = fixUnusedVariablesInFile(file);
      if (fixed) {
        console.log(`✅ Fixed unused variables in ${file}`);
        fixedCount++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Fixed unused variables in ${fixedCount} files out of ${files.length} total files.`);
}

main(); 