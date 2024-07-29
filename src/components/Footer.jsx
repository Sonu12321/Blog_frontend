import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram } from 'react-icons/bs'

function Footerdown() {
  return (
    <Footer className='border border-t-8 border-teal-700'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to='/' className='self-center font-semibold whitespace-nowrap text-lg sm:text-xl dark:text-white '>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-700 to-fuchsia-800 rounded-lg text-white'>
                Sonu's
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-6 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://github.com/Sonu12321/JSProject1' target='_blank' rel='noopener noreferrer'>
                  My JavaScript Learning
                </Footer.Link>
                <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                  My personal
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://github.com/Sonu12321/JSProject1' target='_blank' rel='noopener noreferrer'>
                  My JavaScript Learning
                </Footer.Link>
                <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                  My personal
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by='Sonu"s Blog' year={new Date().getFullYear()} />
          <div className='flex gap-8 sm:mt-0 mt-8 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default Footerdown
