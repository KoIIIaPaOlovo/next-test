const currentYear = new Date().getFullYear();

const customers = [
    {
        name: 'testname1',
        email: 'testemail1',
        image_url: '/customers/balazs-orban.png',
        orders: [
            {
                amount: 1000,
                status: 'paid',
                date: `${currentYear}-02-17`
            },
            {
                amount: 1000,
                status: 'paid',
                date: `${currentYear}-02-17`
            },
            {
                amount: 500,
                status: 'paid',
                date: `${currentYear}-01-10`
            },
            {
                amount: 500,
                status: 'pending',
                date: `${currentYear}-01-20`
            },
            {
                amount: 500,
                status: 'pending',
                date: `${currentYear}-01-20`
            }
        ]
    },
    {
        name: 'testname2',
        email: 'testemail2',
        image_url: '/customers/delba-de-oliveira.png',
        orders: [
            {
                amount: 1500,
                status: 'paid',
                date: `${currentYear}-01-15`
            },
            {
                amount: 1000,
                status: 'pending',
                date: `${currentYear}-02-20`
            }
        ]
    },
    {
        name: 'testname3',
        email: 'testemail3',
        image_url: '',
        orders: [
            {
                amount: 500,
                status: 'pending',
                date: `${currentYear}-01-20`
            }
        ]
    },
]

export default customers;