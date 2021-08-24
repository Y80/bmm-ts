import { style, globalStyle } from '@vanilla-extract/css'

export const bookmarksContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))',
  gap: '20px 50px',
})

export const bookmarkCard = style({})
globalStyle(`${bookmarkCard} .n-card-header`, {
  justifyContent: 'space-between',
  padding: '5px 15px',
})
globalStyle(`${bookmarkCard} .n-card-header .n-card-header__main`, {
  display: 'inline-flex',
  maxWidth: 'calc(100% - 41px)',
  alignItems: 'center',
})
globalStyle(`${bookmarkCard} .n-card-header .n-card-header__main span`, {
  fontWeight: 'normal',
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'inline-block',
  margin: '0 .5em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})
globalStyle(`${bookmarkCard} .n-card-header__extra .n-space > div`, {
  display: 'inline-flex',
})
globalStyle(`${bookmarkCard} .n-card__content`, {
  padding: '5px 0 3px ',
  fontWeight: 200,
})

export const tagsBox = style({
  overflowY: 'hidden',
  overflowX: 'auto',
  padding: '0 .6rem 0 1rem',
  '::-webkit-scrollbar': {
    height: '3px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#ddd',
  },
  '::-webkit-scrollbar-track': {
    margin: '1rem',
  },
})
