let heroElementsTimeout = null;
let observer = null;

const initAnimations = () => {
	if (heroElementsTimeout) clearTimeout(heroElementsTimeout);

	if (observer) {
		observer.disconnect();
	}

	const animateElements = document.querySelectorAll(`
        .hero__subtitle,
        .hero__call-block,
        .hero__clutch,
        .we-build__quote,
        .we-build__founder,
        .we-build__stat-item,
        .process__call-block,
        .process__launch-block,
        .process__strategy-wrapper,
        .process__bottom-content,
        .results-clients__item,
        .descuss__content,
        .descuss__links,
        .emblems__container,
        .managers__item,
        .detailed-audit__img,
        .detailed-audit__content,
        .hero__main,
        .review-process,
        .item-team,
        .process__item,
        .item-faq,
        .card-process__line
    `);

	animateElements.forEach((el) => {
		if (el) {
			el.classList.remove('animate-in');
			el.style.opacity = '0';
			el.style.transform = 'translateY(30px)';
		}
	});

	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
	};

	observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-in');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	animateElements.forEach((el) => {
		if (el) {
			el.style.opacity = '0';
			el.style.transform = 'translateY(30px)';
			el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

			if (el.classList.contains('hero__subtitle')) {
				heroElementsTimeout = setTimeout(() => {
					el.classList.add('animate-in');
				}, 3800);
			} else {
				observer.observe(el);
			}
		}
	});
};

