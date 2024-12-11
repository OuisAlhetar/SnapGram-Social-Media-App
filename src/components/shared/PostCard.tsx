import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useTranslation } from "react-i18next";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const { t } = useTranslation();

  if (!post.creator) return;
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex flex-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 h-12 object-cover"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-dark-1 dark:text-light-1">
              {post.creator.name}
            </p>
            <div className="flex flex-center gap-2 text-dark-3 dark:text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={post?.creator?.$id !== user.id ? "hidden" : ""}
        >
          <img
            src="/assets/icons/edit.svg"
            alt={t("common.edit")}
            width={20}
            height={20}
            className="dark:invert"
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p className="text-dark-1 dark:text-light-1">{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-dark-3 dark:text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full">
          <img
            src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="post image"
            className="post-card_img"
          />
        </div>
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
