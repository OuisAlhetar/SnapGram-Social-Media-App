import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const AddStoryButton = () => {
  return (
    <Button
      className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50"
      asChild
    >
      <Link to="/create-story">
        <img
          src="/assets/icons/add-story.svg"
          alt="Add story"
          width={24}
          height={24}
          className="invert"
        />
      </Link>
    </Button>
  );
};

export default AddStoryButton;
