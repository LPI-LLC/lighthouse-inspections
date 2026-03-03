# Lighthouse Property Inspections — Website Notes

Hey Andrew! Here's everything you need to know about the new site.

---

## Previewing the Site

The site is on a `redesign` branch — your **live site is untouched**.

**To preview locally:** Just double-click `index.html` in your project folder. Opens right in your browser, everything works.

**To preview on your phone or share a link:** Go to https://app.netlify.com/drop and drag your whole project folder onto the page. Gives you a free shareable URL instantly, no account needed.

---

## Before Going Live — Action Items

### 1. Activate the Contact Form

The form uses [FormSubmit.co](https://formsubmit.co) to send submissions to `andrew@lighthouse-inspections.com`.

**You need to do this once:**
1. Open the site in your browser
2. Fill out the contact form and submit it
3. Check your email at `andrew@lighthouse-inspections.com` for a confirmation from FormSubmit.co
4. Click the activation link in that email

Until you do this, the form **will not deliver any messages**. After activation it works forever.

### 2. Verify Your Contact Info

The site has these everywhere — make sure they're right:
- **Phone:** (269) 718-5299
- **Email:** andrew@lighthouse-inspections.com
- **Domain:** www.lighthouse-inspections.com

### 3. Confirm Services

The site lists these services. Let us know if any should be added, removed, or reworded:
- Residential Home Inspections
- WDO Inspections
- Thermal Imaging
- Chimney, Deck & Roof
- Plumbing, Electrical & HVAC
- Detailed Digital Reports

**Note:** You're also certified for New Construction, 11th Month Warranty, Annual Home Maintenance, and Exterior inspections. Want any of those added as services?

### 4. Confirm Service Area

Currently lists: **Kalamazoo, St. Joseph, and Cass counties**.
- Kalamazoo County: Kalamazoo, Portage, Oshtemo
- St. Joseph County: Three Rivers, Sturgis
- Cass County: Dowagiac, Cassopolis

Let us know if you cover other counties or want different cities called out.

### 5. Review Claims

- **"Same-day reports"** — Can you consistently deliver same day? If not we can soften to "24-48 hours"
- **"I'll respond within 24 hours"** — Doable? Weekends too?
- **"I" vs "We"** — Site uses first person singular. If you plan on hiring, we'd change to "we"

---

## Certification Badges

The certifications section currently uses **icon placeholders** (small SVG icons). To upgrade to your actual InterNACHI badge images:

### How to Get Your Badge Images

1. Log in at **https://www.nachi.org**
2. Go to your **Member Dashboard**
3. Look for **"Logos"** or **"Marketing Materials"**
4. You can also visit **https://www.nachi.org/logos.htm** while logged in
5. Right-click each badge → "Save Image As"
6. Save them into the `assets/` folder in this project

We have placeholder spots for all 15 of your certifications:

1. Certified Professional Inspector (CPI)
2. Residential Property Inspector
3. Chimney Inspector
4. Safe Workplace Inspector
5. Plumbing Inspector
6. WDO Inspector
7. Exterior Inspector
8. Roof Inspector
9. Deck Inspector
10. Infrared Certified / Thermography Inspector
11. Attic, Insulation, Ventilation & Interior
12. New Construction Inspector
13. 11th Month Warranty Inspections
14. Annual Home Maintenance Inspections
15. Moisture Intrusion Inspector

Once you drop the images in `assets/`, let us know and we'll swap the SVG icons for the real badge images.

**Important:** InterNACHI requires active membership to display their badges. If your membership ever lapses, these need to come down.

---

## Going Live

When you're ready, there are two ways to deploy:

**Option A — Merge on GitHub (if you're comfortable with GitHub):**
1. Go to your repo: https://github.com/LPI-LLC/lighthouse-inspections
2. Create a Pull Request from `redesign` into `main`
3. Merge it
4. GitHub Pages will automatically update your live site

**Option B — Let us do it:**
Just say the word and we'll merge it for you.

---

## Tech Details (for reference)

- **Fonts:** Arvo (headings) + Plus Jakarta Sans (body) — both free via Google Fonts
- **Form backend:** FormSubmit.co (free, no account needed, just the email activation)
- **Hosting:** GitHub Pages (via your existing setup)
- **Domain:** CNAME pointed to www.lighthouse-inspections.com
- **No build step** — it's all plain HTML, CSS, and JS. Edit any file and it just works.

### File Structure
```
index.html        — The entire site (single page)
style.css         — All styling
script.js         — Interactivity (nav, animations, form, counters)
favicon.svg       — Browser tab icon
CNAME             — Domain config for GitHub Pages
assets/           — Drop images here (badge PNGs, photos, etc.)
```

---

## Privacy Policy Note

The contact form collects names, emails, phone numbers, and property addresses. You may want to add a privacy policy page at some point, especially since form data goes through FormSubmit.co (a third-party). Not urgent but worth thinking about.
