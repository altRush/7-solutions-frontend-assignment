import todos from '../public/todos.json';
import { Todo } from './types';

export default function Home() {
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
							<div key={i}>{todo.name}</div>
						))}
					</div>
				</div>

				<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Learn{' '}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Learn about Next.js in an interactive course with&nbsp;quizzes!
					</p>
				</div>

				<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Templates{' '}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Explore starter templates for Next.js.
					</p>
				</div>
			</div>
		</main>
	);
}
