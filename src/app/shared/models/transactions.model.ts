export interface ITransaction {
	_id: string;
	_rev: string;
	objectType: string;
	blockID: number;
	date_received: string;
	date_sent: string;
	previousBlockID: number;
	timestamp: string;
	creator: string;
	content: ITransactionContent;
	tech_date_stored: string;
	isNew?: boolean;
}

export interface ITransactionContent {
	objectType: string;
	header_receiver: string;
	header_emetter: string;
	header_channel: string;
	metadata_origin_bot: string;
	metadata_jobID: string;
	metadata_lastBlock: string;
	originBotID: string;
	isValidated: string;
	content: string;
	metadata_date_received: string;
	metadata_date_sent: string;
	tech_date_stored: string;
	_id: string;
	id: string;
	relay: number;
	validator: string;
}

