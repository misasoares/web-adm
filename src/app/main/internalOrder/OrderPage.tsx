import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, TextField } from '@mui/material';

export default function OrderPage() {
	return (
		<>
			<div className="flex justify-center items-center flex-wrap gap-20">
				<TextField label="Cliente" />
				<TextField label="Veículo" />
				<TextField label="Telefone" />
				<TextField label="Cidade" />
				<TextField label="Bairro" />
				<TextField label="Rua" />
				<TextField label="Nº da casa" />
				<TextField label="CPF ou CNPJ" />
				<TextField label="Produto" />
				<Button
					variant="outlined"
					color="primary"
				>
					CANCELAR
				</Button>
				<Button
					variant="contained"
					color="primary"
				>
					ENVIAR
				</Button>
				<Button startIcon={<FuseSvgIcon>heroicons-outline:printer</FuseSvgIcon>}>IMPRIMIR </Button>
			</div>

			<div>aqui vai a visualização</div>
		</>
	);
}
