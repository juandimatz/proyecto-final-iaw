
export class SearchObject {

    public minPrice;
    public maxPrice;
    
    constructor(minPrice, maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    getMinPrice() {
        return this.minPrice;
    }

    getMaxPrice() {
        return this.maxPrice;
    }

    setMinPrice(minPrice) {
        this.minPrice = minPrice;
    }

    setMaxPrice(maxPrice) {
        this.maxPrice = maxPrice;
    }

}