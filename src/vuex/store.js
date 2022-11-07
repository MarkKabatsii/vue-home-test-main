import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        products: [],
        product: {}
    },
    mutations: {
        SET_PRODUCTS_TO_STATE(state, products){
            state.products = products
        },
        SET_PRODUCT_TO_STATE(state, product){
            state.product = product
        }
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}){
            return axios('https://fedtest.monolith.co.il/api/catalog/getAll', {
                method: 'GET',
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(products => {
                    commit('SET_PRODUCTS_TO_STATE', products.data.data)
                    return products
                })
                .catch(error => console.log(error))
        },
        GET_PRODUCT_FROM_API({commit, rootId}){
            return axios(`https://fedtest.monolith.co.il/api/catalog/get?id=${rootId}`, {
                method: 'GET',
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(product => {
                    commit('SET_PRODUCT_TO_STATE', product)
                    console.log(product)
                    return product
                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        PRODUCTS(state){
            return state.products
        },
        PRODUCT(state){
            return state.product
        }
    }
})

export default store