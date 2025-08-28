import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages, base must equal "/<repo-name>/".
// If your repo is named "BudgetAppWebsite", this default is correct.
// Change it if your repo name differs.
export default defineConfig({
  plugins: [react()],
  base: "/BudgetAppWebsite/"
});
