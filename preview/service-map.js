/**
 * Service Area Map Component
 * Leaflet.js + CartoDB Dark Tiles — no API key required
 */
(function () {
  'use strict';

  // Three Rivers, MI as center
  const CENTER = [42.05, -85.72];
  const ZOOM = 9;

  // Gold/navy palette (matches site theme)
  const GOLD = '#D4A847';
  const GOLD_DIM = 'rgba(212, 168, 71, 0.35)';
  const NAVY = '#1B2A4A';

  // Core service counties — approximate polygon boundaries [lat, lng]
  const COUNTIES = [
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
    }
  ];

  // Cities with geolocation — slug links to landing pages where available
  var CITIES = [
    { name: 'Three Rivers', lat: 41.9442, lng: -85.6322, hq: true, slug: 'three-rivers' },
    { name: 'Kalamazoo',    lat: 42.2917, lng: -85.5872, slug: 'kalamazoo' },
    { name: 'Portage',      lat: 42.2012, lng: -85.5800, slug: 'portage' },
    { name: 'Sturgis',      lat: 41.7992, lng: -85.4192, slug: 'sturgis' },
    { name: 'Vicksburg',    lat: 42.1200, lng: -85.5333 },
    { name: 'Dowagiac',     lat: 41.9842, lng: -86.1086, slug: 'dowagiac' },
    { name: 'Cassopolis',   lat: 41.9117, lng: -86.0100 },
    { name: 'Centreville',  lat: 41.9233, lng: -85.5283, slug: 'centreville' },
    { name: 'Constantine',  lat: 41.8414, lng: -85.6686, slug: 'constantine' },
    { name: 'Schoolcraft',  lat: 42.1142, lng: -85.6378 },
    { name: 'Coldwater',    lat: 41.9403, lng: -85.0006, slug: 'coldwater' },
    { name: 'Niles',        lat: 41.8298, lng: -86.2543, slug: 'niles' },
    { name: 'Paw Paw',      lat: 42.2178, lng: -85.8906 },
    { name: 'White Pigeon', lat: 41.7984, lng: -85.6427 },
    { name: 'Oshtemo',      lat: 42.2292, lng: -85.6903 },
    { name: 'Edwardsburg',  lat: 41.7956, lng: -86.0808 },
    { name: 'Marcellus',    lat: 41.9953, lng: -85.8156 },
    { name: 'Mendon',       lat: 41.9181, lng: -85.4536 },
    { name: 'Colon',        lat: 41.9581, lng: -85.3244 },
    { name: 'Bronson',      lat: 41.8722, lng: -85.1942 }
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
    return city.slug ? city.slug + '-home-inspection.html' : null;
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
