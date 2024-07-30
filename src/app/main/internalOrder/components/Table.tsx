import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useState } from 'react';
import {
	Button,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from '@mui/material';

import { Control, Controller, FieldArrayWithId, UseFieldArrayAppend, UseFormWatch } from 'react-hook-form';
import { TCreateOrderSchema } from '../formSchema';

interface PropsTable {
	control: Control<TCreateOrderSchema>;
	append: UseFieldArrayAppend<TCreateOrderSchema>;
	fields: FieldArrayWithId<TCreateOrderSchema, 'products', 'id'>[];
	handleRemoveProduct: (index: number) => void;
	editMode: boolean;
	watch: UseFormWatch<TCreateOrderSchema>;
}

export default function BasicTable({ control, append, fields, handleRemoveProduct, editMode, watch }: PropsTable) {
	const [discount, setDiscount] = useState(false);

	function handleDiscount() {
		setDiscount(!discount);
	}

	useEffect(() => {
		if (editMode) {
			const isThereDiscount = watch('products').some((product) => product.discount);

			if (isThereDiscount) setDiscount(true);
		}
	}, [editMode, watch('products')]);

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
						<TableCell>Valor Unit.</TableCell>
						{discount && <TableCell>Desconto</TableCell>}
						<TableCell align="right">Total</TableCell>
						<TableCell
							align="right"
							className="no-print"
						>
							<FuseSvgIcon
								className="cursor-pointer "
								color="action"
								onClick={() => handleDiscount()}
							>
								material-solid:money_off
							</FuseSvgIcon>
						</TableCell>
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
											className="w-96"
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

							{discount && (
								<TableCell align="right">
									<Controller
										name={`products.${index}.discount`}
										control={control}
										render={({ field }) => (
											<TextField
												className="w-96"
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
							)}

							<TableCell align="right">
								<Controller
									name={`products.${index}.total`}
									control={control}
									render={({ field }) => (
										<TextField
											className="w-96"
											variant="standard"
											type="number"
											disabled
											{...field}
											InputProps={{
												startAdornment: <InputAdornment position="start">R$</InputAdornment>
											}}
										/>
									)}
								/>
							</TableCell>

							<TableCell className="no-print flex">
								<FuseSvgIcon
									className="cursor-pointer "
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
			<div className="w-full flex justify-end mb-10 no-print">
				<Button onClick={() => append({ quantity: 1, description: '', unityValue: '', total: '' })}>
					<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
				</Button>
			</div>
		</TableContainer>
	);
}
