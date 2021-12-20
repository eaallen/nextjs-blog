import css from './googleDocParagraph.module.css'
export default function GoogleDocParagraph({ alignment, font_size, paragraphStyle, children }) {
  const classNames = buildClassName(
    paragraphType(paragraphStyle), 
    paragraphAlignment(alignment)
  )
  return (
    <p className={classNames}>
      {children}
    </p>
  );
}

export function buildClassName(...b){
  return b.join(' ')
}

export function paragraphAlignment(alignment = '') {
  const align = alignment?.toLowerCase() ?? '' 
  switch (align) {
    case 'center':
      return css.alignCenter
    case 'right':
      return css.alignRight
    default:
      return css.alignLeft
  }
}

export function paragraphType(paragraphStyle = 0){
  const paragraphStyleNumber = paragraphStyle ?? 0
  return css[`heading${paragraphStyleNumber}`];
}