import { INewComment, INewPost, INewStory, INewUser, IUpdatePost, IUpdateUser } from "@/types";

import {
	useQuery,
	useMutation,
	useInfiniteQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	createComment,
	createPost,
	createStory,
	createUserAccount,
	deleteComment,
	deletePost,
	deleteSavedPost,
	deleteStory,
	getCurrentUser,
	getInfinitePosts,
	getInfiniteUsers,
	getPostById,
	getPostComments,
	getRecentPosts,
	getRecentStories,
	getUserById,
	getUserStories,
	likePost,
	savePost,
	searchPosts,
	signInAccount,
	signOutAccount,
	updatePost,
	updateUser,
	viewStory,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};

export const useSignInAccount = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signInAccount(user),
	});
};

export const useSignOutAccount = () => {
	return useMutation({
		mutationFn: signOutAccount,
	});
};

// ==========================
// ============ post Queries:
// ==========================

export const useCreatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: INewPost) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
};

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};

// export const useLikePost = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: ({
// 			postId,
// 			likesArray,
// 		}: {
// 			postId: string;
// 			likesArray: string[];
// 		}) => likePost(postId, likesArray),
// 		onSuccess: (data) => {
// 			queryClient.invalidateQueries({
// 				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
// 			});
// 			queryClient.invalidateQueries({
// 				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
// 			});
// 			queryClient.invalidateQueries({
// 				queryKey: [QUERY_KEYS.GET_POSTS],
// 			});
// 			queryClient.invalidateQueries({
// 				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
// 			});
// 		},
// 	});
// };

export const useLikePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			postId,
			likesArray,
		}: {
			postId: string;
			likesArray: string[];
		}) => likePost({postId, likesArray}),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
			savePost({postId, userId}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  })
}

export const useGetPostById = (postId: string) => {
	
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
		queryFn: () => getPostById(postId),
		enabled: !!postId,
	})
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: IUpdatePost) => updatePost(post),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			})
		}
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({postId,imageId}:{postId: string, imageId:string}) => deletePost(postId,imageId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			})
		}
	});
};

export const useGetPosts = () => {
	return useInfiniteQuery({
		queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
		queryFn: getInfinitePosts,
		getNextPageParam: (lastPage) => {
			if (lastPage && lastPage.documents.length === 0) return null;

			const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;

			return lastId;
		}
	})
}

export const useSearchPosts = (searchTerm:string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.SEARCH_POSTS,searchTerm],
		queryFn: () => searchPosts(searchTerm),
		enabled: !!searchTerm
	})
}

export const useGetUsers = () => {
	return useInfiniteQuery({
		queryKey: [QUERY_KEYS.GET_USERS],
		queryFn: getInfiniteUsers,
		getNextPageParam: (lastPage) => {
			if (lastPage && lastPage.documents.length === 0) return null;

			const lastId = lastPage?.documents[lastPage?.documents.length - 1];
			return lastId;
		}
	})
}

export const useGetUserById = (userId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId
	});
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};

// ============================================================
// COMMENTS QUERIES
// ============================================================

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: INewComment) => createComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

export const useGetPostComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getPostComments(postId),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

// ============================================================
// STORIES QUERIES
// ============================================================

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (story: INewStory) => createStory(story),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });
};

export const useGetRecentStories = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: getRecentStories,
    refetchInterval: 60000, // Refetch every minute to check for expired stories
  });
};

export const useGetUserStories = (userId: string) => {
  return useQuery({
    queryKey: ["stories", userId],
    queryFn: () => getUserStories(userId),
    refetchInterval: 60000,
  });
};

export const useViewStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storyId, userId }: { storyId: string; userId: string }) =>
      viewStory({ storyId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storyId, imageId }: { storyId: string; imageId: string }) =>
      deleteStory(storyId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });
};