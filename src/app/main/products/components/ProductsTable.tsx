import {
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import { formatterNumeral } from 'src/app/utils/formatterNumeral';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { IProduct } from '../store/types';

interface IProductTableProps {
	products: IProduct[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.focus
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0
	}
}));

export default function ProductsTable({ products }: IProductTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
			>
				<TableHead>
					<StyledTableRow>
						<StyledTableCell>Marca</StyledTableCell>
						<StyledTableCell align="right">Amperagem</StyledTableCell>
						<StyledTableCell align="right">CCA</StyledTableCell>
						<StyledTableCell align="right">Garantia</StyledTableCell>
						<StyledTableCell align="right">Valor</StyledTableCell>
						<StyledTableCell align="right">Quantidade</StyledTableCell>
						<StyledTableCell align="right">Ações</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{products.map((row) => (
						<StyledTableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<StyledTableCell
								component="th"
								scope="row"
							>
								{row.name}
							</StyledTableCell>
							<StyledTableCell align="right">{row.amper}</StyledTableCell>
							<StyledTableCell align="right">{row.cca}</StyledTableCell>
							<StyledTableCell align="right">{row.warranty} meses</StyledTableCell>
							<StyledTableCell align="right">{formatterNumeral(row.value)}</StyledTableCell>
							<StyledTableCell align="right">{row.quantity}</StyledTableCell>
							<StyledTableCell className="flex justify-end">
								<FuseSvgIcon className="cursor-pointer">heroicons-outline:pencil</FuseSvgIcon>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
