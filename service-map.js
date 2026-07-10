/**
 * Service Area Map Component
 * Leaflet.js + CartoDB Dark Tiles — no API key required
 */
(function () {
  'use strict';

 // Southwest Michigan service area map center
const CENTER = [42.25, -85.70];
const ZOOM = 8;

  // Gold/navy palette (matches site theme)
  const GOLD = '#D4A847';
  const GOLD_DIM = 'rgba(212, 168, 71, 0.35)';
  const NAVY = '#1B2A4A';

  // Core service counties — approximate polygon boundaries [lat, lng]
    // Core service counties — approximate polygon boundaries [lat, lng]
  const COUNTIES = [
    {
      name: 'St. Joseph County',
      coords: [
        [42.0710, -85.7930],
        [42.0710, -85.2920],
        [41.7590, -85.2920],
        [41.7590, -85.7930]
      ]
    },
    {
      name: 'Cass County',
      coords: [
        [42.0710, -86.2240],
        [42.0710, -85.7930],
        [41.7590, -85.7930],
        [41.7590, -86.2240]
      ]
    },
    {
      name: 'Kalamazoo County',
      coords: [
        [42.4230, -85.9960],
        [42.4230, -85.3740],
        [42.0710, -85.3740],
        [42.0710, -85.9960]
      ]
    },
    {
      name: 'Allegan County',
      coords: [
        [42.7700, -86.2700],
        [42.7700, -85.5400],
        [42.4230, -85.5400],
        [42.4230, -86.2700]
      ]
    },
    {
      name: 'Van Buren County',
      coords: [
        [42.4230, -86.3600],
        [42.4230, -85.7600],
        [42.0710, -85.7600],
        [42.0710, -86.3600]
      ]
    },
    {
      name: 'Berrien County',
      coords: [
        [42.2440, -86.8250],
        [42.2440, -86.2240],
        [41.7590, -86.2240],
        [41.7590, -86.8250]
      ]
    },
    {
      name: 'Branch County',
      coords: [
        [42.0710, -85.2920],
        [42.0710, -84.8260],
        [41.7590, -84.8260],
        [41.7590, -85.2920]
      ]
    },
    {
      name: 'Calhoun County',
      coords: [
        [42.4230, -85.2920],
        [42.4230, -84.7200],
        [42.0710, -84.7200],
        [42.0710, -85.2920]
      ]
    },
    {
      name: 'Eaton County',
      coords: [
        [42.7700, -85.3000],
        [42.7700, -84.6000],
        [42.4230, -84.6000],
        [42.4230, -85.3000]
      ]
    },
    {
      name: 'Barry County',
      coords: [
        [42.7700, -85.5400],
        [42.7700, -85.0700],
        [42.4230, -85.0700],
        [42.4230, -85.5400]
      ]
    }
  ];

  // Cities with geolocation — slug links to landing pages where available
   // Cities with geolocation — slug links to landing pages where available
  var CITIES = [
    { name: 'Three Rivers', lat: 41.9442, lng: -85.6322, hq: true, slug: 'three-rivers' },

    // St. Joseph County
    { name: 'Sturgis', lat: 41.7992, lng: -85.4192, slug: 'sturgis' },
    { name: 'Centreville', lat: 41.9233, lng: -85.5283, slug: 'centreville' },
    { name: 'Constantine', lat: 41.8414, lng: -85.6686, slug: 'constantine' },
    { name: 'Mendon', lat: 41.9181, lng: -85.4536 },
    { name: 'Colon', lat: 41.9581, lng: -85.3244 },
    { name: 'White Pigeon', lat: 41.7984, lng: -85.6427 },

    // Cass County
    { name: 'Dowagiac', lat: 41.9842, lng: -86.1086, slug: 'dowagiac' },
    { name: 'Cassopolis', lat: 41.9117, lng: -86.0100 },
    { name: 'Edwardsburg', lat: 41.7956, lng: -86.0808 },
    { name: 'Marcellus', lat: 41.9953, lng: -85.8156 },

    // Kalamazoo County
    { name: 'Kalamazoo', lat: 42.2917, lng: -85.5872, slug: 'kalamazoo' },
    { name: 'Portage', lat: 42.2012, lng: -85.5800, slug: 'portage' },
    { name: 'Oshtemo', lat: 42.2292, lng: -85.6903 },
    { name: 'Schoolcraft', lat: 42.1142, lng: -85.6378 },
    { name: 'Vicksburg', lat: 42.1200, lng: -85.5333 },

    // Allegan County
    { name: 'Allegan', lat: 42.5292, lng: -85.8553 },
    { name: 'Plainwell', lat: 42.4400, lng: -85.6489 },
    { name: 'Otsego', lat: 42.4606, lng: -85.6964 },
    { name: 'Wayland', lat: 42.6739, lng: -85.6447 },

    // Van Buren County
    { name: 'Paw Paw', lat: 42.2178, lng: -85.8906 },
    { name: 'South Haven', lat: 42.4031, lng: -86.2736 },
    { name: 'Mattawan', lat: 42.2095, lng: -85.7844 },
    { name: 'Lawton', lat: 42.1673, lng: -85.8467 },

    // Berrien County
    { name: 'Niles', lat: 41.8298, lng: -86.2543, slug: 'niles' },
    { name: 'St. Joseph', lat: 42.1098, lng: -86.4800 },
    { name: 'Benton Harbor', lat: 42.1167, lng: -86.4542 },
    { name: 'Buchanan', lat: 41.8273, lng: -86.3611 },

    // Branch County
    { name: 'Coldwater', lat: 41.9403, lng: -85.0006, slug: 'coldwater' },
    { name: 'Bronson', lat: 41.8722, lng: -85.1942 },
    { name: 'Quincy', lat: 41.9442, lng: -84.8839 },
    { name: 'Union City', lat: 42.0667, lng: -85.1361 },

    // Calhoun County
    { name: 'Battle Creek', lat: 42.3212, lng: -85.1797 },
    { name: 'Marshall', lat: 42.2723, lng: -84.9633 },
    { name: 'Albion', lat: 42.2431, lng: -84.7530 },
    { name: 'Springfield', lat: 42.3264, lng: -85.2392 },

    // Eaton County
    { name: 'Charlotte', lat: 42.5636, lng: -84.8358 },
    { name: 'Eaton Rapids', lat: 42.5092, lng: -84.6558 },
    { name: 'Grand Ledge', lat: 42.7534, lng: -84.7464 },
    { name: 'Potterville', lat: 42.6292, lng: -84.7389 },

    // Barry County
    { name: 'Hastings', lat: 42.6459, lng: -85.2908 },
    { name: 'Middleville', lat: 42.7131, lng: -85.4611 },
    { name: 'Delton', lat: 42.5009, lng: -85.4089 },
    { name: 'Nashville', lat: 42.6028, lng: -85.0939 }
  ];
  function createPin(isHQ) {
    var size = isHQ ? 18 : 10;
    var ring = isHQ ? '<circle cx="12" cy="12" r="11" fill="none" stroke="' + GOLD + '" stroke-width="1" opacity="0.35"/>' : '';
    var glow = isHQ ? '<circle cx="12" cy="12" r="6" fill="' + GOLD + '" opacity="0.15"/>' : '';
    var svg = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
      + ring + glow
      + '<circle cx="12" cy="12" r="' + (size / 2) + '" fill="' + GOLD + '" opacity="' + (isHQ ? '1' : '0.8') + '"/>'
      + '<circle cx="12" cy="12" r="' + (size / 2 - 2) + '" fill="' + NAVY + '" opacity="0.4"/>'
      + '</svg>';

    return L.divIcon({
      html: svg,
      className: 'map-pin' + (isHQ ? ' map-pin-hq' : ''),
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  }

  function pageUrl(city) {
    return city.slug ? 'service-areas/' + city.slug + '-home-inspection.html' : null;
  }

  function createTooltipContent(city) {
    var url = pageUrl(city);
    var link = url
      ? '<a href="' + url + '" class="map-tooltip-link">View ' + city.name + ' page &rarr;</a>'
      : '';
    if (city.hq) {
      return '<div class="map-tooltip-hq">'
        + '<strong>' + city.name + '</strong>'
        + '<span>Home Base</span>'
        + link
        + '</div>';
    }
    return '<strong>' + city.name + '</strong>' + link;
  }

  function init() {
    var el = document.getElementById('service-area-map');
    if (!el) return;

    var map = L.map(el, {
      center: CENTER,
      zoom: ZOOM,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      touchZoom: true
    });

    // CartoDB light tiles — free, no API key
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 14,
      minZoom: 7
    }).addTo(map);

    // Minimal attribution
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('&copy; <a href="https://carto.com" style="color:#3B5278">CARTO</a>')
      .addTo(map);

    // County boundaries
    COUNTIES.forEach(function (county) {
      L.polygon(county.coords, {
        color: GOLD,
        weight: 1.5,
        opacity: 0.4,
        fillColor: GOLD,
        fillOpacity: 0.06,
        interactive: false
      }).addTo(map);
    });

    // City markers
    CITIES.forEach(function (city) {
      var marker = L.marker([city.lat, city.lng], {
        icon: createPin(city.hq)
      }).addTo(map);

      marker.bindTooltip(createTooltipContent(city), {
        direction: 'top',
        offset: [0, -14],
        className: 'map-tooltip',
        permanent: false,
        interactive: true
      });

      // Click marker to navigate to city page
      var url = pageUrl(city);
      if (url) {
        marker.on('click', function () {
          window.location.href = url;
        });
        marker.getElement().style.cursor = 'pointer';
      }

      if (city.hq) {
        marker.openTooltip();
      }
    });

    // Zoom controls in bottom-left
    L.control.zoom({ position: 'bottomleft' }).addTo(map);
  }

  // Wait for Leaflet to load, then init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
