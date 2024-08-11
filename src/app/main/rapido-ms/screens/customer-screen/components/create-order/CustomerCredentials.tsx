import { Button, TextField, Typography } from '@mui/material';
import { useAppDispatch } from 'app/store/hooks';
import { useState } from 'react';
import { httpClient } from 'src/app/shared/services/api';

interface CustomerCredentialsProps {
	credentials: (credentials: any) => void;
}

export default function CustomerCredentials({ credentials }: CustomerCredentialsProps) {
	const dispatch = useAppDispatch();

	const [form, setForm] = useState({ name: '', phone: '', address: '' });
	const [error, setError] = useState({ name: '', phone: '', address: '' });

	function verifyForm() {
		const { name, phone, address } = form;

		if (!name) {
			setError((prevState) => ({ ...prevState, name: 'É necessário digitar seu nome.' }));
			return;
		}

		setError((prevState) => ({ ...prevState, name: null }));

		if (!phone) {
			setError((prevState) => ({ ...prevState, phone: 'É necessário digitar seu telefone.' }));
			return;
		}

		setError((prevState) => ({ ...prevState, phone: null }));

		if (!address) {
			setError((prevState) => ({ ...prevState, address: 'É necessário digitar seu endereço.' }));
			return;
		}

		setError((prevState) => ({ ...prevState, address: null }));
	}

	async function submitCustomerCredentials() {
		verifyForm();

		const { name, phone, address } = form;

		const dataToCreateCustomer = { displayName: name, phone, address, role: 'customer' };
		const createCustomer = await httpClient.doPost('users', dataToCreateCustomer);

		if (createCustomer.success) {
			credentials(dataToCreateCustomer);
			//TO DO = deve logar automaticamente com essas credenciais.
		}

		//TO DO = logica para encontrar o cliente e logar ele.
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-col items-center justify-center mb-32">
				<Typography
					variant="h4"
					fontWeight={700}
				>
					Seja bem vindo!
				</Typography>
				<Typography fontWeight={500}>Antes de continuar, preencha com suas credenciais.</Typography>
			</div>
			<div className="flex flex-col gap-24">
				<div>
					<Typography>Nome e sobrenome:</Typography>
					<TextField
						onChange={(ev) => setForm((prevState) => ({ ...prevState, name: ev.target.value }))}
						error={!!error.name}
						helperText={error.name}
						fullWidth
						placeholder="Digite seu nome."
					/>
				</div>

				<div>
					<Typography>Telefone:</Typography>
					<TextField
						error={!!error.phone}
						helperText={error.phone}
						onChange={(ev) => setForm((prevState) => ({ ...prevState, phone: ev.target.value }))}
						fullWidth
						placeholder="Digite seu telefone"
					/>
				</div>

				<div>
					<Typography>Endereço:</Typography>
					<TextField
						error={!!error.address}
						helperText={error.address}
						onChange={(ev) => setForm((prevState) => ({ ...prevState, address: ev.target.value }))}
						fullWidth
						placeholder="Ex.: Rua, Nº, Bairro, Cidade"
					/>
				</div>

				<Button
					variant="contained"
					fullWidth
					color="primary"
					onClick={submitCustomerCredentials}
				>
					Continuar
				</Button>
			</div>
		</div>
	);
}
