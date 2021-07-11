<template>
    <div class="flex flex-col justify-between w-full md:w-1/2 border rounded-sm bg-white transition duration-200">
        <span class="w-full text-center text-sm font-bold p-2">
            Matrix {{identity}}
        </span>
        <div class="flex flex-col w-full p-2 space-y-2">
            <div v-for="row in this.data" :key="row" class="flex space-x-2 justify-center">
                <input type="text" v-for="entry in row" :key="entry" :class=" validateEntry(entry.value) ? 'null' : 'bg-red-100'" class="w-1/6 border rounded-sm text-center" v-model="entry.value" @input="onUpdate">
            </div>
        </div>
        <span class="flex w-full justify-between p-2">
            <span class="space-x-2">
                <button class="text-sm font-bold rounded-sm border px-1 py-0.5" @click="randomizeEntries">Randomize</button>
                <button class="text-sm font-bold rounded-sm border px-1 py-0.5 text-red-600" @click="clearMatrix">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </span>
            <span class="space-x-2">
                <span>
                    <span class="text-sm font-bold">Rows: </span>
                    <select v-model="rows" class="bg-white border rounded-sm" @change="adjustRows">
                        <option v-for="i in 5" :key="i" :value="i">{{i}}</option> 
                    </select>
                </span>
                <span>
                    <span class="text-sm font-bold">Cols: </span>
                    <select v-model="cols" class="bg-white border rounded-sm" @change="adjustCols">
                        <option v-for="i in 5" :key="i" :value="i">{{i}}</option> 
                    </select>
                </span>
            </span>
        </span>
    </div> 
</template>

<script>
// Whenever you make any changes to this matrix, the data should be saved in the store
export default {
    data: function() {
        return {
            rows: 2,
            cols: 2,
            data:   [[{value: '0'}, {value: '0'}],
                    [{value: '0'}, {value: '0'}]],
        }
    },
    methods: {
        clearMatrix() {
            this.data.forEach(row => {
                row.forEach(entry => {
                    entry.value = '0';
                });
            });
            this.onUpdate();
        },
        validateEntry(value) {
            value = String(value)
            let numSlashes = 0;
            let numDecimals = 0;
            let numMinus = 0;
            let nonNumericChars = 0;

            [...value].forEach(character => {
                character == '.' ? numDecimals++ : null;
                character == '/' ? numSlashes++ : null;
                character == '-' ? numMinus++ : null;
                Number.isInteger(parseInt(character)) ? null : nonNumericChars++;
            });

            // if there are more nonNumericChars than just the slashes, decimals, and minuses in the string
            if(nonNumericChars > (numSlashes + numDecimals + numMinus)) {
                return false;
            }

            // if there are more than 1 slash or decimals or if both occurr.
            if(numSlashes >= 2 || numDecimals >= 2 || (numSlashes > 0 && numDecimals > 0)) {
                return false;
            }

            // if the number is fractional and the denominator is zero
            if(numSlashes == 1 && numDecimals == 0 && value.split('/')[1] == '0') {
                return false;
            }

            // if the field is left empty or is just a decimal or slash
            if(value == '' || value == '.' || value == '/') {
                return false;
            }

            // if the first or last character is a slash
            let valArray = [...value];
            if(valArray[0] == '/' || valArray[valArray.length - 1] == '/') {
                return false;
            }

            return true;
        },
        onUpdate() {
            let payload = {
                rows: this.rows,
                cols: this.cols,
                data: this.data
            };
            if(this.identity == 'A') {
                this.$store.commit('updateMatrixA', payload);
            } else if(this.identity == 'B') {
                this.$store.commit('updateMatrixB', payload);
            }
            //console.log(this.$store.state);
        },
        addRow() {
            let newRow = [];
            let newRowLength = this.data[0].length;
            for(let i = 0; i < newRowLength; i++) {
                newRow.push({value: 0});
            }
            this.data.push(newRow);
        },
        removeRow() {
            this.data.pop();
        },
        adjustRows() {
            let currentNumberOfRows = this.data.length;
            let desiredNumberOfRows = this.rows;
            let difference = Math.abs(currentNumberOfRows - desiredNumberOfRows);
            if(currentNumberOfRows > desiredNumberOfRows) {
                for(let i = 0; i < difference; i++) {
                    this.removeRow();
                }
            } else if(currentNumberOfRows < desiredNumberOfRows) {
                for(let i = 0; i < difference; i++) {
                    this.addRow();
                }
            }
            this.onUpdate();
        },
        addCol() {
            this.data.forEach(row => {
                row.push({value: 0});
            });
        },
        removeCol() {
            this.data.forEach(row => {
                row.pop();
            });
        },
        adjustCols() {
            let currentNumberOfCols = this.data[0].length;
            let desiredNumberOfCols = this.cols;
            let difference = Math.abs(currentNumberOfCols - desiredNumberOfCols);
            if(currentNumberOfCols > desiredNumberOfCols) {
                for(let i = 0; i < difference; i++) {
                    this.removeCol();
                }
            } else if(currentNumberOfCols < desiredNumberOfCols) {
                for(let i = 0; i < difference; i++) {
                    this.addCol();
                }
            }
            this.onUpdate()
        },
        randomizeEntries() {
            this.data.forEach(row => {
                row.forEach(entry => {
                    let newNum = Math.floor(Math.random() * 10) + 1
                    //let newDen = Math.floor(Math.random() * 10) + 1
                    //let newVal = '';
                    //if(newDen != 1 && newNum != newDen) {
                    //    newVal = `${newNum}/${newDen}`
                    //} else {
                    //    newVal = newNum;
                    //}
                    entry.value = newNum;
                });
            });
            this.onUpdate();
        },
    },
    props: {
        identity: String,
        shouldUpdate: Boolean
    },
    watch: {
        shouldUpdate: function(newVal, oldVal) {
            if(newVal == true && oldVal == false) {
                let newData = [];
                this.$store.state.resultMatrix.data.forEach(row => {
                    let newRow = [];
                    row.forEach(entry => {
                        newRow.push({value: entry.value});
                    });
                    newData.push(newRow);
                });
                this.data = newData;
                this.rows = this.$store.state.resultMatrix.rows;
                this.cols = this.$store.state.resultMatrix.cols;
                this.$emit('updateComplete', this.identity);
                this.onUpdate();
            }
        }
    },
}
</script>

<style>

</style>
