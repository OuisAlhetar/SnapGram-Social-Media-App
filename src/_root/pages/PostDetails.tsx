import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/Queries";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import PostStats from "@/components/shared/PostStats";

const PostDetails = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  // handlers:
  const handleDeletePost = () => {};
  return (
    <div className="post_details-container bg-[#f9fafb] dark:bg-dark-1">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-dark-1 dark:text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex flex-center gap-2 text-dark-3 dark:text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link to={`/update-post/${post?.$id}`}>
                  {post?.creator?.$id == user.id && (
                    <img
                      src="/assets/icons/edit.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="dark:invert"
                    />
                  )}
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  } `}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                    className="dark:invert"
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 small-medium lg:base-regular">
              <p className="text-dark-1 dark:text-light-1">{post?.caption}</p>
              <ul className="flex gap-3 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-dark-3 dark:text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
