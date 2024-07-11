import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Chip, Stack, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@mui/material';
import { useAppSelector } from 'app/store/hooks';
import { selectInternalOrder } from '../store/internalOrderSlice';
import { EInternalOrderStatus, EInternalOrderType } from '../formSchema';
import { formatterNumeral } from 'src/app/utils/formatterNumeral';

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
