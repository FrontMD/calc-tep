document.addEventListener('DOMContentLoaded', function() {
    thanksModals()
})

function thanksModals() {
    var modals = document.querySelectorAll('[data-js="thanksModal"]')

    if(!modals) return

    modals.forEach(modal => {
        var closes = modal.querySelectorAll('[data-js="thanksModalClose"]')

        if(closes.length) {
            closes.forEach(function(close) {
                close.addEventListener('click', function() {
                    thanksModalClose(modal)
                })
            })
        }
    })

}

function thanksModalOpen(modal) {
    if(!modal) return
    lockBody()
    modal.classList.add('active')
}

function thanksModalClose(modal) {
    if(!modal) return
    modal.classList.remove('active')
    unlockBody()
}

function lockBody() {
	document.querySelector('body').classList.add('no-scroll');

    var scrollbarWidth = getScrollbarWidth()
    var header = document.querySelector('header')

    if(header) {
        var next = header.nextElementSibling;

        if(next && next.classList.contains('top')) {
            next.style.paddingRight = scrollbarWidth + 'px'
        } else if(next) {
            var top = next.querySelector('.top');
            if(top) {
                top.style.paddingRight = scrollbarWidth + 'px'
            }
        }
    }

    document.querySelector('body').style.paddingRight = scrollbarWidth + 'px'
}

function unlockBody() {
	document.querySelector('body').classList.remove('no-scroll');
    document.querySelector('body').style.paddingRight = '0px'
    var header = document.querySelector('header')

    if(header) {
        var next = header.nextElementSibling;

        if(next && next.classList.contains('top')) {
            next.style.paddingRight = '0px'
        } else if(next) {
            var top = next.querySelector('.top');
            if(top) {
                top.style.paddingRight = '0px'
            }
        }
    }
}

function getScrollbarWidth() {
    var div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth
}