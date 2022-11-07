import Vue from 'vue'

export function imager(url){
    return `https://fedtest.monolith.co.il/api/imager.php?url=${url}&type=fit&width=1000&height=1000&quality=70`
}

Vue.prototype.imager = imager