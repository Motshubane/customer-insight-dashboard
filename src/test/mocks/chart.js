// Mock Chart.js to avoid canvas issues in tests
const Chart = jest.fn().mockImplementation(() => ({
  destroy: jest.fn(),
  update: jest.fn(),
}));

module.exports = Chart;