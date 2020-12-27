import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
});

class SnackBar extends Component {
    state = {
        open: true
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false
        })
    };

    render() {
        const { messageType, message, classes } = this.props;
        let snackbar;
        if (messageType === 'error') {
            snackbar = (<Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>);
        }
        else {
            snackbar = (<Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>)
        }
        return (
            <div className={classes.root}>
                {snackbar}

            </div>
        )
    }
}

export default withStyles(useStyles)(SnackBar)