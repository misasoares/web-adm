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
	TextField,
	InputAdornment
} from '@mui/material';

import { Control, Controller, FieldArrayWithId, UseFieldArrayAppend } from 'react-hook-form';
import { TCreateOrderSchema } from '../formSchema';

interface PropsTable {
	control: Control<TCreateOrderSchema>;
	append: UseFieldArrayAppend<TCreateOrderSchema>;
	fields: FieldArrayWithId<TCreateOrderSchema, 'products', 'id'>[];
	handleRemoveProduct: (index: number) => void;
}

export default function BasicTable({ control, append, fields, handleRemoveProduct }: PropsTable) {
	return (
		<TableContainer
			component={Paper}
			elevation={4}
		>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Quant.</TableCell>
						<TableCell>Descrição</TableCell>
						<TableCell align="right">Valor Unit.</TableCell>
						<TableCell align="right">Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{fields.map((field, index) => (
						<TableRow
							key={field.id}
							className="h-10"
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell
								component="th"
								scope="row"
							>
								<Controller
									name={`products.${index}.quantity`}
									control={control}
									render={({ field }) => (
										<TextField
											className="w-36"
											type="number"
											variant="standard"
											{...field}
										/>
									)}
								/>
							</TableCell>

							<TableCell>
								<Controller
									name={`products.${index}.description`}
									control={control}
									render={({ field }) => (
										<TextField
											className="w-320"
											variant="standard"
											{...field}
										/>
									)}
								/>
							</TableCell>

							<TableCell align="right">
								<Controller
									name={`products.${index}.unityValue`}
									control={control}
									render={({ field }) => (
										<TextField
											className="w-84"
											variant="standard"
											type="number"
											{...field}
											InputProps={{
												startAdornment: <InputAdornment position="start">R$</InputAdornment>
											}}
										/>
									)}
								/>
							</TableCell>

							<TableCell align="right">
								<Controller
									name={`products.${index}.total`}
									control={control}
									render={({ field }) => (
										<TextField
											className="w-112"
											variant="standard"
											type="number"
											{...field}
											InputProps={{
												startAdornment: <InputAdornment position="start">R$</InputAdornment>
											}}
										/>
									)}
								/>
							</TableCell>
							<TableCell>
								<FuseSvgIcon
									className="cursor-pointer"
									color="action"
									onClick={() => handleRemoveProduct(index)}
								>
									heroicons-outline:trash
								</FuseSvgIcon>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="w-full flex justify-end mb-10">
				<Button onClick={() => append({ quantity: '', description: '', unityValue: '', total: '' })}>
					<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
				</Button>
			</div>
		</TableContainer>
	);
}
