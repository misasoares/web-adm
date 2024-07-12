import { useParams } from 'react-router';
import { useAppSelector } from 'app/store/hooks';
import { useEffect, useState } from 'react';
import DefaultPage from '../components/DefaultPage';
import OrderPage from './OrderPage';
import { selectInternalOrder } from './store/internalOrderSlice';
import { InternalOrderType } from './store/types/typesSlice';

export default function InternalOrderPage() {
	const { uid } = useParams();

	const internalOrders = useAppSelector(selectInternalOrder);

	const [editMode, setEditMode] = useState(false);
	const [orderToEdit, setOrderToEdit] = useState<InternalOrderType | null>(null);

	useEffect(() => {
		if (uid === 'new') {
			setEditMode(false);
		} else {
			const foundOrderToEdit = internalOrders.find((order) => order.uid === uid);

			if (foundOrderToEdit) {
				setOrderToEdit(foundOrderToEdit);
				setEditMode(true);
			}
		}
	}, []);

	return (
		<DefaultPage
			title="Criar pedido"
			isCreatePage
		>
			<OrderPage
				editMode={editMode}
				orderToEdit={orderToEdit}
			/>
		</DefaultPage>
	);
}
