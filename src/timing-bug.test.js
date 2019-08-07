import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';

import TimingBug, { TEST_QUERY } from './timing-bug';

const nextTick = (timeout = 0) => new Promise(resolve => setTimeout(resolve, timeout));

describe('Apollo error prop disappears on rerender', () => {
  let wrapper;
  const errorMock = [
    {
      request: {
        query: TEST_QUERY,
        variables: { userId: '10' },
      },
      result: {
        errors: [{ message: 'test error' }],
      },
    },
  ];

  it('this will always fail due to the long pause', async () => {
    wrapper = mount(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <TimingBug userId="10" />
      </MockedProvider>
    );
    await act(async () => {
      await nextTick(50);
    });
    

    wrapper.update();
    console.log(wrapper.debug());

    expect(wrapper.find('#loading')).toHaveLength(0);
    expect(wrapper.find('#error')).toHaveLength(1);
  });

  it('this will intermittently switch between pass and fail, due to the short pause', async () => {
    wrapper = mount(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <TimingBug userId="10" />
      </MockedProvider>
    );
    await act(async () => {
      await nextTick(50);
    });

    wrapper.update();
    console.log(wrapper.debug());

    expect(wrapper.find('#loading')).toHaveLength(0);
    expect(wrapper.find('#error')).toHaveLength(1);
  });
});
