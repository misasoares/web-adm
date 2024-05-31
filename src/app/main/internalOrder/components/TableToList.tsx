import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from 'app/store/hooks';
import { selectInternalOrder } from '../store/internalOrderSlice';

export default function TableToList() {
	const internalOrder = useAppSelector(selectInternalOrder);

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
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Valor total</TableCell>
						<TableCell align="right">Ações</TableCell>
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
								{row.costumer.name}
							</TableCell>
							<TableCell align="right">{row.type}</TableCell>
							<TableCell align="right">aqui vai o status</TableCell>
							<TableCell align="right">{row.totalValue}</TableCell>
							<TableCell className="flex justify-end">
								<FuseSvgIcon color="action">heroicons-outline:pencil</FuseSvgIcon>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
