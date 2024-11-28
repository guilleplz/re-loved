import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();
global.fetch = jest.fn();
