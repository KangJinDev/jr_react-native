import React from 'react';
import PropTypes from 'prop-types';
import {List} from '@material-ui/core';

import CustomListItem from './ListItem';

import {useStyles} from './styles';

const CustomList = (props) => {
    const {items, itemHeight, onItemClick} = props;
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {items.map((item) => {
                return (
                    <CustomListItem key={item.value} item={item} onItemClick={onItemClick} itemHeight={itemHeight}/>
                );
            })}
        </List>
    );
};

CustomList.propTypes = {
    items: PropTypes.array.isRequired,
    itemHeight: PropTypes.number.isRequired,
    onItemClick: PropTypes.func,
};

CustomList.defaultProps = {
    itemHeight: 60,
    onItemClick: () => {}
};

export default CustomList;
