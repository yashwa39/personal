# 📝 Content Editing Guide

## How to Edit Your Content

### Getting Started

1. **Click "Edit Content"** button in the top-right corner
2. **Edit buttons** will appear on each section
3. **Click the edit button** on any section to modify it
4. **Save your changes** when done
5. **Lock editing** when you're completely finished

### Editing Sections

#### 1. Bio (About Section)
- Click "✏️ Edit Bio" on the bio card
- Edit: Name, Age, Interests (comma-separated), Backstory
- Click "Save" to apply changes

#### 2. Photos
- Click "✏️ Edit Photos" in the Photos section
- **Add Photo**: Enter image URL, title, and description
- **Edit Existing**: Modify title, description, or URL
- **Delete**: Click delete button on any photo
- Click "Save All" to apply changes

#### 3. Projects
- Click "✏️ Edit Projects" in the Projects section
- **Add Project**: Enter title, description, link, and lock status
- **Edit Existing**: Modify any project details
- **Delete**: Click delete button on any project
- **Locked Projects**: Check "Locked" to require mini-game to unlock
- Click "Save All" to apply changes

#### 4. Collages
- Click "✏️ Edit Collages" in the Collage section
- **Add Element**: Enter image URL and position/size
- **Edit Existing**: Modify position, size, or image
- **Delete**: Click delete button on any element
- Click "Save All" to apply changes

#### 5. Social Links
- Click "✏️ Edit Social Links" in the Velvet Room section
- **Add Link**: Enter name (e.g., "GitHub") and URL
- **Edit Existing**: Modify name or URL
- **Delete**: Click delete button on any link
- Click "Save All" to apply changes

### Permanently Lock Editing

⚠️ **WARNING: This action cannot be undone!**

1. Enter **Edit Mode** (click "Edit Content")
2. Click **"🔒 Lock Editing"** button
3. Confirm twice (safety measure)
4. Editing will be **permanently disabled**
5. No one (including you) can edit content after this

### Tips

- **Image URLs**: You can use:
  - Direct image URLs (e.g., `https://example.com/image.jpg`)
  - Relative paths (e.g., `images/photo1.jpg`)
  - Base64 encoded images
  
- **Saving**: Changes are saved to browser localStorage
  - They persist across page refreshes
  - They're specific to your browser
  
- **Backup**: Before locking, consider:
  - Exporting your content (copy from browser console)
  - Taking screenshots
  - Saving important URLs/links elsewhere

### Troubleshooting

**Edit buttons not showing?**
- Make sure you clicked "Edit Content" first
- Check if editing is locked (you'll see a message)

**Changes not saving?**
- Check browser console for errors
- Make sure you clicked "Save" or "Save All"
- Verify browser allows localStorage

**Can't unlock editing?**
- If locked, editing cannot be re-enabled
- This is by design for security
- You'll need to clear browser data to reset (loses all content)

### Data Storage

All content is stored in **browser localStorage** under the key `palace_content`.

To export your content:
1. Open browser console (F12)
2. Type: `localStorage.getItem('palace_content')`
3. Copy the JSON output
4. Save it somewhere safe

To import content:
1. Open browser console (F12)
2. Type: `localStorage.setItem('palace_content', 'YOUR_JSON_HERE')`
3. Refresh the page

