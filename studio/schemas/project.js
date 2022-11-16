export default {
    name: 'project',
    title: 'Prosjekt',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLenght: 36,
            }
        },
        {
            name: 'cover',
            title: 'Cover',
            type: 'image',
        },
        {
            name: 'gallery',
            title: 'Bildegalleri',
            type: 'array',
            of: [{type:'image'}],
        },
        {
            name: 'process',
            title: 'Prosess',
            type: 'blockContent',
        },
        {
            name: 'tools',
            title: 'Verktøy',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                      {type: 'software'}
                    ]
                }
            ]
        }
    ]
}