import { Item } from './../shared/models/item.models';
export interface IGameboardCpntData {
	winItemIdx: number;
	items: Item[];
	clickedIdx: number;
	currentQuestionTimer: string;
	isCheckingAnswer: boolean;
}
