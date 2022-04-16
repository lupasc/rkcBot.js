module.exports = {

    _infoCheckNative: {
        code: 502,
        type: 'Erro de check (conhecido)',
        text: '',
        hint: 'Entre em contato com o suporte.'
    },

    _infoCheck: {
        code: 500,
        type: 'Erro de check (desconhecido)',
        text: 'Não foi possível verificar o seu cartão devido a um erro interno.',
        hint: 'Tente novamente em alguns instantes.'
    },

    _infoInvalid: {
        code: 406,
        type: 'Erro de cartão',
        text: 'O cartão foi verificado porém é inválido',
        hint: 'Use outro cartão de crédito ou meio de pagamento'
    },

    _noSaleHash: {
        code: 403,
        type: 'Erro de compra (no _hash)',
        text: 'Não foi encontrado o identificador da compra.',
        hint: 'Volte a página do produto e recomece a compra.'
    },

    _doubleSaleHash: {
        code: 409, // conflit double error
        type: 'Erro de compra (double _hash)',
        text: 'Uma compra com o mesmo identificador já existe, talvez aguardando pagamento ou entrega.',
        hint: 'Volte a página de produto iniciar uma nova compra.'
    },

    _picPayOrderFail: {
        code: 401,
        type: 'Erro de aprovação - PicPay',
        text: 'Não foi possível criar a ordem de pagamento.',
        hint: 'Tente novamente em alguns instantes.'
    },

    _ccPurchaseApproveTry: {
        code: 500,
        type: 'Erro de aprovação (Tentativa)',
        text: 'Não foi possível aprovar sua compra com cartão devido a um erro interno.',
        hint: 'Tente novamente em alguns instantes.'
    },

    _ccPurchaseNotApproved: {
        code: 401,
        type: 'Erro de aprovação',
        text: 'O cartão foi verificado e é válido porém o emissor não aprovou a compra.',
        hint: 'Use outro cartão de crédito, ligue para o banco ou use outro meio de pagamento.'
    },

    _mongoCrudFail: {
        code: 500,
        type: 'Erro de busca em Banco de Dados',
        text: 'Houve um erro ao usar um método de operação no banco de dados',
        hint: 'Verifique a requisição e tente novamente.'
    }
}