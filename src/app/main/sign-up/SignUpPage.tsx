import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logoms from 'src/assets/images/logo-ms-adm.png';
import JwtSignUpTab from './tabs/JwSignUpTab';

/**
 * The sign up page.
 */
function SignUpPage() {
	return (
		<div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
				<Box className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
					<div className="w-full flex items-center justify-center">
						<img
							className="w-92"
							src={logoms}
							alt="logo"
						/>
					</div>

					<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
						Cadastre-se
					</Typography>
					<div className="mt-2 flex items-baseline font-medium">
						<Typography>Já tem uma conta?</Typography>
						<Link
							className="ml-4"
							to="/sign-in"
						>
							Entrar
						</Link>
					</div>

					<JwtSignUpTab />
				</Box>
			</Paper>

			<Box
				className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
				sx={{ backgroundColor: 'primary.main' }}
			>
				<svg
					className="pointer-events-none absolute inset-0"
					viewBox="0 0 960 540"
					width="100%"
					height="100%"
					preserveAspectRatio="xMidYMax slice"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Box
						component="g"
						sx={{ color: 'primary.light' }}
						className="opacity-20"
						fill="none"
						stroke="currentColor"
						strokeWidth="100"
					>
						<circle
							r="234"
							cx="196"
							cy="23"
						/>
						<circle
							r="234"
							cx="790"
							cy="491"
						/>
					</Box>
				</svg>
				<Box
					component="svg"
					className="absolute -right-64 -top-64 opacity-20"
					sx={{ color: 'primary.light' }}
					viewBox="0 0 220 192"
					width="220px"
					height="192px"
					fill="none"
				>
					<defs>
						<pattern
							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width="220"
						height="192"
						fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
					/>
				</Box>

				<div className="relative z-10 w-full max-w-2xl">
					<div className="text-7xl font-bold leading-none text-gray-100">
						<div>Bem vindo ao</div>
						<div>MsControl</div>
					</div>
					<div className="mt-24 text-lg leading-6 tracking-tight text-gray-400">
						Esta aplicação está em desenvolvimento, conto com a ajuda de todos para testes.
					</div>
				</div>
			</Box>
		</div>
	);
}

export default SignUpPage;
