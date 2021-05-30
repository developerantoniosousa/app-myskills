import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Home, GREETING } from './Home';

enum DAY_PERIODS {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  NIGHT = 'night',
}

function setDayPeriod(period: DAY_PERIODS): void {
  if (period === DAY_PERIODS.MORNING) {
    global.Date.prototype.getHours = function () {
      return 8;
    };
  }

  if (period === DAY_PERIODS.AFTERNOON) {
    global.Date.prototype.getHours = function () {
      return 14;
    };
  }

  if (period === DAY_PERIODS.NIGHT) {
    global.Date.prototype.getHours = function () {
      return 21;
    };
  }
}

describe('<Home />', () => {
  const skillText = 'Javascript';

  test('render default <Home /> without performing any action', () => {
    setDayPeriod(DAY_PERIODS.NIGHT);
    const { toJSON } = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('render <Home /> at morning', () => {
    setDayPeriod(DAY_PERIODS.MORNING);
    const { getByText } = render(<Home />);
    getByText(GREETING.GOOD_MORNING);
  });

  test('render <Home /> at afternoon', () => {
    setDayPeriod(DAY_PERIODS.AFTERNOON);
    const { getByText } = render(<Home />);
    getByText(GREETING.GOOD_AFTERNOON);
  });

  test('render <Home /> at night', () => {
    setDayPeriod(DAY_PERIODS.NIGHT);
    const { getByText } = render(<Home />);
    getByText(GREETING.GOOD_NIGHT);
  });

  test('add a new skill on the skills list', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);

    const inputElement = getByPlaceholderText('New skill');
    const buttonElement = getByText('Add');

    fireEvent.changeText(inputElement, skillText);
    fireEvent.press(buttonElement);

    getByText(skillText);
  });

  test("don't put skill on the list if user does not type anything", async () => {
    const { getByText, queryByText } = render(<Home />);

    const buttonElement = getByText('Add');
    fireEvent.press(buttonElement);

    expect(await queryByText('')).toBeNull();
  });

  test('remove skill from list', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<Home />);

    const inputElement = getByPlaceholderText('New skill');
    const buttonElement = getByText('Add');

    fireEvent.changeText(inputElement, skillText);
    fireEvent.press(buttonElement);

    const addedSkillElement = getByText(skillText);
    expect(addedSkillElement).toBeDefined();

    fireEvent(addedSkillElement, 'onLongPress');
    expect(await queryByText(skillText)).toBeNull();
  });
});
