// const books = [
//     {
//         title: 'The Awakening',
//         authors: ['Kate Chopin', 'Steve McGraw']
//     },
//     {
//         title: 'City of Glass',
//         authors: ['Paul Auster', 'Martha L', 'Jack The Ripper']
//     },
// ];

// const authors = {
//     'Kate Chopin': {
//         name: 'Kate Chopin',
//         age: 65,
//     },
//     'Steve McGraw': {
//         name: 'Steve McGraw',
//         age: 55,
//     },
//     'Paul Auster': {
//         name: 'Paul Auster',
//         age: 67,
//     },
//     'Martha L': {
//         name: 'Martha L',
//         age: 43,
//     },
//     'Jack The Ripper': {
//         name: 'Jack The Ripper',
//         age: 78,
//     }
// }

// const resolvers = {
//     Query: {
//         books: () => books,
//     },
//     Book: {
//         authors: (parent) => {
//             const array = parent.authors.map((author) => {
//                 return authors[author]
//             });

//             return array;
//         }
//     }
// }

const users = [{
    id: 1,
    username: 'Mario',
    // firstName: 'Mario',
    // lastName: 'Laureano',
    // email: 'example@mail.com',
    // contactList: ['Jack', 'Chris'],
    rooms: ['Room1', 'Room2'],
},
{
    id: 2,
    username: 'Chris',
    // firstName: 'Chris',
    // lastName: 'Hessler',
    // email: 'anotherexample@mail.com',
    // contactList: ['Mario', 'Jack', 'Arya'],
    rooms: ['Room1', 'GroupRoom'],
},
{
    id: 3,
    username: 'Jack',
    // firstName: 'Jack',
    // lastName: 'McGraw',
    // email: 'mail@mail.com',
    // contactList: ['Mario', 'Chris', 'Arya'],
    rooms: ['Room2', 'GroupRoom'],
},
{
    id: 4,
    username: 'Arya',
    // firstName: 'Arya',
    // lastName: 'Stark',
    // email: 'stark@mail.com',
    // contactList: ['Jack', 'Mario', 'Chris'],
    rooms: ['GroupRoom'],
}
];

const rooms = [
    {
        id: 1,
        name: 'Room1',
        groupalRoom: false,
        members: ['Mario', 'Jack']
    },
    {
        id: 2,
        name: 'Room2',
        groupalRoom: false,
        members: ['Mario', 'Jack']
    },
    {
        id: 3,
        name: 'GroupRoom',
        groupalRoom: true,
        members: ['Arya', 'Chris', 'Jack']
    },
];

// const messages = [
//     {
//         id: 1,
//         body: 'Hello Jack',
//         sendBy: 'Mario'
//     },
//     {},
//     {}
// ];

const resolvers = {
    Query: {
        users: () => users,
    },
    Room: {
        name: (parent) => {
            return parent;
        },
        members: (parent) => {
            const array = parent.rooms.map((item) => {
                return rooms[item]
            });

            return array;
        }
    },
    Contact: {
        username: (parent) => console.log(parent)
    }
};

module.exports = resolvers;