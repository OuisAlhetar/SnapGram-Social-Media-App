import GridPostList from "@/components/shared/GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/Queries";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debounceValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResult = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResult && posts?.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h3 className="h3-bold md:h2-bold w-full text-dark-1 dark:text-light-1">
          {t('explore.searchPosts')}
        </h3>
        <div className="flex gap-1 px-4 w-full border border-border border-dark-4 rounded-lg bg-[#f0f0f0] dark:bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt={t('common.search')}
            height={24}
            width={24}
            className="dark:invert"
          />
          <Input
            type="text"
            placeholder={t('common.search')}
            className="explore-search text-dark-1 dark:text-light-1 placeholder:text-dark-4 dark:placeholder:text-light-4"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold text-dark-1 dark:text-light-1">
          {t('explore.popularToday')}
        </h3>
        <div className="flex-center gap-3 bg-[#F5F5F5] dark:bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-dark-2 dark:text-light-2">
            {t('common.all')}
          </p>
          <img
            src="/assets/icons/filter.svg"
            alt={t('common.filter')}
            width={20}
            height={20}
            className="dark:invert"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResult ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-dark-4 dark:text-light-4 mt-4 text-center w-full">
            {t('explore.endOfPosts')}
          </p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader className="text-dark-1 dark:text-light-1" />
        </div>
      )}
    </div>
  );
};

export default Explore;
