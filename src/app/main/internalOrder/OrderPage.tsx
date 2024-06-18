import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import logoMsContained from '../../../../public/assets/images/logo/logo-ms-default.png';
import CostumerInfo from './components/CostumerInfo';
import BasicTable from './components/Table';
import {
	TCreateOrderSchema,
	createOrderSchema,
	defaultValues,
	EInternalOrderType,
	EInternalOrderStatus
} from './formSchema';
import { createInternalOrder, selectInternalOrder } from './store/internalOrderSlice';

export default function OrderPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
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
	} = useForm<TCreateOrderSchema>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(createOrderSchema)
	});

	const { fields, append, remove } = useFieldArray({
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
		const orderType = name as EInternalOrderType;

		setTypeOrder({
			order: orderType === EInternalOrderType.ORDER,
			receipt: orderType === EInternalOrderType.RECEIPT,
			budget: orderType === EInternalOrderType.BUDGET
		});

		setValue('type', orderType);
	};

	function handleRemoveProduct(index: number) {
		remove(index);
	}

	function handleCancelOrder() {
		navigate('/internal-order');
	}

	function submitForm(data: TCreateOrderSchema) {
		let submitData = data;

		if (data.type !== EInternalOrderType.ORDER) {
			submitData = { ...data, status: EInternalOrderStatus.CONCLUDED };
		} else {
			submitData = { ...data, status: EInternalOrderStatus.IN_PROGRESS };
		}

		dispatch(createInternalOrder({ ...submitData, totalValue: totalValueOrder }));
		dispatch(showMessage({ message: 'Pedido feito com sucesso.', variant: 'success' }));
		navigate('/internal-order');
	}

	useEffect(() => {
		let totalOfOrder = 0;

		const subscription = watch((value) => {
			totalOfOrder = value.products.reduce((acc, product) => {
				const totalByProduct = +product.quantity * +product.unityValue;
				return acc + totalByProduct;
			}, 0);

			setTotalValueOrder(totalOfOrder);
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
							name={EInternalOrderType.RECEIPT}
							onChange={handleCheckboxChange}
						/>
						<FormControlLabel
							control={<Checkbox checked={typeOrder.budget} />}
							label="Orçamento"
							name={EInternalOrderType.BUDGET}
							onChange={handleCheckboxChange}
						/>
						<FormControlLabel
							control={<Checkbox checked={typeOrder.order} />}
							label="Pedido"
							name={EInternalOrderType.ORDER}
							onChange={handleCheckboxChange}
						/>
					</FormGroup>
				</div>
				<Divider className="b-10" />
				<div className="flex w-full justify-end mt-10">
					<Typography>
						Parobé, {today.getDate()} de {getMonthName(today.getMonth())}, de {today.getFullYear()}
					</Typography>
				</div>

				<CostumerInfo register={register} />

				<div className="mt-32">
					<BasicTable
						control={control}
						fields={fields}
						append={append}
						handleRemoveProduct={handleRemoveProduct}
					/>
				</div>

				<div className="flex w-full justify-end mt-10">
					<Typography>Valor total: R${totalValueOrder}</Typography>
				</div>

				<div className="flex w-full m-10">
					<TextField
						label="Observações"
						fullWidth
						multiline
						rows={4}
						{...register('observations')}
					/>
				</div>
				<div className="flex gap-10">
					<Button
						type="submit"
						variant="outlined"
						color="primary"
						onClick={handleCancelOrder}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
					>
						Salvar
					</Button>
					<Button startIcon={<FuseSvgIcon>heroicons-outline:printer</FuseSvgIcon>}>IMPRIMIR </Button>
				</div>
			</form>
		</div>
	);
}
