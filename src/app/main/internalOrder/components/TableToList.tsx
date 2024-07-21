import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	Chip,
	Stack,
	TableRow,
	TableHead,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	Paper,
	TablePagination
} from '@mui/material';
import { useAppSelector } from 'app/store/hooks';
import { formatterNumeral } from 'src/app/utils/formatterNumeral';
import { selectInternalOrder } from '../store/internalOrderSlice';
import { EInternalOrderStatus, EInternalOrderType } from '../formSchema';

const typeColorMap: Record<
	EInternalOrderType,
	'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'
> = {
	[EInternalOrderType.BUDGET]: 'info',
	[EInternalOrderType.ORDER]: 'primary',
	[EInternalOrderType.RECEIPT]: 'success'
};
const statusColorMap: Record<
	EInternalOrderStatus,
	'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'
> = {
	[EInternalOrderStatus.CONCLUDED]: 'success',
	[EInternalOrderStatus.IN_PROGRESS]: 'warning'
};

const typeLabel = {
	[EInternalOrderType.BUDGET]: 'Orçamento',
	[EInternalOrderType.ORDER]: 'Pedido',
	[EInternalOrderType.RECEIPT]: 'Recibo'
};

const statusLabel = {
	[EInternalOrderStatus.CONCLUDED]: 'Concluído',
	[EInternalOrderStatus.IN_PROGRESS]: 'Em andamento'
};

export default function TableToList() {
	const internalOrder = useAppSelector(selectInternalOrder);
	const navigate = useNavigate();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const paginatedData = internalOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer
			component={Paper}
			elevation={6}
		>
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
					{Array.isArray(paginatedData) &&
						paginatedData.map((row) => (
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
								<TableCell>
									<Stack
										className="flex justify-end"
										direction="row"
										spacing={1}
									>
										<Chip
											label={typeLabel[row.type]}
											color={typeColorMap[row.type]}
										/>
									</Stack>
								</TableCell>
								<TableCell>
									<Stack
										direction="row"
										spacing={1}
										className="flex justify-end"
									>
										<Chip
											label={statusLabel[row.status]}
											color={statusColorMap[row.status]}
										/>
									</Stack>
								</TableCell>
								<TableCell align="right">{formatterNumeral(row.totalValue)}</TableCell>
								<TableCell className="flex justify-end ">
									<FuseSvgIcon
										className="cursor-pointer"
										color="action"
										onClick={() => navigate(row.uid)}
									>
										heroicons-outline:pencil
									</FuseSvgIcon>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={internalOrder.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage="Linhas por página"
			/>
		</TableContainer>
	);
}
