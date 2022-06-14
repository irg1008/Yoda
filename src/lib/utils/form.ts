const getRequestFormData = async <T>(request: Request) => {
	const formData = await request.formData();
	const data: Record<string, string> = {};
	formData.forEach((value, key) => {
		data[key] = value.toString();
	});
	return data as T;
};

export { getRequestFormData };
