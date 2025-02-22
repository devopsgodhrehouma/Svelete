<script>
    import { fade } from "svelte/transition";
    import "../app.css";
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div transition:fade class="container mx-auto px-4 py-16">
        <!-- Hero Section -->
        <section class="text-center mb-20">
            <div class="mb-8 text-blue-400">
                <span class="text-xl font-semibold">👋 Bienvenue</span>
            </div>
            <h1 class="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Haythem Rehouma
            </h1>
            <p class="text-2xl text-gray-300 mb-12">Ingénieur en Intelligence Artificielle</p>
            <div class="flex justify-center gap-6">
                <a href="/projects" class="btn-primary">
                    Mes Projets
                </a>
                <a href="/contact" class="btn-secondary">
                    Me Contacter
                </a>
            </div>
        </section>

        <!-- Quick Links -->
        <nav class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <a href="/skills" class="card group">
                <div class="card-content">
                    <h2 class="text-xl font-bold mb-2 group-hover:text-blue-400">Compétences</h2>
                    <p class="text-gray-400">Découvrez mes expertises techniques</p>
                </div>
            </a>
            <a href="/projects" class="card group">
                <div class="card-content">
                    <h2 class="text-xl font-bold mb-2 group-hover:text-blue-400">Projets</h2>
                    <p class="text-gray-400">Explorez mes réalisations</p>
                </div>
            </a>
            <a href="/contact" class="card group">
                <div class="card-content">
                    <h2 class="text-xl font-bold mb-2 group-hover:text-blue-400">Contact</h2>
                    <p class="text-gray-400">Travaillons ensemble</p>
                </div>
            </a>
        </nav>
    </div>
</main>

<style>
    .btn-primary {
        @apply px-8 py-4 bg-blue-500 rounded-full font-medium
               hover:bg-blue-600 transform hover:-translate-y-0.5 
               transition-all duration-150 ease-in-out
               shadow-lg hover:shadow-blue-500/50;
    }
    .btn-secondary {
        @apply px-8 py-4 bg-gray-800 rounded-full font-medium
               hover:bg-gray-700 transform hover:-translate-y-0.5
               transition-all duration-150 ease-in-out
               border border-gray-700 hover:border-gray-600;
    }
    .card {
        @apply p-8 rounded-2xl transition-all duration-200 ease-in-out
               bg-gradient-to-br from-gray-800 to-gray-900
               hover:from-gray-800 hover:to-gray-800
               border border-gray-700 hover:border-blue-500/30;
    }
    .card-content {
        @apply transform transition-all duration-200 ease-in-out
               group-hover:-translate-y-1;
    }
</style>