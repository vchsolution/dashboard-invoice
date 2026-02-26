$(document).ready(function() {
    // Password visibility toggle
    $('#togglePassword').on('click', function() {
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
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const unitNumber = $('#unitNumber').val();
        const password = $('#password').val();

        if(unitNumber && password) {
            // Success - redirect to OTP page
            window.location.href = 'otp.html';
        } else {
            alert('Please fill in both fields.');
        }
    });

    // OTP Input logic: auto-jump to next field
    $('.otp-input').on('keyup', function(e) {
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
    $('#sidebarCollapse').on('click', function(e) {
        e.stopPropagation();
        $('#sidebar').toggleClass('active');
        $('#sidebar-overlay').toggleClass('active');
    });

    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() <= 991) {
            if (!$('#sidebar').is(e.target) && $('#sidebar').has(e.target).length === 0 && $('#sidebar').hasClass('active')) {
                $('#sidebar').removeClass('active');
                $('#sidebar-overlay').removeClass('active');
            }
        }
    });

    // Close sidebar when clicking the overlay
    $('#sidebar-overlay').on('click', function() {
        $('#sidebar').removeClass('active');
        $(this).removeClass('active');
    });

    // Mobile Tab Switching
    $('.tab-item').on('click', function(e) {
        e.preventDefault();
        const target = $(this).data('target');
        
        // Update active tab link
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
        
        // Show target content
        $('.tab-content').removeClass('active');
        $('#' + target).addClass('active');
    });

    // My Unit: Thumbnail switching
    $('.thumb-item').on('click', function() {
        $('.thumb-item').removeClass('active');
        $(this).addClass('active');
        // Change main image source
        const newImageSrc = $(this).data('image');
        $('#mainUnitImage').attr('src', newImageSrc);
    });

    // My Unit: Interior Card Toggle
    $('.interior-header').on('click', function() {
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
    });
    
    // Handle swatch selection
    $('.interior-body .swatch-item').on('click', function() {
        const swatchList = $(this).closest('.swatch-list');
        swatchList.find('.swatch-item').removeClass('active');
        $(this).addClass('active');
    });

    // Handle initial focus on first OTP input
    if ($('#otpForm').length > 0) {
        $('.otp-input').first().focus();
    }
});
