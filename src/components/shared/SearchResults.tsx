import { Models } from 'appwrite';
import React from 'react'
import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  
  if (isSearchFetching) return <Loader />

  console.log("ali ali",searchedPosts);

  if (searchedPosts && searchedPosts.documents.length > 0){
    return (
    <GridPostList posts={searchedPosts.documents} />
    )
  }
  return (
    <p className='text-light-4 mt-10 text-center w-full'>No Results Found</p>
  )
}

export default SearchResults