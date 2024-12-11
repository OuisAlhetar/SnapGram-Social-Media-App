export type INavLink = {
	imgURL: string;
	route: string;
	label: string;
};


export type IUpdateUser = {
	userId: string;
	name: string;
	bio: string;
	imageId: string;
	imageUrl: URL | string;
	file: File[];
};


export type INewPost = {
	userId: string;
	caption: string;
	file: File[];
	location?: string;
	tags?: string;
};


export type IUpdatePost = {
	postId: string;
	caption: string;
	imageId: string;
	imageUrl: URL;
	file: File[];
	location?: string;
	tags?: string;
};


export type IUser = {
	id: string;
	name: string;
	username: string;
	email: string;
	imageUrl: string;
	bio: string;
};


export type INewUser = {
	name: string;
	email: string;
	username: string;
	password: string;
};


export type INewComment = {
	userId: string;
	postId: string;
	content: string;
};


export type IComment = {
	id: string;
	userId: string;
	postId: string;
	content: string;
	user: IUser;
	createdAt: string;
};


export type INewStory = {
	userId: string;
	mediaUrl: string;
	textComment?: string;
	file: File[];
};


export type IStory = {
    id: string;
    user: string;
    MediaUrl: string;
    Caption?: string;
    createdAt: string;
    ExpiresAt: string;
    ViewedBy: string[];
};
