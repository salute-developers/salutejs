/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: false,
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
};
