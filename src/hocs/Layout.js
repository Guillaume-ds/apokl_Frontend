import Head from 'next/head';
import Nav from '../components/navbar';

const Layout = ({ title, content, children }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={content} />
            </Head>
            <Nav />
            <div className='container mt-5'>
                {children}
            </div>
        </>
    );
};

Layout.defaultProps = {
    title: 'Apokl',
    content: 'NFT Social Marketplace'
}

export default Layout;
