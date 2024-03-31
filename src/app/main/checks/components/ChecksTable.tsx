import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppSelector } from 'app/store/hooks';

export default function ChecksTable() {
	const checks = useAppSelector((state) => state.checks);

	function formatDate(dateParam: Date) {
		const date = new Date(dateParam);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}

	return (
		<div className="p-32">
			<Paper
				elevation={4}
				className="p-32 mt-32"
			>
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						size="small"
						aria-label="a dense table"
					>
						<TableHead>
							<TableRow>
								<TableCell>Pagador</TableCell>
								<TableCell>Conta</TableCell>
								<TableCell>Valor</TableCell>
								<TableCell>Vencimento</TableCell>
								<TableCell>Ações</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{checks.checks.map((row) => (
								<TableRow
									key={row.uid}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell>{row.payerName}</TableCell>
									<TableCell
										component="th"
										scope="row"
									>
										{row.AccountBank.name}
									</TableCell>
									<TableCell>{row.value}</TableCell>
									<TableCell>{formatDate(row.dueDate)}</TableCell>
									<TableCell className="flex">
										<FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
										<FuseSvgIcon>heroicons-outline:eye</FuseSvgIcon>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
