import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useAppDispatch } from 'app/store/hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { formatterNumeral } from 'src/app/utils/formatterNumeral';
import logoMsContained from 'src/assets/images/logo-png-cor.png';
import 'src/styles/print.css';
import CostumerInfo from './components/CostumerInfo';
import BasicTable from './components/Table';
import {
	EInternalOrderStatus,
	EInternalOrderType,
	TCreateOrderSchema,
	createOrderSchema,
	defaultValues
} from './formSchema';
import { createInternalOrder, updateInternalOrder } from './store/internalOrderSlice';
import { InternalOrderType } from './store/types/typesSlice';

interface IPropsOrderPage {
	editMode: boolean;
	orderToEdit: InternalOrderType | null;
}

export default function OrderPage({ editMode, orderToEdit }: IPropsOrderPage) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [typeOrder, setTypeOrder] = useState({
		order: true,
		receipt: false,
		budget: false
	});

	const {
		setValue,
		control,
		register,
		watch,
		handleSubmit,
		reset,
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

	const [productsState, setProductsState] = useState(watch('products'));
	const [totalValueOrder, setTotalValueOrder] = useState(0);

	const [disablePrint, setDisablePrint] = useState(true);

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

		if (!editMode) {
			if (data.type !== EInternalOrderType.ORDER) {
				submitData = { ...data, status: EInternalOrderStatus.CONCLUDED };
			} else {
				submitData = { ...data, status: EInternalOrderStatus.IN_PROGRESS };
			}

			dispatch(createInternalOrder({ ...submitData, totalValue: totalValueOrder }));
			dispatch(showMessage({ message: 'Pedido feito com sucesso.', variant: 'success' }));
			setDisablePrint(false);
		}

		if (editMode) {
			if (orderToEdit) {
				dispatch(updateInternalOrder({ ...submitData, uid: orderToEdit.uid }));
				dispatch(showMessage({ message: 'Pedido atualizado com sucesso.', variant: 'success' }));
			}
		}
	}

	const printRef = useRef<HTMLDivElement>(null);

	const handlePrint = () => {
		if (printRef.current) {
			const printContainer = document.createElement('div');
			printContainer.className = 'print-container';

			const clonedContent1 = printRef.current.cloneNode(true) as HTMLElement;

			const inputs1 = clonedContent1.querySelectorAll('input, textarea');
			inputs1.forEach((input) => {
				if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
					const { value } = input;
					const span = document.createElement('span');
					span.innerText = value;
					input.parentNode?.replaceChild(span, input);
				}
			});

			printContainer.innerHTML = clonedContent1.innerHTML;

			document.body.appendChild(printContainer);
			window.print();
			document.body.removeChild(printContainer);
		}
	};

	function generateOrderNumber() {
		const numbers = '0123456789';
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		// Seleciona 3 números aleatórios
		let result = '';
		for (let i = 0; i < 3; i++) {
			const randomIndex = Math.floor(Math.random() * numbers.length);
			result += numbers[randomIndex];
		}

		// Seleciona 2 letras aleatórias
		for (let i = 0; i < 2; i++) {
			const randomIndex = Math.floor(Math.random() * letters.length);
			result += letters[randomIndex];
		}

		// Embaralha os caracteres para que não haja padrão
		return result
			.split('')
			.sort(() => 0.5 - Math.random())
			.join('');
	}

	useEffect(() => {
		let totalOfOrder = 0;

		const subscription = watch((value) => {
			totalOfOrder = value.products.reduce((acc, product) => {
				const totalByProduct = +product.quantity * (+product.unityValue - (+product.discount || 0));
				return acc + totalByProduct;
			}, 0);

			const productsUpdated = value.products.map((product) => ({
				...product,
				total: `${+product.quantity * (+product.unityValue - (+product.discount || 0))}`
			}));

			setProductsState(productsUpdated);

			setTotalValueOrder(totalOfOrder);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	useEffect(() => {
		setValue('totalValue', totalValueOrder);

		watch('products').forEach((product, index) => {
			setValue(`products.${index}.total`, productsState[index].total);
		});
	}, [totalValueOrder]);

	useEffect(() => {
		if (!editMode) {
			const orderNumber = generateOrderNumber();
			setValue('orderNumber', orderNumber);
		}
		if (editMode && orderToEdit) {
			const formattedOrder = {
				...orderToEdit,
				date: orderToEdit.createdAt.toString(), //ajustar
				costumerName: orderToEdit.costumer.name,
				phone: orderToEdit.costumer.phone,
				address: orderToEdit.costumer.address,
				cpfOrCnpj: orderToEdit.costumer.cpfOrCnpj,
				totalValue: Number(orderToEdit.totalValue)
				// falta ajustar produtos
			};

			reset(formattedOrder);

			setDisablePrint(false);
		}
	}, [editMode]);

	const status = Object.keys(EInternalOrderStatus);
	const statusValues = {
		[EInternalOrderStatus.CONCLUDED]: 'Concluído',
		[EInternalOrderStatus.IN_PROGRESS]: 'Em andamento'
	};

	return (
		<div className="flex flex-col items-center">
			<form onSubmit={handleSubmit(submitForm)}>
				{editMode && orderToEdit && (
					<FormGroup className="flex flex-row">
						{status.map((item) => (
							<FormControlLabel
								key={item}
								control={
									<Checkbox
										color={statusValues[item] === 'Concluído' ? 'success' : 'primary'}
										onChange={() => setValue('status', item as EInternalOrderStatus)}
										checked={statusValues[item] === statusValues[watch('status')]}
									/>
								}
								label={statusValues[item as EInternalOrderStatus]}
							/>
						))}
					</FormGroup>
				)}
				<div ref={printRef}>
					<div className="border-black border-1 flex-col p-24 order">
						<Typography
							sx={{ marginTop: '-15px' }}
							fontWeight={700}
						>
							{watch('orderNumber')}
						</Typography>
						<div className="flex flex-row gap-84 justify-between">
							<div className="flex flex-col justify-center items-center ">
								<img
									src={logoMsContained}
									alt="Logo MS Baterias com fundo azul"
									className="w-216 mt-10"
								/>
								<Typography fontWeight={700}>Claudio Bueno Soares - ME</Typography>
								<Typography fontWeight={600}>CNPJ: 94.452.968/0001-00</Typography>
								<Typography fontWeight={600}>I.E. 241/0025425</Typography>
							</div>
							<div className="flex flex-col justify-center items-center">
								<Typography fontWeight={900}>Tele Entrega</Typography>
								<div className="flex items-end ">
									<FuseSvgIcon
										className="mr-5"
										size={18}
									>
										feather:phone
									</FuseSvgIcon>
									<Typography fontWeight={700}>(51) 3543.1818</Typography>
								</div>
								<div className="flex items-center">
									<WhatsAppIcon sx={{ width: 20, marginRight: '0.5rem' }} />
									<Typography fontWeight={700}> (51) 9 8027-7373</Typography>
								</div>
								{/* <Typography fontWeight={700}>msbateriasmaster@gmail.com</Typography> */}
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
						<div className="flex flex-row justify-end mb-24">
							{!editMode ? (
								<Typography fontWeight={700}>
									{today.getDate()} de {getMonthName(today.getMonth())} de {today.getFullYear()}
								</Typography>
							) : (
								<Typography fontWeight={700}>
									{new Date(watch('date')).getDate()} de{' '}
									{getMonthName(new Date(watch('date')).getMonth())} de{' '}
									{new Date(watch('date')).getFullYear()}
								</Typography>
							)}
						</div>

						<CostumerInfo
							errors={errors}
							register={register}
						/>

						<div className="mt-32">
							<BasicTable
								control={control}
								fields={fields}
								append={append}
								handleRemoveProduct={handleRemoveProduct}
								editMode={editMode}
								watch={watch}
							/>
						</div>

						<div className="flex w-full justify-end mt-10">
							<Typography>Valor total: {formatterNumeral(Number(totalValueOrder))}</Typography>
						</div>

						<div className="flex w-full m-10">
							<TextField
								label="Observações"
								fullWidth
								defaultValue={Array(10).fill('\n').join('')}
								multiline
								rows={10}
								{...register('observations')}
							/>
						</div>
					</div>
				</div>
				<div className="flex gap-10 mt-28 justify-end">
					<Button
						color="info"
						variant="outlined"
						onClick={handlePrint}
						disabled={disablePrint}
						startIcon={<FuseSvgIcon>heroicons-outline:printer</FuseSvgIcon>}
					>
						IMPRIMIR
					</Button>

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
				</div>
			</form>
		</div>
	);
}
