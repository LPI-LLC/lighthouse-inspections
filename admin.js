/* =========================================
   Lighthouse Property Inspections
   Admin Dashboard
   ========================================= */

(function () {
  'use strict';

  var loginView = document.getElementById('login-view');
  var dashboardView = document.getElementById('dashboard-view');
  var loginForm = document.getElementById('login-form');
  var loginError = document.getElementById('login-error');
  var logoutBtn = document.getElementById('logout-btn');
  var adminUser = document.getElementById('admin-user');

  var allLeads = [];
  var sortField = 'submittedAt';
  var sortDir = 'desc';

  // --- Auth Gate ---
  auth.onAuthStateChanged(function (user) {
    if (user) {
      loginView.style.display = 'none';
      dashboardView.style.display = 'block';
      adminUser.textContent = user.email;
      loadLeads();
    } else {
      loginView.style.display = 'flex';
      dashboardView.style.display = 'none';
    }
  });

  // --- Login ---
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    loginError.textContent = '';
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var btn = document.getElementById('login-btn');
    btn.textContent = 'Signing in...';
    btn.disabled = true;

    auth.signInWithEmailAndPassword(email, password).catch(function (err) {
      loginError.textContent = err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found'
        ? 'Invalid email or password.'
        : err.message;
      btn.textContent = 'Sign In';
      btn.disabled = false;
    });
  });

  // --- Logout ---
  logoutBtn.addEventListener('click', function () {
    auth.signOut();
  });

  // --- Tab Switching ---
  var tabs = document.querySelectorAll('.admin-tabs .tab');
  var tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tabContents.forEach(function (tc) { tc.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
  });

  // --- Load Leads ---
  function loadLeads() {
    db.collection('leads').orderBy('submittedAt', 'desc').get().then(function (snapshot) {
      allLeads = [];
      snapshot.forEach(function (doc) {
        var data = doc.data();
        data.id = doc.id;
        allLeads.push(data);
      });
      renderLeads();
      renderAnalytics();
    }).catch(function (err) {
      console.error('Failed to load leads:', err);
    });
  }

  // --- Render Leads Table ---
  function renderLeads() {
    var filtered = filterLeads(allLeads);
    filtered = sortLeads(filtered);

    var tbody = document.getElementById('leads-tbody');
    var emptyMsg = document.getElementById('leads-empty');

    // Summary counts
    var counts = { new: 0, contacted: 0, scheduled: 0, completed: 0 };
    allLeads.forEach(function (l) {
      if (counts.hasOwnProperty(l.status)) counts[l.status]++;
    });
    document.getElementById('count-new').textContent = counts.new;
    document.getElementById('count-contacted').textContent = counts.contacted;
    document.getElementById('count-scheduled').textContent = counts.scheduled;
    document.getElementById('count-completed').textContent = counts.completed;

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      emptyMsg.style.display = 'block';
      return;
    }
    emptyMsg.style.display = 'none';

    tbody.innerHTML = filtered.map(function (lead) {
      var date = lead.submittedAt ? lead.submittedAt.toDate() : new Date();
      var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      var timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      var source = (lead.source || '').replace(/^\//, '').replace(/\.html$/, '') || 'home';

      return '<tr data-id="' + lead.id + '">' +
        '<td class="cell-date"><div>' + dateStr + '</div><div class="cell-sub">' + timeStr + '</div></td>' +
        '<td class="cell-name">' + esc(lead.name) + '</td>' +
        '<td><a href="mailto:' + esc(lead.email) + '">' + esc(lead.email) + '</a></td>' +
        '<td>' + (lead.phone ? '<a href="tel:' + esc(lead.phone) + '">' + esc(lead.phone) + '</a>' : '—') + '</td>' +
        '<td>' + esc(lead.address || '—') + '</td>' +
        '<td>' + esc(lead.service || '—') + '</td>' +
        '<td class="cell-msg">' + esc(lead.message || '—') + '</td>' +
        '<td class="cell-source">' + esc(source) + '</td>' +
        '<td>' + statusSelect(lead.id, lead.status) + '</td>' +
        '</tr>';
    }).join('');

    // Bind status change handlers
    tbody.querySelectorAll('.status-select').forEach(function (sel) {
      sel.addEventListener('change', function () {
        updateStatus(sel.dataset.id, sel.value);
      });
    });
  }

  function statusSelect(id, current) {
    var statuses = ['new', 'contacted', 'scheduled', 'completed'];
    var html = '<select class="status-select status-' + (current || 'new') + '" data-id="' + id + '">';
    statuses.forEach(function (s) {
      html += '<option value="' + s + '"' + (s === current ? ' selected' : '') + '>' +
        s.charAt(0).toUpperCase() + s.slice(1) + '</option>';
    });
    html += '</select>';
    return html;
  }

  function esc(str) {
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  // --- Update Lead Status ---
  function updateStatus(docId, newStatus) {
    db.collection('leads').doc(docId).update({ status: newStatus }).then(function () {
      var lead = allLeads.find(function (l) { return l.id === docId; });
      if (lead) lead.status = newStatus;
      renderLeads();
    }).catch(function (err) {
      console.error('Status update failed:', err);
    });
  }

  // --- Filtering ---
  function filterLeads(leads) {
    var search = (document.getElementById('leads-search').value || '').toLowerCase();
    var statusFilter = document.getElementById('leads-filter-status').value;
    var serviceFilter = document.getElementById('leads-filter-service').value;

    return leads.filter(function (l) {
      if (statusFilter && l.status !== statusFilter) return false;
      if (serviceFilter && l.service !== serviceFilter) return false;
      if (search) {
        var haystack = [l.name, l.email, l.phone, l.address, l.message, l.service].join(' ').toLowerCase();
        if (haystack.indexOf(search) === -1) return false;
      }
      return true;
    });
  }

  // Bind filter controls
  ['leads-search', 'leads-filter-status', 'leads-filter-service'].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener(id === 'leads-search' ? 'input' : 'change', renderLeads);
  });

  // --- Sorting ---
  function sortLeads(leads) {
    return leads.slice().sort(function (a, b) {
      var aVal = a[sortField];
      var bVal = b[sortField];

      if (sortField === 'submittedAt') {
        aVal = aVal ? aVal.toDate().getTime() : 0;
        bVal = bVal ? bVal.toDate().getTime() : 0;
      } else {
        aVal = (aVal || '').toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Bind sort headers
  document.querySelectorAll('#leads-table th[data-sort]').forEach(function (th) {
    th.addEventListener('click', function () {
      var field = th.dataset.sort;
      if (sortField === field) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortField = field;
        sortDir = field === 'submittedAt' ? 'desc' : 'asc';
      }
      // Update visual indicators
      document.querySelectorAll('#leads-table th').forEach(function (h) {
        h.classList.remove('sort-asc', 'sort-desc');
      });
      th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
      renderLeads();
    });
  });

  // --- CSV Export ---
  document.getElementById('leads-export').addEventListener('click', function () {
    var filtered = sortLeads(filterLeads(allLeads));
    if (filtered.length === 0) return;

    var headers = ['Date', 'Name', 'Email', 'Phone', 'Address', 'Service', 'Message', 'Source', 'Status'];
    var rows = filtered.map(function (l) {
      var date = l.submittedAt ? l.submittedAt.toDate().toISOString() : '';
      return [date, l.name, l.email, l.phone, l.address, l.service, l.message, l.source, l.status]
        .map(function (v) { return '"' + (v || '').replace(/"/g, '""') + '"'; });
    });

    var csv = [headers.join(',')].concat(rows.map(function (r) { return r.join(','); })).join('\n');
    var blob = new Blob([csv], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lighthouse-leads-' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // --- Analytics ---
  function renderAnalytics() {
    var now = new Date();
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    var weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    var monthLeads = 0;
    var weekLeads = 0;
    var serviceCounts = {};
    var sourceCounts = {};
    var completedCount = 0;

    allLeads.forEach(function (l) {
      var date = l.submittedAt ? l.submittedAt.toDate() : new Date(0);
      if (date >= monthStart) monthLeads++;
      if (date >= weekStart) weekLeads++;
      if (l.service) serviceCounts[l.service] = (serviceCounts[l.service] || 0) + 1;
      if (l.source) {
        var s = l.source.replace(/^\//, '').replace(/\.html$/, '') || 'home';
        sourceCounts[s] = (sourceCounts[s] || 0) + 1;
      }
      if (l.status === 'completed') completedCount++;
    });

    document.getElementById('metric-month-leads').textContent = monthLeads;
    document.getElementById('metric-week-leads').textContent = weekLeads;
    document.getElementById('metric-total').textContent = allLeads.length;

    var topService = Object.keys(serviceCounts).sort(function (a, b) { return serviceCounts[b] - serviceCounts[a]; })[0];
    document.getElementById('metric-top-service').textContent = topService || '—';

    var topSource = Object.keys(sourceCounts).sort(function (a, b) { return sourceCounts[b] - sourceCounts[a]; })[0];
    document.getElementById('metric-top-source').textContent = topSource || '—';

    var rate = allLeads.length > 0 ? Math.round((completedCount / allLeads.length) * 100) + '%' : '—';
    document.getElementById('metric-conversion').textContent = rate;
  }

})();
