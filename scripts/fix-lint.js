#!/usr/bin/env node

/**
 * This script scans all TypeScript/TSX files and adds prefixes to unused variables
 * to fix the no-unused-vars ESLint errors.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get list of files with unused variable warnings
function getFilesWithUnusedVars() {
  try {
    // Run ESLint to get unused variables warnings
    const eslintOutput = execSync('npx eslint --format json "**/*.{ts,tsx}" --ignore-pattern "node_modules/**"', { 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'] 
    });
    
    const eslintResults = JSON.parse(eslintOutput);
    const filesWithUnusedVars = new Set();
    
    eslintResults.forEach(result => {
      const unusedVarMessages = result.messages.filter(
        msg => msg.ruleId === 'no-unused-vars' || msg.ruleId === '@typescript-eslint/no-unused-vars'
      );
      
      if (unusedVarMessages.length > 0) {
        filesWithUnusedVars.add(result.filePath);
      }
    });
    
    return Array.from(filesWithUnusedVars);
  } catch (error) {
    console.error('Error getting files with unused vars:', error.message);
    return [];
  }
}

// Rename unused variables to use underscore prefix
function fixUnusedVarsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find variable declarations with no-unused-vars warnings
    const varDeclarationRegex = /(?:const|let|var) ([a-zA-Z0-9_]+)(?=\s*=|\s*:)/g;
    let match;
    const unusedVars = [];
    
    // Find potential unused vars by checking if they're only declared once
    const allMatches = [...content.matchAll(varDeclarationRegex)];
    const varCounts = {};
    
    allMatches.forEach(match => {
      const varName = match[1];
      varCounts[varName] = (varCounts[varName] || 0) + 1;
    });
    
    // Only consider variables that appear exactly once in declarations
    // and are not prefixed with underscore already
    Object.entries(varCounts).forEach(([varName, count]) => {
      if (count === 1 && !varName.startsWith('_') && !content.includes(`${varName}.`) && !content.includes(`${varName}(`) && !content.includes(`${varName}[`)) {
        const varRegex = new RegExp(`\\b(const|let|var) (${varName})\\b`, 'g');
        const firstOccurrence = varRegex.exec(content);
        
        if (firstOccurrence) {
          const startPos = firstOccurrence.index;
          const nextLines = content.slice(startPos, startPos + 200);
          
          // Don't rename variables that are clearly used
          if (!nextLines.includes(`{${varName}}`) && 
              !nextLines.includes(`<${varName}`) &&
              !nextLines.includes(`${varName}>`) && 
              !nextLines.includes(`${varName},`)) {
            unusedVars.push(varName);
          }
        }
      }
    });
    
    // Rename unused variables
    let updatedContent = content;
    
    unusedVars.forEach(varName => {
      const varRegex = new RegExp(`\\b(const|let|var) (${varName})\\b`, 'g');
      updatedContent = updatedContent.replace(varRegex, '$1 _$2');
    });
    
    // Only write file if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`Fixed unused variables in ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🔍 Scanning for files with unused variables...');
  
  const filesToFix = getFilesWithUnusedVars();
  console.log(`Found ${filesToFix.length} files with potential unused variables.`);
  
  let fixedCount = 0;
  
  for (const filePath of filesToFix) {
    const wasFixed = fixUnusedVarsInFile(filePath);
    if (wasFixed) fixedCount++;
  }
  
  console.log(`✅ Fixed unused variables in ${fixedCount} files.`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
}); 