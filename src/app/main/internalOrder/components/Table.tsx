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
import { Control, Controller, FieldArrayWithId, UseFieldArrayAppend } from 'react-hook-form';
import { TCreateOrderSchema } from '../formSchema';

interface PropsTable {
	control: Control<TCreateOrderSchema>;
	append: UseFieldArrayAppend<TCreateOrderSchema>;
	fields: FieldArrayWithId<TCreateOrderSchema, 'products', 'id'>[];
}

export default function BasicTable({ control, append, fields }: PropsTable) {
	return (
		<TableContainer
			component={Paper}
			elevation={4}
		>
			<Table
				sx={{ minWidth: 650, minHeight: 250 }}
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
									name={`products.${index}.unitValue`}
									control={control}
									render={({ field }) => (
										<TextField
											className="w-68"
											variant="standard"
											type="number"
											{...field}
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
											className="w-68"
											variant="standard"
											type="number"
											{...field}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="w-full flex justify-end mb-10">
				<Button onClick={() => append({ quantity: '', description: '', unitValue: '', total: '' })}>
					<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
				</Button>
			</div>
		</TableContainer>
	);
}
