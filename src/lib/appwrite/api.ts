import { INewComment, INewPost, INewStory, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        // adding a new account to the Users collection(table):
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        // console.log(session);
        return session;
    } catch (error) {
        console.log(error);
    }
}

// export async function signInAccount(user: { email: string; password: string }) {
//     try {
//         // Check if a session already exists
//         const existingSessions = await account.getSessions();
//         if (existingSessions.sessions.length > 0) {
//             console.log("Session already active, reusing session:", existingSessions);
//             return existingSessions.sessions[0]; // Return the existing session
//         }

//         // If no session exists, create a new one
//         const session = await account.createEmailSession(user.email, user.password);
//         console.log("New session created:", session);
//         return session;
//     } catch (error) {
//         console.log("Error during sign-in:", error);
//         return error;
//     }
// }

// ============================== GET ACCOUNT
export async function getAccount() {
    try {
        const currentAccount = await account.get();
        // console.log(currentAccount)
        return currentAccount;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        // console.log(currentAccount);
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// ================== Sign-Out ===================

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST
export async function createPost(post: INewPost) {
    try {
        // Upload file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);

        if (!uploadedFile) throw Error;

        // Get file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // Create post
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            }
        );

        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newPost;
    } catch (error) {
        console.log(error);
    }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );

        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        );

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);

        return { status: "ok" };
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET POSTS
// export async function searchPosts(searchTerm: string) {
//     try {
//         const posts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             [Query.search("caption", searchTerm)]
//         );

//         if (!posts) throw Error;

//         return posts;
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function searchPosts(searchTerm: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search('caption', searchTerm)]
        );

        if (!posts) throw Error;

        return posts;

    } catch (error) {
        console.log(error)
    }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
    const queries = [Query.orderDesc('$updatedAt'), Query.limit(10)];

    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()))
    }

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        )

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error)
    }
}

export async function getInfiniteUsers({ pageParam }: { pageParam: number }) {
    const queries = [Query.limit(20)];

    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()));
    }
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            queries
            // [Query.limit(10)]
        )
        if (!users) throw Error;

        return users;
    } catch (error) {
        console.log(error)
    }
}

export async function getPostById(postId: string) {
    if (!postId) throw Error;

    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
        )

        if (!post) throw Error;

        return post;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
export async function getRecentPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(20)]
        );

        if (!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error);
    }
}

// ============================== LIKE / UNLIKE POST
export async function likePost({
    postId,
    likesArray
}: {
    postId: string;
    likesArray: string[];
}) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray,
            }
        );

        if (!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error)
    }
}

// ============================== Saved / UNSaved POST
export async function savePost({ userId, postId }: {
    userId: string;
    postId: string;
}) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        );

        if (!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error)
    }
}

// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId,
        );

        if (!statusCode) throw Error;

        return { status: 'Ok' };
    } catch (error) {
        console.log(error)
    }
}

// ============================== UPDATE POST
export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
    try {

        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        }

        if (hasFileToUpdate) {

            // Upload file to appwrite storage
            const uploadedFile = await uploadFile(post.file[0]);

            if (!uploadedFile) throw Error;

            // Get file url
            const fileUrl = getFilePreview(uploadedFile.$id);
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
        }

        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // Create post
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags,
            }
        );

        if (!updatedPost) {
            await deleteFile(post.imageId);
            throw Error;
        }

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}

// ============================== DELETE POST
export async function deletePost(postId: string, imageId: string) {
    if (!postId || !imageId) throw Error;

    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
        )
        return { status: "ok" }
    } catch (error) {
        console.log(error)
    }
}

export async function getUserById(userId: string) {
    try {
        const user = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId
        );

        if (!user) throw Error;

        return user;
    } catch (error) {
        console.log(error);
    }
}

// export async function getCurrentUser() {
//     try {
//         const currentAccount = await getAccount();
//         console.log("Current Account:", currentAccount);

//         if (!currentAccount) throw Error;

//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal("accountId", currentAccount.$id)]
//         );

//         console.log("Current User Documents:", currentUser);

//         if (!currentUser) throw Error;

//         return currentUser.documents[0];
//     } catch (error) {
//         console.log("Error in getCurrentUser:", error);
//         return null;
//     }
// }

