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
            loop: true
        }, options)
        let children = [].slice.call(element.children)
        if (window.innerWidth <800){
            this.isMobile = true
        }else{
            this.isMobile = false
        }
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
     * Apply the correct dimensions to the carousel elements
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio*100) + '%'
        this.items.forEach(item => item.style.width =(100 / this.slidesVisible)/ratio + '%')
    }

    /**
     * Create navigation arrow for carroussel
     * @returns if loop === true, leaves the arrows in place all the time, even at the beginning and end of the carousel
     */
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

    /**
     * Go to go to the next element taking account of the number of slides to scroll
     */
    next() {
        this.gotoItem(this.currentItem + this.slidesToScroll)
    }

    /**
     * go to the previous element taking account of the number of slides to scroll
     */
    prev () {
        this.gotoItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Moves the carousel to the target element
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

    /**
     * to take account of responsive
     */
    onWindowResize(){
        
        let mobile = window.innerWidth < 800;
        if (mobile !== this.isMobile) {
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

new Caroussel(document.querySelector('#caroussel__best-movies'), {
    slidesVisible: 4,
});
new Caroussel(document.querySelector('#caroussel__action'), {
    slidesVisible: 4,
});
new Caroussel(document.querySelector('#caroussel__fantasy'), {
    slidesVisible: 4,
});
new Caroussel(document.querySelector('#caroussel__sci-fi'), {
    slidesVisible: 4,
});
