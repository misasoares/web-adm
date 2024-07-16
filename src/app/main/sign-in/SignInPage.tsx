import { zodResolver } from '@hookform/resolvers/zod';
import _ from '@lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/app/auth/AuthRouteProvider';
import { z } from 'zod';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('Digite um email válido'),
	password: z.string().min(6, 'Senha deve conter no mínimo 6 caracteres.')
});

type FormType = {
	email: string;
	password: string;
	remember?: boolean;
};

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

/**
 * The full screen reversed sign in page.
 */
function ModernReversedSignInPage() {
	const { control, formState, handleSubmit, reset } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const navigate = useNavigate();

	const { isValid, dirtyFields, errors } = formState;

	const { jwtService } = useAuth();

	function onSubmit(data) {
		jwtService
			.signIn(data)
			.then(() => {
				reset(defaultValues);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-32">
			<Paper className="flex min-h-full w-full overflow-hidden rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:w-full md:max-w-6xl">
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

				<div className="w-full px-16 py-32 ltr:border-l-1 rtl:border-r-1 sm:w-auto sm:p-48 md:p-64 ">
					<div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320 ">
						<div className="w-full flex items-center justify-center">
							<img
								className="w-84"
								src="assets/images/logo/logo-ms.svg"
								alt="logo"
							/>
						</div>

						<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
							Entrar
						</Typography>
						<div className="mt-2 flex items-baseline font-medium">
							<Typography>Não tem uma conta?</Typography>
							<Link
								className="ml-4"
								to="/sign-up"
							>
								Cadastre-se
							</Link>
						</div>

						<form
							name="loginForm"
							noValidate
							className="mt-32 flex w-full flex-col justify-center"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Email"
										autoFocus
										type="email"
										error={!!errors.email}
										helperText={errors?.email?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Senha"
										type="password"
										error={!!errors.password}
										helperText={errors?.password?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
								<Controller
									name="remember"
									control={control}
									render={({ field }) => (
										<FormControl>
											<FormControlLabel
												label="Lembrar-me"
												control={
													<Checkbox
														size="small"
														{...field}
													/>
												}
											/>
										</FormControl>
									)}
								/>

								<Link
									className="text-md font-medium"
									to="/pages/auth/forgot-password"
								>
									Esqueceu a senha?
								</Link>
							</div>

							<Button
								variant="contained"
								color="secondary"
								className=" mt-16 w-full"
								aria-label="Sign in"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								type="submit"
								size="large"
							>
								Entrar
							</Button>
						</form>
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default ModernReversedSignInPage;