// export async function getCurrentUser() {
//     try {
//         const currentAccount = await getAccount();
//         // console.log("Current Account:", currentAccount);

//         if (!currentAccount) throw Error("No current account found");

//         const query = [Query.equal("accountId", currentAccount.$id)];
//         // console.log("Query:", query);

//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             query
//         );

//         // console.log("Current User Documents:", currentUser);

//         if (!currentUser || currentUser.total === 0)
//             throw Error("User not found in database");

//         return currentUser.documents[0];
//     } catch (error) {
//         console.log("Error in getCurrentUser:", error);
//         return null;
//     }
// }

//[########## helper functions: ##################]
// function isValidEmail(email: string) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
    const hasFileToUpdate = user.file.length > 0;
    try {
        let image = {
            imageUrl: user.imageUrl,
            imageId: user.imageId,
        };

        if (hasFileToUpdate) {
            // Upload new file to appwrite storage
            const uploadedFile = await uploadFile(user.file[0]);
            if (!uploadedFile) throw Error;

            // Get new file url
            const fileUrl = getFilePreview(uploadedFile.$id);
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
        }

        //  Update user
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.userId,
            {
                name: user.name,
                bio: user.bio,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
            }
        );

        // Failed to update
        if (!updatedUser) {
            // Delete new file that has been recently uploaded
            if (hasFileToUpdate) {
                await deleteFile(image.imageId);
            }
            // If no new file uploaded, just throw error
            throw Error;
        }

        // Safely delete old file after successful update
        if (user.imageId && hasFileToUpdate) {
            await deleteFile(user.imageId);
        }

        return updatedUser;
    } catch (error) {
        console.log(error);
    }
}

// ============================================================
// COMMENTS
// ============================================================

export async function createComment(comment: INewComment) {
    try {
        const newComment = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.commentsCollectionId,
            ID.unique(),
            {
                userId: comment.userId,
                postId: comment.postId,
                content: comment.content,
            }
        );

        if (!newComment) throw Error;

        return newComment;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getPostComments(postId: string) {
    try {
        const comments = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.commentsCollectionId,
            [
                Query.equal("postId", postId),
                Query.orderDesc("$createdAt")
            ]
        );

        if (!comments) throw Error;

        return comments;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function deleteComment(commentId: string) {
    try {
        const status = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.commentsCollectionId,
            commentId
        );

        if (!status) throw Error;

        return { status: "ok" };
    } catch (error) {
        console.log(error);
        return error;
    }
}

// ============================================================
// STORIES
// ============================================================

export async function createStory(story: INewStory) {
    try {
        // Upload file to storage
        const uploadedFile = await uploadFile(story.file[0]);
        if (!uploadedFile) throw Error;

        // Get file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        // Calculate expiry time (24 hours from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        // Create story
        const newStory = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.storiesCollectionId,
            ID.unique(),
            {
                user: story.userId,
                MediaUrl: fileUrl,
                Caption: story.textComment,
                ExpiresAt: expiresAt.toISOString(),
                ViewedBy: [],
            }
        );

        if (!newStory) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newStory;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getRecentStories() {
    const now = new Date().toISOString();
    try {
        const stories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.storiesCollectionId,
            [
                Query.greaterThan("ExpiresAt", now),
                Query.orderDesc("$createdAt")
            ]
        );

        if (!stories) throw Error;

        return stories;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getUserStories(userId: string) {
    try {
        const stories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.storiesCollectionId,
            [
                Query.equal("user", userId),
                Query.orderDesc("$createdAt")
            ]
        );

        if (!stories) throw Error;

        return stories;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function viewStory({ storyId, userId }: { storyId: string; userId: string }) {
    try {
        const story = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.storiesCollectionId,
            storyId
        );

        if (!story) throw Error;

        const viewedBy = story.ViewedBy || [];
        if (!viewedBy.includes(userId)) {
            viewedBy.push(userId);
        }

        const updatedStory = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.storiesCollectionId,
            storyId,
            {
                ViewedBy: viewedBy,
            }
        );

        if (!updatedStory) throw Error;

        return updatedStory;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function deleteStory(storyId: string, imageId: string) {
    try {
        const status = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.storiesCollectionId,
            storyId
        );

        if (!status) throw Error;

        await deleteFile(imageId);

        return { status: "ok" };
    } catch (error) {
        console.log(error);
        return error;
    }
}
