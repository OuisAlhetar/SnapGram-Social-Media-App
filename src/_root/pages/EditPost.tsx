import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/Queries";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditPost = () => { 
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id||"");
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if(isPending) return <Loader/>
  
  return (
    <div className="flex flex-1 mb-12">
      <div className="common-container">
        <div className="max-w-5xl flex justify-start w-full">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <img
              src="/assets/icons/add-post.svg"
              alt={t('post.editPost')}
              width={36}
              height={36}
              className="filter-[#1F1F22] dark:invert"
              style={{ filter: 'invert(8%) sepia(4%) saturate(817%) hue-rotate(201deg) brightness(95%) contrast(86%)' }}
            />
            <h2 className={`h3-bold md:h2-bold text-dark-1 dark:text-light-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('post.editPost')}
            </h2>
          </div>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;