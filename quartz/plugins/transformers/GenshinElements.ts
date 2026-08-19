import { QuartzTransformerPlugin } from "../types"
import { Root, Text, Html, Image } from "mdast"
import { visit } from "unist-util-visit"

export const GenshinElements: QuartzTransformerPlugin = () => {
  return {
    name: "GenshinElements",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "text", (node: Text, index, parent) => {
              if (!parent || typeof index !== "number") return
              if (!node.value.includes(":") && !node.value.includes("{")) return

              const value = node.value
              const regex = /:(\w+):|\{([^{}|]+)\|(\w+)\}/g
              const matches = [...value.matchAll(regex)]

              if (matches.length === 0) return

              const newNodes: (Text | Html | Image)[] = []
              let lastIndex = 0

              for (const match of matches) {
                const matchStart = match.index ?? 0
                const matchEnd = matchStart + match[0].length

                if (matchStart > lastIndex) {
                  newNodes.push({ type: "text", value: value.slice(lastIndex, matchStart) })
                }

                if (match[1]) {
                  // Эмодзи :name:
                  const name = match[1]
                  const emojis: Record<string, string> = {
                    anemo: "anemo.png",
                    cryo: "cryo.png",
                    electro: "electro.png",
                    hydro: "hydro.png",
                    pyro: "pyro.png",
                    geo: "geo.png",
                    dendro: "dendro.png",
					phys: "phys.png",
                    pyro_swirl: "pyro_swirl.png",
					cryo_swirl: "cryo_swirl.png",
                    melt: "melt.png",
                    vape: "vape.png",
                    sc: "sc.png",					
                    ec: "ec.png"
                  }
                  
                  const imgFile = emojis[name]
                  if (imgFile) {
                    // Используем нативный узел картинки, путь /file.png означает корень сайта
                    newNodes.push({
                      type: "image",
                      url: `/static/${imgFile}`,
                      alt: `:${name}:`,
                      data: {
                        hProperties: {
                          style: "height: 1.2em; width: auto; vertical-align: middle; margin: 0 2px;"
                        }
                      }
                    })
                  } else {
                    newNodes.push({ type: "text", value: match[0] })
                  }
                } else if (match[2] && match[3]) {
                  // Цвет {Text|color}
                  const textContent = match[2]
                  const colorKey = match[3]
                  
                  const colors: Record<string, string> = {
                    electro: "var(--electro)",
                    anemo: "var(--anemo)",
                    cryo: "var(--cryo)",
					hydro: "var(--hydro)",
					pyro: "var(--pyro)",
					dendro: "var(--dendro)",
					geo: "var(--geo)",
                    llc: "var(--llc)",
                    sg: "var(--sg)",
                    bol: "var(--bol)"                     
                  }
                  
                  const color = colors[colorKey]
                  if (color) {
                    newNodes.push({
                      type: "html",
                      value: `<span style="color: ${color}">${textContent}</span>`
                    })
                  } else {
                    newNodes.push({ type: "text", value: match[0] })
                  }
                }
                lastIndex = matchEnd
              }

              if (lastIndex < value.length) {
                newNodes.push({ type: "text", value: value.slice(lastIndex) })
              }

              parent.children.splice(index, 1, ...newNodes)
              
              // ВАЖНО: Возвращаем новый индекс, чтобы избежать дублирования текста
              return index + newNodes.length
            })
          }
        }
      ]
    }
  }
}