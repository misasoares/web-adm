import * as React from 'react';
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
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ICustomers } from '../store/customersSlice';

interface RowProps {
	customer: ICustomers;
}

function Row({ customer }: RowProps) {
	const [open, setOpen] = React.useState(false);

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
								Histórico de {customer.name}
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
										<TableRow key={internalOrder.uid}>
											<TableCell
												component="th"
												scope="row"
											>
												{format(new Date(customer.createdAt), 'dd-MM-yyy')}
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
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Nome</TableCell>
						<TableCell align="right">Telefone</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{customer.map((row) => (
						<Row
							key={row.name}
							customer={row}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
