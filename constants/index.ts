export const headerLinks = [

    {

        label: 'Home',

        route: '/',

    },

    {

        label: 'Create Event',

        route: '/events/create',

    },

    {

        label: 'My Profile',

        route: '/profile',

    },

]

export const footerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'About',
      route: '/about',
    },
    {
      label: 'Contact',
      route: '/contact',
    },
  ];
  
  
  

export const eventDefaultValues = {

    title: '',

    description: '',

    location: '',

    imageUrl: '',

    startDateTime: new Date(),

    endDateTime: new Date(),

    categoryId: '',

    price: '',

    isFree: false,

    url: '',

}
