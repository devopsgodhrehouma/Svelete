# Auth Form for Register & Login Page

![image](https://github.com/user-attachments/assets/620ad35b-05b1-439a-9226-16bb9c2009ce)

---
<br/>

![image](https://github.com/user-attachments/assets/3f9165f2-deec-446d-b1ee-6997b5d5683a)


---
<br/>

![image](https://github.com/user-attachments/assets/80615ed0-cf14-4714-97d7-ae3b80b0df75)

---
<br/>

![image](https://github.com/user-attachments/assets/f10f7071-6c29-4a0e-a45b-c620baf2d67c)

---
<br/>

![image](https://github.com/user-attachments/assets/6cbf5fd8-4ec1-4442-9ab5-2daefb058374)

---
<br/>

![image](https://github.com/user-attachments/assets/e803bcf8-c590-496c-8fd2-a876a7c17d65)

---
<br/>

![image](https://github.com/user-attachments/assets/f114db88-04fa-4a1a-b706-302437be8f8f)


---
<br/>

![image](https://github.com/user-attachments/assets/d78947db-603b-4401-9deb-fe8b3cd69e7b)

---
<br/>

![image](https://github.com/user-attachments/assets/f3950509-769c-4ad7-9eae-e97cf582c8d3)

<br/>

# AuthForm.svelte

```
<script lang="ts">
    import { Button } from "$components";

    interface ComponentProps {
        isRegistration: boolean;
    }

    let { isRegistration } = $props();
</script>

<div class="default-margin auth-container">
    <h1 class="mb-l">{isRegistration ? "Register" : "Login"}</h1>
    <div class="form-and-social-login">
        <form class="auth-form">
            <input placeholder="Name" type="text" name="name" />
            <input placeholder="Email" type="text" name="email" />
            <input placeholder="Password" type="password" name="password" />
            <input placeholder="Confirm password" type="password" name="passwordConfirmation" />
            <Button type="submit">{isRegistration ? "Register" : "Login"}</Button>
        </form>
        <div class="social-login">
            <!-- Add a button here later -->
        </div>
    </div>
</div>
```

<br/>

![image](https://github.com/user-attachments/assets/ebcd9292-3f3f-47c3-92d6-622d091c231b)

<br/>

![image](https://github.com/user-attachments/assets/03a927d8-2869-4030-a50d-dc0a775524c5)

<br/>

<img width="104" alt="image" src="https://github.com/user-attachments/assets/053f5646-ebd7-4ca3-a174-0fcc5133d6b9" />

<br/>

<img width="89" alt="image" src="https://github.com/user-attachments/assets/c3770225-ff40-4b1d-b5fa-9f032133771f" />

<br/>

<img width="86" alt="image" src="https://github.com/user-attachments/assets/596b6f32-fab9-4485-bbcf-dd7af049be9e" />

<br/>

<img width="83" alt="image" src="https://github.com/user-attachments/assets/9cbcd7bd-edae-4c0b-912d-92c0794dd41c" />

<br/>

![image](https://github.com/user-attachments/assets/a0fbb4ea-7612-4185-bae7-c511e51c80f2)

<br/>

<img width="98" alt="image" src="https://github.com/user-attachments/assets/f5c6e70c-c269-4d0d-ae97-95ae93ccd405" />

<br/>

![image](https://github.com/user-attachments/assets/abf58b31-7659-451b-8ad6-fdf1f3d2970f)

<br/>

![image](https://github.com/user-attachments/assets/dd9b892d-0702-4d8f-90a9-eb5017108b79)

<br/>

```
<script lang="ts">
    interface ComponentProps {
        isRegistration: boolean;
    }

    let { isRegistration } = $props();
</script>

<div class="default-margin auth-container">
    <h1 class="mb-l">{isRegistration ? "Register" : "Login"}</h1>
</div>
```





![image](https://github.com/user-attachments/assets/92ee5610-6b91-4dcd-9dab-63b019abd1a5)

<br/>

```
<script lang="ts">
    import { Button } from "$components";

    interface ComponentProps {
        isRegistration: boolean;
    }

    let { isRegistration } = $props();
</script>

<div class="default-margin auth-container">
    <h1 class="mb-l">{isRegistration ? "Register" : "Login"}</h1>
    <div class="form-and-social-login">
        <form class="auth-form">
            <input placeholder="Name" type="text" name="name" />
            <input placeholder="Email" type="text" name="email" />
            <input placeholder="Password" type="password" name="password" />
            <input 
                placeholder="Confirm password"
                type="password"
                name="passwordConfirmation"
            />
            <Button type="submit">{isRegistration ? "Register" : "Login"}</Button>
        </form>
        
        <div class="social-login">
            <!-- Add a button here later -->
        </div>
    </div>
</div>
```

<br/>

<img width="508" alt="image" src="https://github.com/user-attachments/assets/60621217-fab1-4133-9717-4750a5381982" />

<br/>

![image](https://github.com/user-attachments/assets/6f5d785d-2fca-4c8d-8aa8-efe1ff17f048)

<br/>

![image](https://github.com/user-attachments/assets/eb8da664-dce3-4d8e-8429-8f40ddcc65a8)

<br/>

![image](https://github.com/user-attachments/assets/087c4235-e9ef-44cb-a086-87c70c2a9ad1)

<br/>

![image](https://github.com/user-attachments/assets/1350ef30-a28c-4708-a008-e2be46601e9a)

<br/>

![image](https://github.com/user-attachments/assets/44fed533-ee3f-4342-a2e3-bef666406a07)

<br/>

<img width="608" alt="image" src="https://github.com/user-attachments/assets/b5ffac84-9cfa-473a-92d6-4dbd94181b17" />

<br/>

<img width="409" alt="image" src="https://github.com/user-attachments/assets/fd383ad3-9b2a-4e46-83da-6d5b514c7108" />

<br/>

<img width="520" alt="image" src="https://github.com/user-attachments/assets/17dfcde4-5503-4365-af6c-d02dd3afa258" />

<br/>






















































































