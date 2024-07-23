import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { formatterNumeral } from 'src/app/utils/formatterNumeral';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAppDispatch } from 'app/store/hooks';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import { ICustomers } from '../store/customersSlice';
import { getInternalOrder } from '../../internalOrder/store/internalOrderSlice';

interface RowProps {
	customer: ICustomers;
}

function Row({ customer }: RowProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	function handleNavigateToEdit(uid: string) {
		navigate(`/customers/${uid}`);
	}

	function handleNavigateToInternalOrder(internalOrderUid: string) {
		navigate(`/internal-order/${internalOrderUid}`);
	}

	useEffect(() => {
		dispatch(getInternalOrder());
	}, [dispatch]);

	return (
		<>
			<TableRow
				sx={{
					'& > *': { borderBottom: 'unset' },
					backgroundColor: open ? '#D0D0D0' : 'inherit'
				}}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell
					component="th"
					scope="row"
				>
					{customer.name}
				</TableCell>
				<TableCell align="right">{customer.phone}</TableCell>
				<TableCell className="flex justify-end">
					<FuseSvgIcon
						color="primary"
						className="cursor-pointer"
						onClick={() => handleNavigateToEdit(customer.uid)}
					>
						heroicons-outline:pencil
					</FuseSvgIcon>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
					sx={{ backgroundColor: '#E5E5E5', borderRadius: '0 0 5px 5px' }}
				>
					<Collapse
						in={open}
						timeout="auto"
						unmountOnExit
					>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								Histórico de pedidos de {customer.name}
							</Typography>
							<Typography>Total de pedidos: {customer.internalOrder.length}</Typography>
							<Table
								size="small"
								aria-label="purchases"
							>
								{customer.internalOrder.length > 0 && (
									<TableHead>
										<TableRow>
											<TableCell>Data</TableCell>
											<TableCell>Produtos</TableCell>
											<TableCell align="right">Valor total do pedido</TableCell>
										</TableRow>
									</TableHead>
								)}
								<TableBody>
									{customer.internalOrder.map((internalOrder) => (
										<TableRow
											key={internalOrder.uid}
											className="cursor-pointer"
											onClick={() => handleNavigateToInternalOrder(internalOrder.uid)}
										>
											<TableCell
												component="th"
												scope="row"
											>
												{format(new Date(customer.createdAt), 'dd/MM/yyyy')}
											</TableCell>
											<TableCell>
												{internalOrder.productsInternalOrder
													.map((product) => product.description)
													.join(', ')}
											</TableCell>

											<TableCell align="right">
												{formatterNumeral(Number(internalOrder.totalValue))}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

interface PropsTableCustomer {
	customer: ICustomers[];
}

export default function TableCustomer({ customer }: PropsTableCustomer) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredCustomers, setFilteredCustomers] = useState(customer);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		setFilteredCustomers(customer.filter((cust) => cust.name.toLowerCase().includes(searchTerm.toLowerCase())));
	}, [searchTerm, customer]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<TextField
				label="Pesquisar Cliente"
				variant="outlined"
				className="w-2/6"
				margin="normal"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<TableContainer
				component={Paper}
				elevation={5}
			>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Nome</TableCell>
							<TableCell align="right">Telefone</TableCell>
							<TableCell align="right">Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
							<Row
								key={row.uid}
								customer={row}
							/>
						))}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={filteredCustomers.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</>
	);
}
