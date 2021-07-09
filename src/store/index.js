import { createStore } from 'vuex'

export default createStore({
    state: {
        matrixA: {
            rows: 2,
            cols: 2,
            data:   [[{value: 0}, {value: 0}],
                     [{value: 0}, {value: 0}]],
        },
        matrixB: {
            rows: 2,
            cols: 2,
            data:   [[{value: 0}, {value: 0}],
                     [{value: 0}, {value: 0}]],
        },
        resultMatrix: {
            rows: 2,
            cols: 2,
            data:   [[{value: 0}, {value: 0}],
                     [{value: 0}, {value: 0}]],
        },
    },
    mutations: {
        updateMatrixA(state, payload) {
            // Called every time that matrix A is changed
            state.matrixA = payload;
        },
        updateMatrixB(state, payload) {
            // Called every time that matrix A is changed
            state.matrixB = payload;
        },
        updateResultMatrix(state, payload) {
            // Called every time that matrix A is changed
            state.resultMatrix = payload;
        },
    },
    actions: {
    },
    modules: {
    }
})
