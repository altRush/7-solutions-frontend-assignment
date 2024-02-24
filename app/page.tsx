'use client';

import { useState } from 'react';
import rawTodos from '../public/todos.json';
import { Todo } from './types';

export default function Home() {
	const [todos, setTodos] = useState(rawTodos);
	const [fruits, setFruits] = useState<Todo[]>([]);
	const [vegetables, setVegetables] = useState<Todo[]>([]);

	function getItemFromItemArray(itemArray: Todo[], filteringItem: Todo): Todo {
		return itemArray.filter(item => item.name === filteringItem.name)[0];
	}

	function filterOutItemFromItemArray(
		itemArray: Todo[],
		filteringItem: Todo
	): Todo[] {
		return itemArray.filter(item => item.name !== filteringItem.name);
	}

	const setTimerPushBackToMainTodos = (item: Todo) => {
		setTimeout(function () {
			setFruits(fruits => [...filterOutItemFromItemArray(fruits, item)]);
			setVegetables(vegetables => [
				...filterOutItemFromItemArray(vegetables, item)
			]);
			setTodos(todos => [...todos, item]);
		}, 5000);
	};

	function executeEvents(item: Todo) {
		const getToPush = getItemFromItemArray(todos, item);
		const updatedTodos = filterOutItemFromItemArray(todos, item);
		pushForwardToTheirCategory(getToPush);
		setTodos(updatedTodos);
		setTimerPushBackToMainTodos(item);
	}

	function pushForwardToTheirCategory(item: Todo) {
		if (item.type === 'Fruit') {
			setFruits([...fruits, item]);
		}
		if (item.type === 'Vegetable') {
			setVegetables([...vegetables, item]);
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
				<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Docs{' '}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						{(todos as Todo[]).map((todo, i) => (
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
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Fruits{' '}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						{(fruits as Todo[]).map((fruit, i) => (
							<div key={i}>{fruit.name}</div>
						))}
					</div>
				</div>

				<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Vegetables{' '}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						{(vegetables as Todo[]).map((vegetable, i) => (
							<div key={i}>{vegetable.name}</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
