import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {

        const APP_URL = process.env.NEXT_PUBLIC_APP_URL;


        return (
            <Html lang="no">
                <Head>
                    {/* Icons */}
                    <link
                        rel="apple-touch-icon"
                        sizes="256x256"
                        href="/touch-icon-256.png"
                    />
                    <link rel="icon" href="/favicon.ico" type="image/x-icon" />


                    {/*                     <meta property="og:site_name" content="Pricecut" />
                    <meta
                        property="og:logo"
                        content={`${APP_URL}/touch-icon-256.png`}
                    />
                    <meta
                        property="og:image"
                        content={`${APP_URL}/ogimage.jpg`}
                    />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="og:image:type" content="image/jpeg" />

      
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="twitter:image"
                        content={`${APP_URL}/ogimage.jpg`}
                    />
                    <meta name="twitter:domain" content={APP_URL} />
 */}

                    <meta httpEquiv="Accept-CH" content="DPR, Width" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;