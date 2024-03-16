import { UpdateResult } from 'typeorm';
import { IItems } from '../../models/interface/item.interface';
import { Items } from '../../models/item';

export interface IItemsService {
	addItem(item: IItems): Promise<Items>;
	getById(itemId: string): Promise<Items | null>;
	getAllItems(): Promise<Items[]>;
	updateItem(itemId: string, item: IItems): Promise<UpdateResult>;
	deleteItemById(itemId: string): Promise<UpdateResult>;
}
