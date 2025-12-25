# 🚀 Publishing Your GeoGuessr Clone to GitHub & GitHub Pages

Follow these steps to publish your project and make it live!

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- Your project should build successfully (`npm run build`)

## 🎯 Step-by-Step Guide

### Step 1: Initialize Git Repository (if not already done)

Open your terminal in the project directory and run:

```bash
git init
git add .
git commit -m "Initial commit: GeoGuessr Clone project"
```

### Step 2: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `geoguessr-clone` (or your preferred name)
   - **Description**: "A modern geography guessing game built with React"
   - **Public** or **Private**: Choose Public for GitHub Pages
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 3: Update Configuration Files

Before pushing, make sure to update these files:

1. **vite.config.js** - Update the `base` property:
   ```javascript
   base: '/geoguessr-clone/', // Use your actual repo name
   ```

2. **README.md** - Replace placeholders:
   - `your-username` → Your GitHub username
   - `Your Name` → Your actual name
   - Add screenshots if you want

### Step 4: Push Your Code to GitHub

Copy the commands from your new GitHub repository page or use these:

```bash
git remote add origin https://github.com/your-username/geoguessr-clone.git
git branch -M main
git push -u origin main
```

Replace `your-username` with your actual GitHub username.

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. In the left sidebar, click **"Pages"**
4. Under **"Build and deployment"**:
   - **Source**: Select "GitHub Actions"
5. That's it! The GitHub Action will automatically deploy your site

### Step 6: Wait for Deployment

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow running
3. Wait for it to complete (usually takes 1-3 minutes)
4. Once done, your site will be live at:
   ```
   https://your-username.github.io/geoguessr-clone/
   ```

## 🔄 Updating Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

The GitHub Action will automatically rebuild and redeploy your site!

## 🎨 Customization Tips

### Add Screenshots to README

1. Take screenshots of your game
2. Upload them to your repository in a `screenshots` folder
3. Update README.md:
   ```markdown
   ## 📸 Screenshots
   
   ![Game Menu](screenshots/menu.png)
   ![Gameplay](screenshots/gameplay.png)
   ![Results](screenshots/results.png)
   ```

### Custom Domain (Optional)

1. Buy a domain name
2. In GitHub Pages settings, add your custom domain
3. Update your DNS records as instructed

## ⚠️ Troubleshooting

### Build Fails
- Check that `npm run build` works locally
- Ensure all dependencies are in `package.json`
- Check the Actions tab for error logs

### Site Shows 404
- Verify the `base` in `vite.config.js` matches your repo name
- Make sure GitHub Pages is enabled
- Wait a few minutes for DNS propagation

### Blank Page
- Check browser console for errors
- Ensure the `base` path in `vite.config.js` is correct
- Clear browser cache and try again

### Assets Not Loading
- Make sure all imports use relative paths
- Check that the `base` path includes the trailing slash

## 📚 Useful Commands

```bash
# Clone your repo elsewhere
git clone https://github.com/your-username/geoguessr-clone.git

# Check git status
git status

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature/new-feature

# View remote repositories
git remote -v
```

## 🎉 You're Done!

Your GeoGuessr clone is now live on the internet! Share the link with friends and family!

**Live URL**: `https://your-username.github.io/geoguessr-clone/`

---

## 📞 Need Help?

If you encounter issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
3. Search for similar issues on Stack Overflow
4. Create an issue in your repository

Happy coding! 🚀
