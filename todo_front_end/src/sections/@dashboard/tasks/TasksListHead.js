// @mui
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'

export default function UserListHead({ headLabel }) {
    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        // sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
                        {headCell.label === 'Status' && (
                            <>
                                <br /> <Typography variant='caption'>{headCell.helpText}</Typography>{' '}
                            </>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
