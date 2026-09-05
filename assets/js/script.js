// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (light/dark) — persists via localStorage, respects system preference on first visit
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.querySelector('.theme-toggle__icon').textContent = theme === 'dark' ? '◑' : '◐';
}

const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Highlight active section link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => navObserver.observe(section));

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObserver.observe(el));

// Project filter
const filterChips = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('#moreProjects .project-card');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const filter = chip.getAttribute('data-filter');

    projectCards.forEach(card => {
      const matches = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

// Project quick-view modal (Bootstrap)
const projectData = {
  dsp: {
    title: 'Digital Signal Processing in MATLAB',
    body: `<p>MATLAB implementations of core DSP concepts — the foundation of communication
      systems work — built to strengthen the theory behind signals, filtering, and
      transformation.</p>
      <ul>
        <li>Signal generation and sampling across continuous and discrete domains</li>
        <li>Convolution and correlation implementations from first principles</li>
        <li>Filtering and other core DSP algorithms</li>
      </ul>`,
    repo: 'https://github.com/Nemo1023/Digital_Signal_Processing_MATLAB'
  },
  elderly: {
    title: 'Elderly Care & Emergency Alert System',
    body: `<p>A database-driven web application built to enhance the safety and health management
      of senior citizens — with emergency alert mechanisms, health tracking, and communication
      tools connecting elderly users with caregivers.</p>
      <ul>
        <li>Designed and managed a MySQL database for user, health, alert, appointment, and prescription data</li>
        <li>Implemented emergency alert mechanisms for timely assistance during critical situations</li>
        <li>Integrated health tracking and communication features for caregiver coordination</li>
      </ul>`,
    repo: 'https://github.com/Nemo1023/ElderlyCareSystem'
  },
  cpu: {
    title: 'CPU Scheduling Simulator',
    body: `<p>A GUI-based simulator for visualizing and analyzing CPU process scheduling
      algorithms, built to make abstract OS concepts tangible and easy to compare.</p>
      <ul>
        <li>Implemented FCFS, SJF, SRTF, Priority, and Round Robin scheduling algorithms</li>
        <li>Generated Gantt charts to visualize process execution and scheduling order</li>
        <li>Calculated Completion, Turnaround, Waiting, and Response Time metrics</li>
      </ul>`,
    repo: 'https://github.com/Nemo1023/CPU_Scheduling_Calculator'
  },
  planner: {
    title: 'Study Planner',
    body: `<p>A study management desktop application that helps students organize and manage
      their academic routines, with mood-aware breaks built in.</p>
      <ul>
        <li>To-do lists and personalized routines for structured study planning</li>
        <li>Mood-based playlist functionality to support different study moods</li>
        <li>Time-tracking features to monitor study sessions and improve time management</li>
      </ul>`,
    repo: 'https://github.com/Nemo1023/StudyPlanner'
  }
};

const projectModalEl = document.getElementById('projectModal');
if (projectModalEl) {
  projectModalEl.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    const key = trigger.getAttribute('data-project');
    const data = projectData[key];
    if (!data) return;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalBody').innerHTML = data.body;
    document.getElementById('modalRepoLink').setAttribute('href', data.repo);
  });
}

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
