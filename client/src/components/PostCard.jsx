import toast from 'react-hot-toast';
import { usePosts } from '../context/postContext';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';

const PostCard = ({ post }) => {
	const { deletePost } = usePosts();
	const navigate = useNavigate();

	const handleDelete = id => {
		toast(
			t => (
				<div className='flex flex-col gap-2'>
					<p className='text-white'>Do you want to delete it?</p>
					<div>
						<button
							className='bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2'
							onClick={() => {
								deletePost(id);
								toast.dismiss(t.id);
							}}
						>
							Delete
						</button>
						<button
							className='bg-zinc-700 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2'
							onClick={() => toast.dismiss(t.id)}
						>
							Cancel
						</button>
					</div>
				</div>
			),
			{
				style: {
					background: '#202020',
					padding: '15px',
				},
			}
		);
	};

	return (
		<div
			className='bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-800 '
			onClick={() => navigate(`/posts/${post._id}`)}
		>
			<div className='px-4 py-7 flex flex-col gap-3'>
				<div className='flex justify-between'>
					<h3 className='text-2xl'>{post.title}</h3>
					<div className='flex flex-col gap-2'>
						<button
							onClick={e => {
								e.stopPropagation();
								handleDelete(post._id);
							}}
							className='bg-red-600 text-sm px-2 py-1 rounded-sm hover:bg-red-500 hover:cursor-pointer'
						>
							<AiTwotoneDelete />
						</button>
					</div>
				</div>
				<p className='font-light'>{post.description}</p>
			</div>
			{post.image && <img src={post.image.url} alt={post.title} className='w-full h-72'/>}
		</div>
	);
};

export default PostCard;
