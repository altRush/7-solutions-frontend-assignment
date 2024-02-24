'use client';

import initialTodos from '../public/todos.json';
import { useState } from 'react';
import { Todo } from './types';
import { filterOutItemFromItemArray } from './utils';

export default function Home() {
	const [todos, setTodos] = useState(initialTodos);
	const [fruits, setFruits] = useState<Todo[]>([]);
	const [vegetables, setVegetables] = useState<Todo[]>([]);

	const PUSH_BACK_TIMEOUT_IN_MILLISECOND = 5000;

	const setTimerPushBackToMainTodos = (item: Todo) => {
		setTimeout(function () {
			pushBackToMainTodos(item);
		}, PUSH_BACK_TIMEOUT_IN_MILLISECOND);
	};

	function executeEvents(activeItem: Todo) {
		const updatedTodos = filterOutItemFromItemArray(activeItem, todos);
		pushForwardToTheirCategory(activeItem, updatedTodos);
		setTimerPushBackToMainTodos(activeItem);
	}

	function pushForwardToTheirCategory(item: Todo, updatedTodos: Todo[]) {
		if (!item?.type) return;
		if (item.type === 'Fruit') {
			setFruits([...fruits, item]);
		}
		if (item.type === 'Vegetable') {
			setVegetables([...vegetables, item]);
		}

		setTodos(updatedTodos);
	}

	function pushBackToMainTodos(item: Todo) {
		if (!item?.type) return;
		if (item.type === 'Fruit') {
			setFruits(previousFruits =>
				filterOutItemFromItemArray(item, previousFruits)
			);
		}
		if (item.type === 'Vegetable') {
			setVegetables(previousVegetables =>
				filterOutItemFromItemArray(item, previousVegetables)
			);
		}

		setTodos(previousTodos => [...previousTodos, item]);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
				<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						{todos.map((todo, i) => (
							<div
								onClick={() => {
									executeEvents(todo);
								}}
								key={i}
							>
								{todo.name}
							</div>
						))}
					</div>
				</div>

				<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 text-2xl font-semibold`}>Fruits</h2>
					<div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						{fruits.map((fruit, i) => (
							<div key={i}>{fruit.name}</div>
						))}
					</div>
				</div>

				<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 text-2xl font-semibold`}>Vegetables</h2>
					<div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						{vegetables.map((vegetable, i) => (
							<div key={i}>{vegetable.name}</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
