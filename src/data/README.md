# Content Management

This directory contains the single source of truth for all website content.

## 📄 content.json

All site content is managed in `content.json`. This includes:

- **Hero Section** - Main landing page content
- **Features** - Service/product features
- **Process** - Step-by-step process information
- **Testimonials** - Customer reviews and ratings
- **Contact** - Contact form configuration and info
- **Navigation** - Menu links and structure
- **Footer** - Footer links and information
- **Metadata** - SEO and social media tags

## 🎯 How to Update Content

1. **Open** `content.json`
2. **Edit** the relevant section
3. **Save** the file
4. **Refresh** your browser - changes appear immediately in dev mode
5. **Rebuild** for production: `pnpm build`

## 📝 Example: Update Hero Title

```json
{
  "hero": {
    "title": "Your New Title Here",
    "subtitle": "Your new subtitle"
  }
}
```

## 🔄 No CMS Required

This approach keeps things simple:
- ✅ Fast development
- ✅ Version controlled (Git)
- ✅ No database required
- ✅ Easy to backup
- ✅ Type-safe with TypeScript

## 🚀 Future: Add CMS (Optional)

If you need a CMS later, the architecture is ready:
- See `/src/services/cms.ts` for CMS integration template
- Swap JSON import with API calls in `/src/lib/content.ts`
- Keep the same content structure
