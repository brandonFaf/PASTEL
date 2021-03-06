import React from 'react';
import styled from 'styled-components/macro';
import { highlight } from './Styled/colors';

const FloatingLabelInput = styled.article`
  width: 100%;
  margin-bottom: 15px;
`;

const FloatingLabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  height: 6vh;
  border-bottom: 2px solid ${highlight};
  font-size: inherit;
`;

const FloatingLabel = styled.label`
  padding: 0;
  margin: 0;
  border: 0;
  position: absolute;
  color: #fff;
  bottom: 0;
  transition: all 0.2s ease-in-out;
  transform-origin: left top;
  font-size: 18px;
  padding-bottom: 3px;
  cursor: text;
  pointer-events: none;
  width: 66.6%;
  transform: ${props =>
    props.active ? 'translate3d(0, -50%, 0) scale(0.70)' : 'none'};
`;

const FloatingInput = styled.input`
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 24px;
  color: ${highlight};
  background-color: transparent;
  &::placeholder {
    color: #fff;
    opacity: ${props => (props.active ? 1 : 0)};
    transition: opacity 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
`;

export default class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    if (!props.id && !props.name) {
      throw new Error('expected id but none present');
    }

    this.state = {
      active: props.value && props.value.length > 0
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus(event) {
    this.setState({ active: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  onBlur(event) {
    this.setState({ active: event.target.value.length !== 0 });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  render() {
    const {
      id,
      label,
      onBlur,
      onFocus,
      type,
      refs,
      ...otherProps
    } = this.props;
    const { active } = this.state;

    return (
      <FloatingLabelInput>
        <FloatingLabelInputContainer>
          <FloatingLabel htmlFor={id} active={active}>
            {label}
          </FloatingLabel>
          <FloatingInput
            active={active}
            id={id}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            ref={refs}
            type={type}
            {...otherProps}
          />
        </FloatingLabelInputContainer>
      </FloatingLabelInput>
    );
  }
}
