<template>
    <div class="flex flex-col w-full md:w-1/2 border rounded-sm p-2 bg-white">
        <span class="flex w-full pb-2">
            <span class="flex w-1/3 font-bold">Function: </span>
            <select class="flex w-2/3 bg-white border rounded-sm" v-model="activeFunction">
                <option value="Addition">Addition</option>
                <option value="Subtraction">Subtraction</option>
                <option value="Multiplication">Multiplication</option>
                <option value="Power">Power</option>
                <option value="Scale">Scale</option>
                <option value="Transpose">Transpose</option>
                <option value="Determinant">Determinant</option>
                <option value="Inverse">Inverse</option>
                <option value="Matrix of Minors">Matrix of Minors</option>
                <option value="Matrix of Cofactors">Matrix of Cofactors</option>
            </select>
        </span>
        <div id="operationStation" class="flex w-full justify-between space-x-2">
            <div v-if="activeFunction == 'Addition'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/6" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <span class="w-1/6 text-center font-bold">&#x2b;</span>
                <select class="flex bg-white border rounded-sm w-1/6" v-model="rightMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="addition">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Sum
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>

            <div v-if="activeFunction == 'Subtraction'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/6" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <span class="w-1/6 text-center font-bold">&#x2212;</span>
                <select class="flex bg-white border rounded-sm w-1/6" v-model="rightMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="subtraction">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Difference
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>

            <div v-if="activeFunction == 'Multiplication'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/6" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <span class="w-1/6 text-center font-bold">&#xd7;</span>
                <select class="flex bg-white border rounded-sm w-1/6" v-model="rightMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="multiplication">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Product
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>

            <div v-if="activeFunction == 'Power'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/6" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <span class="flex items-center text-sm font-bold">Exponent:</span>
                <input type="text" class="flex w-1/6 border rounded-sm" v-model="exponent">
                <button class="border rounded-sm px-1 w-2/3 text-sm font-bold" @click="power">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Power
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>

            <!--Remember to check why fractions don't work here!-->
            <div v-if="activeFunction == 'Scale'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/6" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <span class="flex items-center text-sm font-bold">Scalar:</span>
                <input type="text" class="flex w-1/6 border rounded-sm" v-model="scalar">
                <button class="border rounded-sm px-1 w-2/3 text-sm font-bold" @click="_scale">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Scaled Matrix
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>

            <!--Remember to check why nonsquare matrices don't work here!-->
            <div v-if="activeFunction == 'Transpose'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/4" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="transpose">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Transpose
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>
            
            <div v-if="activeFunction == 'Determinant'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/4" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="determinant">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Determinant
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>
            
            <div v-if="activeFunction == 'Inverse'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/4" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="inverse">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Inverse
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>
            
            <div v-if="activeFunction == 'Matrix of Minors'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/4" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="matrixOfMinors">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Matrix of Minors
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>

            <div v-if="activeFunction == 'Matrix of Cofactors'" class="flex w-full justify-between space-x-2">
                <select class="flex bg-white border rounded-sm w-1/4" v-model="leftMatrix">
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="matrixOfCofactors">
                    <span :class="waitingOnServer ? 'hidden' : 'block'">
                        Get Matrix of Cofactors
                    </span> 
                    <span :class="waitingOnServer ? 'block' : 'hidden'">
                        <i class="fas fa-spinner animate-spin"></i>
                    </span>
                </button>
            </div>
        </div>
        <span class="flex w-full justify-start text-xs text-red-600">
            {{errorMsg}}
        </span>
        <div class="flex flex-col w-full my-2">
            <div class="flex flex-col w-full p-2 space-y-2" :class="activeFunction == 'Determinant' ? 'hidden' : 'null'">
                <div v-for="row in this.data" :key="row" class="flex space-x-2 justify-center">
                    <input type="text" v-for="entry in row" :key="entry" class="w-1/6 border rounded-sm text-center bg-gray-50" v-model="entry.value" @input="onUpdate" disabled>
                </div>
            </div>
            <div class="flex w-full justify-center" :class="activeFunction == 'Determinant' ? 'null' : 'hidden'">
                <input type="text" class="w-1/3 border rounded-sm text-center bg-gray-50" v-model="determinant_res">
            </div>
        </div>
        <div class="flex space-x-2" :class="activeFunction == 'Determinant' ? 'hidden' : 'null'">
            <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="sendDataToMatrix('A')">Send to Matrix A</button>
            <button class="border rounded-sm px-1 w-1/2 text-sm font-bold" @click="sendDataToMatrix('B')">Send to Matrix B</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const apiUrl = 'https://pymatrix-api.herokuapp.com';

