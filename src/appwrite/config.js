import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({Title, slug, Contant, featuredImage, status, userId, authorName}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Title,
                    Contant,
                    featuredImage,
                    status,
                    userId,
                    authorName,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {Title, Contant, featuredImage, status, authorName}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Title,
                    Contant,
                    featuredImage,
                    status,
                    authorName,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFileView(featuredImage){
        try {
            // Use getFileView instead of getFilePreview to avoid transformation limits
            const view = this.bucket.getFileView(
                conf.appwriteBucketId,
                featuredImage
            );
            return view.toString();
        } catch (error) {
            console.error("Error getting file view:", error);
            return null;
        }
    }

    async generateSummary(content, title) {
        try {
            const prompt = `Please provide a concise 2-line summary of the following blog post. Focus on the main points and key takeaways. Format your response as exactly 2 lines:

Blog Title: ${title}
Blog Content: ${content}

Summary:`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${conf.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 150,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Summary AI Response:", data);

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const generatedText = data.candidates[0].content.parts[0].text;
                return generatedText.trim();
            } else {
                throw new Error('Invalid response format from API');
            }

        } catch (error) {
            console.error('Error generating summary:', error);
            return 'Failed to generate summary. Please try again.';
        }
    }

    // Method to get user by ID
    async getUserById(userId) {
        try {
            // Note: This would require additional Appwrite setup to access user data
            // For now, we'll return a placeholder
            console.log('Getting user data for:', userId);
            return { name: 'Unknown User' };
        } catch (error) {
            console.log("Appwrite service :: getUserById :: error", error);
            return null;
        }
    }
}


const service = new Service()
export default service