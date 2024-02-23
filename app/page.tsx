'use client';

import { useState } from 'react';
import rawTodos from '../public/todos.json';
import { Todo } from './types';

export default function Home() {
	const [todos, setTodos] = useState(rawTodos);
	const [fruits, setFruits] = useState<Todo[]>([]);
	const [vegetables, setVegetables] = useState<Todo[]>([]);

	function pushForwardToTheirCategory(item: Todo) {
		if (!item.type) return;

		if (item.type === 'Fruit') {
			console.log('push forward set fruits', [...fruits, item]);
			setFruits([...fruits, item]);
		}

		if (item.type === 'Vegetable') {
			console.log('push forward set vegs', [...vegetables, item]);
			setVegetables([...vegetables, item]);
		}

		const filteredOutMainTodos = todos.filter(todo => todo.name !== item.name);
		console.log('push forward set todos', filteredOutMainTodos);
		setTodos(filteredOutMainTodos);
	}

	function pushBackToMainTodos(item: Todo) {
		if (item.type === 'Fruit') {
			const filteredOutFruits = fruits.filter(
				fruit => fruit.name !== item.name
			);
			console.log('push back set fruits', filteredOutFruits);
			setFruits(filteredOutFruits);
		}

		if (item.type === 'Vegetable') {
			const filteredOutVegetables = vegetables.filter(
				vegetable => vegetable.name !== item.name
			);
			console.log('push back set veg', filteredOutVegetables);
			setVegetables(filteredOutVegetables);
		}

		console.log('push back set todos', [...todos, item]);
		setTodos([...todos, item]);
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
									pushForwardToTheirCategory(todo);
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
