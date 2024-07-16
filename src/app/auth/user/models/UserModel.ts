import _ from '@lodash';
import { User } from 'src/app/auth/user';
import { PartialDeep } from 'type-fest';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<User>): User {
	data = data || {};

	return _.defaults(data, {
		uid: '',
		role: null, // guest
		displayName: 'Guest User',
		photoURL: '',
		email: ''
	});
}

export default UserModel;
