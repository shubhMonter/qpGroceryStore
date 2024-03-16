import { UpdateResult } from 'typeorm';
import database from '../../database/database';
import { IItems } from '../../models/interface/item.interface';
import { Items } from '../../models/item';
import { IItemsService } from './item.sevice.interface';

class ItemsService implements IItemsService {
	itemRepo = database.getRepository(Items);
	addItem = async (item: IItems): Promise<Items> => {
		return new Promise(async (res, rej) => {
			try {
				const newItem = this.itemRepo.create(item);
				await this.itemRepo.save(newItem);
				res(newItem);
			} catch (error) {
				rej(error);
			}
		});
	};
	getById = async (itemId: string): Promise<Items | null> => {
		return await this.itemRepo.findOneBy({ id: itemId });
	};
	getAllItems = async (): Promise<Items[]> => {
		return await this.itemRepo.find();
	};
	updateItem = async (itemId: string, item: IItems): Promise<UpdateResult> => {
		return await this.itemRepo.update({ id: itemId }, { ...item });
	};
	deleteItemById = async (itemId: string): Promise<UpdateResult> => {
		return await this.itemRepo.softDelete({ id: itemId });
	};
}

export default ItemsService;
