import { httpDelete, httpGet, httpPost, httpPut } from './baseService'

export const productService = {
	getAll: async () => {
		return await httpGet(`product/getAll`)
	},
	get: async (from, to) => {
		return await httpGet(`product/get/${from}/${to}`)
	},
	searchAll: async (productName) => {
		return await httpGet(`product/${productName}`)
	},
	search: async (productName, from, to) => {
		return await httpGet(`product/search/${productName}/${from}/${to}`)
	},
	sort: async (sortLetter, from, to) => {
		return await httpGet(`product/sort/${sortLetter}/${from}/${to}`)
	},
	add: async (product) => {
		return await httpPost('product/add', product)
	},
	edit: async (product) => {
		return await httpPut('product/update', product)
	},
	enableDisable: async (id) => {
		return await httpPut(`product/enableDisable/${id}`)
	},
	delete: async (id) => {
		return await httpDelete(`product/delete/${id}`)
	},
}
