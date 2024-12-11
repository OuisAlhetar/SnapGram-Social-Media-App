import { Models } from "appwrite";
import { useGetRecentStories, useGetUserById } from "@/lib/react-query/Queries";
import { useUserContext } from "@/context/AuthContext";
import Loader from "./Loader";
import { useState } from "react";
import StoryModal from "./StoryModal";

const StoryCard = ({ story, onStoryClick }: { story: Models.Document, onStoryClick: () => void }) => {
  const { user: currentUser } = useUserContext();
  const { data: storyUser } = useGetUserById(story.user.$id);
  // console.log(story);

  return (
    <div
      onClick={onStoryClick}
      className="flex flex-col items-center cursor-pointer min-w-[80px]"
    >
      {/* Story Ring */}
      <div className={`rounded-full p-1 ${
        story.ViewedBy?.includes(currentUser.id)
          ? "bg-gray-300"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      }`}>
        {/* Story Thumbnail */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
          <img
            src={ story.MediaUrl|| storyUser?.imageUrl}
            alt="story"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Username */}
      <span className="text-xs mt-1 text-center truncate w-full font-medium">
        {storyUser?.name || "User"}
      </span>
      {/* Caption Preview */}
      {/* {story.Caption && (
        <span className="text-[10px] text-gray-500 text-center truncate w-full">
          {story.Caption}
        </span>
      )} */}
    </div>
  );
};

const StoriesBar = () => {
  const { data: stories, isPending: isStoriesLoading } = useGetRecentStories();
  const [selectedStory, setSelectedStory] = useState<Models.Document | null>(null);

  if (isStoriesLoading) return <Loader />;

  if (!stories.documents?.length) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Stories Bar */}
      <div className="flex gap-4 overflow-x-auto p-4 hide-scrollbar">
        {stories?.documents?.map((story: Models.Document) => (
          <StoryCard
            key={story.$id}
            story={story}
            onStoryClick={() => setSelectedStory(story)}
          />
        ))}
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default StoriesBar;
