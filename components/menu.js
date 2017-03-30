import React from 'react'
import Link from 'next/link'
const BurgerMenu = require('react-burger-menu').slide

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
    zIndex: '200'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: '200',
    top: '0'
  },
  bmMenuWrap: {
    zIndex: '200',
    top: '0'
  },
  menuItem: {
    padding: '1em',
    display: 'block'
  }
}

export default class Menu extends React.Component {
  render () {
    return (
      <BurgerMenu styles={styles} radiumConfig={{userAgent: 'Gecko'}}>
        <Link href='/'><a style={styles.menuItem}>Home</a></Link>
        <Link href='/tutorial'><a style={styles.menuItem}>Tutorial</a></Link>
        <Link href='/arena'><a style={styles.menuItem}>Open Arena</a></Link>
        <Link href='/player'><a style={styles.menuItem}>Player</a></Link>
        <Link href='/server'><a style={styles.menuItem}>Server</a></Link>
        <Link href='/contact'><a style={styles.menuItem}>Contact</a></Link>
        <Link href='/about'><a style={styles.menuItem}>About</a></Link>
      </BurgerMenu>
    )
  }
}
