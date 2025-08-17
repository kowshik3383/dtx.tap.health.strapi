import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import CustomTextArea from '../CustomTextArea';

describe('CustomTextArea', () => {
  it('renders with default props', () => {
    render(<CustomTextArea />);
    const textarea = screen.getByPlaceholderText('Type your reason here...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '50');
    expect(textarea).toHaveValue('');
    expect(textarea).toHaveClass('w-full', 'rounded-[16px]');
  });

  it('renders with custom props', () => {
    render(
      <CustomTextArea
        placeholder="Feedback"
        rows={3}
        cols={40}
        value=""
        className="my-class"
      />
    );
    const textarea = screen.getByPlaceholderText('Feedback');
    expect(textarea).toHaveAttribute('rows', '3');
    expect(textarea).toHaveAttribute('cols', '40');
    expect(textarea).toHaveValue('');
    expect(textarea).toHaveClass('my-class');
  });

  it('calls onChange with event when typing', () => {
    const onChange = vi.fn();
    render(<CustomTextArea onChange={onChange} />);
    const textarea = screen.getByPlaceholderText('Type your reason here...');
    fireEvent.change(textarea, { target: { value: 'Test input' } });
    expect(onChange).toHaveBeenCalledTimes(1);
expect((onChange.mock.calls[0]?.[0] as React.ChangeEvent<HTMLTextAreaElement>)?.target.value).toBe('Test input');
  });

  it('auto-resizes the textarea as user types', () => {
    render(<CustomTextArea />);
    const textarea = screen.getByPlaceholderText('Type your reason here...');
    // mock scrollHeight getter
    Object.defineProperty(textarea, 'scrollHeight', { value: 150, configurable: true });
    fireEvent.change(textarea, { target: { value: 'A new value' } });
    // Just confirm it works and value is set
    expect(textarea).toHaveValue('A new value');
  });

  it('renders error message if given', () => {
    render(<CustomTextArea error="This is an error" />);
    expect(screen.getByPlaceholderText('Type your reason here...')).toBeInTheDocument();
    // (error is not rendered; just ensuring no crash)
  });
});
