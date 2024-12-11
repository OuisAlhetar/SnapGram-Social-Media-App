import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { useViewStory, useGetUserById } from "@/lib/react-query/Queries";
import { useUserContext } from "@/context/AuthContext";

type StoryModalProps = {
  story: Models.Document;
  onClose: () => void;
};

const StoryModal = ({ story, onClose }: StoryModalProps) => {
  const { user } = useUserContext();
  const { mutate: viewStory } = useViewStory();
  const { data: storyUser } = useGetUserById(story.user.$id);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Mark story as viewed
    if (!story.ViewedBy?.includes(user.id)) {
      viewStory({ storyId: story.$id, userId: user.id });
    }

    // Start progress animation
    setProgress(100);
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 * (1 - elapsed / duration));
      setProgress(remaining);

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        onClose();
      }
    };

    const animation = requestAnimationFrame(animateProgress);

    // Add keyboard event listener for closing
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [story, user.id, onClose, viewStory]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative w-full h-full md:h-auto md:w-[420px] mx-auto">
        <div className="relative w-full h-full md:aspect-[9/16] bg-black rounded-lg overflow-hidden">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 z-20">
            <div
              className="h-full bg-white transition-all ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-white hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Story content container */}
          <div className="relative w-full h-full">
            {/* Header with user info */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black via-black/50 to-transparent z-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={storyUser?.imageUrl}
                    alt={storyUser?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium">
                    {storyUser?.name || "User"}
                  </span>
                  <span className="text-white/70 text-xs">
                    {new Date(story.$createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Story image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={story.MediaUrl}
                alt="story"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption */}
            {story.Caption && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={storyUser?.imageUrl}
                      alt={storyUser?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">
                      {storyUser?.name || "User"}
                    </span>
                    <p className="text-white text-sm mt-1">{story.Caption}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
