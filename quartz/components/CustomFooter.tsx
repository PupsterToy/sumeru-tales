import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    return (
      <footer class={displayClass}>
        <hr />
        <p>
          © {year} Мой крутой сайт. Все права защищены. <br />
          Сделано с любовью и <a href="https://quartz.jzhao.xyz">Quartz</a>.
        </p>
      </footer>
    )
  }
  return Footer
}) satisfies QuartzComponentConstructor