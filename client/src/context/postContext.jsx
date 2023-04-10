import { useState, createContext, useContext, useEffect } from 'react';
import { getPostsRequests, createPostRequests, deletePostRequests, getPostRequests, updatePostRequests } from '../api/posts.js';

const postContext = createContext();

export const usePosts = () => {
	const context = useContext(postContext);
	return context;
};

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		const res = await getPostsRequests();
		setPosts(res.data);
	};

	const createPost = async (post) => {
		const res = await createPostRequests(post);
		setPosts([...posts, res.data]);
	};

	const deletePost = async (id) => {
		await deletePostRequests(id);
		setPosts(posts.filter((post) => post._id !== id));
	};

	const getPost = async (id) => {
		const res = await getPostRequests(id);
		return res.data;
	};

	const updatePost = async (id, post) => {
		const res = await updatePostRequests(id, post);
		setPosts(posts.map((post) => (post._id === id ? res.data : post)));
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<postContext.Provider
			value={{
				posts,
				getPosts,
				createPost,
				deletePost,
				getPost,
				updatePost,
			}}
		>
			{children}
		</postContext.Provider>
	);
};
