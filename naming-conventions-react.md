# 🧭 Rekommenderad namnstandard i React

Det här dokumentet sammanfattar rekommenderade konventioner för namngivning i React-projekt.  
En konsekvent stil gör koden mer lättläst, underhållbar och enklare att samarbeta kring.

---

## 🧱 Komponenter

- **Använd PascalCase** för alla React-komponenter.  

  ✅ `UserCard`, `TodoList`, `WeatherApp`  
  ❌ `usercard`, `userCard`, `user_card`

- **Filnamn** ska matcha komponentens namn:  
  `UserCard.tsx` → `export default function UserCard() { ... }`
  
  alternativt
  
  `UserCard.tsx` → `const UserCard = () => { ... }; export default UserCard();`
  
  men kan bli svårare att se i stack-trace.

---

## 📁 Mappar

- Använd **kebab-case** (små bokstäver och bindestreck) för mappnamn.  
  ✅ `components/`, `user-profile/`, `api-services/`

- Gruppera relaterade komponenter i funktionsmappar:  
  ```plaintext
  src/
    components/
      Button/
        Button.tsx
        Button.module.css
    features/
      todos/
        TodoList.tsx
        TodoItem.tsx
  ```

---

## 📦 Props och state

- Använd **camelCase** för variabler, props och state-namn.  
  ✅ `userName`, `isLoading`, `setUserData`

- Prefixa **boolean-värden** med `is`, `has` eller `should`.  
  ✅ `isVisible`, `hasError`, `shouldUpdate`

---

## ⚙️ Funktioner

- Använd **camelCase** för funktioner och event-hanterare.  
  ✅ `handleClick`, `fetchData`, `calculateTotal`

- Event-hanterare börjar ofta med `handle` och callbacks med `on`.  
  ```tsx
  function handleSubmit() { ... }
  <Button onClick={handleSubmit} />
  ```

---

## 🎨 CSS och styling

- För **CSS Modules**, använd `ComponentName.module.css`.  
  ✅ `Button.module.css`

- Klassnamn i CSS-moduler kan vara **camelCase** eller **kebab-case**.  
  ✅ `.primaryButton` eller `.primary-button`

---

## 🧩 Custom Hooks

- Egna hooks **måste** börja med `use`.  
  ✅ `useFetch`, `useLocalStorage`, `useTheme`

---

## 📚 Contexts

- Använd PascalCase för context-namn och providers.  
  ✅ `ThemeContext`, `AuthProvider`

---

## 🧪 Tester

- Testfiler ska ha samma namn som komponenten och avslutas med `.test.tsx`.  
  ✅ `UserCard.test.tsx`

---

## ✅ Sammanfattning

| Typ               | Konvention     | Exempel |
|--------------------|----------------|----------|
| Komponent          | PascalCase     | `TodoList` |
| Fil (komponent)    | PascalCase     | `TodoList.tsx` |
| Mapp               | kebab-case     | `user-profile/` |
| Variabel / State   | camelCase      | `userName`, `setUser` |
| Boolean-variabel   | is/has/should  | `isActive` |
| Funktion / Handler | camelCase      | `handleClick` |
| Egen Hook          | use + Pascal   | `useFetchData` |
| Context / Provider | PascalCase     | `ThemeProvider` |
| CSS-modulfil       | PascalCase     | `Button.module.css` |
| Testfil            | PascalCase     | `TodoList.test.tsx` |

---

📘 **Tips:**
- Var konsekvent i hela projektet.  
- Matcha namn mellan filer, exporter och importer.  
- Välj tydlighet framför korthet.
