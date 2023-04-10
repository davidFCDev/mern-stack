import { usePosts } from '../context/postContext';
import { VscEmptyWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { useEffect } from 'react';

export const HomePage = () => {
	const { posts, getPosts } = usePosts();

	useEffect(() => {
		getPosts();
	}, []);

	if (posts.length === 0)
		return (
			<section className='text-white flex flex-col w-full min-h-screen my-5 gap-36'>
				<header className='flex justify-between py-4'>
					<h1 className='text-2xl text-gray-300 font-bold'>
						Posts ({posts.length})
					</h1>
					<Link
						to='/new'
						className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-sm'
					>
						Create New Post
					</Link>
				</header>
				<div className='flex flex-col justify-center items-center text-white'>
					<VscEmptyWindow className='w-32 h-32 text-white' />
					<h1>There are no posts!</h1>

				</div>
			</section>
		);

	return (
		<div className='text-white flex flex-col w-full min-h-screen my-5'>
			<header className='flex justify-between py-4'>
				<h1 className='text-2xl text-gray-300 font-bold'>
					Posts ({posts.length})
				</h1>
				<Link
					to='/new'
					className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-sm'
				>
					Create New Post
				</Link>
			</header>
			<div className='grid grid-cols-3 gap-2 mt-4'>
				{posts.map((post, i) => (
					<PostCard post={post} key={i} />
				))}
			</div>
		</div>
	);
};
