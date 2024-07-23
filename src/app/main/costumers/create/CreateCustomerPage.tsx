import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import DefaultPage from '../../components/DefaultPage';
import { createCustomer, selectCustomers } from '../store/customersSlice';

const defaultValues = {
	name: '',
	phone: '',
	cpfOrCnpj: '',
	address: ''
};

export default function CreateCustomerPage() {
	const dispatch = useAppDispatch();
	const customers = useAppSelector(selectCustomers);
	const navigate = useNavigate();
	const { customerUid } = useParams();

	const [editMode, setEditMode] = useState(false);

	const { handleSubmit, register, reset, control, watch } = useForm({
		defaultValues
	});

	function submitForm(data) {
		dispatch(createCustomer(data));
		dispatch(showMessage({ message: 'Cliente cadastrado com sucesso.', variant: 'success' }));
		setTimeout(() => {
			navigate(-1);
		}, 500);
	}

	useEffect(() => {
		if (customerUid === 'new') {
			setEditMode(false);
			return;
		}

		const findCustomer = customers.find((customer) => customer.uid === customerUid);

		if (findCustomer) {
			reset(findCustomer);
			setEditMode(true);
			return;
		}

		setEditMode(false);
	}, [customerUid]);

	return (
		<DefaultPage
			isCreatePage
			title={!editMode ? 'Cadastrar novo cliente' : `Editar ${watch('name')}`}
		>
			<form
				onSubmit={handleSubmit(submitForm)}
				className="flex flex-col items-center"
			>
				<Grid
					container
					spacing={2}
					alignItems="center"
				>
					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							fullWidth
							required
							label="Nome"
							{...register('name')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
					>
						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									required
									label="Telefone"
								/>
							)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							fullWidth
							label="CPF/CNPJ"
							{...register('cpfOrCnpj')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							fullWidth
							label="Endereço"
							{...register('address')}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					justifyContent="flex-end"
					mt={2}
				>
					<Grid item>
						<Button
							variant="outlined"
							onClick={() => reset()}
						>
							Cancelar
						</Button>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Salvar
						</Button>
					</Grid>
				</Grid>
			</form>
		</DefaultPage>
	);
}
