import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Button, Paper, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAppDispatch } from 'app/store/hooks';
import axios from 'axios';
import { ptBR } from 'date-fns/locale';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { addChecks } from '../store/checksSlice';

import { IAccountBank, SchemaCheckType, schemaZod } from '../types/ChecksFormTypes';

const defaultValues = {
	accName: '',
	bank: '',
	accNumber: '',
	agencyNumber: '',
	payerName: '',
	checkNumber: '',
	payerPhone: '',
	sendTo: '',
	value: ''
};

export default function CheckCreateComponent() {
	const dispatch = useAppDispatch();
	const [accNameValue, setAccNameValue] = useState('');
	const [accOptions, setAccOptions] = useState<IAccountBank[]>([]);
	const [optionsBank, setOptionsBank] = useState<string[]>([]);

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
		watch
	} = useForm<SchemaCheckType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schemaZod)
	});

	async function findAcc(params: string) {
		const isThereAcc = await axios.get<IAccountBank[]>(`http://localhost:8080/api/checks/${params}`);
		const { data } = isThereAcc;

		if (accNameValue) {
			return data;
		}

		return [];
	}

	useEffect(() => {
		const fetchData = async () => {
			const accounts = await findAcc(accNameValue);

			setAccOptions(accounts);

			if (accNameValue) {
				const accSelected = accounts.find((item) => item.name === accNameValue);

				if (accSelected) {
					const optionsToBank = accSelected.Banks.map((item) => item.name);
					setOptionsBank(optionsToBank);

					if (watch('bank')) {
						const findBank = accSelected.Banks.find((item) => item.name === watch('bank'));

						if (findBank) {
							setValue('accNumber', findBank.accNumber);
							setValue('agencyNumber', findBank.agencyNumber);
						}
					}
				}
			}
		};

		fetchData();
	}, [accNameValue, watch('bank')]);

	function handleFindAccName(ev: ChangeEvent<HTMLInputElement>) {
		const { value } = ev.target;
		setAccNameValue(value);
		setValue('accName', value);
	}

	function handleSelectAccount(ev: ChangeEvent<HTMLInputElement>) {
		const { outerText } = ev.target;
		setAccNameValue(outerText);
		setValue('accName', outerText);
	}

	function handleInputBank(ev: ChangeEvent<HTMLInputElement>) {
		const { value } = ev.target;
		setValue('bank', value);
	}

	function handleChangeBank(ev: ChangeEvent<HTMLInputElement>) {
		const { outerText } = ev.target;
		setValue('bank', outerText);
	}

	function onSubmit(data: SchemaCheckType) {
		dispatch(addChecks(data));
	}

	function handleCancelSubmit() {
		reset();
	}

	return (
		<div className="p-32">
			<Paper
				elevation={4}
				className="p-32 mb-32"
			>
				<Typography variant="h4">Cadastrar um cheque</Typography>
			</Paper>

			<Paper
				elevation={4}
				className="p-32"
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex justify-center items-center sm:justify-start gap-24 flex-wrap"
				>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						noOptionsText="Adicione uma nova conta"
						options={accOptions}
						sx={{ width: 250 }}
						getOptionLabel={(option) => option.name}
						// value={accNameValue}
						onChange={handleSelectAccount}
						renderInput={(params) => (
							<TextField
								{...params}
								onChange={handleFindAccName}
								error={!!errors.accName?.message}
								helperText={errors.accName?.message}
								label="Nome da conta"
							/>
						)}
					/>

					<Autocomplete
						disablePortal
						id="combo-box-demo"
						noOptionsText="Adicione um novo banco"
						value={watch('bank')}
						onChange={handleChangeBank}
						options={optionsBank}
						sx={{ width: 250 }}
						renderInput={(params) => (
							<TextField
								error={!!errors.bank?.message}
								helperText={errors.bank?.message}
								onChange={handleInputBank}
								{...params}
								label="Banco"
							/>
						)}
					/>

					<Controller
						control={control}
						name="accNumber"
						render={({ field }) => (
							<TextField
								error={!!errors.accNumber?.message}
								helperText={errors.accNumber?.message}
								{...field}
								label="Conta"
							/>
						)}
					/>
					<Controller
						control={control}
						name="agencyNumber"
						render={({ field }) => (
							<TextField
								error={!!errors.agencyNumber?.message}
								helperText={errors.agencyNumber?.message}
								{...field}
								label="Agência"
							/>
						)}
					/>
					<Controller
						control={control}
						name="checkNumber"
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.checkNumber?.message}
								helperText={errors.checkNumber?.message}
								label="Número do cheque"
							/>
						)}
					/>

					<Controller
						control={control}
						name="payerName"
						render={({ field }) => (
							<TextField
								error={!!errors.payerName?.message}
								helperText={errors.payerName?.message}
								{...field}
								label="Pagador"
							/>
						)}
					/>
					<Controller
						control={control}
						name="payerPhone"
						render={({ field }) => (
							<TextField
								error={!!errors.payerPhone?.message}
								helperText={errors.payerPhone?.message}
								{...field}
								label="Telefone do Pagador"
							/>
						)}
					/>
					<Controller
						control={control}
						name="dueDate"
						render={({ field }) => (
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								adapterLocale={ptBR}
							>
								<DatePicker
									label="Vencimento"
									format="dd/MM/yyyy"
									onChange={field.onChange}
									sx={{
										'& .MuiFormHelperText-root': {
											position: 'absolute',
											top: '55px'
										}
									}}
									{...field}
									slotProps={{
										textField: {
											helperText: errors?.dueDate?.message,
											error: !!errors?.dueDate?.message
										}
									}}
								/>
							</LocalizationProvider>
						)}
					/>
					<Controller
						control={control}
						name="value"
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.value?.message}
								helperText={errors.value?.message}
								label="Valor"
							/>
						)}
					/>
					<Controller
						control={control}
						name="sendTo"
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.sendTo?.message}
								helperText={errors.sendTo?.message}
								label="Enviado para"
							/>
						)}
					/>
					<Button
						variant="contained"
						color="primary"
						type="submit"
					>
						Enviar
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={handleCancelSubmit}
					>
						Cancelar
					</Button>
				</form>
			</Paper>
		</div>
	);
}
