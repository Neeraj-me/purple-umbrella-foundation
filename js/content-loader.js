/*
 * content-loader.js
 * Renders admin-editable sections (Home hero, Team, Our Work, Festival, Impact,
 * Climate Promise, Our Journey, Partners) from the JSON files in /content.
 * Those files are edited through the /admin panel (Sveltia CMS) — this script
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

  var ICONS = {
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H16.5V4.2C16.2 4.1 15.2 4 14 4c-2.4 0-4 1.5-4 4.2V10.5H7.5v3H10V21h3.5z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-.9 1.9-1.9 3.9-1.9 4.2 0 5 2.7 5 6.3V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z"/></svg>'
  };

  function initials(name) {
    return String(name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(function (w) { return w[0] ? w[0].toUpperCase() : ""; })
      .join("");
  }

  function renderSocialLinks(m) {
    var links = [
      { key: "x_url", label: "X", icon: ICONS.x },
      { key: "facebook_url", label: "Facebook", icon: ICONS.facebook },
      { key: "instagram_url", label: "Instagram", icon: ICONS.instagram },
      { key: "linkedin_url", label: "LinkedIn", icon: ICONS.linkedin }
    ].filter(function (l) { return m[l.key]; });
    if (!links.length) return "";
    return '<div class="team-social">' + links.map(function (l) {
      return '<a href="' + escapeHTML(m[l.key]) + '" target="_blank" rel="noopener" aria-label="' + l.label + '">' + l.icon + '</a>';
    }).join('') + '</div>';
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
          renderSocialLinks(m) +
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

  /* ---------- Home hero (image / video / carousel) ---------- */
  function renderHero(container, hero) {
    if (!hero) return;
    var type = hero.media_type || 'image';
    if (type === 'video' && hero.video) {
      container.classList.add('has-media');
      container.innerHTML = '<video src="' + escapeHTML(hero.video) + '" autoplay muted loop playsinline controls></video>';
    } else if (type === 'carousel' && hero.gallery && hero.gallery.length) {
      container.classList.add('has-media');
      renderHeroCarousel(container, hero.gallery);
    } else if (hero.image) {
      container.classList.add('has-media');
      container.innerHTML = '<img src="' + escapeHTML(hero.image) + '" alt="Purple Umbrella Festival">';
    }
    /* else: leave the existing fallback (logo) exactly as it is */
  }

  function renderHeroCarousel(container, gallery) {
    var slides = gallery.map(function (g) { return typeof g === 'string' ? g : g.image; }).filter(Boolean);
    if (!slides.length) return;
    var imgs = slides.map(function (src, i) {
      return '<img src="' + escapeHTML(src) + '" alt="Purple Umbrella Festival"' + (i === 0 ? ' class="is-active"' : '') + '>';
    }).join('');
    var dots = slides.length > 1
      ? '<div class="hero-carousel-dots">' + slides.map(function (_, i) {
          return '<button aria-label="Show photo ' + (i + 1) + '"' + (i === 0 ? ' class="is-active"' : '') + '></button>';
        }).join('') + '</div>'
      : '';
    container.innerHTML = '<div class="hero-carousel">' + imgs + dots + '</div>';
    if (slides.length > 1) {
      var imgEls = container.querySelectorAll('.hero-carousel img');
      var dotEls = container.querySelectorAll('.hero-carousel-dots button');
      var idx = 0;
      function show(i) {
        imgEls.forEach(function (el, j) { el.classList.toggle('is-active', j === i); });
        dotEls.forEach(function (el, j) { el.classList.toggle('is-active', j === i); });
        idx = i;
      }
      dotEls.forEach(function (el, i) { el.addEventListener('click', function () { show(i); }); });
      setInterval(function () { show((idx + 1) % imgEls.length); }, 5000);
    }
  }

  /* ---------- Festival: edition banner + photo gallery ---------- */
  function renderFestivalEdition(edition) {
    if (!edition) return;
    var tagEl = document.getElementById('festival-edition-tag');
    var titleEl = document.getElementById('festival-edition-title');
    var descEl = document.getElementById('festival-edition-desc');
    if (tagEl && edition.tag) tagEl.textContent = edition.tag;
    if (titleEl && edition.title) titleEl.textContent = edition.title;
    if (descEl && edition.description) descEl.textContent = edition.description;
  }

  function renderGallery(container, photos, emptyMsg) {
    if (!photos || !photos.length) {
      container.innerHTML = '<p class="content-empty">' + emptyMsg + '</p>';
      return;
    }
    container.innerHTML = photos.map(function (p) {
      var src = p.image || p;
      var alt = p.caption || 'Purple Umbrella Festival photo';
      var caption = p.caption ? '<figcaption>' + escapeHTML(p.caption) + '</figcaption>' : '';
      return '<figure class="card gallery-item"><img src="' + escapeHTML(src) + '" alt="' + escapeHTML(alt) + '">' + caption + '</figure>';
    }).join('');
  }

  /* ---------- Impact: Reach / Change figures ---------- */
  function renderImpactMetrics(prefix, metrics) {
    var statsEl = document.getElementById(prefix + '-stats');
    var placeholderEl = document.getElementById(prefix + '-placeholder');
    if (!statsEl || !metrics || !metrics.length) return; /* leave the default placeholder visible */
    statsEl.innerHTML = metrics.map(function (m) {
      return '<div><strong>' + escapeHTML(m.value) + escapeHTML(m.unit || '') + '</strong><span>' + escapeHTML(m.label) + '</span></div>';
    }).join('');
    statsEl.style.display = '';
    if (placeholderEl) placeholderEl.style.display = 'none';
  }

  /* ---------- Climate Promise: participation indicators ---------- */
  function renderClimateIndicators(container, indicators) {
    if (!indicators || !indicators.length) return; /* leave the default em-dashes */
    container.innerHTML = indicators.map(function (ind) {
      return '<div><strong>' + escapeHTML(ind.value) + '</strong><span>' + escapeHTML(ind.label) + '</span></div>';
    }).join('');
  }

  /* ---------- Our Journey: milestone timeline ---------- */
  function renderJourney(container, milestones) {
    if (!milestones || !milestones.length) {
      container.innerHTML = '<p class="content-empty">Our journey will appear here once milestones are added through the admin panel.</p>';
      return;
    }
    var num = 0;
    container.innerHTML = milestones.map(function (m) {
      if (m.bookend) {
        return (
          '<div class="journey-item milestone"><div class="journey-dot">&bull;</div><h3>' + escapeHTML(m.title) + '</h3>' +
          (m.description ? '<p>' + escapeHTML(m.description) + '</p>' : '') + '</div>'
        );
      }
      num++;
      return (
        '<div class="journey-item"><div class="journey-dot">' + num + '</div>' +
        (m.year ? '<span class="journey-year">' + escapeHTML(m.year) + '</span>' : '') +
        '<h3>' + escapeHTML(m.title) + '</h3>' +
        (m.description ? '<p>' + escapeHTML(m.description) + '</p>' : '') + '</div>'
      );
    }).join('');
  }

  /* ---------- Partners: logo grid (hidden entirely until one is added) ---------- */
  function renderPartners(container, partners) {
    var section = container.closest('section');
    if (!partners || !partners.length) {
      if (section) section.style.display = 'none';
      return;
    }
    if (section) section.style.display = '';
    container.innerHTML = partners.map(function (p) {
      var logo = '<img src="' + escapeHTML(p.logo) + '" alt="' + escapeHTML(p.name) + '">';
      return p.website_url
        ? '<a class="partner-logo" href="' + escapeHTML(p.website_url) + '" target="_blank" rel="noopener">' + logo + '</a>'
        : '<div class="partner-logo">' + logo + '</div>';
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

    var heroEl = document.getElementById('hero-media');
    if (heroEl) {
      loadJSON('content/home.json', function (data) { if (data && data.hero) renderHero(heroEl, data.hero); }, function () {});
    }

    var festivalGalleryEl = document.getElementById('festival-gallery');
    var festivalEditionEl = document.getElementById('festival-edition-title');
    if (festivalGalleryEl || festivalEditionEl) {
      loadJSON('content/festival.json', function (data) {
        if (!data) return;
        if (festivalEditionEl) renderFestivalEdition(data.edition);
        if (festivalGalleryEl) renderGallery(festivalGalleryEl, data.gallery, 'Photos from the Festival will appear here once added through the admin panel.');
      }, function () {});
    }

    var reachStatsEl = document.getElementById('reach-stats');
    var changeStatsEl = document.getElementById('change-stats');
    if (reachStatsEl || changeStatsEl) {
      loadJSON('content/impact.json', function (data) {
        if (!data) return;
        renderImpactMetrics('reach', data.reach_metrics);
        renderImpactMetrics('change', data.change_metrics);
      }, function () {});
    }

    var climateIndicatorsEl = document.getElementById('climate-indicators');
    if (climateIndicatorsEl) {
      loadJSON('content/climate-promise.json', function (data) { if (data) renderClimateIndicators(climateIndicatorsEl, data.indicators); }, function () {});
    }

    var journeyEl = document.getElementById('journey-timeline');
    if (journeyEl) {
      loadJSON('content/journey.json', function (data) { renderJourney(journeyEl, data && data.milestones); }, function () { renderJourney(journeyEl, []); });
    }

    var partnersEl = document.getElementById('partners-grid');
    if (partnersEl) {
      loadJSON('content/partners.json', function (data) { renderPartners(partnersEl, data && data.partners); }, function () {
        var section = partnersEl.closest('section');
        if (section) section.style.display = 'none';
      });
    }
  });
})();
