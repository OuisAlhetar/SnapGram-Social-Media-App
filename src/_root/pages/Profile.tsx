import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/Queries";
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import LikedPosts from "./LikedPosts";
import UserStories from "./UserStories";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-dark-2 dark:text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container mb-12">
      <div className="profile-inner_container">
        <div className={`flex flex-col max-xl:items-center flex-1 gap-7 ${isRTL ? 'xl:flex-row' : 'xl:flex-row'}`}>
          <div className={`flex justify-center ${isRTL ? 'xl:justify-start' : 'xl:justify-start'}`}>
            <img
              src={
                currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
            />
          </div>
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className={`flex flex-col w-full max-xl:items-center ${isRTL ? 'xl:items-end' : 'xl:items-start'}`}>
              <h1 className={`h3-bold md:h1-semibold w-full text-center xl:text-start text-dark-1 dark:text-light-1 ${isRTL ? 'xl:text-right' : 'xl:text-left'}`}>
                {currentUser.name}
              </h1>
              <p className={`small-regular md:body-medium w-full text-center xl:text-start text-dark-3 dark:text-light-3 ${isRTL ? 'xl:text-right' : 'xl:text-left'}`}>
                @{currentUser.username}
              </p>
            </div>

            <div className={`flex gap-8 mt-10 items-center ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <StatBlock value={currentUser.posts.length} label={t('profile.posts')} />
              <StatBlock value={20} label={t('profile.followers')} />
              <StatBlock value={20} label={t('profile.following')} />
            </div>

            <p className={`mt-7 max-w-screen-sm text-dark-1 dark:text-light-1 lg:mx-0 mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {currentUser.$id === user.id && (
                <Link
                  to={`/update-profile/${currentUser.$id}`}
                  className={`h-12 bg-[#f0f0f0] dark:bg-dark-4 px-5 text-dark-1 dark:text-light-1 flex-center gap-2 rounded-lg ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                  <p className="flex whitespace-nowrap small-medium">
                    {t('profile.editProfile')}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="flex max-w-5xl w-full mt-16 mb-14">
        <div className="flex-1 flex flex-col sm:flex-row w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-t-lg sm:rounded-none ${pathname === `/profile/${id}` && "!bg-primary-500 !text-light-1"} ${
              isRTL ? 'sm:rounded-r-lg' : 'sm:rounded-l-lg'
            }`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
              className={`${pathname === `/profile/${id}` ? 'brightness-200' : 'dark:invert'}`}
            />
            <p className="base-medium md:base-medium">{t('profile.posts')}</p>
          </Link>
         
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-b-lg sm:rounded-none ${pathname === `/profile/${id}/liked-posts` && "!bg-primary-500 !text-light-1"} ${
              isRTL ? 'sm:rounded-l-lg' : 'sm:rounded-r-lg'
            }`}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
              className={`${pathname === `/profile/${id}/liked-posts` ? 'brightness-200' : 'dark:invert'}`}
            />
            <p className="base-medium md:base-medium">{t('profile.likedPosts')}</p>
          </Link>
          <Link
            to={`/profile/${id}/stories`}
            className={`profile-tab border-y sm:border-y-0 ${isRTL ? 'sm:border-x' : 'sm:border-x'} border-[#E0E0E0] dark:border-dark-4 ${
              pathname === `/profile/${id}/stories` && "!bg-primary-500 !text-light-1"
            }`}
          >
            <img
              src={"/assets/icons/add-story.svg"}
              alt="stories"
              width={20}
              height={20}
              className={`${pathname === `/profile/${id}/stories` ? 'brightness-200' : 'dark:invert'}`}
            />
            <p className="base-medium md:base-medium">{t('profile.stories')}</p>
          </Link>
        </div>
      </div>

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        <Route path="/stories" element={<UserStories />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;