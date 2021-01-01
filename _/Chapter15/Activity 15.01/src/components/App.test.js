import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import App from './App';

configure({ adapter: new Adapter() });

describe('component rendering', () => {
  it('renders the App component', () => {
    const wrapper = mount(<App />);

    expect(wrapper.length).toEqual(1);
  });
});

const API_KEY = '12345';
const API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

const fetchData = async query => {
  const url = API;
  return await axios.get(url);
};

jest.mock('axios');

describe('fetch data', () => {
  it('fetches data successfully from the API', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ status: 200 }));

    await expect(fetchData()).resolves.toEqual({ status: 200 });
  });
});
