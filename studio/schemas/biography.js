export default {
    name: 'biography',
    title: 'Biography',
    type: 'document',
    fields: [ 
        {
            name: 'fullname',
            title: 'Fultnavn',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'fullname',
                maxLenght: 36,
            }
        },
        {
            name: 'portrait',
            title: 'Portrett',
            type: 'image',
        },
        {
            name: 'pitch',
            title: 'pitch',
            type: 'blockContent'
        },
        {
            name: 'bio',
            title: 'Biografi',
            type: 'blockContent',
        }
    ]
}
