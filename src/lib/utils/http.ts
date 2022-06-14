type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ErrorData<Out, In = unknown> = {
	error?: Record<keyof In, string>;
	status: number;
	data?: Out;
};

type BodyFetchFunction = <Out, In = unknown>(
	url: RequestInfo | URL,
	body?: Record<string, unknown>
) => Promise<ErrorData<Out, In>>;

type GetFetchFunction = <Out, In = unknown>(
	url: RequestInfo | URL,
	params?: Record<string, string>
) => Promise<ErrorData<Out, In>>;

const customMethodFetch = async <Out, In = unknown>(
	method: Method,
	input: RequestInfo | URL,
	{ body, params }: { body?: Record<string, unknown>; params?: Record<string, string> } = {}
): Promise<ErrorData<Out, In>> => {
	if (!input.toString().startsWith('/')) throw new Error('URL must start with /');

	if (params) {
		const urlParams = new URLSearchParams(params);
		input += `?${urlParams.toString()}`;
	}

	const res = await fetch(input, {
		body: body ? JSON.stringify(body) : null,
		method
	});
	const resBody = await res.json();

	if (res.ok)
		return {
			status: res.status,
			data: resBody
		};

	return {
		error: resBody.error,
		status: res.status
	};
};

const get: GetFetchFunction = (input, params) => customMethodFetch('GET', input, { params });
const post: BodyFetchFunction = (input, body) => customMethodFetch('POST', input, { body });
const put: BodyFetchFunction = (input, body) => customMethodFetch('PUT', input, { body });
const del: GetFetchFunction = (input) => customMethodFetch('DELETE', input);

export const http = {
	get,
	post,
	put,
	del
};
