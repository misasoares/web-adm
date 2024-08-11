import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/store/hooks';
import { Controller, useForm } from 'react-hook-form';
import DefaultPage from '../components/DefaultPage';
import { createProduct } from './store/productsSlice';
import { defaultValues, schema, SchemaProductsType } from './validation/zod';

export default function CreateProducts() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { reset, handleSubmit, control } = useForm<SchemaProductsType>({
		defaultValues,
		resolver: zodResolver(schema)
	});

	function handleCancel() {
		reset();
		navigate(-1);
	}

	async function handleSubmitForm(data: SchemaProductsType) {
		const create = await dispatch(createProduct(data));

		if (isRejectedWithValue(create)) {
			dispatch(showMessage({ message: 'Não foi possível criar o produto, tente novamente.', variant: 'error' }));
			return;
		}
		dispatch(showMessage({ message: 'Produto criado com sucesso.', variant: 'success' }));
	}

	return (
		<DefaultPage
			title="Criar novo produto"
			isCreatePage
		>
			<form
				onSubmit={handleSubmit(handleSubmitForm)}
				className="flex flex-col justify-center gap-10 md:gap-36"
			>
				<div className="flex gap-10 md:gap-36 flex-col md:flex-row">
					<Controller
						control={control}
						name="name"
						render={({ field, fieldState }) => (
							<TextField
								fullWidth
								label="Marca"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="amper"
						render={({ field, fieldState }) => (
							<TextField
								fullWidth
								label="Amperes"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</div>

				<div className="flex gap-10 md:gap-36 flex-col md:flex-row">
					<Controller
						control={control}
						name="cca"
						render={({ field, fieldState }) => (
							<TextField
								fullWidth
								label="CCA"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="warranty"
						render={({ field, fieldState }) => (
							<TextField
								fullWidth
								label="Garantia (Em meses)"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</div>

				<div className="flex gap-10 md:gap-36 flex-col md:flex-row">
					<Controller
						control={control}
						name="value"
						render={({ field, fieldState }) => (
							<TextField
								fullWidth
								label="Valor"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="quantity"
						render={({ field, fieldState }) => (
							<TextField
								fullWidth
								label="Quantidade"
								{...field}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</div>

				<div className="flex gap-10 md:gap-36 flex-col md:flex-row">
					<Button
						fullWidth
						variant="outlined"
						color="error"
						onClick={handleCancel}
					>
						Cancelar
					</Button>
					<Button
						fullWidth
						variant="outlined"
						onClick={() => reset()}
					>
						Limpar
					</Button>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						type="submit"
					>
						Criar
					</Button>
				</div>
			</form>
		</DefaultPage>
	);
}
