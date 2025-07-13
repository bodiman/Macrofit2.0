# Optimization Algorithm Tests

This directory contains comprehensive tests for the meal optimization algorithm used in MacroFit3.

## Overview

The tests verify that the optimization algorithm:
- Correctly optimizes food quantities to meet macro targets
- Handles negative targets (when logged foods exceed targets)
- Works with real foods from the database
- Performs efficiently with large numbers of foods
- Handles edge cases gracefully

## Test Structure

### Main Test File: `optimization.test.ts`

Contains the following test categories:

1. **Basic Optimization Tests**
   - Basic protein optimization
   - Multiple foods optimization
   - Tight constraint handling

2. **Negative Target Tests**
   - Handling when logged foods exceed targets
   - Minimization behavior for exceeded macros

3. **Edge Cases**
   - Empty food lists
   - All locked foods
   - Extreme macro values

4. **Performance Tests**
   - Large number of foods
   - Execution time validation

### Test Runner: `run-tests.ts`

A standalone script to run the optimization tests with proper setup.

## Running the Tests

### Prerequisites

1. Ensure the database is running and accessible
2. Install dependencies: `npm install`
3. Make sure Jest is configured properly

### Running Tests

```bash
# Run all optimization tests
npm test tests/optimization/optimization.test.ts

# Run with verbose output
npm test tests/optimization/optimization.test.ts -- --verbose

# Run the test runner script
npx ts-node tests/optimization/run-tests.ts
```

### Test Database Setup

The tests automatically:
1. Connect to the database using the Prisma client
2. Fetch real foods for testing
3. Run optimization scenarios
4. Clean up connections after completion

## Test Data

The tests use real foods from your database, specifically:
- Fetches up to 10 foods with different macro profiles
- Uses actual macro values, serving units, and nutritional data
- Tests with realistic macro targets and constraints

## Expected Behavior

### Successful Optimization
- Error should decrease from initial to optimized state
- Quantities should be within specified bounds
- Macro targets should be met as closely as possible

### Negative Target Handling
- When targets are negative (exceeded by logged foods)
- Algorithm should minimize additional consumption
- Error should reflect the penalty for over-consumption

### Edge Cases
- Empty food lists should not crash
- All locked foods should return original quantities
- Extreme values should be handled gracefully

## Debugging

The tests include extensive logging to help debug issues:
- Initial state (quantities, macros, error)
- Test scenarios and their results
- Best quantities found and error improvements
- Performance metrics

## Adding New Tests

To add new test cases:

1. Add a new test case to the `testCases` array in `optimization.test.ts`
2. Define the expected behavior (`should_optimize`, `should_minimize`, or `should_fail`)
3. Provide realistic macro targets and constraints
4. Add appropriate assertions

Example:
```typescript
{
  name: 'New Test Case',
  foods: [],
  preferences: createTestPreferences([20, 30], [10, 20], [5, 15]),
  macroNames: ['protein', 'carbs', 'fat', 'fiber', 'sugar', 'calories'],
  dailyMaxValues: [200, 300, 100, 25, 50, 2000],
  expectedBehavior: 'should_optimize',
  description: 'Description of what this test validates'
}
```

## Performance Benchmarks

The performance test ensures that:
- Optimization completes within 5 seconds for 50 foods
- Memory usage remains reasonable
- No memory leaks occur during testing

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check that the database is running
   - Verify Prisma configuration
   - Ensure database credentials are correct

2. **No Foods Available**
   - Check that the database has food data
   - Verify the Prisma query in the test

3. **Tests Time Out**
   - Increase timeout in `jest.config.js`
   - Check for slow database queries
   - Verify optimization algorithm performance

### Debug Mode

Run tests with additional debugging:
```bash
DEBUG=* npm test tests/optimization/optimization.test.ts
```

This will show detailed logs from the optimization algorithm and database queries. 