import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';

/**
 * The type definition for a user object.
 */
export type User = {
	uid: string;
	displayName: string;
	photoURL?: string;
	email?: string;
	role: string[] | string | null;
	shortcuts?: string[];
	settings?: Partial<FuseSettingsConfigType>;
	loginRedirectUrl?: string;
	// data: {
	// 	photoURL?: string;
	// 	shortcuts?: string[];
	// 	settings?: Partial<FuseSettingsConfigType>;
	// 	loginRedirectUrl?: string; // The URL to redirect to after login.
	// };
};
