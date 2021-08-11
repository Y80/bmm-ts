import { style, globalStyle } from '@vanilla-extract/css'

export const bookmarkCard = style({
  width: '230px',
  height: '4.2rem',
})
globalStyle(`${bookmarkCard} .n-card-header`, {
  padding: '5px 15px',
})
globalStyle(`${bookmarkCard} .n-card-header .n-card-header__main`, {
  fontWeight: 'normal',
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'block',
  marginRight: '0.6em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})
globalStyle(`${bookmarkCard} .n-card-header__extra .n-space > div`, {
  display: 'flex',
})
globalStyle(`${bookmarkCard} .n-card__content`, {
  padding: '0 15px 3px 15px',
})
globalStyle(`${bookmarkCard} .n-card__content .n-tag`, {
  padding: '0 5px',
  height: '18px',
  lineHeight: '18px',
})

export const tagsBox = style({
  overflowY: 'hidden',
  overflowX: 'auto',
  paddingBottom: '2px',
  '::-webkit-scrollbar': {
    height: '3px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#ddd',
  },
})
