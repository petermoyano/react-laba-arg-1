import React from 'react';
import './Button.css';
import Button from '@material-ui/core/Button';

export default function GreyButton(props) {
  return (
    <Button
      className="btn"
      variant="contained"
      disableElevation
      style={{
        backgroundColor: '#363746',
      }}
    >
      {props.children}
    </Button>
  );
}
