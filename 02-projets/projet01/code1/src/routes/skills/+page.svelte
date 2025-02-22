<script>
    import { fade } from "svelte/transition";

    const skills = {
        'Intelligence Artificielle': ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
        'Développement': ['Python', 'JavaScript', 'TypeScript', 'Svelte'],
        'DevOps': ['Docker', 'Git', 'CI/CD', 'Cloud Computing']
    };
</script>

<div transition:fade class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold mb-12 text-center">Compétences</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each Object.entries(skills) as [category, items]}
            <div class="bg-gray-800 p-6 rounded-lg">
                <h2 class="text-xl font-bold mb-4">{category}</h2>
                <ul class="space-y-2">
                    {#each items as skill}
                        <li class="text-gray-300">{skill}</li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</div>