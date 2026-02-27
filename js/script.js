$(document).ready(function () {
    // Password visibility toggle
    $('#togglePassword').on('click', function () {
        const passwordInput = $('#password');
        const icon = $(this);

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
        }
    });

    // Form submission handle (redirect to OTP)
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const unitNumber = $('#unitNumber').val();
        const password = $('#password').val();

        if (unitNumber && password) {
            // Success - redirect to OTP page
            window.location.href = 'otp.html';
        } else {
            alert('Please fill in both fields.');
        }
    });

    // OTP Input logic: auto-jump to next field
    $('.otp-input').on('keyup', function (e) {
        const currentInput = $(this);
        const val = currentInput.val();

        if (val.length === 1) {
            currentInput.next('.otp-input').focus();
        }

        // Redirect to dashboard if all fields filled (simulated)
        const allFilled = $('.otp-input').toArray().every(input => $(input).val().length === 1);
        if (allFilled) {
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        }

        // Handle backspace
        if (e.key === 'Backspace') {
            currentInput.prev('.otp-input').focus();
        }
    });

    // Sidebar Toggler
    $('#sidebarCollapse').on('click', function (e) {
        e.stopPropagation();
        $('#sidebar').toggleClass('active');
        $('#sidebar-overlay').toggleClass('active');
    });

    // Close sidebar when clicking outside on mobile
    $(document).on('click', function (e) {
        if ($(window).width() <= 991) {
            if (!$('#sidebar').is(e.target) && $('#sidebar').has(e.target).length === 0 && $('#sidebar').hasClass('active')) {
                $('#sidebar').removeClass('active');
                $('#sidebar-overlay').removeClass('active');
            }
        }
    });

    // Close sidebar when clicking the overlay
    $('#sidebar-overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $(this).removeClass('active');
    });

    // Mobile Tab Switching
    $('.tab-item').on('click', function (e) {
        e.preventDefault();
        const target = $(this).data('target');

        // Update active tab link
        $('.tab-item').removeClass('active');
        $(this).addClass('active');

        // Show target content
        $('.tab-content').removeClass('active');
        $('#' + target).addClass('active');
    });

    // My Unit: Interior Gallery Thumbnail switching (Desktop)
    $('.interior-thumb-item').on('click', function () {
        $('.interior-thumb-item').removeClass('active');
        $(this).addClass('active');
        // Change main interior image source
        const newImageSrc = $(this).data('image');
        $('#mainInteriorImage').attr('src', newImageSrc);
    });

    // My Unit: Thumbnail switching
    $('.thumb-item').on('click', function () {
        $('.thumb-item').removeClass('active');
        $(this).addClass('active');
        // Change main image source
        const newImageSrc = $(this).data('image');
        $('#mainUnitImage').attr('src', newImageSrc);
    });

    // My Unit: Mobile Gallery Carousel (Swiper)
    const unitImageSwiper = new Swiper('.unitImageSwiper', {
        loop: true,
        pagination: {
            el: '.unitImageSwiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.unitImageSwiper .swiper-button-next',
            prevEl: '.unitImageSwiper .swiper-button-prev',
        },
        spaceBetween: 10,
        slidesPerView: 1,
    });

    // My Unit: Interior Image Carousel (Swiper)
    const interiorImageSwiper = new Swiper('.interiorImageSwiper', {
        loop: true,
        pagination: {
            el: '.interiorImageSwiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.interiorImageSwiper .swiper-button-next',
            prevEl: '.interiorImageSwiper .swiper-button-prev',
        },
        spaceBetween: 10,
        slidesPerView: 1,
    });

    // My Unit: Interior Card Toggle
    $('.interior-header').on('click', function () {
        const cardType = $(this).data('card');
        const body = $('.interior-body[data-card="' + cardType + '"]');
        const icon = $(this).find('.toggle-icon');
        const isExpanded = !body.hasClass('d-none');

        // Close all bodies first
        $('.interior-body').addClass('d-none');
        $('.interior-header .toggle-icon').removeClass('bi-dash').addClass('bi-plus');

        // If clicked one was closed, open it; if already open, keep it closed (toggle)
        if (!isExpanded) {
            body.removeClass('d-none');
            icon.removeClass('bi-plus').addClass('bi-dash');
        }

        updateSelectedAddOns();
    });

    // Handle swatch selection
    $('.interior-body .swatch-item').on('click', function () {
        const swatchList = $(this).closest('.swatch-list');
        // Reset active and border on all swatches
        swatchList.find('.swatch-item').removeClass('active').css('border', '2px solid transparent');

        // Add active and border to clicked one
        $(this).addClass('active').css('border', '2px solid #d4a853');

        updateSelectedAddOns();
    });

    // Handle initial focus on first OTP input
    if ($('#otpForm').length > 0) {
        $('.otp-input').first().focus();
    }

    // Initialize Selected Add Ons
    updateSelectedAddOns();

    function updateSelectedAddOns() {
        const activeCard = $('.interior-body:not(.d-none)');
        if (activeCard.length === 0) return;

        // Change bottom image based on the chosen category to simulate 'menyesuaikan warna'
        const cardType = activeCard.data('card'); // signature, prestige, essentials
        if (cardType === 'signature') {
            $('#interiorCarouselInner .carousel-item').eq(0).find('img').attr('src', 'img/signature.jpg');
            $('#interiorCarouselInner .carousel-item').eq(1).find('img').attr('src', 'img/image1.png');
        } else if (cardType === 'prestige') {
            $('#interiorCarouselInner .carousel-item').eq(0).find('img').attr('src', 'img/image2.png');
            $('#interiorCarouselInner .carousel-item').eq(1).find('img').attr('src', 'img/signature.jpg');
        } else {
            $('#interiorCarouselInner .carousel-item').eq(0).find('img').attr('src', 'img/image1.png');
            $('#interiorCarouselInner .carousel-item').eq(1).find('img').attr('src', 'img/image2.png');
        }

        let tableHtml = '';

        activeCard.find('.options-group').each(function () {
            const categoryLabel = $(this).find('.option-label').text();
            const activeSwatch = $(this).find('.swatch-item.active');

            if (activeSwatch.length > 0) {
                const names = (activeSwatch.data('name') || 'DEFAULT').split(',');
                const bgs = (activeSwatch.data('bg') || activeSwatch.css('background-color')).split(',');
                const area = activeSwatch.data('area') || '60 m²';
                const price = activeSwatch.data('price') || 'USD 20/m²';
                const total = activeSwatch.data('total') || 'USD 1,200.00';

                tableHtml += `
                            <div class="adds-category">
                                <div class="category-label">${categoryLabel}</div>`;

                for (let i = 0; i < names.length; i++) {
                    const itemName = names[i].trim();
                    const itemBg = bgs[i] ? bgs[i].trim() : bgs[0].trim();

                    tableHtml += `
                                <div class="adds-item">
                                    <div class="item-swatch" style="background: ${itemBg};"></div>
                                    <div class="item-name">${itemName}</div>
                                    <div class="item-area">${area}</div>
                                    <div class="item-unit-price">${price}</div>
                                    <div class="item-total">${total}</div>
                                </div>`;
                }

                tableHtml += `
                            </div>`;
            }
        });

        if (tableHtml) {
            $('.selected-adds-table').html(tableHtml);
        }
    }
});
