<template>
    <div class="flex w-full h-screen md:items-center justify-center">
        <div class="flex flex-col space-y-4 w-full md:w-1/3 rounded-sm border p-4 bg-white">
            <span class="flex justify-center font-bold text-xl">About</span> 
            <span class="">
                Basic matrix operation calculator.
            </span> 
            <span class="font-bold">
                What works:
                <ul class="font-normal text-sm">
                    <li>- Matrix Addition/Subtraction</li>
                    <li>- Matrix Multiplication</li>
                    <li>- Matrix Exponentiation</li>
                    <li>- Matrix Scaling</li>
                    <li>- Matrix Transposition</li>
                    <li>- Determinant Calculation</li>
                    <li>- Matrix Inversion</li>
                    <li>- Matrix of Minors Calculation</li>
                    <li>- Matrix of Cofactors Calculation</li>
                </ul>
            </span> 
            <span class="font-bold">
                What doesn't:
                <ul class="font-normal text-sm">
                    <li>- Eigenvalue/Eigenvector Calculation</li>
                </ul>
            </span> 
            <span class="font-bold text-lg">
                Todo:
                <ul class="font-normal text-sm">
                    <li>- Add Eigenvalue/Eigenvector calculation using SymPy to work with symbols.</li>
                    <li>- Add logo.</li>
                </ul>
            </span> 
        </div>
    </div>
</template>
