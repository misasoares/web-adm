import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import DefaultPage from '../components/DefaultPage';
import { getAllProducts, selectProducts } from './store/productsSlice';
import ProductsTable from './components/ProductsTable';

export default function Products() {
	const dispatch = useAppDispatch();
	const { payload: products, loading } = useAppSelector(selectProducts);

	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	return (
		<DefaultPage
			title="Produtos"
			createButton="Criar novo produto"
		>
			<ProductsTable products={products} />
		</DefaultPage>
	);
}
