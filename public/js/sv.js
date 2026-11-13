/* sv.js — small extras for secondvictor.com.
   The site works fully without it: this only adds the theme toggle
   on every page, and the filter / search / raw view on the homepage. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- theme toggle (every page) ---------- */
  var SUN = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>';
  var MOON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === "dark";
    return !!(darkQuery && darkQuery.matches);
  }

  var navList = document.querySelector(".sidebar nav ul");
  if (navList) {
    var li = document.createElement("li");
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    li.appendChild(toggle);
    navList.appendChild(li);

    var paint = function () {
      var dark = isDark();
      toggle.innerHTML = dark ? SUN : MOON;
      toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    };
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("sv-theme", next); } catch (e) {}
      paint();
    });
    if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener("change", paint);
    paint();
  }

  /* ---------- homepage log ---------- */
  var log = document.querySelector("[data-log]");
  if (!log) return;

  var items = Array.prototype.slice.call(log.querySelectorAll(".lines > li"));
  var grep = log.querySelector("[data-grep]");
  var hideDoneBtn = log.querySelector("[data-hide-done]");
  var viewBtns = log.querySelectorAll("[data-view]");
  var tagBar = log.querySelector(".tag-bar");
  var lineList = log.querySelector(".lines");
  var rawBox = log.querySelector("[data-raw]");
  var empty = log.querySelector("[data-empty]");
  var summary = log.querySelector("[data-summary]");

  var state = { tag: null, q: "", hideDone: false, raw: false };
  var tagOrder = [];
  var tagCount = {};

  function kind(tag) { return tag.charAt(0) === "+" ? "proj" : "ctx"; }

  function makeTagButton(tag, cls) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = cls + " " + kind(tag);
    b.dataset.tag = tag;
    b.addEventListener("click", function () {
      state.tag = state.tag === tag ? null : tag;
      render();
    });
    return b;
  }

  // read each line once
  var rows = items.map(function (li) {
    var title = li.querySelector(".title");
    var tags = [];
    Array.prototype.forEach.call(li.querySelectorAll(".line-tags .tag"), function (span) {
      var tag = span.textContent.trim();
      tags.push(tag);
      if (!tagCount[tag]) { tagCount[tag] = 0; tagOrder.push(tag); }
      tagCount[tag] += 1;
      var b = makeTagButton(tag, "tag");
      b.textContent = tag;
      span.parentNode.replaceChild(b, span);
    });
    var done = li.classList.contains("done");
    var date = li.querySelector("time").textContent.trim();
    var text = title.textContent.trim();
    return {
      li: li,
      n: li.querySelector(".n").textContent.trim(),
      title: title,
      text: text,
      tags: tags,
      done: done,
      raw: (done ? "x " : "(A) ") + date + " " + text + " " + tags.join(" ")
    };
  });

  // tag chips with counts, projects first
  tagOrder.sort(function (a, b) {
    return kind(a) === kind(b) ? 0 : (kind(a) === "proj" ? -1 : 1);
  });
  tagOrder.forEach(function (tag) {
    var b = makeTagButton(tag, "chip");
    b.appendChild(document.createTextNode(tag));
    var c = document.createElement("span");
    c.className = "count";
    c.textContent = tagCount[tag];
    b.appendChild(c);
    tagBar.appendChild(b);
  });
  var clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "clear";
  clearBtn.textContent = "clear";
  tagBar.appendChild(clearBtn);

  function clearAll() {
    state.tag = null;
    state.q = "";
    state.hideDone = false;
    grep.value = "";
    render();
  }
  clearBtn.addEventListener("click", clearAll);
  log.querySelector("[data-clear]").addEventListener("click", clearAll);

  grep.addEventListener("input", function () {
    state.q = grep.value;
    render();
  });
  hideDoneBtn.addEventListener("click", function () {
    state.hideDone = !state.hideDone;
    render();
  });
  Array.prototype.forEach.call(viewBtns, function (b) {
    b.addEventListener("click", function () {
      state.raw = b.dataset.view === "raw";
      render();
    });
  });

  function highlight(row, q) {
    var el = row.title;
    var i = q ? row.text.toLowerCase().indexOf(q) : -1;
    el.textContent = "";
    if (i < 0) { el.textContent = row.text; return; }
    el.appendChild(document.createTextNode(row.text.slice(0, i)));
    var m = document.createElement("mark");
    m.textContent = row.text.slice(i, i + q.length);
    el.appendChild(m);
    el.appendChild(document.createTextNode(row.text.slice(i + q.length)));
  }

  function render() {
    var q = state.q.trim().toLowerCase();
    var visible = [];

    rows.forEach(function (row) {
      var show =
        (!state.tag || row.tags.indexOf(state.tag) >= 0) &&
        (!state.hideDone || !row.done) &&
        (!q || row.raw.toLowerCase().indexOf(q) >= 0);
      row.li.hidden = !show;
      highlight(row, q);
      if (show) visible.push(row);
    });

    // pressed states on every tag button
    Array.prototype.forEach.call(log.querySelectorAll("button[data-tag]"), function (b) {
      var on = b.dataset.tag === state.tag;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    clearBtn.hidden = !(state.tag || q || state.hideDone);
    hideDoneBtn.setAttribute("aria-pressed", state.hideDone ? "true" : "false");
    hideDoneBtn.textContent = state.hideDone ? "show done" : "hide done";
    Array.prototype.forEach.call(viewBtns, function (b) {
      b.setAttribute("aria-pressed", (b.dataset.view === "raw") === state.raw ? "true" : "false");
    });

    // raw view: the plain todo.txt lines
    rawBox.textContent = "";
    visible.forEach(function (row) {
      var line = document.createElement("div");
      var n = document.createElement("span");
      n.className = "n";
      n.setAttribute("aria-hidden", "true");
      n.textContent = row.n;
      var t = document.createElement("span");
      t.textContent = row.raw;
      line.appendChild(n);
      line.appendChild(t);
      rawBox.appendChild(line);
    });

    var none = visible.length === 0;
    lineList.hidden = state.raw || none;
    rawBox.hidden = !state.raw || none;
    empty.hidden = !none;

    var done = visible.filter(function (r) { return r.done; }).length;
    summary.textContent =
      visible.length + " of " + rows.length + " lines · " + done + " done · " + (visible.length - done) + " open";
  }

  Array.prototype.forEach.call(log.querySelectorAll("[data-js]"), function (el) { el.hidden = false; });
  render();
})();
