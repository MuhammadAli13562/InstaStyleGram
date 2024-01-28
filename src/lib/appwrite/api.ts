import { INewPost, INewUser } from "@/types";
import { account, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";
import { appwriteConfig } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountID: newAccount.$id,
      name: user.name,
      username: user.username,
      email: newAccount.email,
      imageURL: avatarURL,
    });

    return newAccount;
  } catch (error) {
    console.log("Error Occured while creating account:", error);
    return null;
  }
}

export async function saveUserToDB(user: {
  accountID: string;
  name: string;
  username: string;
  email: string;
  imageURL: URL;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  const currentAccount = await account.get();

  console.log("currentAccount -> ", currentAccount);

  if (!currentAccount) throw Error;

  const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountID", currentAccount.$id)]
  );

  if (!currentUser) throw Error;
  console.log("currentUser retrieved from user collection :", currentUser);

  return currentUser.documents[0];
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    const fileURL = getFilePreview(uploadedFile.$id);

    console.log("fileURL HERE IS :", fileURL);

    if (!fileURL) {
      deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags to an array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Save post in database
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageURL: fileURL,
        imageID: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

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
    return false;
  }
}

export function getFilePreview(fileID: string) {
  try {
    const fileURL = storage.getFilePreview(
      appwriteConfig.storageId,
      fileID,
      2000,
      2000,
      "top",
      100
    );
    console.log("fileURL from backend :", fileURL);

    if (!fileURL) throw Error;
    return fileURL;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteFile(fileID: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileID);
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );

  if (!posts) throw Error;
  return posts;
}
