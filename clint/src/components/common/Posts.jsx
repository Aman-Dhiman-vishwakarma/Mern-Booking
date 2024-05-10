
import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
// import { POSTS } from "../../utils/db/dummy";

const Posts = ({POSTS, isLoading}) => {
	// const isLoading = false;

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
                    <PostSkeleton />
			    </div>
            )}
			{!isLoading && POSTS?.messege === "noposts" && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !POSTS?.messege && (
				<div>
					{POSTS?.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;
