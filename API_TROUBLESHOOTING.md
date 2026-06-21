# Gemini API Key Troubleshooting

## 🚨 Current Issue:
Your API key length is only 27 characters, but it should be 39 characters.

## 🔍 Debug Information:
- **Expected Key**: `AIzaSyAOxomL_8B7HCEi0lmB6WgPaHsJ1Rdm6Jc` (39 chars)
- **Current Length**: 27 characters
- **Expected Length**: 39 characters

## 🔧 Quick Fix Steps:

### 1. Check Your .env File
Make sure your `.env` file contains EXACTLY:
```env
VITE_GEMINI_API_KEY=AIzaSyAOxomL_8B7HCEi0lmB6WgPaHsJ1Rdm6Jc
```

### 2. Common Issues:
- ❌ **Missing characters**: Check if the key was cut off
- ❌ **Extra spaces**: Remove any spaces around `=`
- ❌ **Quotes**: Don't add quotes around the key
- ❌ **Wrong location**: `.env` must be in project root

### 3. Restart Server (IMPORTANT!)
```bash
# Stop server (Ctrl+C)
npm run dev
```

### 4. Verify the Fix:
After restarting, check the console for:
- ✅ "Raw API key from env: AIzaSyAOxomL_8B7HCEi0lmB6WgPaHsJ1Rdm6Jc"
- ✅ "API key length: 39"

## 🎯 Test Again:
1. Go to Add Post page
2. Enter title "book"
3. Click "✨ Generate with AI"
4. Should work without 400 error

## 📋 Correct .env File Format:
```
VITE_GEMINI_API_KEY=AIzaSyAOxomL_8B7HCEi0lmB6WgPaHsJ1Rdm6Jc
```

## 🔐 Security Reminder:
- Never commit `.env` to Git
- Keep the key private
- The key should start with "AIzaSy" and be 39 chars long

If you still get errors, the .env file is likely not being read correctly. Check:
1. File is named exactly `.env` (not `.env.txt` or similar)
2. File is in the project root directory
3. Development server was restarted after adding the key
