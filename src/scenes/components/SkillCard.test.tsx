import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { SkillCard } from './SkillCard';

describe('<SkillCard />', () => {
  const skillText = 'Javascript';

  test(`render SkillCard with ${skillText} text`, () => {
    const { getByText } = render(<SkillCard skill={skillText} />);
    getByText(skillText);
  });

  test('call skillAction when long press itself', () => {
    const skillAction = jest.fn();
    const { getByText } = render(
      <SkillCard skill={skillText} onLongPress={skillAction} />,
    );
    fireEvent(getByText(skillText), 'onLongPress');
    expect(skillAction).toHaveBeenCalledTimes(1);
  });
});