document.addEventListener('DOMContentLoaded', () => {
	initAnimations();

	const weBuildContent = document.querySelector('.we-build__content');
	const weBuildFounderWrapper = document.querySelector('.we-build__founder-wrapper');

	if (weBuildContent && weBuildFounderWrapper) {
		const contentObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
						weBuildFounderWrapper.classList.add('bg-green');
						contentObserver.unobserve(weBuildContent);
					}
				});
			},
			{
				threshold: [0.5],
			}
		);

		contentObserver.observe(weBuildContent);
	}

	const style = document.createElement('style');
	style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
	document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', () => {
	const yearElement = document.getElementById('year');
	if (yearElement) {
		yearElement.textContent = new Date().getFullYear();
	}

	const initializeSwiper = (selector, bulletsClass, navigationSelectors, customOptions = {}) => {
		const sliderElement = document.querySelector(selector);
		if (sliderElement) {
			const defaultOptions = {
				lazy: true,
				speed: 1000,
				spaceBetween: 80,
				autoplay: { delay: 8000 },
				navigation: navigationSelectors,
				on: {
					init() {
						if (bulletsClass) {
							createBullets(this, bulletsClass);
						}
					},
					slideChange() {
						if (bulletsClass) {
							updateActiveBullet(this, bulletsClass);
						}
					},
				},
			};
			return new Swiper(selector, { ...defaultOptions, ...customOptions });
		}
	};

	const swiperConfig = [
		{
			selector: '.slider-saas',
			bulletsClass: '.slider-saas__bullets',
			navigation: { nextEl: '.slider-saas__arrow_next', prevEl: '.slider-saas__arrow_prev' },
		},
		{
			selector: '.slider-cases',
			bulletsClass: '.slider-cases__bullets',
			navigation: { nextEl: '.slider-cases__arrow_next', prevEl: '.slider-cases__arrow_prev' },
		},
		{
			selector: '.formats__slider',
			bulletsClass: '.formats__bullets',
			navigation: { nextEl: '.formats__arrow_next', prevEl: '.formats__arrow_prev' },
		},
		{
			selector: '.impressions__slider',
			bulletsClass: '.impressions__bullets',
			navigation: { nextEl: '.impressions__arrow_next', prevEl: '.impressions__arrow_prev' },
		},
		{
			selector: '.data-visualization__slider',
			bulletsClass: '.data-visualization__bullets',
			navigation: { nextEl: '.data-visualization__arrow_next', prevEl: '.data-visualization__arrow_prev' },
		},
		{
			selector: '.process__carousel',
			bulletsClass: '.process__carousel__bullets',
			navigation: { nextEl: '.process__carousel__arrow_next', prevEl: '.process__carousel__arrow_prev' },
		},
		{
			selector: '.results-clients__slider',
			bulletsClass: null,
			navigation: { nextEl: '.results-clients__nav-button_next', prevEl: '.results-clients__nav-button_prev' },
			options: {
				spaceBetween: 20,
				slidesPerView: 'auto',
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				},
				loop: true,
				breakpoints: {
					768: {
						spaceBetween: 40,
					},
				},
			},
		},
		{
			selector: '.managers__slider',
			bulletsClass: null,
			navigation: { nextEl: '.managers__nav-button_next', prevEl: '.managers__nav-button_prev' },
			options: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoplay: false,
				loop: true,
			},
		},
		{
			selector: '.emblems__slider',
			bulletsClass: null,
			navigation: false,
			options: {
				slidesPerView: 'auto',
				spaceBetween: 34,
				autoplay: { delay: 3000 },
				loop: true,
				breakpoints: {
					471: {
						slidesPerView: 10,
						allowTouchMove: false,
						autoplay: false,
						loop: false,
					},
				},
			},
		},
	];

	swiperConfig.forEach(({ selector, bulletsClass, navigation, options }) => {
		if (selector === '.emblems__slider' && window.innerWidth >= 470) {
			return;
		}
		initializeSwiper(selector, bulletsClass, navigation, options);
	});

	if (window.innerWidth > 470) {
		const emblemsWrapper = document.querySelector('.emblems__wrapper');
		if (emblemsWrapper && !emblemsWrapper.dataset.desktopPointsAdded) {
			const slides = Array.from(emblemsWrapper.querySelectorAll('.emblems__slide')).filter((slide) => !slide.classList.contains('emblems__slide--dup'));

			slides.forEach((slide, index) => {
				if (index === slides.length - 1) {
					return;
				}

				const point = document.createElement('img');
				point.src = '/img/pages/main-page/emblems/point.svg';
				point.alt = '';
				point.classList.add('emblems__point-desktop');

				emblemsWrapper.insertBefore(point, slide.nextSibling);
			});

			emblemsWrapper.dataset.desktopPointsAdded = 'true';
		}
	}

	function createBullets(swiper, className) {
		swiper.slides.forEach((slide, slideIndex) => {
			const bulletsContainer = slide.querySelector(className);
			if (bulletsContainer) {
				swiper.slides.forEach((_, bulletIndex) => {
					const bullet = document.createElement('div');
					bullet.classList.add('bullet');
					if (bulletIndex === slideIndex) bullet.classList.add('active');
					bullet.addEventListener('click', () => swiper.slideTo(bulletIndex));
					bulletsContainer.appendChild(bullet);
				});
			}
		});
	}

	function updateActiveBullet(swiper, className) {
		swiper.slides.forEach((slide) => {
			const bullets = slide.querySelectorAll(`${className}.bullet`);
			bullets.forEach((bullet, bulletIndex) => {
				bullet.classList.toggle('active', bulletIndex === swiper.activeIndex);
			});
		});
	}

	async function handleFormSubmit(form, submitter) {
		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
			});
			const result = await response.json();
			form.style.display = 'none';
			form.closest('div').querySelector('.mailNotification').style.display = 'flex';
		} catch (error) {
			console.log(error);
		}
		submitter.querySelector('.lds-dual-ring').style.display = 'none';
		submitter.querySelector('span').style.display = 'inline-block';
		submitter.removeAttribute('disabled');
	}

	const mailButtonList = document.querySelectorAll('.mail_button');

	mailButtonList.forEach((element) => {
		element.addEventListener('click', () => {
			navigator.clipboard
				.writeText('info@performiq.io')
				.then(() => {
					createToast('success');
				})
				.catch((error) => {
					createToast('error');
				});
		});
	});

	const shareButton = document.querySelectorAll('.hero-blog__share');

	shareButton.forEach((element) => {
		element.addEventListener('click', () => {
			navigator.clipboard
				.writeText(window.location.href)
				.then(() => {
					createToast('success_share');
				})
				.catch((error) => {
					createToast('error');
				});
		});
	});

	const form = document.querySelector('.form');
	if (form) {
		const inputs = document.querySelectorAll('.form__input');
		const validateField = (input) => {
			const label = input.nextElementSibling;
			const value = input.value.trim();
			if (!value) {
				setError(input, label, 'This field is required');
				return false;
			}
			clearError(input, label);
			if (input.type === 'email' && !validateEmail(value)) {
				setError(input, label, 'Invalid email format');
				return false;
			}
			if (input.name === 'number' && !validatePhoneNumber(value)) {
				setError(input, label, 'Invalid phone number');
				return false;
			}
			return true;
		};

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const isValid = Array.from(inputs).every(validateField);
			if (isValid) {
				let submitter = e.submitter;
				const loader = submitter.querySelector('.lds-dual-ring');
				const span = submitter.querySelector('span');
				if (loader) loader.style.display = 'inline-block';
				if (span) span.style.display = 'none';
				submitter.setAttribute('disabled', 'disabled');
				handleFormSubmit(form, submitter);
			}
		});

		inputs.forEach((input) => {
			input.addEventListener('input', () => validateField(input));
		});
	}

	const roadmapForm = document.querySelector('.roadmap-banner-blog__form');

	if (roadmapForm) {
		const inputs = roadmapForm.querySelectorAll('.form__input');
		const validateField = (input) => {
			const label = input.nextElementSibling;
			const value = input.value.trim();
			if (!value) {
				setError(input, label, 'This field is required');
				return false;
			}
			clearError(input, label);
			if (input.type === 'email' && !validateEmail(value)) {
				setError(input, label, 'Invalid email format');
				return false;
			}
			return true;
		};
		roadmapForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const isValid = Array.from(inputs).every(validateField);
			if (isValid) {
				let submitter = e.submitter;
				submitter.querySelector('.lds-dual-ring').style.display = 'inline-block';
				submitter.querySelector('span').style.display = 'none';
				submitter.setAttribute('disabled', 'disabled');
				handleFormSubmit(roadmapForm, submitter);
			}
		});
	}

	const newslettersForm = document.querySelector('.newslettersForm');
	if (newslettersForm) {
		const inputs = document.querySelectorAll('.newsletters-email');
		const validateField = (input) => {
			const label = input.nextElementSibling;
			const value = input.value.trim();
			if (!value) {
				setError(input, label, 'This field is required');
				return false;
			}
			clearError(input, label);
			if (input.type === 'email' && !validateEmail(value)) {
				setError(input, label, 'Invalid email format');
				return false;
			}
			return true;
		};

		newslettersForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const isValid = Array.from(inputs).every(validateField);
			if (isValid) {
				let submitter = e.submitter;
				submitter.querySelector('.lds-dual-ring').style.display = 'inline-block';
				submitter.querySelector('span').style.display = 'none';
				submitter.setAttribute('disabled', 'disabled');
				handleFormSubmit(newslettersForm, submitter);
			}
		});

		inputs.forEach((input) => {
			input.addEventListener('input', () => validateField(input));
		});
	}

	function setError(input, label, message) {
		input.classList.add('error');
		if (label) {
			label.textContent = message;
			label.style.opacity = '1';
		}
	}

	function clearError(input, label) {
		input.classList.remove('error');
		if (label) {
			label.textContent = '';
			label.style.opacity = '0';
		}
	}

	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validatePhoneNumber(number) {
		const phoneRegex = /^[+]?[\d]{3,}$/;
		return phoneRegex.test(number);
	}
	const googleOptimizeOpen = document.querySelector('.google-optimize__bottom');
	const googleOptimizeWrapper = document.querySelector('.google-optimize__wrapper');
	function openGoogleOptimize() {
		googleOptimizeWrapper.classList.add('active');
	}
	if (googleOptimizeOpen && googleOptimizeWrapper) {
		googleOptimizeOpen.addEventListener('click', openGoogleOptimize);
	}
	const faqItem = document.querySelectorAll('.item-faq');
	if (faqItem) {
		faqItem.forEach((item) => {
			item.addEventListener('click', () => {
				toggleActiveClass(item);
			});
		});
	}

	const keyAreasItems = document.querySelectorAll('.key-areas__item');
	if (keyAreasItems) {
		keyAreasItems.forEach((item) => {
			const list = item.querySelector('.key-areas__item__list');
			const text = item.querySelector('.key-areas__item__text');
			if (list || text) {
				item.addEventListener('click', () => {
					toggleActiveClass(item);
				});
			}
		});
	}

	const auditChecksItems = document.querySelectorAll('.auditChecks__item');
	if (auditChecksItems) {
		auditChecksItems.forEach((item) => {
			const list = item.querySelector('.auditChecks__item__list');
			const text = item.querySelector('.auditChecks__item__text');
			if (list || text) {
				item.addEventListener('click', () => {
					toggleActiveClass(item);
				});
			}
		});
	}

	function toggleActiveClass(element) {
		if (element) {
			element.classList.toggle('active');
		} else {
			console.log('Element does not exists');
		}
	}
	const googleAdsCheckboxes = document.querySelectorAll('.ways__checkbox');
	const googleAdsTextWrappers = document.querySelectorAll('.ways__text-wrapper');
	const googleAdsImgElements = document.querySelectorAll('.ways__img img');

	if (googleAdsCheckboxes.length && googleAdsTextWrappers.length && googleAdsImgElements.length) {
		function googleAdsSetActive() {
			googleAdsTextWrappers.forEach((el) => el.classList.remove('active'));
			googleAdsImgElements.forEach((el) => el.classList.remove('active'));

			googleAdsCheckboxes.forEach((checkbox) => {
				if (checkbox.checked) {
					const buttonId = checkbox.getAttribute('data-button');

					document.querySelectorAll(`[data-text="${buttonId}"], [data-img="${buttonId}"]`).forEach((el) => {
						el.classList.add('active');
					});
				}
			});
		}

		googleAdsCheckboxes.forEach((checkbox) => {
			checkbox.addEventListener('change', googleAdsSetActive);
		});

		googleAdsSetActive();
	}

	const notifications = document.querySelector('.notifications');

	const toastDetails = {
		timer: 5000,
		success: {
			icon: 'fa-circle-check',
			text: 'Mail copied to clipboard.',
		},
		success_share: {
			icon: 'fa-circle-check',
			text: 'Link copied.',
		},
		error: {
			icon: 'fa-circle-xmark',
			text: 'Error copying mail to clipboard',
		},
	};

	const removeToast = (toast) => {
		toast.classList.add('hide');
		if (toast.timeoutId) clearTimeout(toast.timeoutId);
		setTimeout(() => toast.remove(), 500);
	};

	const createToast = (id) => {
		const { icon, text } = toastDetails[id];
		const toast = document.createElement('li');
		toast.className = `toast ${id}`;
		toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
		notifications.appendChild(toast);
		toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
		toast.addEventListener('click', function () {
			removeToast(toast);
		});
	};

	if (document.querySelector('.trusted-companies__slider .swiper')) {
		const trustedCompanies = new Swiper('.trusted-companies__slider .swiper', {
			loop: true,
			speed: 4000,
			slidesPerView: 'auto',
			spaceBetween: 65,
			autoplay: {
				delay: 0,
			},
		});
	}

	const burger = document.querySelector('.burger');
	const menu = document.querySelector('#menu');
	const menuClose = document.querySelector('.menu__close');
	if (burger && menu && menuClose) {
		const toggleMenu = () => {
			burger.classList.toggle('active');
			menu.classList.toggle('show');
			document.body.classList.toggle('lock');
		};
		menuClose.addEventListener('click', toggleMenu);
		burger.addEventListener('click', toggleMenu);
	}

	const servicesButton = document.querySelector('.nav-header__link_services');
	const menuServices = document.querySelector('#menu-services');
	const menuServicesClose = document.querySelector('.menu-services__close');
	if (servicesButton && menuServices && menuServicesClose) {
		const toggleMenu = () => {
			menuServices.classList.toggle('show');
			document.body.classList.toggle('lock');
		};
		menuServicesClose.addEventListener('click', toggleMenu);
		servicesButton.addEventListener('click', toggleMenu);
	}

	const mainPageServicesButton = document.querySelector('.headerMainPage a[href=""]');
	if (mainPageServicesButton && menuServices && menuServicesClose) {
		const toggleMainPageServicesMenu = (e) => {
			e.preventDefault();
			menuServices.classList.toggle('show');
			document.body.classList.toggle('lock');
		};
		mainPageServicesButton.addEventListener('click', toggleMainPageServicesMenu);
	}

	const footerServicesButton = document.querySelector('.footer__links a[href=""]');
	if (footerServicesButton && menuServices && menuServicesClose) {
		const toggleFooterServicesMenu = (e) => {
			e.preventDefault();
			menuServices.classList.toggle('show');
			document.body.classList.toggle('lock');
		};
		footerServicesButton.addEventListener('click', toggleFooterServicesMenu);
	}

	const progressBar = document.querySelector('.progress-bar__line span');
	const header = document.querySelector('.header');
	const progressBarContainer = document.querySelector('.progress-bar');
	if (progressBar && header && progressBarContainer) {
		let headerHeight = header?.offsetHeight || 0;
		let progressBarHeight = progressBarContainer?.offsetHeight || 0;

		const updateProgressBar = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scrollPercentage = (scrollTop / docHeight) * 100;
			progressBar.style.width = `${scrollPercentage}%`;
		};

		const updateMenuLinks = () => {
			const links = document.querySelectorAll('.progress-bar__link');
			const sections = document.querySelectorAll('section');
			links.forEach((link) => link.classList.remove('active'));
			sections.forEach((section) => {
				if (window.scrollY >= section.offsetTop) {
					const sectionId = section.getAttribute('id');
					const activeLink = document.querySelector(`.progress-bar__link[href="#${sectionId}"]`);
					if (activeLink) activeLink.classList.add('active');
				}
			});
		};

		const toggleHeaderProgress = () => {
			if (window.scrollY > 250) {
				header.classList.add('progress');
				header.classList.remove('no-progress');
				document.body.style.paddingTop = `${headerHeight - progressBarHeight}px`;
			} else {
				header.classList.add('no-progress');
				header.classList.remove('progress');
				document.body.style.paddingTop = '0';
			}
		};

		window.addEventListener('scroll', () => {
			updateProgressBar();
			updateMenuLinks();
			toggleHeaderProgress();
		});

		document.addEventListener('DOMContentLoaded', () => {
			headerHeight = header?.offsetHeight || 0;
			progressBarHeight = progressBarContainer?.offsetHeight || 0;
		});
	}

	const headerMainPage = document.querySelector('.headerMainPage');
	if (headerMainPage) {
		let headerMainPageHeight = headerMainPage?.offsetHeight || 0;

		const toggleHeaderMainPageProgress = () => {
			const isMobile = window.innerWidth <= 1100;

			if (isMobile) {
				// На экранах <= 1100px всегда добавляем класс progress
				headerMainPage.classList.add('progress');
				headerMainPage.classList.remove('no-progress');
				document.body.style.paddingTop = '77px';
			} else {
				// На экранах > 1100px используем логику со скроллом
				if (window.scrollY > 250) {
					headerMainPage.classList.add('progress');
					headerMainPage.classList.remove('no-progress');
					document.body.style.paddingTop = `${headerMainPageHeight}px`;
				} else {
					headerMainPage.classList.add('no-progress');
					headerMainPage.classList.remove('progress');
					document.body.style.paddingTop = '0';
				}
			}
		};

		window.addEventListener('scroll', () => {
			toggleHeaderMainPageProgress();
		});

		window.addEventListener('resize', () => {
			headerMainPageHeight = headerMainPage?.offsetHeight || 0;
			toggleHeaderMainPageProgress();
		});

		document.addEventListener('DOMContentLoaded', () => {
			headerMainPageHeight = headerMainPage?.offsetHeight || 0;
			toggleHeaderMainPageProgress();
		});
	}

	const progressBarLinks = document.querySelectorAll('.progress-bar__link');
	progressBarLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const item = this.closest('.progress-bar__item');
			if (item) {
				item.classList.add('clicked');
				setTimeout(() => {
					item.classList.remove('clicked');
				}, 300);
			}
		});
	});

	const headerForOffset = document.querySelector('.header');
	const headerMainPageForOffset = document.querySelector('.headerMainPage');

	const getHeaderHeight = () => {
		if (headerMainPageForOffset) {
			if (headerMainPageForOffset.classList.contains('progress')) {
				return headerMainPageForOffset.offsetHeight;
			}
			return 0;
		}
		if (headerForOffset) {
			return headerForOffset.offsetHeight;
		}
		return window.innerWidth <= 767.98 ? 127 : 241;
	};

	const handleAnchorClick = (e) => {
		const link = e.currentTarget;
		const href = link.getAttribute('href');

		if (href && href.startsWith('#')) {
			const targetId = href.substring(1);

			if (!targetId) {
				return;
			}

			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				e.preventDefault();

				const headerHeight = getHeaderHeight();
				const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = targetPosition - headerHeight;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});

				if (history.pushState) {
					history.pushState(null, null, href);
				}
			}
		}
	};

	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach((link) => {
		link.addEventListener('click', handleAnchorClick);
	});

	if (window.location.hash) {
		const hash = window.location.hash.substring(1);
		const targetElement = document.getElementById(hash);

		if (targetElement) {
			setTimeout(() => {
				const headerHeight = getHeaderHeight();
				const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = targetPosition - headerHeight;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});
			}, 100);
		}
	}
});
