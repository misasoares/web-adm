import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import DefaultPageRapidoMsCustomer from './components/DefaultPage';

export default function RapidoMsOrder() {
	const navigate = useNavigate();

	function handleCreateOrder() {
		navigate('pedir-bateria');
	}

	return (
		<DefaultPageRapidoMsCustomer>
			<Typography
				variant="h3"
				fontWeight={700}
			>
				Sua bateria
			</Typography>
			<Typography
				variant="h3"
				fontWeight={700}
			>
				em até
			</Typography>
			<Typography
				variant="h3"
				fontWeight={700}
			>
				50 minutos!
			</Typography>

			<div className="flex w-full justify-center mt-20 gap-10">
				<Button
					variant="outlined"
					color="primary"
					fullWidth
				>
					Ver produtos
				</Button>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={() => handleCreateOrder()}
				>
					Pedir bateria
				</Button>
			</div>
		</DefaultPageRapidoMsCustomer>
	);
}
