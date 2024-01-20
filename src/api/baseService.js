import axios from 'axios'

import { BASE_URL, REQUEST_HEADER, REQUEST_HEADER_UPLOAD } from '../helpers'

const httpGet = async (url, options = REQUEST_HEADER) =>
	await axios
		.get(
			`${BASE_URL
			}${url}`,
			options
		)
		.then((res) => res.data)
		.catch((err) => console.log(err))

const httpPost = async (url, payload, options = REQUEST_HEADER) =>
	await axios
		.post(
			`${BASE_URL
			}${url}`,
			payload,
			options
		)
		.then((res) => res.data)
		.catch((err) => err.response.data)

const httpUpload = async (url, payload, options = REQUEST_HEADER_UPLOAD) =>
	await axios({
		method: 'POST',
		url: `${BASE_URL
			}${url}`,
		data: payload,
		headers: { 'Content-Type': 'multipart/form-data' }
	})
		.then((res) => res.data)
		.catch((err) => err.response.data)

const httpPut = async (url, payload, options = REQUEST_HEADER) =>
	await axios
		.put(
			`${BASE_URL
			}${url}`,
			payload,
			options
		)
		.then((res) => res.data)
		.catch((err) => err.response.data)

// can't use delete, it is a reserved keyword
const httpDelete = async (url, payload, options = REQUEST_HEADER) =>
	await axios
		.delete(
			`${BASE_URL
			}${url}`,
			{ ...options, data: payload }
		)
		.then((res) => res.data)
		.catch((err) => err.response.data)

export { httpGet, httpPost, httpUpload, httpPut, httpDelete }
