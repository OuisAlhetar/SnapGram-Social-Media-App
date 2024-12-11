import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/Queries";
import { Models } from "appwrite";
import { useTranslation } from "react-i18next";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container mb-12">
      <div className="flex gap-2 w-full max-w-5xl">
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <img
            src="/assets/icons/save.svg"
            width={36}
            height={36}
            alt={t('pages.saved')}
            className="invert-white"
          />
          <h2 className={`h3-bold md:h2-bold ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('pages.saved')}
          </h2>
        </div>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">{t('common.noResults')}</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;