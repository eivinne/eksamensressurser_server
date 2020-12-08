import Office from '../models/office.js';
import {offices} from '../data/offices.json';

export const getOfficeById = async (id) => Office.findById(id);

export const getAllOffices = async () => Office.find(offices);

export const list = async (data) => Office.find(data);
export const city = async (city) => Office.find(city);
