<script>
    const projects = [
      { title: "Détection d'objets avec YOLO", link: "https://github.com/user/yolo" },
      { title: "Reconnaissance faciale avec OpenCV", link: "https://github.com/user/opencv" },
      { title: "Chatbot IA avec GPT-3", link: "https://github.com/user/chatbot" },
    ];
  </script>
  
  <main class="p-10 text-center">
    <h1 class="text-3xl font-bold">📂 Mes Projets</h1>
    <div class="mt-6 space-y-4">
      {#each projects as project}
        <a href={project.link} target="_blank" class="block bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
          {project.title}
        </a>
      {/each}
    </div>
  </main>