import { Button, TextField, Typography } from '@mui/material';
import { useAppSelector } from 'app/store/hooks';
import { useState } from 'react';
import { selectUser } from 'src/app/auth/user/store/userSlice';

interface FindVehicleProps {
	sendVehicle: (sendVehivle: any) => void;
}

export default function FindVehicle({ sendVehicle }: FindVehicleProps) {
	const user = useAppSelector(selectUser);

	const [vehicle, setVehicle] = useState({ brand: '', model: '' });

	return (
		<>
			<div className="flex flex-col items-center justify-center mb-32">
				<Typography
					variant="h5"
					fontWeight={800}
				>
					Vamos encontrar a
				</Typography>
				<Typography
					variant="h5"
					fontWeight={800}
				>
					bateria ideal
				</Typography>
				<Typography
					variant="h5"
					fontWeight={800}
				>
					para o seu carro, {user.displayName}!
				</Typography>
			</div>

			<div className="flex flex-col w-full gap-24">
				<div>
					<Typography>Marca do seu carro:</Typography>
					<TextField
						onChange={(ev) => setVehicle((prevState) => ({ ...prevState, brand: ev.target.value }))}
						fullWidth
						placeholder="Digite o modelo do seu carro"
					/>
				</div>

				<div>
					<Typography>Modelo do seu carro:</Typography>
					<TextField
						onChange={(ev) => setVehicle((prevState) => ({ ...prevState, model: ev.target.value }))}
						fullWidth
						placeholder="Digite a marca do seu carro"
					/>
				</div>

				<Button
					variant="contained"
					fullWidth
					color="primary"
					onClick={() => sendVehicle(vehicle)}
				>
					Continuar
				</Button>
			</div>
		</>
	);
}
