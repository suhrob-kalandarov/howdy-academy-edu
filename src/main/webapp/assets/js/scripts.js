document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle ni yangilang
    const themeToggle = {
        toggleBtn: document.getElementById('darkModeToggle'),
        body: document.body,
        init() {
            this.toggleBtn.addEventListener('change', () => this.toggleTheme());
            this.loadTheme();
        },
        toggleTheme() {
            this.body.classList.toggle('dark-mode');
            const isDark = this.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

            // Smooth transition efekti
            document.documentElement.style.transition = 'background-color 0.5s ease';
            setTimeout(() => {
                document.documentElement.style.transition = '';
            }, 500);
        },
        loadTheme() {
            if (localStorage.getItem('darkMode') === 'enabled') {
                this.body.classList.add('dark-mode');
                this.toggleBtn.checked = true;
            }
        }
    };

    // Smooth Scroll
    const smoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }
    };

    const progressChart = {
        init() {
            const progressElements = document.querySelectorAll('.progress-chart');
            progressElements.forEach(el => {
                const percent = el.dataset.percent;
                el.innerHTML = `
                <svg viewBox="0 0 36 36" class="circular-chart">
                    <path class="circle-bg"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path class="circle"
                        stroke-dasharray="${percent}, 100"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" class="percentage">${percent}%</text>
                </svg>
            `;
            });
        }
    };

// Video darslar modal
    const videoLessons = {
        init() {
            document.querySelectorAll('.video-lesson').forEach(btn => {
                btn.addEventListener('click', () => {
                    const videoUrl = btn.dataset.video;
                    const modal = `
                    <div class="modal fade" id="videoModal">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <iframe width="100%" height="500"
                                        src="${videoUrl}"
                                        frameborder="0"
                                        allowfullscreen>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                    document.body.insertAdjacentHTML('beforeend', modal);
                    new bootstrap.Modal(document.getElementById('videoModal')).show();
                });
            });
        }
    };

    // Contact Form Handler
    const contactForm = {
        form: document.getElementById('contactForm'),
        init() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }
        },
        handleSubmit(e) {
            e.preventDefault();
            this.showSuccessMessage();
            this.form.reset();
        },
        showSuccessMessage() {
            const alert = document.createElement('div');
            alert.className = 'alert alert-success mt-3';
            alert.role = 'alert';
            alert.textContent = "Arizangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.";
            this.form.parentNode.insertBefore(alert, this.form.nextSibling);
            setTimeout(() => alert.remove(), 5000);
        }
    };

    // Scroll Animations
    const scrollAnimations = {
        observer: null,
        init() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.style.animationPlayState = 'running';
                        element.style.visibility = 'visible';
                        this.observer.unobserve(element);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.animate-slide, .animate-fade').forEach(el => {
                el.style.visibility = 'hidden';
                el.style.animationPlayState = 'paused';
                this.observer.observe(el);
            });
        }
    };

    // Initialize all components
    themeToggle.init();
    smoothScroll.init();
    contactForm.init();
    scrollAnimations.init();
    progressChart.init();  // Yangi qo'shilgan
    videoLessons.init();
});