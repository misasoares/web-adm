import { UseFormRegister } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { TCreateOrderSchema } from '../formSchema';

interface PropsCostumerInfo {
	register: UseFormRegister<TCreateOrderSchema>;
}

export default function CostumerInfo({ register }: PropsCostumerInfo) {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-row items-center gap-10">
				<Typography>Cliente:</Typography>
				<TextField
					{...register('costumerName')}
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
			<div className="flex flex-row items-center gap-10">
				<Typography>Endereço:</Typography>
				<TextField
					{...register('address')}
					fullWidth
					variant="standard"
				/>
				<Typography>Telefone:</Typography>
				<TextField
					{...register('phone')}
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
			</div>
		</div>
	);
}
