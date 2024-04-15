import DefaultPage from '../components/DefaultPage';
import OrderPage from './OrderPage';

export default function InternalOrderPage() {
	return (
		<DefaultPage
			title="Criar pedido"
			content={<OrderPage />}
		/>
	);
}
