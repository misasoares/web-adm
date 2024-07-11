import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from 'app/store/hooks';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { ChecksType } from '../store/types/typesSlice';

interface ChecksTableProps {
	editMode: (arg: boolean) => void;
	rowToEdit: (row: ChecksType) => void;
}

export default function ChecksTable({ editMode, rowToEdit }: ChecksTableProps) {
	const checks = useAppSelector((state) => state.checks);
	const [filters, setFilters] = useState({
		accountBankName: '',
		dueDate: null,
		payerName: '',
		value: '',
		checkNumber: ''
	});

	function formatDate(dateParam) {
		const date = new Date(dateParam);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}

	function applyFilters(row) {
		return (
			row.AccountBank.name.toLowerCase().includes(filters.accountBankName.toLowerCase()) &&
			(filters.dueDate === null || new Date(row.dueDate).getTime() === filters.dueDate.getTime()) &&
			row.payerName.toLowerCase().includes(filters.payerName.toLowerCase()) &&
			String(row.value).toLowerCase().includes(filters.value.toLowerCase()) &&
			row.checkNumber.toLowerCase().includes(filters.checkNumber.toLowerCase())
		);
	}

	function handleValuesToEditCheck(row: ChecksType) {
		editMode(true);
		rowToEdit(row);
	}

	function clearFilters() {
		setFilters({
			accountBankName: '',
			dueDate: null,
			payerName: '',
			value: '',
			checkNumber: ''
		});
	}

	return (
		<div className="p-32">
			<Paper
				elevation={4}
				className="p-32 mt-32"
			>
				<div className="flex gap-2 justify-between flex-wrap items-center mb-16">
					<TextField
						label="Conta"
						value={filters.accountBankName}
						onChange={(e) => setFilters({ ...filters, accountBankName: e.target.value })}
					/>
					<TextField
						label="Pagador"
						value={filters.payerName}
						onChange={(e) => setFilters({ ...filters, payerName: e.target.value })}
					/>

					<TextField
						label="Número do cheque"
						value={filters.checkNumber}
						onChange={(e) => setFilters({ ...filters, checkNumber: e.target.value })}
					/>

					<TextField
						label="Valor"
						value={filters.value}
						onChange={(e) => setFilters({ ...filters, value: e.target.value })}
					/>

					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						adapterLocale={ptBR}
					>
						<DatePicker
							label="Data de vencimento"
							format="dd/MM/yyyy"
							value={filters.dueDate}
							onChange={(date) => setFilters({ ...filters, dueDate: date })}
							sx={{
								'& .MuiFormHelperText-root': {
									position: 'absolute',
									top: '55px'
								},
								width: 227
							}}
						/>
					</LocalizationProvider>
				</div>

				<div className="w-full flex justify-end">
					<Button
						onClick={clearFilters}
						variant="outlined"
					>
						Limpar filtros
					</Button>
				</div>

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
								<TableCell>Numero do cheque</TableCell>
								<TableCell>Valor</TableCell>
								<TableCell>Vencimento</TableCell>
								<TableCell>Ações</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Array.isArray(checks.checks) &&
								checks.checks.filter(applyFilters).map((row) => (
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
										<TableCell>{row.checkNumber}</TableCell>
										<TableCell>{row.value}</TableCell>
										<TableCell>{formatDate(row.dueDate)}</TableCell>
										<TableCell className="flex">
											<FuseSvgIcon
												className="cursor-pointer"
												color="primary"
												onClick={() => handleValuesToEditCheck(row)}
											>
												heroicons-outline:pencil
											</FuseSvgIcon>
											<FuseSvgIcon
												className="cursor-pointer"
												color="primary"
											>
												heroicons-outline:eye
											</FuseSvgIcon>
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
