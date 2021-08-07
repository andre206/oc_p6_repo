class Caroussel {
    /**
     * 
     * @callback moveCallback
     * @param {number} index 
     */
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} [options.slidesToScroll=1] number of element to scroll
     * @param {Object} [options.slidesVisible=1] number of visible element in a slide
     * @param {boolean} [options.loop=false] Doit-on boucler en fin de caroussel
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.moveCallBacks = []

        // Modification du DOM
        this.root = this.createDivWithClass('caroussel')
        this.container = this.createDivWithClass('caroussel__container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('caroussel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        // Evenement
        this.moveCallBacks.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }  

    /**
     * Applique les bonnes dimensions aux éléments du caroussel
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio*100) + '%'
        this.items.forEach(item => item.style.width =(100 / this.slidesVisible)/ratio + '%')
    }

    createNavigation() {
        let nextButton = this.createDivWithClass('caroussel__next')
        let prevButton = this.createDivWithClass('caroussel__prev')
        this.root.append(nextButton)
        this.root.append(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if (this.options.loop === true){
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('caroussel__prev--hidden')
            } else {
                prevButton.classList.remove('caroussel__prev--hidden')
            }
            if (this.items[this.currentItem + this.slidesVisible] === undefined){
                nextButton.classList.add('caroussel__next--hidden')
            } else {
                nextButton.classList.remove('caroussel__next--hidden')
            }
        })
    }

    next() {
        this.gotoItem(this.currentItem + this.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentItem - this.slidesToScroll)
    }
    /**
     * Déplace le caroussel vers l'élément ciblé
     * @param {number} index 
     */

    gotoItem (index) {
        if(index < 0){
            index = this.items.length - this.slidesVisible
        } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)){
            index = 0
        }
        let translateX = (-100 / this.items.length) * index /* nombre négatif pour que la translation se fasse par la gauche*/
        this.container.style.transform = 'translate3d(' + translateX + '% , 0, 0)'
        this.currentItem = index
        this.moveCallBacks.forEach(cb => cb(index))
    };

    /**
     * 
     * @param {moveCallback} callBack 
     */
    onMove (callBack) {
        this.moveCallBacks.push(callBack)
    }
    
    onWindowResize() {
        let mobile = window.innerWidth < 800
        if(mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallBacks.forEach(cb => cb(this.currentItem))
        }
    }

    /**
     * 
     * @param {strings} className 
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    /**
     * @returns {number}
     */
    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
        /**
     * @returns {number}
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible
    }


}


document.addEventListener('DOMContentLoaded', function() {
    
    new Caroussel(document.querySelector('#caroussel1'), {
        slidesVisible: 3,
        slidesToScroll: 2, 
    }
    );
    new Caroussel(document.querySelector('#caroussel2'), {
        slidesVisible: 2,
        slidesToScroll: 2, 
        loop: true
    }
    );
    new Caroussel(document.querySelector('#caroussel3'), {
    }
    );
})

