import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import AddStoryButton from "@/components/shared/AddStoryButton";
import StoriesBar from "@/components/shared/StoriesBar";
import { useGetRecentPosts } from "@/lib/react-query/Queries";
import { Models } from "appwrite";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();
  const { t } = useTranslation();

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className="home-posts">
          {/* Stories Bar */}
          <StoriesBar />
          
          <h2 className="h3-bold md:h2-bold text-left w-full mt-6">{t('pages.home')}</h2>
          {isPostLoading && !posts ? (
            <Loader/>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id}/> 
              ))}
            </ul>
          )}
        </div>
      </div>
      <AddStoryButton />
    </div>
  );
};

export default Home;