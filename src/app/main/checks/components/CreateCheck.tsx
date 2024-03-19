import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Paper, TextField, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
	accName: z.string().min(2, 'É necessário adicionar o nome da conta.'),
	bank: z.string().min(2, 'É necessário adicionar o banco.'),
	accNumber: z.string().min(2, 'É necessário adicionar o número de conta.'),
	agencyNumber: z.string().min(2, 'É necessário adicionar a agência.'),
	payerName: z.string().min(2, 'É necessário adicionar o pagador.'),
	checkNumber: z.string().min(2, 'É necessário adicionar o número do cheque.'),
	payerPhone: z.string().min(2, 'É necessário adicionar o número de telefone do pagador.'),
	sendTo: z.string().optional(),
	dueDate: z.date({
		required_error: 'É necessário adicionar uma data de vencimento.',
		invalid_type_error: 'É necessário adicionar uma data de vencimento.'
	}),
	value: z.string().min(1, 'É necessário adicionar o valor.')
});

type SchemaCheckType = z.infer<typeof schema>;

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
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm<SchemaCheckType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	function onSubmit(data) {
		console.log(data);
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
					<Controller
						control={control}
						name="bank"
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.bank?.message}
								helperText={errors.bank?.message}
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
						name="accName"
						render={({ field }) => (
							<TextField
								error={!!errors.accName?.message}
								helperText={errors.accName?.message}
								{...field}
								label="Nome da conta"
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
