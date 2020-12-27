import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import { List } from 'antd';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,

    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[700],
        color: "white",
    },

}));



const ParticipantsModal = ({ users }) => {
    const classes = useStyles();
    const usersArray = Array.from(users);
    return (
        <List
            itemLayout="horizontal"
            dataSource={usersArray}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar className={classes.green}>{item.name[0].toUpperCase()}</Avatar>}
                        title={<h3 style={{ marginTop: 5 }}>{item.name}</h3>}
                    />
                </List.Item>
            )}
        />
    );

}

export default ParticipantsModal

