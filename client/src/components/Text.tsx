import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { WithStyles, createStyles } from '@material-ui/core';

const styles = () =>
    createStyles({
        root: {
            fontSize: '3rem',
        },
    });

interface Props extends WithStyles<typeof styles> {
    text: string;
    classes: any;
}

const Text = withStyles(styles)(({ text, classes }: Props) => (
    <Typography classes={classes}>{text}</Typography>
));

export default Text;
