import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/Queries";
import { Models } from "appwrite";
import { useTranslation } from "react-i18next";
import DirectionalText from "@/components/shared/DirectionalText";

const AllUsers = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: t('common.noResults') });
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <DirectionalText>
          <h2 className="h3-bold md:h2-bold w-full">
            {t('pages.allUsers')}
          </h2>
        </DirectionalText>
        
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators.pages[0]?.documents.map((creator: Models.Document) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;