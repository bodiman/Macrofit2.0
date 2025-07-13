#!/usr/bin/env ts-node

/**
 * Test Runner for Optimization Algorithm
 * 
 * This script runs comprehensive tests on the optimization algorithm
 * using real foods from the database.
 */

import { execSync } from 'child_process';
import path from 'path';

console.log('🚀 Starting Optimization Algorithm Tests...\n');

try {
  // Run the tests using Jest
  const testCommand = 'npx jest tests/optimization/optimization.test.ts --verbose --detectOpenHandles';
  
  console.log('Running tests with command:', testCommand);
  console.log('=' .repeat(60));
  
  execSync(testCommand, { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../..')
  });
  
  console.log('\n' + '=' .repeat(60));
  console.log('✅ All tests completed successfully!');
  
} catch (error) {
  console.error('\n❌ Tests failed:', error);
  process.exit(1);
} 