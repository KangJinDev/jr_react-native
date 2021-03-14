import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography} from '@material-ui/core';

import {useStyles} from './styles';

const CustomListItem = (props) => {
    const {item, itemHeight, onItemClick} = props;
    const classes = useStyles({minHeight: itemHeight});

    return (
        <ListItem
            className={classes.listItem}
            key={item.value}
            role={undefined}
            dense
            button
            divider
            onClick={(e) => onItemClick(item.value, e)}
        >
            {
                item.icon && (
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                )
            }
            {
                item.label && (
                    <ListItemText
                        id={`label-${item.value}`}
                        primary={<Typography>{item.label}</Typography>}
                    />
                )
            }
            {
                item.action && (
                    <ListItemSecondaryAction>
                        {item.action}
                    </ListItemSecondaryAction>
                )
            }
        </ListItem>
    );
};

CustomListItem.propTypes = {
    item: PropTypes.object.isRequired,
    itemHeight: PropTypes.number,
    onItemClick: PropTypes.func,
};

CustomListItem.defaultProps = {
    itemHeight: 60,
    onItemClick: () => {}
};

export default CustomListItem;
