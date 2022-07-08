import {external} from "@aminnairi/rollup-plugin-external";
import {terser} from "rollup-plugin-terser";
import run from "@rollup/plugin-run";
import replace from "@rollup/plugin-replace";

const environment = process.env.NODE_ENV;
const isDevelopmentEnvironment = environment === "development";
const isProductionEnvironment = environment === "production";

export default {
  input: "index.js",
  plugins: [
    external(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(environment)
    }),
    isDevelopmentEnvironment && run(),
    isProductionEnvironment && terser()
  ],
  output: {
    file: "../build/server/index.js",
    format: "esm"
  }
}
