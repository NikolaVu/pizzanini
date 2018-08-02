document.addEventListener("DOMContentLoaded", function() {
    var mobileMenuTrigger = document.getElementById('openMobileMenu'),
        mobileMenuClose = document.getElementById('closeMobileMenu'),
        mobileMenu = document.getElementById('menu'),
        header = document.getElementById('header'),
        safari = (-1 < navigator.userAgent.indexOf('Safari')) && (-1 === navigator.userAgent.indexOf('Chrome')),
        scrollElement = safari ? document.body : document.documentElement;

    if (mobileMenuTrigger && mobileMenuClose && mobileMenu) {
        var menuItems = mobileMenu.querySelectorAll('li'),
            activeClass = 'active';

        mobileMenuTrigger.addEventListener('click', function() {
            openMobileMenu(mobileMenu, activeClass);
        });

        mobileMenuClose.addEventListener('click', function() {
            closeMobileMenu(mobileMenu, activeClass);
        });

        menuItems.forEach(function(menuItem) {

            menuItem.addEventListener('click', function() {
                closeMobileMenu(mobileMenu, activeClass);
                scrollToElement(scrollElement,
                    document.getElementById(event.target.getAttribute('data-target')).offsetTop - header.clientHeight,
                    300);
            });
        });
    }

    function openMobileMenu(mobileMenu, activeClass) {

        if (-1 === mobileMenu.className.indexOf(activeClass)) {
            mobileMenu.className = mobileMenu.className + ' ' + activeClass;
        }
    }

    function closeMobileMenu(mobileMenu, activeClass) {

        if (-1 < mobileMenu.className.indexOf(activeClass)) {
            mobileMenu.className = mobileMenu.className.replace(' ' + activeClass, '');
        }
    }

    function scrollToElement(element, to, duration) {
        if (0 >= duration) {
            return false;
        }

        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;

            if (element.scrollTop === to)  {
                return false;
            }

            scrollToElement(element, to, duration - 10);
        }, 10);
    }
});
