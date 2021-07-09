<template>
    <div class="flex flex-col md:justify-center md:h-full bg-gray-100 items-center pt-16 md:pt-0">
        <div class="flex flex-col w-full md:flex-row p-2 space-y-2 md:space-y-0 md:space-x-2 md:w-11/12">
            <MatrixBuilder :shouldUpdate="requestingMatrixAUpdate" identity="A" @updateComplete="completeUpdateRequest"></MatrixBuilder> 
            <MatrixBuilder :shouldUpdate="requestingMatrixBUpdate" identity="B" @updateComplete="completeUpdateRequest"></MatrixBuilder> 
        </div>
        <div class="flex w-full justify-center px-2 pb-2">
            <Functions @updateMatrix='doMatrixUpdate'></Functions>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import MatrixBuilder from '@/components/MatrixBuilder.vue'
import Functions from '@/components/Functions.vue'

export default {
    name: 'Home',
    components: {
        MatrixBuilder,
        Functions
    },
    data: function() {
        return {
            requestingMatrixAUpdate: false, 
            requestingMatrixBUpdate: false, 
        }
    },
    methods: {
        doMatrixUpdate(matrixLabel) {
            console.log('Updating', matrixLabel);
            if(matrixLabel == 'A') {
                // update matrix A
                this.requestingMatrixAUpdate = true;
            } else if(matrixLabel == 'B') {
                // update matrix B
                this.requestingMatrixBUpdate = true;
            }
        },
        completeUpdateRequest(matrixLabel) {
            console.log('Request completed.');
            if(matrixLabel == 'A') {
                this.requestingMatrixAUpdate = false;
            } else if(matrixLabel == 'B') {
                this.requestingMatrixBUpdate = false;
            }
        },
    },
}
</script>
