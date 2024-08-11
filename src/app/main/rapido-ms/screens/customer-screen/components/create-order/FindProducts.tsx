import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { httpClient } from 'src/app/shared/services/api';
import { formatterNumeral } from 'src/app/utils/formatterNumeral';

interface FindProductsProps {
	vehicle: { model: string; brand: string };
}

export default function FindProducts({ vehicle }: FindProductsProps) {
	const [products, setProducts] = useState([]);

	async function getProducts() {
		const response = await httpClient.doGet('products');
		setProducts(response.data);
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<Grid
			container
			spacing={2}
		>
			<Grid
				item
				xs={12}
				className="flex justify-center flex-col w-full items-center"
			>
				<Typography
					variant="h6"
					fontWeight={600}
				>
					Baterias ideais para:
				</Typography>
				<Typography
					variant="h6"
					fontWeight={800}
				>
					{vehicle.brand} {vehicle.model}
				</Typography>
			</Grid>
			{products.map((product) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={product.uid}
					className="flex justify-center"
				>
					<Card sx={{ maxWidth: '80%' }}>
						<CardMedia
							sx={{ height: 200 }}
							className="bg-contain"
							image="https://useast2prodbrandsites.blob.core.windows.net/heliar-sfassets-prod/images/default-source/products/sli_frontal.webp?sfvrsn=e66a350e_3"
							title="green iguana"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								{product.name}
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
							>
								aqui vai informações da bateria: cca, garantia, etc etc
							</Typography>

							<Typography
								variant="subtitle1"
								color="text.secondary"
								component="div"
							>
								{formatterNumeral(product.value)}
							</Typography>
						</CardContent>
						<CardActions className="w-full justify-end">
							<Button
								variant="contained"
								size="medium"
								color="success"
							>
								Escolher bateria
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
