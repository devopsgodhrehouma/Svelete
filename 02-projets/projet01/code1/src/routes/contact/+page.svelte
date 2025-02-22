<script>
  import { fade } from "svelte/transition";
  let formData = {
    name: '',
    email: '',
    message: ''
  };

  function handleSubmit() {
    // Ajoutez ici la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
  }
</script>

<div transition:fade class="container mx-auto px-4 py-16 max-w-2xl">
  <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">Contact</h1>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
    <div>
      <label for="name" class="block mb-2 text-gray-200 font-medium">Nom</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        class="w-full p-3 bg-slate-50 rounded-lg text-slate-900 placeholder-slate-500
               border border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20
               transition-all duration-200"
        placeholder="Votre nom"
        required
      />
    </div>
    
    <div>
      <label for="email" class="block mb-2 text-gray-200 font-medium">Email</label>
      <input
        type="email"
        id="email"
        bind:value={formData.email}
        class="w-full p-3 bg-slate-50 rounded-lg text-slate-900 placeholder-slate-500
               border border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20
               transition-all duration-200"
        placeholder="votre@email.com"
        required
      />
    </div>
    
    <div>
      <label for="message" class="block mb-2 text-gray-200 font-medium">Message</label>
      <textarea
        id="message"
        bind:value={formData.message}
        class="w-full p-3 bg-slate-50 rounded-lg text-slate-900 placeholder-slate-500
               border border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20
               transition-all duration-200 h-32 resize-y"
        placeholder="Votre message..."
        required
      ></textarea>
    </div>
    
    <button type="submit" 
            class="w-full py-4 bg-primary-500 rounded-lg font-medium text-white
                   hover:bg-primary-600 transform hover:-translate-y-0.5 
                   transition-all duration-150 ease-in-out
                   shadow-lg hover:shadow-primary-500/50">
      Envoyer
    </button>
  </form>
</div>