export default {
    // the functions here will look for matrixA and matrixB's data in the store.
    data: function() { 
        return {
            activeFunction: 'Addition',
            rows: 2,
            cols: 2,
            data:   [[{value: ''}, {value: ''}],
                    [{value: ''}, {value: ''}]],
            leftMatrix: 'A',
            determinant_res: '',
            rightMatrix: 'B',
            exponent: 2,
            scalar: '',
            waitingOnServer: false,
            errorMsg: '',
        }
    },
    methods: {
        onUpdate() {
            // removes the denominator if it == 1
            for(let i = 0; i < this.data.length; i++) {
                for(let j = 0; j < this.data[0].length; j++) {
                    let fracSplit = this.data[i][j].value.split("/");
                    if(fracSplit[1] == 1) {
                        this.data[i][j].value = fracSplit[0];
                    }
                }
            }
            let payload = {
                rows: this.rows,
                cols: this.cols,
                data: this.data
            };
            this.$store.commit('updateResultMatrix', payload);
            //console.log(this.$store.state);
        },
        validateSumAndDiff() {
            let leftMatrixData = this.getMatrixData(this.leftMatrix);
            let rightMatrixData = this.getMatrixData(this.rightMatrix);
            if(leftMatrixData.length != rightMatrixData.length || leftMatrixData[0].length != rightMatrixData[0].length) {
                return false; 
            }
            return true;
        },
        sendDataToMatrix(matrixLabel) {
            if(matrixLabel == 'A') {
                // send data to matrix A
                this.$emit('updateMatrix', 'A');
            } else if(matrixLabel == 'B') {
                // send data to matrix B
                this.$emit('updateMatrix', 'B');
            }
        },
        getMatrixData(matrixLabel) {
            let result = [];
            if(matrixLabel == 'A') {
                this.$store.state.matrixA.data.forEach(row => {
                    let newRow = [];
                    row.forEach(entry => {
                        newRow.push(entry.value);
                    });
                    result.push(newRow);
                });
            } else if(matrixLabel == 'B') {
                this.$store.state.matrixB.data.forEach(row => {
                    let newRow = [];
                    row.forEach(entry => {
                        newRow.push(entry.value);
                    });
                    result.push(newRow);
                });
            }
            return result;
        },
        setupDataAsValueObjects(preprocessedData) {
            let newData = [];
            preprocessedData.forEach(row => {
                let newRow = [];
                row.forEach(entry => {
                    newRow.push({value: entry});
                });
                newData.push(newRow);
            });
            return newData;
        },
        getTwoMatrixOperationRequestBody() {
            let requestBody = {
                m1_rows: this.leftMatrix == 'A' ?  this.$store.state.matrixA.rows : this.$store.state.matrixB.rows,
                m1_cols: this.leftMatrix == 'A' ?  this.$store.state.matrixA.cols : this.$store.state.matrixB.cols,
                m1_data: this.leftMatrix == 'A' ?  this.getMatrixData('A') : this.getMatrixData('B'),
                m2_rows: this.rightMatrix == 'A' ?  this.$store.state.matrixA.rows : this.$store.state.matrixB.rows,
                m2_cols: this.rightMatrix == 'A' ?  this.$store.state.matrixA.cols : this.$store.state.matrixB.cols,
                m2_data: this.rightMatrix == 'A' ?  this.getMatrixData('A') : this.getMatrixData('B'),
            }
            return requestBody;
        },
        getOneMatrixOperationRequestBody() {
            let requestBody = {
                m1_rows: this.leftMatrix == 'A' ?  this.$store.state.matrixA.rows : this.$store.state.matrixB.rows,
                m1_cols: this.leftMatrix == 'A' ?  this.$store.state.matrixA.cols : this.$store.state.matrixB.cols,
                m1_data: this.leftMatrix == 'A' ?  this.getMatrixData('A') : this.getMatrixData('B'),
            }
            return requestBody;
        },
        addition() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getTwoMatrixOperationRequestBody();
            axios.post(`${apiUrl}/addition`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
                self.errorMsg = '';
            })
            .catch( function(error) {
                if(self.$store.state.matrixA.rows != self.$store.state.matrixB.rows || self.$store.state.matrixA.cols != self.$store.state.matrixB.cols) {
                    self.errorMsg = "Matrices must have equal dimensions."
                }
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        subtraction() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getTwoMatrixOperationRequestBody();
            axios.post(`${apiUrl}/subtraction`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
                self.errorMsg = '';
            })
            .catch( function(error) {
                if(self.$store.state.matrixA.rows != self.$store.state.matrixB.rows || self.$store.state.matrixA.cols != self.$store.state.matrixB.cols) {
                    self.errorMsg = "Matrices must have equal dimensions."
                }
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        multiplication() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getTwoMatrixOperationRequestBody();
            axios.post(`${apiUrl}/multiplication`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
                self.errorMsg = '';
            })
            .catch( function(error) {
                if(self.$store.state.matrixA.cols != self.$store.state.matrixB.rows) {
                    self.errorMsg = "Left matrix columns must be equal to right matrix rows."
                }
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        power() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getOneMatrixOperationRequestBody();
            requestBody.power = self.exponent;
            axios.post(`${apiUrl}/power`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
                self.errorMsg = '';
            })
            .catch( function(error) {
                if(!Number.isInteger(self.exponent)) {
                    self.errorMsg = "Exponent must be an integer."
                }
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        _scale() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getOneMatrixOperationRequestBody();
            requestBody.m1_scalar = self.scalar;
            axios.post(`${apiUrl}/scale`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
            })
            .catch( function(error) {
                if(!self.validateEntry(self.scalar)) {
                    self.errorMsg = "Scalar must be a real number without letters and without combining slashes and decimals.";
                }
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        transpose() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getOneMatrixOperationRequestBody();
            axios.post(`${apiUrl}/transpose`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
            })
            .catch( function(error) {
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        determinant() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getOneMatrixOperationRequestBody();
            axios.post(`${apiUrl}/determinant`, requestBody)
            .then( function(response) {
                console.log(response.data.determinant);
                let value = response.data.determinant.split('/');
                if(value[1] == '1') {
                    self.determinant_res = value[0];
                } else {
                    self.determinant_res = response.data.determinant;
                }
                self.onUpdate();
                self.waitingOnServer = false;
            })
            .catch( function(error) {
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        inverse() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getOneMatrixOperationRequestBody();
            axios.post(`${apiUrl}/invert`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
            })
            .catch( function(error) {
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        matrixOfMinors() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getOneMatrixOperationRequestBody();
            axios.post(`${apiUrl}/matrix_of_minors`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
            })
            .catch( function(error) {
                console.log(error);
                self.waitingOnServer = false;
            } );
        },
        matrixOfCofactors() {
            let self = this;
            self.waitingOnServer = true;
            let requestBody = self.getOneMatrixOperationRequestBody();
            axios.post(`${apiUrl}/matrix_of_cofactors`, requestBody)
            .then( function(response) {
                self.rows = response.data.rows;
                self.cols = response.data.columns;
                self.data = self.setupDataAsValueObjects(response.data.data);
                self.onUpdate();
                self.waitingOnServer = false;
            })
            .catch( function(error) {
                console.log(error);
                self.waitingOnServer = false;
            } );
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
    },
    watch: {
        activeFunction: function(newVal) {
            if(newVal != 'Determinant') {
                this.determinant_res = '';
            }
            this.data.forEach(row => {
                row.forEach(entry => {
                    entry.value = '';
                });
            });
            this.errorMsg = '';
        },
    },
}
</script>

<style>

</style>
