import { Todo } from './types';

export function filterOutItemFromItemArray(
	filteringItem: Todo,
	itemArray: Todo[]
): Todo[] {
	return itemArray.filter(item => item.name !== filteringItem.name);
}
