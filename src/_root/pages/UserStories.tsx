import { useParams } from "react-router-dom";
import { useGetUserStories } from "@/lib/react-query/Queries";
import Loader from "@/components/shared/Loader";
import StoryModal from "@/components/shared/StoryModal";
import { useState } from "react";
import { Models } from "appwrite";

const StoryCard = ({ story, onClick }: { story: Models.Document, onClick: () => void }) => {
  const isExpired = new Date(story.ExpiresAt) < new Date();

  return (
    <div
      className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={story.MediaUrl}
        alt="story"
        className={`w-full h-full object-cover transition-opacity ${isExpired ? 'opacity-50' : ''}`}
      />
      {story.Caption && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
          <p className="text-white text-sm truncate">{story.Caption}</p>
        </div>
      )}
      {isExpired && (
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
          Expired
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-2 left-2 text-white text-xs">
          {new Date(story.$createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

const UserStories = () => {
  const { id } = useParams();
  const { data: stories, isLoading } = useGetUserStories(id || "");
  const [selectedStory, setSelectedStory] = useState<Models.Document | null>(null);

  if (isLoading) return <Loader />;

  if (!stories?.documents.length) {
    return (
      <div className="flex-center w-full h-full">
        <p className="text-dark-1 dark:text-light-2">No stories yet</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stories.documents.map((story: Models.Document) => (
          <StoryCard
            key={story.$id}
            story={story}
            onClick={() => setSelectedStory(story)}
          />
        ))}
      </div>

      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default UserStories;
