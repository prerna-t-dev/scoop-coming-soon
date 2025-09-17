# Scoop Coming Soon Page

A beautiful, responsive coming soon page for Scoop lingerie brand with email collection functionality.

## Features

- ✨ Beautiful purple gradient design with floating background shapes
- 📱 Fully responsive (desktop and mobile layouts)
- 📧 Email collection with Google Sheets integration
- 🎨 Elegant typography using Playfair Display and Inter fonts
- ⚡ Fast loading static site
- 🔗 Instagram integration

## Setup Instructions

### 1. Google Sheets Integration

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the code from `google-apps-script.js` into the editor
4. Save the project and give it a name (e.g., "Scoop Email Handler")
5. Deploy as a web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set execute as "Me" and access to "Anyone"
   - Click "Deploy"
6. Copy the web app URL
7. Replace `YOUR_SCRIPT_ID` in `script.js` with your actual script ID from the URL

### 2. Hosting on Netlify

1. Create a [Netlify account](https://netlify.com) (free)
2. Drag and drop the project folder to Netlify dashboard
3. Your site will be live at a random URL (e.g., `amazing-name-123456.netlify.app`)

### 3. Custom Domain Setup (Namecheap)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Netlify will provide DNS records to add in Namecheap:
   - Add A record: `@` → `75.2.60.5`
   - Add CNAME record: `www` → `your-site-name.netlify.app`
5. Wait for DNS propagation (up to 24 hours)

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Frontend JavaScript
├── google-apps-script.js # Backend Google Apps Script code
└── README.md           # This file
```

## Customization

### Colors
- Main background: `#B08FFF` to `#DDCFFF`
- Text color: `#F8F8F8`
- Button: `#000000`

### Fonts
- Headlines: Playfair Display (serif)
- Body text: Inter (sans-serif)

### Content Updates
- Edit `index.html` to change text content
- Update Instagram handle in the social link
- Modify colors in `styles.css`

## Testing

1. Open `index.html` in a browser to test locally
2. Test email submission (requires Google Apps Script setup)
3. Test responsive design on different screen sizes

## Support

For any issues or questions, check:
- Google Apps Script documentation
- Netlify documentation
- Namecheap DNS setup guides

## Cost Breakdown

- ✅ Netlify hosting: FREE
- ✅ Google Apps Script: FREE
- ✅ Domain: Client's existing Namecheap domain
- ✅ Total cost: $0/month
