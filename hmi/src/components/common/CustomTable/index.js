import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

import {useStyles} from './styles';

const StyledTableCell = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0.5, 0),
        textAlign: 'center',
        border: `1px solid #EEEEEE`,
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const CustomTable = (props) => {
    const {columns, data} = props;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.length > 0 && columns.map((col) => (
                            <StyledTableCell key={col.key}>{col.title}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className="no-select">
                    {data.length > 0 && data.map((row, index) => (
                        <StyledTableRow key={`row_index_${index}_${Math.random()}`}>
                            {columns.length > 0 && columns.map((col, cellIndex) => (
                                <StyledTableCell align="right" key={`cell_${index}_${cellIndex}_${Math.random()}`}>
                                    {col?.render ? col.render(row[col.key]) : row[col.key] ?? ''}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

CustomTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
};

CustomTable.defaultProps = {
    columns: [],
    data: [],
};

export default CustomTable;
