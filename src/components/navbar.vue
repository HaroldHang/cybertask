
<template>
    
    <div class="navbar bg-base-100 default-ctn">
        <div class="">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" v-if="isAuthenticated">
                    <li>
                        <a href="/dashboard">
                            <HomeIcon/>
                            Tableau de bord
                        </a>
                    </li>
                    <!-- <li>
                        <a>Parent</a>
                        <ul class="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </li> -->
                    <li>
                        <a href="/todo">
                            <CalendarIcon/>
                            ToDos
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <CogIcon/>
                            Parametres
                        </a>
                    </li>
                </ul>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" v-else >
                    <li><a href="#">Fonctionalites</a></li>

                    <li><a>Contactez-nous</a></li>
                    <li><a>Tarif</a></li>
                </ul>
            </div>
            <a class="text-xl brand-text" href="#">Cyber<span>Task</span></a>
        </div>
        <div class="navbar-center hidden lg:flex" v-if="!isAuthenticated">
            <ul class="menu menu-horizontal px-1">
                <li><a href="#">Fonctionalites</a></li>
                <!-- <li>
                    <details>
                    <summary>Parent</summary>
                    <ul class="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </details>
                </li> -->
                <li><a>Contactez-nous</a></li>
                <li><a>Tarif</a></li>
            </ul>
        </div>
        <!-- <div class="navbar-end">
            <a class="btn">Button</a>
        </div> -->
        <div class="flex-none navbar-end">
            <!-- <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span class="badge badge-sm indicator-item">8</span>
                    </div>
                </div>
                <div
                    tabindex="0"
                    class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                    <div class="card-body">
                        <span class="text-lg font-bold">8 Items</span>
                        <span class="text-info">Subtotal: $999</span>
                        <div class="card-actions">
                            <button class="btn btn-primary btn-block">View cart</button>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="dropdown dropdown-end" v-if="isAuthenticated">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                    <a class="justify-between">
                        Profile
                        <span class="badge">Nouveau</span>
                    </a>
                    </li>
                    <li><a href="#">Parametres</a></li>
                    <li @click="logout" ><a>Se deconnecter</a></li>
                </ul>
            </div>
            <div v-else>
                <a href="/login" class="btn btn-spector primary-back-color">Se connecter</a>
            </div>
        </div>
    </div>

</template>

<script setup  lang="ts">
import { computed } from 'vue';
import { HomeIcon, CalendarIcon, CogIcon } from '@heroicons/vue/16/solid'


const logout = () => {
    sessionStorage.removeItem("token")
    location.reload()
}

const isAuthenticated = computed(()=> { 
    let token = sessionStorage.getItem("token")
    if (token && token != "") {
        return true
    }
    return false
}) 

</script>