import React, { ReactPortal, ReactChildren, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import './all.sass';
import { useSiteMetadata } from './SiteMetadata';
import { ReactNodeArray } from 'prop-types';
import IdentityModal, {
  useIdentityContext,
} from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS

export interface ILayoutProps {}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { title, description } = useSiteMetadata();

  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.name) ||
    'NoName';
  debugger;
  console.log(JSON.stringify(identity));
  const isLoggedIn = identity && identity.isLoggedIn;

  return (
    <div>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content={description} />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/img/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon-16x16.png'
          sizes='16x16'
        />

        <link
          rel='mask-icon'
          href='/img/safari-pinned-tab.svg'
          color='#ff4400'
        />
        <meta name='theme-color' content='#fff' />
        <meta property='og:type' content='business.business' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content='/' />
        <meta property='og:image' content='/img/og-image.jpg' />
      </Helmet>
      <Navbar />
      <nav style={{ background: 'green' }}>
        {' '}
        Login Status:
        <button className='btn' onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : 'LOG IN'}
        </button>
      </nav>
      <div>{children}</div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />
      <Footer />
    </div>
  );
};
