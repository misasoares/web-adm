import { zodResolver } from '@hookform/resolvers/zod';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import _ from '@lodash';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'app/store/hooks';
import { SignUpPayload, useAuth } from '../../../auth/AuthRouteProvider';

/**
 * Form Validation Schema
 */
const schema = z
	.object({
		displayName: z.string().min(1, 'Você deve digitar seu nome.'),
		email: z.string().email('Você deve digitar um email válido.').min(4, 'É necessário adicionar um email.'),
		password: z.string().min(8, 'Senha muito curta - Deve ter ao menos 8 caracteres.'),
		passwordConfirm: z.string().min(4, 'É necessário confirmar a senha.')
		// acceptTermsConditions: z.boolean().refine((val) => val === true, 'The terms and conditions must be accepted.')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'As senhas não coincidem. Por favor, digite novamente.',
		path: ['passwordConfirm']
	});

const defaultValues = {
	displayName: '',
	email: '',
	password: '',
	passwordConfirm: ''
	// acceptTermsConditions: false
};

function JwtSignUpTab() {
	const { jwtService } = useAuth();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	function onSubmit(formData: SignUpPayload) {
		const { displayName, email, password } = formData;
		jwtService
			.signUp({
				displayName,
				password,
				email
			})
			.then(() => {
				navigate('/sign-in');
				dispatch(showMessage({ message: 'Usuário cadastrado com sucesso.', variant: 'success' }));
			})
			.catch((_errors: { type: 'email' | 'password' | `root.${string}` | 'root'; message: string }[]) => {
				_errors.forEach(({ message, type }) => {
					setError(type, { type: 'manual', message });
				});
			});
	}

	return (
		<form
			name="registerForm"
			noValidate
			className="mt-32 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="displayName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Nome"
						autoFocus
						type="name"
						error={!!errors.displayName}
						helperText={errors?.displayName?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Email"
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

			<Controller
				name="passwordConfirm"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Confirmar senha"
						type="password"
						error={!!errors.passwordConfirm}
						helperText={errors?.passwordConfirm?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>
			{/* 
			<Controller
				name="acceptTermsConditions"
				control={control}
				render={({ field }) => (
					<FormControl
						className="items-center"
						error={!!errors.acceptTermsConditions}
					>
						<FormControlLabel
							label="I agree to the Terms of Service and Privacy Policy"
							control={
								<Checkbox
									size="small"
									{...field}
								/>
							}
						/>
						<FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
					</FormControl>
				)}
			/> */}

			<Button
				variant="contained"
				color="secondary"
				className="mt-24 w-full"
				aria-label="Register"
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="large"
			>
				Criar conta
			</Button>
		</form>
	);
}

export default JwtSignUpTab;
