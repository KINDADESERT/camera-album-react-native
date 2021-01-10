import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, Input } from './styles';

function FormInput({ style, ...rest }, ref) {
  return (
    <Container style={style}>
      <Input {...rest} ref={ref} />
    </Container>
  );
}

FormInput.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormInput.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(FormInput);