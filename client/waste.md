# Orbita 3D Lab — Earth + Voyager 1 Setup

## 1. Install Packages

Run inside frontend:

```bash
npm install three @react-three/fiber @react-three/drei
```

---

# 2. Download Models

## Download ONLY these two models first

### Earth Model

Search on Sketchfab:

- "Earth glb"
- preferably low/medium poly
- downloadable
- GLB format preferred

Rename downloaded file:

```text
earth.glb
```

---

## Voyager 1 Model

Search on Sketchfab:

- "Voyager 1 glb"
- downloadable
- optimized model

Rename:

```text
voyager.glb
```

---

# 3. Folder Structure

Put models inside:

```text
public/models/
```

Final structure:

```text
public/
  models/
    earth.glb
    voyager.glb
```

---

# 4. Create Data File

Create:

```text
src/data/spaceObjects.js
```

Code:

```js
export const celestialBodies = [
  {
    id: "earth",
    title: "Earth",
    image:
      "https://images-assets.nasa.gov/image/iss063e081477/iss063e081477~medium.jpg",
    model: "/models/earth.glb",

    fullDescription:
      "Earth is the third planet from the Sun and the only known planet to support life. It contains oceans, atmosphere, magnetic fields, and diverse ecosystems.",

    aiContext: `
Earth is the third planet from the Sun.
It supports life because of liquid water, atmosphere, and suitable temperature.
Earth has one moon and a protective magnetic field.
`,
  },
];

export const spaceTechnologies = [
  {
    id: "voyager-1",
    title: "Voyager 1",
    image:
      "https://science.nasa.gov/wp-content/uploads/2023/09/voyager-spacecraft-jpg.webp",
    model: "/models/voyager.glb",

    fullDescription:
      "Voyager 1 is a NASA space probe launched in 1977 to study the outer Solar System. It is currently the farthest human-made object from Earth.",

    aiContext: `
Voyager 1 is a NASA spacecraft launched in 1977.
It explored Jupiter and Saturn and is now traveling through interstellar space.
It carries the Golden Record containing sounds and images from Earth.
`,
  },
];
```

---

# 5. Create Main 3D Page

Create:

```text
src/pages/ThreeDPage.jsx
```

Code:

```jsx
import { celestialBodies, spaceTechnologies } from "../data/spaceObjects";
import { useNavigate } from "react-router-dom";

export default function ThreeDPage() {
  const navigate = useNavigate();

  const Card = ({ item, type }) => (
    <div
      onClick={() => navigate(`/3d/${type}/${item.id}`)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-white">{item.title}</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-16 text-white">
      <h1 className="mb-16 text-center text-5xl font-black">Orbita 3D Lab</h1>

      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-bold text-cyan-300">
          Celestial Bodies
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {celestialBodies.map((item) => (
            <Card key={item.id} item={item} type="celestial" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-bold text-cyan-300">
          Space Technologies
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {spaceTechnologies.map((item) => (
            <Card key={item.id} item={item} type="technology" />
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

# 6. Create 3D Viewer Page

Create:

```text
src/pages/ObjectViewer.jsx
```

Code:

```jsx
import { useParams } from "react-router-dom";
import { celestialBodies, spaceTechnologies } from "../data/spaceObjects";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function Model({ path }) {
  const gltf = useGLTF(path);

  return <primitive object={gltf.scene} scale={2} />;
}

export default function ObjectViewer() {
  const { type, id } = useParams();

  const data = type === "celestial" ? celestialBodies : spaceTechnologies;

  const item = data.find((obj) => obj.id === id);

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Object not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white lg:flex">
      <div className="h-[60vh] lg:h-screen lg:w-[65%]">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={1.5} />

          <directionalLight position={[2, 2, 2]} intensity={2} />

          <Environment preset="city" />

          <Model path={item.model} />

          <OrbitControls enablePan={false} />
        </Canvas>
      </div>

      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
        <h1 className="mb-6 text-5xl font-black">{item.title}</h1>

        <p className="mb-10 text-lg leading-relaxed text-slate-300">
          {item.fullDescription}
        </p>

        <button className="w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
          AI Explain
        </button>
      </div>
    </div>
  );
}
```

---

# 7. Add Routes

Inside router:

```jsx
<Route
  path="/3d"
  element={<ThreeDPage />}
/>

<Route
  path="/3d/:type/:id"
  element={<ObjectViewer />}
/>
```

---

# 8. IMPORTANT MODEL NOTES

Some Sketchfab models may:

- appear too small
- appear too large
- appear rotated

Adjust here:

```jsx
<primitive object={gltf.scene} scale={2} />
```

You can also add:

```jsx
rotation={[0, Math.PI, 0]}
```

if needed.

---

# 9. FINAL FLOW

Main Page:

- Earth preview card
- Voyager preview card

User clicks:

- Earth → opens immersive 3D viewer
- Voyager → opens immersive 3D viewer

Viewer contains:

- interactive 3D model
- zoom
- rotate
- information panel
- AI explain button

This is the cleanest MVP architecture for Orbita 3D Lab.
