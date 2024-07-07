import React from 'react';

interface ErrorButtonState {
  error: boolean;
}

class ErrorButton extends React.Component<
  Record<string, never>,
  ErrorButtonState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { error: false };
  }

  handleErrorClick = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error('Error');
    }
    return (
      <div>
        <button onClick={this.handleErrorClick}>Throw Error</button>
      </div>
    );
  }
}

export default ErrorButton;
