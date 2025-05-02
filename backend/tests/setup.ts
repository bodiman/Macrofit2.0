import { PrismaClient } from '@prisma/client';

// Create a mock Prisma client
const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
//   nutritionalMetric: {
//     findMany: jest.fn(),
//   },
//   userPreference: {
//     create: jest.fn(),
//   },
};

// Mock the Prisma client
jest.mock('../prisma_client', () => ({
  __esModule: true,
  default: mockPrisma,
}));

// Export the mock for use in tests
export { mockPrisma }; 