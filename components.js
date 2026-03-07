/* =========================================
   Lighthouse Property Inspections
   Shared Components
   ========================================= */

(function () {
  'use strict';

  // --- Homepage detection ---
  var isHome = /\/(index\.html)?(\?.*)?(\#.*)?$/.test(location.pathname);
  var linkPrefix = isHome ? '' : '../index.html';

  // --- SVG Logo (single source of truth) ---
  var LOGO_SVG = '<svg class="logo-icon" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    // Sunset circle
    '<circle cx="40" cy="50" r="26" fill="#E8922A"/>' +
    // Light rays from lantern
    '<path d="M45,17 L60,9 L47,22" fill="#F5B840" opacity="0.85"/>' +
    '<path d="M35,17 L20,9 L33,22" fill="#F5B840" opacity="0.85"/>' +
    '<path d="M44,14 L52,5 L46,18" fill="#F5B840" opacity="0.6"/>' +
    '<path d="M36,14 L28,5 L34,18" fill="#F5B840" opacity="0.6"/>' +
    // Lighthouse tower (tapered silhouette)
    '<path d="M36,24 L34,68 H46 L44,24 Z" fill="#1A1A1A"/>' +
    // Lantern room (lit glass)
    '<rect x="35" y="17" width="10" height="7" rx="1" fill="#FFFDE8" stroke="#1A1A1A" stroke-width="1"/>' +
    // Cupola roof
    '<path d="M34.5,17 L40,11 L45.5,17 Z" fill="#1A1A1A"/>' +
    // Finial at top
    '<line x1="40" y1="11" x2="40" y2="7" stroke="#1A1A1A" stroke-width="1.5"/>' +
    '<circle cx="40" cy="6" r="1.2" fill="#1A1A1A"/>' +
    // Gallery walkway
    '<rect x="32" y="23.5" width="16" height="2" rx="0.5" fill="#1A1A1A"/>' +
    // Tower band details
    '<rect x="35.5" y="34" width="9" height="1.2" fill="#2A2A2A"/>' +
    '<rect x="35" y="46" width="10" height="1.2" fill="#2A2A2A"/>' +
    '<rect x="34.5" y="58" width="11" height="1.2" fill="#2A2A2A"/>' +
    // Lit windows
    '<rect x="38" y="28" width="4" height="4.5" rx="0.5" fill="#F5C542"/>' +
    '<rect x="37.5" y="38" width="5" height="5" rx="0.5" fill="#F5C542"/>' +
    '<rect x="37" y="49" width="6" height="5.5" rx="0.5" fill="#F5C542"/>' +
    // Base platform (stepped)
    '<path d="M32,68 H48 L51,72 H29 Z" fill="#1A1A1A"/>' +
    '<path d="M26,72 H54 L57,76 H23 Z" fill="#1A1A1A"/>' +
    // Rocky shore
    '<path d="M18,76 Q24,74 30,76 Q36,74.5 40,76 Q44,74.5 50,76 Q56,74 62,76 L60,78 H20 Z" fill="#2C3E5A"/>' +
    // Water reflection lines
    '<line x1="24" y1="82" x2="56" y2="82" stroke="#D49035" stroke-width="1.5" opacity="0.45" stroke-linecap="round"/>' +
    '<line x1="28" y1="85" x2="52" y2="85" stroke="#D49035" stroke-width="1.2" opacity="0.3" stroke-linecap="round"/>' +
    '<line x1="33" y1="88" x2="47" y2="88" stroke="#D49035" stroke-width="1" opacity="0.18" stroke-linecap="round"/>' +
    // Birds
    '<path d="M15,34 Q18,31 21,34" stroke="#1A1A1A" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
    '<path d="M58,30 Q61,27 64,30" stroke="#1A1A1A" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
    '<path d="M10,46 Q13,43 16,46" stroke="#1A1A1A" stroke-width="0.9" fill="none" stroke-linecap="round"/>' +
    '<path d="M63,42 Q66,39 69,42" stroke="#1A1A1A" stroke-width="0.9" fill="none" stroke-linecap="round"/>' +
    '<path d="M13,56 Q15,54 17,56" stroke="#1A1A1A" stroke-width="0.8" fill="none" stroke-linecap="round"/>' +
    '<path d="M64,54 Q66,52 68,54" stroke="#1A1A1A" stroke-width="0.8" fill="none" stroke-linecap="round"/>' +
    '</svg>';

  // --- Phone SVG icon ---
  var PHONE_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>';

  // --- Email SVG icon ---
  var EMAIL_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';

  // --- Service card definitions ---
  var SERVICE_CARDS = [
    {
      svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 40V20L24 8L40 20V40H28V28H20V40H8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>',
      title: 'Residential Home Inspections',
      desc: 'Comprehensive evaluation of structure, electrical, plumbing, roofing, and mechanical systems. We leave no stone unturned so you can buy with confidence.'
    },
    {
      svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="32" width="32" height="10" rx="2" stroke="currentColor" stroke-width="2.5"/><path d="M14 32V14L24 8L34 14V32" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 24H28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      title: 'Chimney, Deck &amp; Roof',
      desc: 'Specialized inspections of exterior structures &mdash; evaluating chimneys, decking, and roofing systems for safety, function, and general condition.'
    },
    {
      svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 6V12M24 36V42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M12 24H6M42 24H36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2.5"/><path d="M24 18V24L28 28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 10L14 14M34 34L38 38M38 10L34 14M14 34L10 38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      title: 'Plumbing, Electrical &amp; HVAC',
      desc: "In-depth evaluation of your home's critical systems &mdash; water supply, drainage, wiring, panels, heating, and cooling. Safety and efficiency assessed."
    },
    {
      svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="6" width="24" height="36" rx="2" stroke="currentColor" stroke-width="2.5"/><path d="M18 16H30M18 22H30M18 28H26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="36" cy="36" r="8" stroke="currentColor" stroke-width="2.5"/><path d="M42 42L46 46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
      title: 'WDO Inspections',
      desc: 'Thorough inspection for wood-destroying organisms &mdash; identifying activity, damage, and conducive conditions that could compromise your property.'
    },
    {
      svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.2"/><circle cx="24" cy="24" r="3" fill="currentColor"/><path d="M24 8V4M24 44V40M40 24H44M4 24H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      title: 'Thermal Imaging',
      desc: 'Infrared technology that reveals hidden moisture intrusion, insulation deficiencies, and energy loss invisible to the naked eye.'
    },
    {
      svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M6 18H42" stroke="currentColor" stroke-width="2"/><path d="M14 26H26M14 32H22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="30" y="24" width="6" height="6" rx="1" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.5"/></svg>',
      title: 'Detailed Digital Reports',
      desc: 'Clear, thorough reporting with high-resolution photos, findings organized by system, and practical recommendations delivered digitally.'
    }
  ];

  // --- Storm banner: check if previously dismissed ---
  var bannerDismissed = false;
  try { bannerDismissed = localStorage.getItem('lpi-storm-banner-dismissed') === '1'; } catch (e) {}

  // --- Inject components on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', function () {
    injectNav();
    injectStormBanner();
    injectServices();
    injectContact();
    injectFooter();
  });

  // --- Navigation ---
  function injectNav() {
    var el = document.getElementById('nav-placeholder');
    if (!el) return;

    var logoHref = isHome ? '#' : '../index.html';

    el.outerHTML =
      '<nav id="navbar">' +
        '<div class="nav-container">' +
          '<a href="' + logoHref + '" class="nav-logo">' +
            LOGO_SVG +
            '<div class="logo-text">' +
              '<span class="logo-name">LIGHTHOUSE</span>' +
              '<span class="logo-sub">Property Inspections, LLC</span>' +
            '</div>' +
          '</a>' +
          '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
          '<ul class="nav-links">' +
            '<li><a href="' + linkPrefix + '#services">Services</a></li>' +
            '<li><a href="' + linkPrefix + '#why-us">Why Us</a></li>' +
            '<li><a href="' + linkPrefix + '#certifications">Certifications</a></li>' +
            '<li><a href="' + linkPrefix + '#service-area">Service Area</a></li>' +
            '<li><a href="#contact" class="nav-cta">Request Inspection</a></li>' +
          '</ul>' +
        '</div>' +
      '</nav>';
  }

  // --- Storm Banner ---
  function injectStormBanner() {
    var el = document.getElementById('storm-banner-placeholder');
    if (!el) return;

    var href = el.getAttribute('data-banner-href') || (isHome ? 'service-areas/three-rivers-home-inspection.html' : 'three-rivers-home-inspection.html');
    var hiddenClass = bannerDismissed ? ' hidden' : '';

    el.outerHTML =
      '<div class="storm-banner' + hiddenClass + '" id="storm-banner">' +
        '<a href="' + href + '" class="storm-banner-link">' +
          '<span class="storm-banner-icon">&#9888;&#65039;</span>' +
          '<span class="storm-banner-text"><strong>Our hearts are with Three Rivers.</strong> Free post-storm assessments for affected neighbors. <span class="storm-banner-arrow">&rarr;</span></span>' +
        '</a>' +
        '<button class="storm-banner-close" aria-label="Dismiss banner" onclick="dismissStormBanner()">&times;</button>' +
      '</div>';
  }

  // --- Services Section ---
  function injectServices() {
    var el = document.getElementById('services-placeholder');
    if (!el) return;

    var title = el.getAttribute('data-services-title') || 'Inspection Services';
    var desc = el.getAttribute('data-services-desc') || 'Every inspection follows InterNACHI&reg; Standards of Practice, delivered with clear communication and detailed digital reports.';

    var cardsHTML = '';
    for (var i = 0; i < SERVICE_CARDS.length; i++) {
      var card = SERVICE_CARDS[i];
      cardsHTML +=
        '<div class="service-card" data-aos>' +
          '<div class="service-icon">' + card.svg + '</div>' +
          '<h3>' + card.title + '</h3>' +
          '<p>' + card.desc + '</p>' +
        '</div>';
    }

    el.outerHTML =
      '<section id="services">' +
        '<div class="container">' +
          '<div class="section-header">' +
            '<p class="section-label">What We Offer</p>' +
            '<h2>' + title + '</h2>' +
            '<p class="section-desc">' + desc + '</p>' +
          '</div>' +
          '<div class="services-grid">' + cardsHTML + '</div>' +
        '</div>' +
      '</section>';
  }

  // --- Contact / CTA Section ---
  function injectContact() {
    var el = document.getElementById('contact-placeholder');
    if (!el) return;

    var city = el.getAttribute('data-city') || 'Southwest Michigan';
    var addressPlaceholder = el.getAttribute('data-address-placeholder') || '123 Main St, Kalamazoo, MI';
    var subject = city === 'Southwest Michigan'
      ? 'New Inspection Request from Website'
      : 'Inspection Request \u2014 ' + city;
    var formNext = location.href.split('#')[0] + '#contact';

    el.outerHTML =
      '<section id="contact">' +
        '<div class="container">' +
          '<div class="contact-grid">' +
            '<div class="contact-info">' +
              '<p class="section-label">Get Started</p>' +
              '<h2>Schedule Your Inspection Today</h2>' +
              '<p>Ready to move forward with confidence? Reach out to schedule your inspection or ask any questions &mdash; I\'m happy to help.</p>' +
              '<div class="contact-methods">' +
                '<a href="tel:2697185299" class="contact-method">' +
                  '<div class="contact-method-icon">' + PHONE_SVG + '</div>' +
                  '<div>' +
                    '<span class="contact-method-label">Call or Text</span>' +
                    '<span class="contact-method-value">(269) 718-5299</span>' +
                  '</div>' +
                '</a>' +
                '<a href="mailto:Andrew@lighthouse-inspections.com" class="contact-method">' +
                  '<div class="contact-method-icon">' + EMAIL_SVG + '</div>' +
                  '<div>' +
                    '<span class="contact-method-label">Email</span>' +
                    '<span class="contact-method-value">Andrew@lighthouse-inspections.com</span>' +
                  '</div>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<div class="contact-form-wrapper">' +
              '<form id="contact-form" class="contact-form" action="https://formsubmit.co/andrew@lighthouse-inspections.com" method="POST">' +
                '<input type="hidden" name="_subject" value="' + subject + '">' +
                '<input type="hidden" name="_captcha" value="false">' +
                '<input type="hidden" name="_next" value="' + formNext + '">' +
                '<input type="text" name="_honey" style="display:none">' +
                '<h3>Request an Inspection</h3>' +
                '<div class="form-group">' +
                  '<label for="name">Full Name</label>' +
                  '<input type="text" id="name" name="name" required placeholder="Your full name">' +
                '</div>' +
                '<div class="form-row">' +
                  '<div class="form-group">' +
                    '<label for="email">Email</label>' +
                    '<input type="email" id="email" name="email" required placeholder="you@email.com">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="phone">Phone</label>' +
                    '<input type="tel" id="phone" name="phone" placeholder="(269) 555-0123">' +
                  '</div>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="address">Property Address</label>' +
                  '<input type="text" id="address" name="address" placeholder="' + addressPlaceholder + '">' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="service">Service Needed</label>' +
                  '<select id="service" name="service">' +
                    '<option value="">Select a service...</option>' +
                    '<option value="residential">Residential Home Inspection</option>' +
                    '<option value="wdo">WDO Inspection</option>' +
                    '<option value="thermal">Thermal Imaging</option>' +
                    '<option value="chimney">Chimney, Deck &amp; Roof</option>' +
                    '<option value="plumbing">Plumbing, Electrical &amp; HVAC</option>' +
                    '<option value="combo">Multiple / Combo Inspection</option>' +
                  '</select>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="message">Additional Details</label>' +
                  '<textarea id="message" name="message" rows="3" placeholder="Preferred date, special concerns, etc."></textarea>' +
                '</div>' +
                '<button type="submit" class="btn btn-primary btn-full">Send Request</button>' +
                '<p class="form-note">I\'ll respond within 24 hours to confirm your appointment.</p>' +
              '</form>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  // --- Footer ---
  function injectFooter() {
    var el = document.getElementById('footer-placeholder');
    if (!el) return;

    el.outerHTML =
      '<footer id="footer">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<a href="' + (isHome ? '#' : '../index.html') + '" class="nav-logo">' +
                LOGO_SVG +
                '<div class="logo-text">' +
                  '<span class="logo-name">LIGHTHOUSE</span>' +
                  '<span class="logo-sub">Property Inspections, LLC</span>' +
                '</div>' +
              '</a>' +
              '<p class="footer-tagline">Guiding You Home With Confidence</p>' +
              '<div class="footer-social">' +
                '<a href="https://www.facebook.com/LighthousePI" target="_blank" rel="noopener" aria-label="Facebook">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
                '</a>' +
                '<a href="#" target="_blank" rel="noopener" aria-label="Google Business Profile">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<div class="footer-links">' +
              '<h4>Quick Links</h4>' +
              '<a href="' + linkPrefix + '#services">Services</a>' +
              '<a href="' + linkPrefix + '#why-us">Why Us</a>' +
              '<a href="' + linkPrefix + '#certifications">Certifications</a>' +
              '<a href="' + linkPrefix + '#service-area">Service Area</a>' +
              '<a href="#contact">Contact</a>' +
            '</div>' +
            '<div class="footer-links">' +
              '<h4>Services</h4>' +
              '<a href="' + linkPrefix + '#services">Residential Inspections</a>' +
              '<a href="' + linkPrefix + '#services">WDO Inspections</a>' +
              '<a href="' + linkPrefix + '#services">Thermal Imaging</a>' +
              '<a href="' + linkPrefix + '#services">Chimney, Deck &amp; Roof</a>' +
              '<a href="' + linkPrefix + '#services">Plumbing, Electrical &amp; HVAC</a>' +
            '</div>' +
            '<div class="footer-contact">' +
              '<h4>Contact</h4>' +
              '<a href="tel:2697185299">(269) 718-5299</a>' +
              '<a href="mailto:Andrew@lighthouse-inspections.com">Andrew@lighthouse-inspections.com</a>' +
              '<p>Southwest Michigan</p>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p>&copy; 2026 Lighthouse Property Inspections, LLC. All rights reserved.</p>' +
            '<p class="footer-inter">InterNACHI&reg; Certified Professional Inspector</p>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

})();
