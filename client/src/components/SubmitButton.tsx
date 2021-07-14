import { makeStyles } from '@material-ui/core';
import CustomButton from './CustomButton';
import ButtonSpinner from './ButtonSpinner';

const useStyles = makeStyles((theme) => ({
    linkContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    linkContainer2: {
        marginTop: '2.5em',
        marginBottom: '1.5em',
    },
    button: {
        display: 'block',
        position: 'relative',
        margin: '0 auto',
        paddingLeft: '12px',
        paddingRight: '12px',
        backgroundColor: theme.palette.common.yellow1,
        '&:hover': {
            backgroundColor: theme.palette.common.yellow2,
        },
    },
}));

interface Props {
    onClick: () => void;
    loading: boolean;
    text: string;
}

const SubmitButton = (props: Props) => {
    const classes = useStyles();
    return (
        <div className={(classes.linkContainer, classes.linkContainer2)}>
            <CustomButton className={classes.button} onClick={props.onClick}>
                {props.text}
                {props.loading && <ButtonSpinner />}
            </CustomButton>
        </div>
    );
};

export default SubmitButton;
