import React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
    type?: 'submit';
    className?: string;
    children?: (string | boolean | React.ReactElement)[] | string;
    disabled?: boolean;
    onClick?: () => void;
}

const CustomButton = (props: Props) => {
    return (
        <Button
            type={props.type}
            variant="contained"
            className={props.className}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    );
};

export default CustomButton;
