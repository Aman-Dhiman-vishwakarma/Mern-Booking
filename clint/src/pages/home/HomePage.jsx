
import { useEffect, useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { followingposts, getallPosts } from "../../store/allPostsSlice";


const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");
	const {loginsignupstatus, logedinUser} = useSelector(state=>state.auth)
	const {allpostsdata, isLoading} = useSelector(state=>state.allposts)
	const {userfollowtrue} = useSelector(state=>state.usersprofile)
    const dispatch = useDispatch();
	useEffect(()=>{
		
		if(feedType === "forYou"){
            dispatch(getallPosts())
			
		}else{
			dispatch(followingposts())
		}
	
	},[feedType, userfollowtrue])

	
	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
				{/* Header */}
				<div className='flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-full  h-1 rounded-full bg-primary'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-full  h-1 rounded-full bg-primary'></div>
						)}
					</div>
				</div>

				{/*  CREATE POST INPUT */}
				<CreatePost />

				{/* POSTS */}
				<Posts POSTS={allpostsdata} isLoading={isLoading}/>
			</div>
		</>
	);
};
export default HomePage;
