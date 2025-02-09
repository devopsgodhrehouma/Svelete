# Hero Section Styling

## Component:

![image](https://github.com/user-attachments/assets/a1daf7c0-ef2b-4646-9039-554dd5498deb)


---

### **HeroSection.svelte**
```svelte
<script lang="ts">
    import heroImage from "$assets/hero.png";
</script>

<section class="default-margin hero">
    <div class="hero-text">
        <h1>Book Nest</h1>
        <h3>Your personal book library.</h3>
        <h4 class="mt-l">
            Create your very own digital library where you can keep track of every book you own, read and love.
        </h4>
        <h4 class="mb-s">
            Our app offers a beautifully designed, easy-to-use interface that makes managing your book collection a joy.
        </h4>
        <button>Sign up</button>
    </div>
    <img class="hero-image" src={heroImage} alt="Book Nest Hero Image" />
</section>

<style>
    .hero {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 100px;
        margin-bottom: 80px;
    }

    .hero-image {
        width: 40%;
    }

    .hero-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 55%;
        padding-right: 50px;
    }
</style>
```

---

### **Explanation:**
1. **Script Section (`<script lang="ts">`)**
   - Imports the **hero image** from `$assets/hero.png`.

2. **HTML Section (`<section class="hero">`)**
   - A container (`section`) for the **Hero Section**.
   - Includes a **text container (`.hero-text`)** with:
     - `h1`: Title ("Book Nest")
     - `h3`: Subtitle ("Your personal book library.")
     - `h4`: Descriptive text about the app.
     - `button`: A sign-up button.
   - Includes a **hero image (`.hero-image`)** for visual appeal.

3. **CSS Styling (`<style>`)**
   - **`.hero`**: Uses `display: flex;` to align text and image horizontally.
   - **`.hero-image`**: Restricts width to **40%** of the parent container.
   - **`.hero-text`**: Uses `flex-direction: column;` to arrange elements vertically and **padding-right** to add spacing.

---

### **Final Notes:**
✅ This **HeroSection.svelte** component is structured properly for **SvelteKit**.  
✅ Uses **TypeScript (`lang="ts"`)** for better maintainability.  
✅ Includes **modern styling** using `flexbox` for a responsive layout.  


![image](https://github.com/user-attachments/assets/c1b35b57-8784-4818-b59a-4dbe8dbf4ab8)

