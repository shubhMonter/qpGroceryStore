import bcrypt from 'bcrypt';

export const encryptTo = async (password: string, salt: number = 10): Promise<string> => {
	let getSalt = await bcrypt.genSalt(salt);

	return await bcrypt.hash(password, getSalt);
};

export const matchEncryptTo = async (test: string, password: string) => {
	if (password && (await bcrypt.compare(test, password))) {
		return true;
	}
	return false;
};

export const removeProperty = (object: any, property: string) => {
	if (object.hasOwnProperty(property)) {
		delete object[property];
	}
	return object;
};
