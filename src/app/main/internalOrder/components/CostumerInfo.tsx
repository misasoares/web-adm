import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { TCreateOrderSchema } from '../formSchema';

interface PropsCostumerInfo {
	register: UseFormRegister<TCreateOrderSchema>;
	errors: FieldErrors<TCreateOrderSchema>;
}

export default function CostumerInfo({ register, errors }: PropsCostumerInfo) {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-row items-center gap-10">
				<Typography>Cliente:</Typography>
				<TextField
					{...register('costumerName')}
					fullWidth
					error={!!errors?.costumerName?.message}
					helperText={errors?.costumerName?.message}
					variant="standard"
				/>
				<Typography>Telefone:</Typography>
				<TextField
					{...register('phone')}
					className="w-2/4"
					variant="standard"
					error={!!errors?.phone?.message}
					helperText={errors?.phone?.message}
				/>
			</div>
			<div className="flex flex-row items-center gap-10">
				<Typography>Endereço:</Typography>
				<TextField
					{...register('address')}
					fullWidth
					variant="standard"
				/>
			</div>
			<div className="flex flex-row items-center gap-10">
				<Typography>Veículo:</Typography>
				<TextField
					{...register('vehicles')}
					fullWidth
					variant="standard"
				/>
				<Typography>CPF:</Typography>
				<TextField
					{...register('cpfOrCnpj')}
					fullWidth
					variant="standard"
				/>
			</div>
		</div>
	);
}
