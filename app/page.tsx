'use client';

import initialTodos from '../public/todos.json';
import { useState } from 'react';
import { Timer, Todo } from './types';
import { filterOutItemFromItemArray } from './utils';
import './styles.css';

export default function Home() {
	const [todos, setTodos] = useState(initialTodos);
	const [fruits, setFruits] = useState<Todo[]>([]);
	const [vegetables, setVegetables] = useState<Todo[]>([]);
	const [timers, setTimers] = useState<Timer[]>([]);

	const PUSH_BACK_TIMEOUT_IN_MILLISECOND = 5000;

	const setTimerPushBackToMainTodos = (item: Todo) => {
		const id = item.name;
		const timer = setTimeout(function () {
			pushBackToMainTodos(item);
		}, PUSH_BACK_TIMEOUT_IN_MILLISECOND);

		setTimers(previousTimers => [...previousTimers, { id, timer }]);
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

	function pushBackToMainTodos(item: Todo, forceMove?: boolean) {
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

		const timersToClear = timers.filter(timer => timer.id === item.name);
		if (timersToClear.length && forceMove) {
			timersToClear.forEach(timer => clearTimeout(timer.timer));
		}
		setTodos(previousTodos => [...previousTodos, item]);
	}

	return (
		<main className="flex flex-col items-center justify-between">
			<div className="min-h-screen mb-32 grid text-center md:max-w-5xl md:w-full md:mb-0 md:grid-cols-3 md:text-left">
				<div className="group rounded-lg border border-transparent px-5 py-4">
					<div className={`m-0 text-sm opacity-50`}>
						{todos.map((todo, i) => (
							<div
								className="todos-item first:mt-0 last:mb-0 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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

				<div className="px-5 py-4">
					<div className="h-full categories group border border-transparent transition-colors hover:border-gray-300 hover:dark:border-neutral-700">
						<div className={`mb-3 text-2xl categories-header`}>Fruits</div>
						<div>
							{fruits.map((fruit, i) => (
								<div
									onClick={() => {
										pushBackToMainTodos(fruit, true);
									}}
									className={`categories-item m-0 text-sm opacity-50`}
									key={i}
								>
									{fruit.name}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="px-5 py-4">
					<div className="h-full categories group border border-transparent  transition-colors hover:border-gray-300 hover:dark:border-neutral-700">
						<div className={`mb-3 text-2xl categories-header `}>Vegetables</div>
						<div>
							{vegetables.length
								? vegetables.map((vegetable, i) => (
										<div
											onClick={() => {
												pushBackToMainTodos(vegetable, true);
											}}
											className={`categories-item text-sm opacity-50`}
											key={i}
										>
											{vegetable.name}
										</div>
								  ))
								: null}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
