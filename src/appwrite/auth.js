
import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async forgotPassword(email) {
        try {
            await this.account.createRecovery(email, 'http://localhost:5173/reset-password');
            return { success: true, message: 'Password reset email sent successfully' };
        } catch (error) {
            console.log("Appwrite service :: forgotPassword :: error", error);
            throw error;
        }
    }

    async updatePassword(userId, secret, password, confirmPassword) {
        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            
            await this.account.updateRecovery(userId, secret, password, confirmPassword);
            return { success: true, message: 'Password updated successfully' };
        } catch (error) {
            console.log("Appwrite service :: updatePassword :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService
