/* ═══════════════════════════════════════════════
   Halo — landing page interactions
   ═══════════════════════════════════════════════ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Footer year
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    // Sticky nav shadow + scroll progress bar
    var nav = document.getElementById("navbar");
    var bar = document.getElementById("progress");
    function onScroll() {
      nav.classList.toggle("scrolled", window.scrollY > 8);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu
    var btn = document.getElementById("menuBtn");
    var links = document.getElementById("navLinks");
    var open = false;
    function setMenu(v) {
      open = v;
      links.classList.toggle("open", v);
      btn.setAttribute("aria-expanded", String(v));
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(!open);
    });
    document.addEventListener("click", function (e) {
      if (open && !links.contains(e.target)) setMenu(false);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });

    // Reveal-on-scroll
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".rev").forEach(function (el) { io.observe(el); });

    // Animated counters
    function animateCount(el) {
      var end = parseFloat(el.dataset.count);
      var dec = parseInt(el.dataset.dec || "0", 10);
      var t0 = performance.now();
      var dur = 1400;
      function tick(t) {
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = (end * ease).toLocaleString("en-US", {
          minimumFractionDigits: dec, maximumFractionDigits: dec
        });
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        animateCount(en.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-count]").forEach(function (el) { cio.observe(el); });

    // Pricing period toggle
    var tgs = document.querySelectorAll(".tg");
    tgs.forEach(function (b) {
      b.addEventListener("click", function () {
        tgs.forEach(function (x) {
          x.classList.remove("on");
          x.setAttribute("aria-pressed", "false");
        });
        b.classList.add("on");
        b.setAttribute("aria-pressed", "true");
        var yearly = b.dataset.per === "y";
        document.querySelectorAll(".plan .amt").forEach(function (a) {
          a.textContent = yearly ? a.dataset.y : a.dataset.m;
        });
      });
    });

    // FAQ accordion (one open at a time)
    document.querySelectorAll(".qa").forEach(function (qa) {
      var q = qa.querySelector(".qq");
      var a = qa.querySelector(".qa__a");
      q.addEventListener("click", function () {
        var was = qa.classList.contains("open");
        document.querySelectorAll(".qa").forEach(function (x) {
          x.classList.remove("open");
          x.querySelector(".qq").setAttribute("aria-expanded", "false");
          x.querySelector(".qa__a").style.maxHeight = null;
        });
        if (!was) {
          qa.classList.add("open");
          q.setAttribute("aria-expanded", "true");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });

    // Toast for demo buttons
    var toast = document.getElementById("toast");
    document.querySelectorAll(".js-toast").forEach(function (b) {
      b.addEventListener("click", function (e) {
        if (b.getAttribute("href") === "#") e.preventDefault();
        toast.classList.add("show");
        clearTimeout(window.__tt);
        window.__tt = setTimeout(function () { toast.classList.remove("show"); }, 2400);
      });
    });

    // Subtle hero mock tilt (pointer devices only)
    var mock = document.getElementById("heroMock");
    if (mock && window.matchMedia("(pointer:fine)").matches) {
      var base = "perspective(1400px) rotateX(2.5deg)";
      mock.addEventListener("mousemove", function (e) {
        var r = mock.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - 0.5;
        mock.style.transform = base + " rotateY(" + (dx * 2.5).toFixed(2) + "deg)";
      });
      mock.addEventListener("mouseleave", function () {
        mock.style.transform = base;
      });
    }

    // Expose a finalize hook for screenshot tooling: reveals everything
    // and snaps counters to their final values without animation.
    window.Halo = {
      finalize: function () {
        document.querySelectorAll(".rev").forEach(function (el) { el.classList.add("in"); });
        document.querySelectorAll("[data-count]").forEach(function (el) {
          var end = parseFloat(el.dataset.count);
          var dec = parseInt(el.dataset.dec || "0", 10);
          el.textContent = end.toLocaleString("en-US", {
            minimumFractionDigits: dec, maximumFractionDigits: dec
          });
        });
        if (mock) mock.style.transform = "";
      }
    };
  });
})();
