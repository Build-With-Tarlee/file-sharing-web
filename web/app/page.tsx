export default function Home() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			<main className='flex w-full max-w-3xl flex-col items-center justify-center px-8 text-center bg-white dark:bg-black'>
				<h1 className='max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50'>
					Ready to start InstantShare
				</h1>

				<p className='mt-4 text-base text-zinc-600 dark:text-zinc-400'>
					A file sharing web application
				</p>
			</main>
		</div>
	);
}
