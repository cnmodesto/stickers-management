// Lista todos os relatórios disponíveis (/reports -- método GET)
exports.getReportsPage = async (req, res) => {
    try {
        res.render('reports/reports');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
};