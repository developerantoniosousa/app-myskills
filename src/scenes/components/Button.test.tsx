import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Button } from './Button';

describe('<Button />', () => {
  let buttonTitle;

  beforeAll(() => {
    buttonTitle = 'my button';
  });

  test("render button with 'my button' title", () => {
    const { getByText } = render(<Button title={buttonTitle} />);
    getByText(buttonTitle);
  });

  test('call buttonAction when pressing the button', () => {
    const buttonAction = jest.fn();
    const { container: button } = render(
      <Button title={buttonTitle} onPress={buttonAction} />,
    );
    fireEvent.press(button);
    expect(buttonAction).toHaveBeenCalledTimes(1);
  });
});
