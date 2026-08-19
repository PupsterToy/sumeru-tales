import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// quartz.ts
import { loadQuartzConfig } from "./quartz/plugins/loader/config-loader"
import { GenshinElements } from "./quartz/plugins/transformers/GenshinElements"

const config = await loadQuartzConfig()

config.plugins.transformers.unshift(GenshinElements())

export default config

export const layout = await loadQuartzLayout()

// import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
// import { GenshinElements } from "./quartz/plugins/transformers/GenshinElements"
// import CustomFooter from "./quartz/components/CustomFooter"

// const config = await loadQuartzConfig()

// // Добавляем наш плагин GenshinElements
// config.plugins.transformers.unshift(GenshinElements())

// export default config

// // Переопределяем layout
// export const layout = await loadQuartzLayout({
  // defaults: {
    // footer: [CustomFooter()] // Вызываем функцию без аргументов
  // }
// })