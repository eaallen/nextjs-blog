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


export function handleSpacing(text=''){
  const richText = text.replaceAll(' ', '&nbsp;')
  return <span dangerouslySetInnerHTML={{ __html: richText }} />
}

export function buildClassName(...args){
  return args.join(' ')
}

export function paragraphAlignment(alignment = '') {
  const align = alignment?.toLowerCase() ?? '' 
  console.log(align)
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