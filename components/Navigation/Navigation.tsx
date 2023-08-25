import Link from 'next/link'
import Image from 'next/image'
import { NAVIGATION_ITEMS } from '@/utils/constants'
import Button from '../Button'
import Search from '../Search'
import NavigationMenu from './NavigationMenu'

export default function Navigation() {
  return (
    <header className='nav'>
      <div className='nav__container container'>
        <div className='nav__logo'>
          <Image
            src='/assets/images/oskari-logo.svg'
            alt='Oskari Logo'
            width={200}
            height={90}
            priority={true}
          />
        </div>
        <Search />
        <NavigationMenu />
        <div className='nav__cta'>
          <Button title='Download' variant='primary' />
        </div>
      </div>
    </header>
  )
}
