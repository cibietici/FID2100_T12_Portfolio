export default {
    name: 'cv',
    title: 'CV',
    type: 'document',
    fields: [
        {
            name: 'employer',
            title: 'Arbaidsgiver',
            type: 'string'
        },
        {
            name: 'from',
            title: 'From',
            type: 'date',
        },
        {
            name: 'to',
            title: 'To',
            type: 'date',
        },
        {
            name: 'role',
            title: 'Rolle',
            type: 'string'
        },
        {
            name: 'active',
            title: 'Aktiv',
            type: 'boolean'
        }
    ]
}