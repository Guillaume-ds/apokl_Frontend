import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Layout = ({ title, content, children }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={content} />
            </Head>
            <Navbar />
            <div className='container mt-5'>
                {children}
            </div>
            <Footer />
        </>
    );
};

Layout.defaultProps = {
    title: 'Apokl',
    content: 'NFT Social Marketplace'
}

export default Layout;
