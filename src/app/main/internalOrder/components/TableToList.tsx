import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector } from 'app/store/hooks';
import { selectInternalOrder } from '../store/internalOrderSlice';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
	return { name, calories, fat, carbs, protein };
}

export default function TableToList() {
	const internalOrder = useAppSelector(selectInternalOrder);
	console.log(internalOrder);
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Cliente</TableCell>
						<TableCell align="right">Tipo</TableCell>
						<TableCell align="right">Valor total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{internalOrder.payload.map((row) => (
						<TableRow
							key={row.uid}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell
								component="th"
								scope="row"
							>
								{row.costumer}
							</TableCell>
							<TableCell align="right">{row.type}</TableCell>
							<TableCell align="right">{row.totalValue}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
