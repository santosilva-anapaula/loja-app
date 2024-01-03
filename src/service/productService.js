import api from "./api";

const AddProductApi = (product) =>
    api.post('/produto/create', product)
        .then((response) => response)
        .catch((err) => console.error('Erro na chamada', err));

const findAllProducts = () =>
    api.get('/produto/findAll')
        .then((response) => response)
        .catch((err) => console.error('Erro na chamada', err));

const findProductsById = (id) =>
    api.get(`/produto/find/${id}`)
        .then((response) => response)
        .catch((err) => console.error('Erro na chamada', err));

const updateProductById = (id, productEdit) =>
    api.put(`/produto/update/${id}`, productEdit)
        .then((response) => response)
        .catch((err) => console.error('Erro na chamada', err));

const deleteProductById = (id) =>
    api.delete(`/produto/delete/${id}`)
        .then((response) => response)
        .catch((err) => console.error('Erro na chamada', err));

export { AddProductApi, findAllProducts, findProductsById, updateProductById, deleteProductById };