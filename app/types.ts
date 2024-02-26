export type Todo = {
	type: string;
	name: string;
};

export type Timer = {
	id: string;
	timer: ReturnType<typeof setTimeout>;
};
