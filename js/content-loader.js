/*
 * content-loader.js
 * Renders the Team and Work sections from content/team.json and content/work.json.
 * Those two files are edited through the /admin panel (Sveltia CMS) — this script
 * just fetches them and builds the HTML at page load. No build step required.
 */
(function () {
  function escapeHTML(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initials(name) {
    return String(name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(function (w) { return w[0] ? w[0].toUpperCase() : ""; })
      .join("");
  }

  function renderTeam(container, members) {
    if (!members || !members.length) {
      container.innerHTML = '<p class="content-empty">Team members will appear here once added through the admin panel.</p>';
      return;
    }
    container.innerHTML = members.map(function (m) {
      var photo = m.photo
        ? '<img class="team-photo" src="' + escapeHTML(m.photo) + '" alt="' + escapeHTML(m.name) + '">'
        : '<div class="team-photo-fallback">' + escapeHTML(initials(m.name)) + '</div>';
      return (
        '<div class="card team-card">' +
          photo +
          '<h3>' + escapeHTML(m.name) + '</h3>' +
          (m.role ? '<div class="team-role">' + escapeHTML(m.role) + '</div>' : '') +
          (m.bio ? '<p>' + escapeHTML(m.bio) + '</p>' : '') +
        '</div>'
      );
    }).join('');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return escapeHTML(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderWork(container, items) {
    if (!items || !items.length) {
      container.innerHTML = '<p class="content-empty">Updates about our work will appear here as they’re added through the admin panel.</p>';
      return;
    }
    var sorted = items.slice().sort(function (a, b) {
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
    container.innerHTML = sorted.map(function (item) {
      var thumb = item.image
        ? '<img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.title || "") + '">'
        : '<div class="post-thumb" style="background:linear-gradient(135deg, var(--purple-500), var(--purple-800));"></div>';
      return (
        '<article class="card post-card">' +
          thumb +
          (item.category ? '<span class="tag">' + escapeHTML(item.category) + '</span>' : '') +
          (item.date ? '<div class="post-meta"><span>' + formatDate(item.date) + '</span></div>' : '') +
          '<h3>' + escapeHTML(item.title) + '</h3>' +
          (item.excerpt ? '<p>' + escapeHTML(item.excerpt) + '</p>' : '') +
        '</article>'
      );
    }).join('');
  }

  function loadJSON(path, onSuccess, onError) {
    fetch(path, { cache: 'no-store' })
      .then(function (res) { if (!res.ok) throw new Error('not found'); return res.json(); })
      .then(onSuccess)
      .catch(function () { onError && onError(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var teamEl = document.getElementById('team-grid');
    if (teamEl) {
      loadJSON('content/team.json', function (data) { renderTeam(teamEl, data && data.members); }, function () { renderTeam(teamEl, []); });
    }
    var workEl = document.getElementById('work-grid');
    if (workEl) {
      loadJSON('content/work.json', function (data) { renderWork(workEl, data && data.items); }, function () { renderWork(workEl, []); });
    }
  });
})();
