module.exports = {
    content: ['./src/**/*.{html,tsx}'],
    theme: {
        extend: {
            colors: {
                'light-gray': '#E0E0E0',
                'medium-gray': '#828282',
                'dark-gray': '#333333',
                'pokemon-background': '#FAFAFA',
                'pokemon-red': '#EB5435'
            },
            boxShadow: {
                'detail-card': '0px 0px 16px rgba(0, 0, 0, 0.3)',
                'detail-box': '0px 8px 16px 4px rgba(0, 0, 0, 0.05)'
            }
        }
    },
    plugins: []
};
