import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import logoMsContained from '../../../../public/assets/images/logo/logo-ms-default.png';
import BasicTable from './components/Table';
import { createOrderSchema, defaultValues } from './formSchema';
import { createInternalOrder, selectInternalOrder } from './store/internalOrderSlice';

export default function OrderPage() {
	const dispatch = useAppDispatch();
	const internalOrders = useAppSelector(selectInternalOrder);
	const [typeOrder, setTypeOrder] = useState({
		order: true,
		receipt: false,
		budget: false
	});

	const [totalValueOrder, setTotalValueOrder] = useState(0);

	const {
		setValue,
		control,
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(createOrderSchema)
	});

	const { fields, append } = useFieldArray({
		control,
		name: 'products'
	});

	const today = new Date();

	const getMonthName = (monthIndex: number) => {
		const months = [
			'janeiro',
			'fevereiro',
			'março',
			'abril',
			'maio',
			'junho',
			'julho',
			'agosto',
			'setembro',
			'outubro',
			'novembro',
			'dezembro'
		];
		return months[monthIndex];
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;

		setTypeOrder({
			order: false,
			receipt: false,
			budget: false,
			[name]: true
		});

		setValue('type', name);
	};

	function submitForm(data) {
		dispatch(createInternalOrder(data));
	}

	// useEffect(() => {
	// 	const subscription = watch((value) => {
	// 		if (Array.isArray(value.products)) {
	// 			const products = value.products.map((product) => ({
	// 				...product,
	// 				total:
	// 					product.quantity && product.unityValue
	// 						? (parseFloat(product.quantity) * parseFloat(product.unityValue)).toFixed(2)
	// 						: ''
	// 			}));

	// 			setValue('products', products);
	// 			const totalValue = watch('products').reduce(
	// 				(sum, product) => sum + (parseFloat(product.total) || 0),
	// 				0
	// 			);
	// 			setTotalValueOrder(totalValue);
	// 		}
	// 	});

	// 	return () => subscription.unsubscribe();
	// }, [watch]);

	useEffect(() => {
		const subscription = watch((value) => {
			const products = value.products.map((product) => ({
				...product,
				total: `${Number(product.quantity) * Number(product.unityValue)}`
			}));
			setValue('products', products);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<div className="flex flex-col items-center">
			<form
				className="border-black border-1 flex-col p-24"
				onSubmit={handleSubmit(submitForm)}
			>
				<div className="flex flex-row gap-84 justify-between">
					<div className="flex flex-col justify-center items-center ">
						<img
							src={logoMsContained}
							alt="Logo MS Baterias com fundo azul"
							className="w-216"
						/>
						<Typography fontWeight={700}>Claudio Bueno Soares - ME</Typography>
						<Typography fontWeight={600}>CNPJ: 94.452.968/0001-00</Typography>
						<Typography fontWeight={600}>I.E. 241/0025425</Typography>
					</div>
					<div className="flex flex-col justify-center items-center">
						<Typography fontWeight={900}>Tele Entrega</Typography>
						<Typography fontWeight={700}>Fone: (51) 3543.1818</Typography>
						<Typography fontWeight={700}>msbaterias@bol.com.br</Typography>
						<Typography fontWeight={500}>Rua Arthur Lehnen, 57,</Typography>
						<Typography fontWeight={500}>Centro - Parobé/RS</Typography>
					</div>
				</div>
				<div className="flex mt-20 justify-center">
					<FormGroup className="flex flex-row gap-24">
						<FormControlLabel
							control={<Checkbox checked={typeOrder.receipt} />}
							label="Recibo"
							name="receipt"
							onChange={handleCheckboxChange}
						/>
						<FormControlLabel
							control={<Checkbox checked={typeOrder.budget} />}
							label="Orçamento"
							name="budget"
							onChange={handleCheckboxChange}
						/>
						<FormControlLabel
							control={<Checkbox checked={typeOrder.order} />}
							label="Pedido"
							onChange={handleCheckboxChange}
							name="order"
						/>
					</FormGroup>
				</div>
				<Divider className="b-10" />
				<div className="flex w-full justify-end mt-10">
					<Typography>
						Parobé, {today.getDate()} de {getMonthName(today.getMonth())}, de {today.getFullYear()}
					</Typography>
				</div>
				<div className="flex flex-col gap-10">
					<div className="flex flex-row items-center gap-10">
						<Typography>Cliente:</Typography>
						<TextField
							{...register('costumer')}
							fullWidth
							variant="standard"
						/>
						<Typography>CPF:</Typography>
						<TextField
							{...register('cpf')}
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

				<div className="mt-32">
					<BasicTable
						control={control}
						fields={fields}
						append={append}
					/>
				</div>

				<div className="flex w-full justify-end mt-10">
					<Typography>Valor total: R${totalValueOrder}</Typography>
				</div>
				<Button
					type="submit"
					variant="contained"
					color="primary"
				>
					Enviar
				</Button>
			</form>
			<Button startIcon={<FuseSvgIcon>heroicons-outline:printer</FuseSvgIcon>}>IMPRIMIR </Button>
		</div>
	);
}
