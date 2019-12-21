import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lock from './Lock';

test('renders keys for each unique passcode character', () => {
  const passcode = 'ABCDD';

  //

  const { getAllByRole } = render(<Lock passcode={passcode} />);
  
  //
  
  const buttons = getAllByRole('button');
  
  expect(buttons.length).toBe(4);
  expect(buttons[0]).toHaveTextContent('A');
  expect(buttons[1]).toHaveTextContent('B');
  expect(buttons[2]).toHaveTextContent('C');
  expect(buttons[3]).toHaveTextContent('D');
});

test('entering correct passcode raises success event', () => {
  jest.useFakeTimers();
  const passcode = 'ABCDD';
  const mockOnSuccess = jest.fn(() => {});

  //

  const { getAllByRole } = render(<Lock passcode={passcode} onSuccess={mockOnSuccess} />);
  const buttons = getAllByRole('button');

  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[3]);
  fireEvent.click(buttons[3]);

  jest.advanceTimersByTime(1000);
  
  //
  
  expect(mockOnSuccess.mock.calls.length).toBe(1);
  expect(mockOnSuccess.mock.calls[0][0]).toBe('ABCDD');
});

test('entering incorrect passcode raises failure event', () => {
  jest.useFakeTimers();
  const passcode = 'ABCDD';
  const mockOnFailure = jest.fn(() => {});

  //

  const { getAllByRole } = render(<Lock passcode={passcode} onFailure={mockOnFailure} />);
  const buttons = getAllByRole('button');

  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[3]);

  jest.advanceTimersByTime(1000);
  
  //
  
  expect(mockOnFailure.mock.calls.length).toBe(1);
  expect(mockOnFailure.mock.calls[0][0]).toBe('ABCCD');
});

test('entering correct passcode sets success style', () => {
  jest.useFakeTimers();
  const passcode = 'ABCDD';

  //

  const { container, getAllByRole } = render(<Lock passcode={passcode} />);
  const buttons = getAllByRole('button');

  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[3]);
  fireEvent.click(buttons[3]);
  
  //
  
  expect(container.firstChild).toHaveClass('success');

  jest.advanceTimersByTime(1000);
});

test('entering incorrect passcode sets failure class', () => {
  jest.useFakeTimers();
  const passcode = 'ABCDD';

  //

  const { getAllByRole, container } = render(<Lock passcode={passcode} />);
  const buttons = getAllByRole('button');

  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[3]);
  
  //
  
  expect(container.firstChild).toHaveClass('failure');

  jest.advanceTimersByTime(1000);
});

test('incorrect passcode and failure class cleared after timeout', () => {
  jest.useFakeTimers();
  const passcode = 'ABCDD';
  const mockOnFailure = jest.fn(() => {});

  //

  const { getAllByRole, getByRole, container } = render(<Lock passcode={passcode} onFailure={mockOnFailure} />);
  const buttons = getAllByRole('button');

  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[2]);
  fireEvent.click(buttons[3]);

  
  //
  
  const input = getByRole('textbox');
  expect(input).toHaveAttribute('value', 'ABCCD');

  jest.advanceTimersByTime(1000);

  expect(input).toHaveAttribute('value', '');
  expect(container.firstChild).not.toHaveClass('failure');
});

test('renders an input with the characters entered so far', () => {
  const passcode = 'ABCDD';

  //

  const { getByRole, getAllByRole } = render(<Lock passcode={passcode} />);
  const buttons = getAllByRole('button');

  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  
  //
  
  expect(getByRole('textbox')).toHaveAttribute('value', 'AAB');
  expect(getByRole('textbox')).toHaveAttribute('readonly');
});
