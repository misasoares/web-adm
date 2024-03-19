import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function ChecksTable() {
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
							{/* {rows.map(row => (
								<TableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell
										component="th"
										scope="row"
									>
										{row.name}
									</TableCell>
									<TableCell align="right">{row.calories}</TableCell>
								</TableRow>
							))} */}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
