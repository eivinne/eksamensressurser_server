import Office from '../models/article.js';

export const getOfficeById = async (id) => Office.findById(id);

export const getAllOffices = async () => Office.find();

export const list = async (data) => Office.find(data);
export const city = async (city) => Office.find(city);
